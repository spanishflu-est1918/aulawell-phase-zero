import { NextRequest, NextResponse } from "next/server"
import type Stripe from "stripe"
import { createBooking } from "@/lib/booking/cal"
import {
  CURRENCY,
  DEFAULT_TIER,
  MAX_LESSONS_PER_CHECKOUT,
  TUTOR_TIERS,
  bundleUnitCents,
  formatPrice,
  isTutorTier,
} from "@/lib/booking/config"
import { describeSlot, notifyOwner } from "@/lib/booking/notify"
import { hasCustomRate, unitRateFor } from "@/lib/booking/rates"
import { getStripe } from "@/lib/booking/stripe"
import { createBookingRecord, checkTenLessonCustomerType } from "@/lib/airtable"

export const dynamic = "force-dynamic"

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
  const phone = meta.student_whatsapp || undefined
  const whatsappConsent = meta.whatsapp_consent === "1"
  const tier = isTutorTier(meta.tier) ? meta.tier : DEFAULT_TIER
  const service = meta.service || undefined
  // Recompute the price exactly as checkout did (tier price or family rate,
  // then bundle discount) so a tampered session can never verify.
  const baseUnit = unitRateFor(tier, meta.rate_code, service)
  const expectedUnit = hasCustomRate(tier, meta.rate_code)
    ? baseUnit
    : bundleUnitCents(baseUnit, slots.length)
  const expectedAmount = expectedUnit * slots.length

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

  // Stripe may deliver the same event more than once. The event payload is a
  // snapshot, so re-fetch the session and check the fulfilment marker we set
  // after booking — otherwise a retry would create every lesson twice.
  try {
    const fresh = await getStripe().checkout.sessions.retrieve(session.id)
    if (fresh.metadata?.cal_fulfilled === "1") {
      return NextResponse.json({ received: true })
    }
  } catch (err) {
    console.error("webhook: could not re-fetch session", session.id, err)
  }

  const booked: string[] = []
  const failed: Array<{ slot: string; error?: string }> = []
  for (const slot of slots) {
    const result = await createBooking(slot, { name, email }, {
      stripeSessionId: session.id,
    }, tier)
    if (result.ok) booked.push(slot)
    else failed.push({ slot, error: result.error })
  }

  try {
    await getStripe().checkout.sessions.update(session.id, {
      metadata: { ...meta, cal_fulfilled: "1" },
    })
  } catch (err) {
    console.error("webhook: could not mark session fulfilled", session.id, err)
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

  // The 20% saving only applies to a learner's FIRST 10-lesson package. We
  // always charge the advertised (20%-off) price at checkout — never a
  // silent surcharge — but for a 10+ lesson purchase we check Airtable for a
  // prior 10-lesson package by this email so a repeat purchase is flagged
  // for Amy to review and apply the offer rules manually. Checked before the
  // current booking is written, so it can never match itself.
  const checkTenLesson = slots.length >= 10
  const customerType = checkTenLesson ? await checkTenLessonCustomerType(email) : undefined

  const lines = [
    `New paid booking from ${name} (${email})`,
    `Lesson type: ${TUTOR_TIERS[tier].label}`,
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
  if (customerType === "returning") {
    lines.push(
      "",
      "ACTION NEEDED — 20% saving eligibility: this email has a previous 10-lesson " +
        "package on record. The 20% saving is meant for a learner's first 10-lesson " +
        "package only — please review and apply the offer rules manually (e.g. an " +
        "adjustment invoice) if this booking should not have received it."
    )
  } else if (customerType === "unknown") {
    lines.push(
      "",
      "NOTE — 20% saving eligibility could not be checked automatically (Airtable " +
        "lookup unavailable). Please confirm manually whether this is the learner's " +
        "first 10-lesson package."
    )
  }
  await notifyOwner(
    failed.length > 0
      ? "Aulawell booking: action needed"
      : customerType === "returning"
        ? "Aulawell booking: action needed — check 20% eligibility"
        : "Aulawell: new lessons booked",
    lines.join("\n")
  )

  // Operational record in Airtable (fail-soft — never affects fulfilment).
  if (booked.length > 0) {
    await createBookingRecord({
      name,
      email,
      phone,
      whatsappConsent,
      tierLabel: TUTOR_TIERS[tier].label,
      amountPaidPence: session.amount_total ?? 0,
      currency: session.currency ?? CURRENCY,
      lessonSlotsIso: booked,
      stripeSessionId: session.id,
      customerType,
    })
  }

  return NextResponse.json({ received: true })
}
