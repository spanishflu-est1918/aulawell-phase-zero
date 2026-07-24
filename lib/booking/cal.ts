// Server-only helpers for the Cal.com v2 API. The API key must never reach
// the client — only import this module from API routes / server code.

import { BOOKING_TIMEZONE } from "./config"

const CAL_API_BASE = "https://api.cal.com/v2"
const SLOTS_API_VERSION = "2024-09-04"
const BOOKINGS_API_VERSION = "2024-08-13"

export function isBookingConfigured(): boolean {
  return Boolean(process.env.CAL_API_KEY && process.env.CAL_EVENT_TYPE_ID)
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
  endISO: string
): Promise<Record<string, string[]>> {
  const params = new URLSearchParams({
    eventTypeId: process.env.CAL_EVENT_TYPE_ID as string,
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

export async function createBooking(
  startUtcISO: string,
  attendee: BookingAttendee,
  metadata: Record<string, string> = {}
): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch(`${CAL_API_BASE}/bookings`, {
    method: "POST",
    headers: calHeaders(BOOKINGS_API_VERSION),
    body: JSON.stringify({
      eventTypeId: Number(process.env.CAL_EVENT_TYPE_ID),
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
