// Client-safe booking configuration — no prices for specific families here
// (those live in lib/booking/rates.ts, which must stay server-only).

export const LESSON_NAME = "Tutoring lesson (60 min)"
export const LESSON_DURATION_MINUTES = 60
export const BOOKING_TIMEZONE = "Europe/Madrid"
export const CURRENCY = "eur"

// How far ahead parents can book.
export const BOOKING_WINDOW_DAYS = 60

// Maximum lessons payable in a single checkout (keeps Stripe metadata small).
export const MAX_LESSONS_PER_CHECKOUT = 12

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100)
}
