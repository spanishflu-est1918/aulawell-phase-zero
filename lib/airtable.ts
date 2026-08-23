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
  tutors: process.env.AIRTABLE_TUTORS_TABLE || "Tutors",
  studentsGroups: process.env.AIRTABLE_STUDENTS_TABLE || "Students & Groups",
}

// Logical field → Airtable field name. If the base uses different column names,
// change them here (this is the ONE place to align field names).
const LEAD_FIELDS = {
  name: "Name",
  email: "Email",
  phone: "WhatsApp",
  whatsappConsent: "WhatsApp Consent",
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
  // Must already be normalized (see lib/phone.ts) and only ever set when
  // whatsappConsent is true — this module trusts its callers on that.
  phone?: string
  whatsappConsent?: boolean
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
    [LEAD_FIELDS.whatsappConsent]: lead.whatsappConsent ?? false,
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
  // Must already be normalized (see lib/phone.ts) and only ever set when
  // whatsappConsent is true — this module trusts its callers on that.
  phone?: string
  whatsappConsent?: boolean
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
    WhatsApp: input.phone,
    "WhatsApp Consent": input.whatsappConsent ?? false,
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

// ---------------------------------------------------------------------------
// Tutor lesson-completion (Google Form → this website's webhook → Airtable).
//
// A tutor submits the "Tutor Lesson Log" form after each lesson. It POSTs to
// /api/webhooks/lesson-completion, which calls recordLessonCompletion below.
// The Lesson row is simply CREATED and linked to the matching Tutor and
// Student/Group records — "Lessons Remaining" on Students & Groups is a
// native Airtable rollup/formula (Package Size − completed lessons), so it
// updates itself the moment the link is made. Nothing here decrements a
// number directly, which avoids any double-decrement/race-condition risk.
// ---------------------------------------------------------------------------

// Exact-match lookup by a single-line-text "name" field. Returns the record
// id, or null if not found / on any error (never throws).
async function findRecordIdByName(
  table: string,
  nameField: string,
  value: string
): Promise<string | null> {
  if (!isAirtableConfigured() || !value) return null
  try {
    const safeValue = value.replace(/'/g, "\\'")
    const formula = `{${nameField}}='${safeValue}'`
    const url = `${AIRTABLE_API}/${BASE_ID}/${encodeURIComponent(table)}?maxRecords=1&filterByFormula=${encodeURIComponent(formula)}`
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
    })
    if (!res.ok) {
      console.error(`[airtable] lookup in ${table} failed (${res.status})`)
      return null
    }
    const data = (await res.json()) as { records?: Array<{ id: string }> }
    return data.records?.[0]?.id ?? null
  } catch (err) {
    console.error(`[airtable] lookup in ${table} error:`, err)
    return null
  }
}

export function findTutorIdByName(tutorName: string): Promise<string | null> {
  return findRecordIdByName(TABLES.tutors, "Tutor Name", tutorName)
}

export function findStudentGroupIdByName(name: string): Promise<string | null> {
  return findRecordIdByName(TABLES.studentsGroups, "Student/Group Name", name)
}

// The form's "Lesson Status" options don't all match Airtable's Lesson
// Status select exactly (form: "Cancelled", Airtable: "Cancellation") — this
// is the one place that mapping lives.
const LESSON_STATUS_MAP: Record<string, string> = {
  Completed: "Completed",
  "No-Show": "No-Show",
  Cancelled: "Cancellation",
}

export function normalizeLessonStatus(formStatus: string): string {
  return LESSON_STATUS_MAP[formStatus] ?? formStatus
}

export interface LessonCompletionInput {
  tutorId: string
  studentGroupId: string
  lessonDate: string // YYYY-MM-DD
  status: string // already normalized via normalizeLessonStatus
  durationMinutes: string
}

export async function createLessonRecord(
  input: LessonCompletionInput
): Promise<string | null> {
  return createRecord(TABLES.lessons, {
    Lesson: `${input.lessonDate} lesson`,
    Date: input.lessonDate,
    Tutor: [input.tutorId],
    "Students & Groups": [input.studentGroupId],
    "Lesson Status": input.status,
    Duration: input.durationMinutes,
    Billable: input.status === "Completed",
  })
}

// ---------------------------------------------------------------------------
// Rebook nudge — when a student/group has exactly 1 lesson left in their
// current package, email the parent (and flag Amy) to invite them to rebook.
//
// "Rebook Notified For Package Size" stores the Package Size value at the
// moment a nudge was sent. Comparing that to the CURRENT Package Size (rather
// than a plain boolean) means a nudge fires again automatically the next time
// this package winds down to 1 remaining — no manual reset needed when Amy
// starts a new package for the same student.
// ---------------------------------------------------------------------------

async function updateRecord(
  table: string,
  recordId: string,
  fields: Record<string, unknown>
): Promise<boolean> {
  if (!isAirtableConfigured()) return false
  try {
    const res = await fetch(
      `${AIRTABLE_API}/${BASE_ID}/${encodeURIComponent(table)}/${recordId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ typecast: true, fields }),
      }
    )
    if (!res.ok) {
      const detail = await res.text().catch(() => "")
      console.error(`[airtable] update in ${table} failed (${res.status}):`, detail)
      return false
    }
    return true
  } catch (err) {
    console.error(`[airtable] update in ${table} error:`, err)
    return false
  }
}

export interface RebookCandidate {
  id: string
  studentGroupName: string
  parentEmail: string
  packageSize: number
}

// Students/groups with exactly 1 lesson left whose package size hasn't
// already triggered a nudge. Excludes records with no parent email on file
// (nothing to send to — Amy would still see these via the Airtable view).
export async function listRebookCandidates(): Promise<RebookCandidate[]> {
  if (!isAirtableConfigured()) return []
  try {
    const formula =
      "AND({Lessons Remaining}=1, {Parent/Student Email}!='', " +
      "IF({Rebook Notified For Package Size}={Package Size}, FALSE(), TRUE()))"
    const url = `${AIRTABLE_API}/${BASE_ID}/${encodeURIComponent(TABLES.studentsGroups)}?filterByFormula=${encodeURIComponent(formula)}`
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
    })
    if (!res.ok) {
      console.error(`[airtable] rebook candidates lookup failed (${res.status})`)
      return []
    }
    const data = (await res.json()) as {
      records?: Array<{
        id: string
        fields: Record<string, unknown>
      }>
    }
    return (data.records ?? []).map((r) => ({
      id: r.id,
      studentGroupName: String(r.fields["Student/Group Name"] ?? ""),
      parentEmail: String(r.fields["Parent/Student Email"] ?? ""),
      packageSize: Number(r.fields["Package Size"] ?? 0),
    }))
  } catch (err) {
    console.error("[airtable] rebook candidates lookup error:", err)
    return []
  }
}

export function markRebookNudgeSent(
  studentGroupId: string,
  packageSize: number
): Promise<boolean> {
  return updateRecord(TABLES.studentsGroups, studentGroupId, {
    "Rebook Notified For Package Size": packageSize,
    "Rebook Nudge Sent At": new Date().toISOString(),
  })
}
