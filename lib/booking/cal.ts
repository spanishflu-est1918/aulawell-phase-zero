// Server-only helpers for the Cal.com v2 API. The API key must never reach
// the client — only import this module from API routes / server code.

import { BOOKING_TIMEZONE, type TutorTier } from "./config"

const CAL_API_BASE = "https://api.cal.com/v2"
const SLOTS_API_VERSION = "2024-09-04"
const BOOKINGS_API_VERSION = "2024-08-13"

function eventTypeIdFor(tier: TutorTier): string | undefined {
  if (tier === "associate") return process.env.CAL_EVENT_TYPE_ID_ASSOCIATE
  if (tier === "presencial") return process.env.CAL_EVENT_TYPE_ID_PRESENCIAL
  return process.env.CAL_EVENT_TYPE_ID
}

export function isBookingConfigured(): boolean {
  return Boolean(process.env.CAL_API_KEY && process.env.CAL_EVENT_TYPE_ID)
}

// Associate tiers stay unavailable until their corresponding event types
// (on the associate tutor's calendar) are configured.
export function isTierConfigured(tier: TutorTier): boolean {
  return Boolean(process.env.CAL_API_KEY && eventTypeIdFor(tier))
}

function calHeaders(apiVersion: string): HeadersInit {
  return {
    Authorization: `Bearer ${process.env.CAL_API_KEY}`,
    "cal-api-version": apiVersion,
    "Content-Type": "application/json",
  }
}

/**
 * Available slots between two UTC instants, as returned by Cal.com:
 * a map of date (YYYY-MM-DD, in BOOKING_TIMEZONE) to slot start times.
 */
export async function fetchSlots(
  startISO: string,
  endISO: string,
  tier: TutorTier = "head"
): Promise<Record<string, string[]>> {
  const params = new URLSearchParams({
    eventTypeId: eventTypeIdFor(tier) as string,
    start: startISO,
    end: endISO,
    timeZone: BOOKING_TIMEZONE,
  })
  const res = await fetch(`${CAL_API_BASE}/slots?${params}`, {
    headers: calHeaders(SLOTS_API_VERSION),
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error(`Cal.com slots request failed (${res.status})`)
  }
  const json = await res.json()
  const data: Record<string, Array<string | { start: string }>> =
    json.data ?? {}
  const slots: Record<string, string[]> = {}
  for (const [date, times] of Object.entries(data)) {
    slots[date] = times.map((t) => (typeof t === "string" ? t : t.start))
  }
  return slots
}

export interface BookingAttendee {
  name: string
  email: string
}

export interface CalBooking {
  uid: string
  start: string
  end: string
  status: string
  eventTypeId?: number
  attendees?: Array<{ name?: string; email?: string }>
  metadata?: Record<string, string> | null
}

/**
 * Bookings that have already taken place, starting no earlier than
 * afterStartISO. Used by the post-pay invoicing cron.
 */
export async function fetchPastBookings(afterStartISO: string): Promise<CalBooking[]> {
  const params = new URLSearchParams({
    status: "past",
    afterStart: afterStartISO,
    take: "100",
  })
  const res = await fetch(`${CAL_API_BASE}/bookings?${params}`, {
    headers: calHeaders(BOOKINGS_API_VERSION),
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error(`Cal.com bookings request failed (${res.status})`)
  }
  const json = await res.json()
  return Array.isArray(json.data) ? json.data : []
}

export async function createBooking(
  startUtcISO: string,
  attendee: BookingAttendee,
  metadata: Record<string, string> = {},
  tier: TutorTier = "head"
): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch(`${CAL_API_BASE}/bookings`, {
    method: "POST",
    headers: calHeaders(BOOKINGS_API_VERSION),
    body: JSON.stringify({
      eventTypeId: Number(eventTypeIdFor(tier)),
      start: startUtcISO,
      attendee: {
        name: attendee.name,
        email: attendee.email,
        timeZone: BOOKING_TIMEZONE,
        language: "en",
      },
      metadata,
    }),
  })
  if (res.ok) return { ok: true }
  let detail = `status ${res.status}`
  try {
    const body = await res.json()
    detail = body?.error?.message ?? body?.message ?? detail
  } catch {
    // keep the status-based detail
  }
  return { ok: false, error: detail }
}
