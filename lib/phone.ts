// WhatsApp number cleaning — shared by client forms and server routes so
// "the number you collected is worse than no number" (per the booking-flow
// audit) stops being true. A number is only ever stored in the normalized
// form; raw user input is never written to Airtable or Stripe metadata.

// Strips everything except leading + and digits.
export function cleanPhoneInput(raw: string): string {
  const trimmed = raw.trim()
  const hasPlus = trimmed.startsWith("+")
  const digits = trimmed.replace(/[^\d]/g, "")
  return (hasPlus ? "+" : "") + digits
}

// A dialable WhatsApp number: a leading + and 8–15 digits (E.164-ish). We
// don't validate the number actually exists — just that it's shaped like
// something you could dial, with a country code, not a bare local number.
export function isValidWhatsApp(raw: string): boolean {
  const cleaned = cleanPhoneInput(raw)
  return /^\+\d{8,15}$/.test(cleaned)
}

// Normalize for storage — returns "" for empty/invalid input rather than
// throwing, so callers decide whether an invalid number blocks submission.
export function normalizeWhatsApp(raw: string): string {
  if (!raw) return ""
  const cleaned = cleanPhoneInput(raw)
  return isValidWhatsApp(cleaned) ? cleaned : ""
}
