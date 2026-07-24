// Server-only pricing. Only import from API routes / server code so family
// rates never appear in the client bundle. The charge amount is always taken
// from here — never from anything the browser sends.

// Standard per-lesson price in euro cents.
export const DEFAULT_RATE_CENTS = 4000

// Custom per-family rates. After agreeing a rate in the enquiry reply, send
// the family a link like /book?rate=familyname — they see and pay that rate.
// Keys are lowercase codes, values are euro cents per lesson.
export const RATE_CODES: Record<string, number> = {
  // example: garcia: 3000,
}

export function rateForCode(code?: string | null): number {
  if (!code) return DEFAULT_RATE_CENTS
  return RATE_CODES[code.toLowerCase().trim()] ?? DEFAULT_RATE_CENTS
}
