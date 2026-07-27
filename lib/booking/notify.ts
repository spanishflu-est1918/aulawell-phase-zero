// Server-only owner notifications, delivered via Web3Forms (same channel as
// the contact form). Failures are logged but never break the caller's flow.

import { BOOKING_TIMEZONE } from "./config"
import { CONTACT_INFO, WEB3FORMS_ACCESS_KEY } from "@/lib/constants"

export function describeSlot(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: BOOKING_TIMEZONE,
  }).format(new Date(iso))
}

export async function notifyOwner(subject: string, message: string) {
  if (!WEB3FORMS_ACCESS_KEY) return
  try {
    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject,
        from_name: "Aulawell website",
        email: CONTACT_INFO.EMAIL,
        message,
      }),
    })
  } catch (err) {
    console.error("owner notification failed:", err)
  }
}
