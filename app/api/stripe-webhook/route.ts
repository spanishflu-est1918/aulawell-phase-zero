import { NextRequest, NextResponse } from "next/server"
import type Stripe from "stripe"
import { createBooking } from "@/lib/booking/cal"
import {
  BOOKING_TIMEZONE,
  CURRENCY,
  MAX_LESSONS_PER_CHECKOUT,
  formatPrice,
} from "@/lib/booking/config"
import { rateForCode } from "@/lib/booking/rates"
import { getStripe } from "@/lib/booking/stripe"
import { CONTACT_INFO, WEB3FORMS_ACCESS_KEY } from "@/lib/constants"

export const dynamic = "force-dynamic"

function describeSlot(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: BOOKING_TIMEZONE,
  }).format(new Date(iso))
}

async function notifyOwner(subject: string, message: string) {
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

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 })
  }

  const signature = req.headers.get("stripe-signature")
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    const payload = await req.text()
    event = await getStripe().webhooks.constructEventAsync(payload, signature, secret)
  } catch (err) {
    console.error("webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true })
  }

  const session = event.data.object
  const meta = session.metadata ?? {}
  const slots = (meta.slots ?? "").split(",").filter(Boolean)
  const name = meta.student_name ?? "Unknown"
  const email = meta.student_email ?? session.customer_email ?? ""
  const expectedAmount = rateForCode(meta.rate_code) * slots.length

  if (
    session.mode !== "payment" ||
    session.payment_status !== "paid" ||
    slots.length === 0 ||
    slots.length > MAX_LESSONS_PER_CHECKOUT ||
    !email ||
    session.currency !== CURRENCY ||
    session.amount_total !== expectedAmount ||
    slots.some((slot) => Number.isNaN(Date.parse(slot)))
  ) {
    console.error("webhook: session missing booking metadata", session.id)
    return NextResponse.json({ error: "Invalid Checkout session" }, { status: 400 })
  }

  const booked: string[] = []
  const failed: Array<{ slot: string; error?: string }> = []
  for (const slot of slots) {
    const result = await createBooking(slot, { name, email }, {
      stripeSessionId: session.id,
    })
    if (result.ok) booked.push(slot)
    else failed.push({ slot, error: result.error })
  }

  // Refund any lesson whose slot could not be booked (e.g. taken during payment).
  if (failed.length > 0 && session.payment_intent && session.amount_total) {
    const perLesson = Math.floor(session.amount_total / slots.length)
    try {
      await getStripe().refunds.create({
        payment_intent: session.payment_intent as string,
        amount: perLesson * failed.length,
        metadata: {
          checkout_session_id: session.id,
          reason: "lesson_slot_unavailable",
        },
      }, {
        // Stripe may deliver the same event more than once. This prevents a
        // webhook retry from creating a duplicate automatic refund.
        idempotencyKey: `booking-refund-${session.id}`,
      })
    } catch (err) {
      console.error("automatic refund failed:", err)
    }
  }

  const lines = [
    `New paid booking from ${name} (${email})`,
    `Amount paid: ${formatPrice(session.amount_total ?? 0)}`,
    "",
    "Confirmed lessons:",
    ...booked.map((s) => `  - ${describeSlot(s)}`),
  ]
  if (failed.length > 0) {
    lines.push(
      "",
      `ATTENTION: ${failed.length} slot(s) could not be booked and were auto-refunded:`,
      ...failed.map((f) => `  - ${describeSlot(f.slot)} (${f.error ?? "unknown error"})`)
    )
  }
  await notifyOwner(
    failed.length > 0
      ? "Aulawell booking: action needed"
      : "Aulawell: new lessons booked",
    lines.join("\n")
  )

  return NextResponse.json({ received: true })
}
