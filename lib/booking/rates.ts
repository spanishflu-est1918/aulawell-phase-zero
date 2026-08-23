// Server-only pricing. Only import from API routes / server code so family
// rates never appear in the client bundle. The charge amount is always taken
// from here — never from anything the browser sends.

import { TUTOR_TIERS, type TutorTier } from "./config"

export interface FamilyRate {
  cents: number
  // Trusted families: lessons are booked without upfront payment and a
  // Stripe invoice is emailed automatically after each lesson takes place.
  postPay?: boolean
}

// Custom per-family rates. After agreeing a rate in the enquiry reply, send
// the family a link like /book?rate=familyname — they see and pay that rate.
// Keys are lowercase codes. Family rates apply to Head Tutor (online) lessons
// only — presencial lessons always use the tier price.
export const RATE_CODES: Record<string, FamilyRate> = {
  // example: garcia: { cents: 3000 },
  // example: smith: { cents: 3500, postPay: true },
}

function familyRate(code?: string | null): FamilyRate | undefined {
  if (!code) return undefined
  return RATE_CODES[code.toLowerCase().trim()]
}

// True when the code maps to a negotiated family price. Such families never
// get the bundle discount on top — their deal is already the deal.
export function hasCustomRate(tier: TutorTier, code?: string | null): boolean {
  return tier === "head" && familyRate(code)?.cents !== undefined
}

// Per-lesson price in cents before any bundle discount. Head Tutor is a flat
// £45 across every service.
export function unitRateFor(tier: TutorTier, code?: string | null): number {
  if (tier === "head") {
    return familyRate(code)?.cents ?? TUTOR_TIERS.head.priceCents
  }
  return TUTOR_TIERS[tier].priceCents
}

// Only an explicitly configured rate code can bypass upfront payment, and
// only for Head Tutor lessons.
export function isPostPayCode(code?: string | null): boolean {
  return familyRate(code)?.postPay === true
}
