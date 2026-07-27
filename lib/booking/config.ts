// Client-safe booking configuration — no prices for specific families here
// (those live in lib/booking/rates.ts, which must stay server-only).

export const LESSON_NAME = "Tutoring lesson (60 min)"
export const LESSON_DURATION_MINUTES = 60

// Tutor tiers. Base prices are public (they appear on the site), so they can
// live in client-safe config — per-family deals stay in rates.ts.
export type TutorTier = "head" | "associate" | "presencial"

export interface TierInfo {
  label: string
  description: string
  priceCents: number
}

export const TUTOR_TIERS: Record<TutorTier, TierInfo> = {
  head: {
    label: "Online — Lead Tutor",
    description: "1:1 online with Aulawell's lead tutor",
    priceCents: 4500,
  },
  associate: {
    label: "Online — Associate Tutor",
    description: "1:1 online with an Aulawell associate tutor",
    priceCents: 2500,
  },
  presencial: {
    label: "In person — Associate Tutor",
    description: "In-person tuition with an associate tutor (Madrid only)",
    priceCents: 3500,
  },
}

export const DEFAULT_TIER: TutorTier = "head"

export function isTutorTier(value: unknown): value is TutorTier {
  return value === "head" || value === "associate" || value === "presencial"
}

// Bundle discount: booking several lessons in one checkout lowers the
// per-lesson price. Used by the UI, checkout and webhook alike so displayed
// and charged amounts can never disagree.
export function bundleUnitCents(unitCents: number, lessonCount: number): number {
  if (lessonCount >= 10) return unitCents - 300
  if (lessonCount >= 5) return unitCents - 200
  return unitCents
}
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
