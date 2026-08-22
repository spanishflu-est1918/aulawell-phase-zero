// ---------------------------------------------------------------------------
// Airtable — Aulawell's operational source of truth.
//
// Server-only. This module is fail-soft: if the token/base are not configured,
// or a write fails, it logs and returns without throwing, so a website enquiry
// or a paid booking is NEVER blocked by an Airtable problem.
//
// SETUP (Amy):
//   1. Create an Airtable Personal Access Token (airtable.com/create/tokens)
//      with scopes: data.records:write (and data.records:read), granted on the
//      Aulawell base.
//   2. Set AIRTABLE_API_KEY in .env.local AND in Vercel → Settings → Env Vars.
//      Never paste the token into chat or commit it.
//   3. Confirm the base id and table/field names below match the base. Base id
//      defaults to the one in the shared base URL; override with AIRTABLE_BASE_ID.
// ---------------------------------------------------------------------------

import "server-only"

const AIRTABLE_API = "https://api.airtable.com/v0"

// Base id from the shared Aulawell base URL; override via env if it changes.
const BASE_ID = process.env.AIRTABLE_BASE_ID || "appLE4zXHreNWQt93"

// Table names (or ids). Override via env to match the live base exactly.
// Defaults use the brief's table names; the Leads default is the table id from
// the shared URL so enquiries land there even before names are confirmed.
const TABLES = {
  leads: process.env.AIRTABLE_LEADS_TABLE || "Website Leads",
  packages: process.env.AIRTABLE_PACKAGES_TABLE || "Website Bookings",
  lessons: process.env.AIRTABLE_LESSONS_TABLE || "LESSONS",
}

// Logical field → Airtable field name. If the base uses different column names,
// change them here (this is the ONE place to align field names).
const LEAD_FIELDS = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  topic: "Enquiry About",
  stage: "Learner Stage",
  location: "Location",
  message: "Message",
  source: "Source",
  status: "Status",
}

export function isAirtableConfigured(): boolean {
  return Boolean(process.env.AIRTABLE_API_KEY && BASE_ID)
}

// Low-level: create one record. Fail-soft — returns the record id on success,
// or null (after logging) on any failure. `typecast` lets Airtable coerce
// values into single-select / linked options where possible.
async function createRecord(
  table: string,
  fields: Record<string, unknown>
): Promise<string | null> {
  if (!isAirtableConfigured()) {
    console.warn("[airtable] not configured — skipping write to", table)
    return null
  }
  // Drop empty values so we never send blank/undefined fields.
  const clean: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(fields)) {
    if (v !== undefined && v !== null && v !== "") clean[k] = v
  }
  try {
    const res = await fetch(`${AIRTABLE_API}/${BASE_ID}/${encodeURIComponent(table)}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ typecast: true, fields: clean }),
    })
    if (!res.ok) {
      const detail = await res.text().catch(() => "")
      console.error(`[airtable] write to ${table} failed (${res.status}):`, detail)
      return null
    }
    const data = (await res.json()) as { id?: string }
    return data.id ?? null
  } catch (err) {
    console.error("[airtable] write error:", err)
    return null
  }
}

export interface LeadInput {
  name: string
  email: string
  phone?: string
  topic?: string
  stage?: string
  location?: string
  message?: string
  source?: string
}

// Create a Lead / Enquiry record from a website enquiry.
export async function createLead(lead: LeadInput): Promise<string | null> {
  return createRecord(TABLES.leads, {
    [LEAD_FIELDS.name]: lead.name,
    [LEAD_FIELDS.email]: lead.email,
    [LEAD_FIELDS.phone]: lead.phone,
    [LEAD_FIELDS.topic]: lead.topic,
    [LEAD_FIELDS.stage]: lead.stage,
    [LEAD_FIELDS.location]: lead.location,
    [LEAD_FIELDS.message]: lead.message,
    [LEAD_FIELDS.source]: lead.source || "Website enquiry",
    [LEAD_FIELDS.status]: "New",
  })
}

export interface BookingRecordInput {
  name: string
  email: string
  tierLabel: string
  amountPaidPence: number
  currency: string
  lessonSlotsIso: string[]
  stripeSessionId?: string
  customerType?: CustomerType
}

// Human-readable labels for the "Customer Type" single-select field — must
// match the choices created on the Website Bookings table exactly.
const CUSTOMER_TYPE_LABELS: Record<CustomerType, string> = {
  new: "New",
  returning: "Returning — review 20% offer",
  unknown: "Unknown — check manually",
}

// Record a paid booking. Writes a package/purchase row (best-effort). Field
// names below are the ONE place to align to the live Packages table.
export async function createBookingRecord(
  input: BookingRecordInput
): Promise<string | null> {
  return createRecord(TABLES.packages, {
    Name: input.name,
    Email: input.email,
    Educator: input.tierLabel,
    "Amount Paid": input.amountPaidPence / 100,
    Currency: input.currency.toUpperCase(),
    "Lessons Booked": input.lessonSlotsIso.length,
    "Lesson Dates": input.lessonSlotsIso.join("\n"),
    "Stripe Session": input.stripeSessionId,
    Status: "Paid",
    Source: "Website booking",
    "Customer Type": input.customerType ? CUSTOMER_TYPE_LABELS[input.customerType] : undefined,
  })
}

// ---------------------------------------------------------------------------
// First-10-lesson-package discount check.
//
// The 20% saving is only meant to apply to a learner's FIRST 10-lesson
// package. The Stripe charge is always taken at the advertised (20%-off)
// price — we do not silently change what a customer is charged. Instead this
// looks up prior 10-lesson purchases by email so a repeat 10-lesson booking
// can be FLAGGED for Amy to review and apply manually (e.g. a follow-up
// invoice or adjustment), per her instruction.
//
// Tri-state result: "new" / "returning" are only returned when the lookup
// actually ran; "unknown" covers not-configured or any lookup failure, so a
// note can say "please check manually" rather than falsely claiming "new".
// ---------------------------------------------------------------------------
export type CustomerType = "new" | "returning" | "unknown"

export async function checkTenLessonCustomerType(email: string): Promise<CustomerType> {
  if (!isAirtableConfigured() || !email) return "unknown"
  try {
    const safeEmail = email.toLowerCase().replace(/'/g, "\\'")
    const formula = `AND(LOWER({Email})='${safeEmail}', {Lessons Booked}>=10)`
    const url = `${AIRTABLE_API}/${BASE_ID}/${encodeURIComponent(TABLES.packages)}?maxRecords=1&filterByFormula=${encodeURIComponent(formula)}`
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
    })
    if (!res.ok) {
      console.error(`[airtable] ten-lesson lookup failed (${res.status})`)
      return "unknown"
    }
    const data = (await res.json()) as { records?: unknown[] }
    return (data.records?.length ?? 0) > 0 ? "returning" : "new"
  } catch (err) {
    console.error("[airtable] ten-lesson lookup error:", err)
    return "unknown"
  }
}
