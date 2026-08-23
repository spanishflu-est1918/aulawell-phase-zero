// Client-safe booking configuration — no prices for specific families here
// (those live in lib/booking/rates.ts, which must stay server-only).

export const LESSON_NAME = "English lesson (60 min)"
export const LESSON_DURATION_MINUTES = 60

// Educator tiers. Base prices are public (they appear on the site), so they can
// live in client-safe config — per-family deals stay in rates.ts.
//
// Naming follows the brief's two educator levels: an Aulawell Tutor (the
// "from £35" entry point) and Head Tutor Amy. `presencial` is the in-person
// variant of an Aulawell Tutor (Madrid / Lisbon, subject to availability).
export type TutorTier = "head" | "associate" | "presencial"

export interface TierInfo {
  label: string
  description: string
  priceCents: number
}

// Prices are in the smallest GBP unit (pence). Single-lesson "from" prices:
// Aulawell Tutor £35, Head Tutor Amy £45 (flat across every service).
export const TUTOR_TIERS: Record<TutorTier, TierInfo> = {
  head: {
    label: "Head Tutor — Amy",
    description:
      "Premium 1:1 online tuition with Aulawell's Founder and Academic Director",
    priceCents: 4500,
  },
  associate: {
    label: "Aulawell Tutor",
    description: "Carefully selected 1:1 online English support",
    priceCents: 3500,
  },
  presencial: {
    label: "In person — Aulawell Tutor",
    description: "In-person tuition in Madrid or Lisbon (subject to availability)",
    priceCents: 4000,
  },
}

// The "from £35" Aulawell Tutor is the default entry point.
export const DEFAULT_TIER: TutorTier = "associate"

export function isTutorTier(value: unknown): value is TutorTier {
  return value === "head" || value === "associate" || value === "presencial"
}

// Bundle pricing: booking several lessons in one checkout lowers the per-lesson
// price. Tuned to the brief's package "from" prices, and used by the UI,
// checkout and webhook alike so displayed and charged amounts can never differ:
//   5 lessons  → -£2 per lesson   (e.g. £35 → £33 = £165; £45 → £43 = £215)
//   10 lessons → 20% off          (e.g. £35 → £28 = £280; £45 → £36 = £360)
export function bundleUnitCents(unitCents: number, lessonCount: number): number {
  if (lessonCount >= 10) return Math.round(unitCents * 0.8)
  if (lessonCount >= 5) return unitCents - 200
  return unitCents
}
export const BOOKING_TIMEZONE = "Europe/Madrid"
export const CURRENCY = "gbp"

// How far ahead parents can book.
export const BOOKING_WINDOW_DAYS = 60

// Maximum lessons payable in a single checkout (keeps Stripe metadata small).
export const MAX_LESSONS_PER_CHECKOUT = 12

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(cents / 100)
}
