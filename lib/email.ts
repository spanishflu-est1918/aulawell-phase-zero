// ---------------------------------------------------------------------------
// Parent-facing email — separate from lib/booking/notify.ts, which only ever
// emails Aulawell itself. Web3Forms can't send to third parties, so writing
// TO a parent needs a real transactional sender.
//
// Server-only, fail-soft: with no RESEND_API_KEY set, every send is a no-op
// (logged), so nothing in the booking/enquiry flow ever breaks because email
// isn't configured yet.
//
// SETUP (Amy):
//   1. Create a free Resend account (resend.com) — 3,000 emails/month free,
//      no subscription.
//   2. Verify the aulawell.co domain under Resend → Domains, so mail sends
//      from a real @aulawell.co address instead of the shared test sender.
//   3. Create an API key (Resend → API Keys) and set RESEND_API_KEY in
//      .env.local and Vercel. Never paste it into chat.
//   4. Set RESEND_FROM_EMAIL once the domain is verified, e.g.
//      "Aulawell <hello@aulawell.co>". Until then sends use Resend's shared
//      onboarding@resend.dev sender, which works without verification but
//      looks less trustworthy in an inbox — fine for testing, not for launch.
// ---------------------------------------------------------------------------

import "server-only"

const RESEND_API = "https://api.resend.com/emails"

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY)
}

function fromAddress(): string {
  return process.env.RESEND_FROM_EMAIL || "Aulawell <onboarding@resend.dev>"
}

export interface SendEmailInput {
  to: string
  subject: string
  html: string
  text: string
  replyTo?: string
}

// Fail-soft: logs and returns false on any problem, including "not
// configured" — never throws, so a parent email can never block a booking
// or enquiry from completing.
export async function sendParentEmail(input: SendEmailInput): Promise<boolean> {
  if (!isEmailConfigured()) {
    console.warn("[email] RESEND_API_KEY not set — skipping send to", input.to)
    return false
  }
  try {
    const res = await fetch(RESEND_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress(),
        to: input.to,
        subject: input.subject,
        html: input.html,
        text: input.text,
        reply_to: input.replyTo,
      }),
    })
    if (!res.ok) {
      console.error(`[email] send to ${input.to} failed (${res.status}):`, await res.text().catch(() => ""))
      return false
    }
    return true
  } catch (err) {
    console.error("[email] send error:", err)
    return false
  }
}

// ---------------------------------------------------------------------------
// A single, minimal branded wrapper — navy header, cream body, gold accent —
// so every parent-facing email looks like it came from the same place as the
// website, without each call site rebuilding markup.
// ---------------------------------------------------------------------------
export function emailShell(bodyHtml: string): string {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background-color:#f7f3eb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
    <div style="max-width:560px;margin:0 auto;padding:32px 20px;">
      <div style="background-color:#13283f;padding:24px 28px;border-radius:16px 16px 0 0;">
        <span style="color:#f7f3eb;font-size:20px;font-weight:700;letter-spacing:0.02em;">Aulawell</span>
      </div>
      <div style="background-color:#ffffff;padding:32px 28px;border-radius:0 0 16px 16px;color:#223142;font-size:15px;line-height:1.6;">
        ${bodyHtml}
      </div>
      <p style="text-align:center;color:#8a8378;font-size:12px;margin-top:20px;">
        Aulawell · Premium English tuition · aulawell.co
      </p>
    </div>
  </body>
</html>`
}
