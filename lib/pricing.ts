// ---------------------------------------------------------------------------
// Aulawell public "From" pricing and package structure.
//
// This is the DISPLAY / marketing source of truth for the product-led website
// (service pages, homepage package overview, checkout educator step). Prices
// are shown as "From" figures per the brief.
//
// The live Stripe checkout (lib/booking/config.ts) charges in GBP and its
// bundle discounts are tuned to match these "From" prices exactly — see the
// comment on bundleUnitCents() there. Keep the two in sync if either changes.
// ---------------------------------------------------------------------------

export const CURRENCY_SYMBOL = "£"

export function fromPrice(amount: number): string {
  return `From ${CURRENCY_SYMBOL}${amount}`
}

// Educator tiers shown at checkout and referenced on service pages.
export interface EducatorLevel {
  id: "aulawell-tutor" | "head-tutor"
  name: string
  fromLabel: string
  description: string
}

export const EDUCATOR_LEVELS: EducatorLevel[] = [
  {
    id: "aulawell-tutor",
    name: "Aulawell Tutor",
    fromLabel: "from £35",
    description: "Carefully selected one-to-one English support.",
  },
  {
    id: "head-tutor",
    name: "Head Tutor — Amy",
    fromLabel: "from £45",
    description:
      "Premium support delivered directly by Aulawell's Founder and Academic Director.",
  },
]

// Per-service starting prices, by educator tier. Used to render the "From"
// pricing tables on the three core service pages.
export interface PriceRow {
  service: string
  single: number
  five: number
  ten: number
}

export const AULAWELL_TUTOR_PRICES: PriceRow[] = [
  { service: "School English", single: 35, five: 165, ten: 280 },
  { service: "Exam English", single: 35, five: 165, ten: 280 },
]

export const HEAD_TUTOR_PRICES: PriceRow[] = [
  { service: "School English", single: 45, five: 215, ten: 360 },
  { service: "Exam English", single: 45, five: 215, ten: 360 },
]

// The pricing note shown across the three core service pages.
export const PRICING_NOTE =
  "Starting prices are for tuition with an Aulawell Tutor. Head Tutor appointments and full package options are shared transparently at checkout or following your booking enquiry."

// The prioritised package hierarchy (homepage + service pages).
export interface PackageTier {
  name: string
  strapline: string
  fromLabel: string
  cta: string
  ctaHref: string
  highlight?: string
  badge?: string
  featured?: boolean
}

export const PACKAGE_HIERARCHY: PackageTier[] = [
  {
    name: "1:1 Term Support — 10 lessons",
    strapline: "Weekly structure · sustained progress",
    fromLabel: "From £280 / 10 lessons",
    highlight: "20% saving on a learner's first 10-lesson package",
    badge: "Most Popular",
    cta: "Book Term Support",
    ctaHref: "/book?package=term-support",
    featured: true,
  },
  {
    name: "1:1 Skills Boost / Exam Sprint — 5 lessons",
    strapline: "Flexible support · one defined goal",
    fromLabel: "From £165 / 5 lessons",
    cta: "Book a 5-Lesson Package",
    ctaHref: "/book?package=skills-boost",
  },
  {
    name: "Single Lesson Clinic",
    strapline:
      "One focused session for a specific issue, text, assignment or priority",
    fromLabel: "From £35 / lesson",
    cta: "Book a Single Lesson",
    ctaHref: "/book?package=single-lesson",
  },
]

// Concise offer terms shown beneath packages; full terms live in /terms.
export const OFFER_RULES: string[] = [
  "The 20% saving applies only to a learner's first 10-lesson package.",
  "It cannot combine with referral, sibling or other offers.",
  "A 5% referral saving can apply to a later eligible Single Session or 5-Lesson package.",
  "A 5% sibling saving applies to a separate eligible package for a second child.",
  "Referral and sibling savings cannot combine with another offer on the same package.",
]
