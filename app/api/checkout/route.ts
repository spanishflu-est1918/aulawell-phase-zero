import { NextRequest, NextResponse } from "next/server"
import {
  createBooking,
  fetchSlots,
  isBookingConfigured,
  isTierConfigured,
} from "@/lib/booking/cal"
import {
  CURRENCY,
  DEFAULT_TIER,
  LESSON_DURATION_MINUTES,
  LESSON_NAME,
  MAX_LESSONS_PER_CHECKOUT,
  TUTOR_TIERS,
  bundleUnitCents,
  isTutorTier,
} from "@/lib/booking/config"
import { describeSlot, notifyOwner } from "@/lib/booking/notify"
import { hasCustomRate, isPostPayCode, unitRateFor } from "@/lib/booking/rates"
import { getStripe, isStripeConfigured } from "@/lib/booking/stripe"

export const dynamic = "force-dynamic"

interface CheckoutBody {
  slots?: unknown
  name?: unknown
  email?: unknown
  rate?: unknown
  tier?: unknown
  service?: unknown
}

export async function POST(req: NextRequest) {
  if (!isBookingConfigured() || !isStripeConfigured()) {
    return NextResponse.json(
      { error: "Online booking is not available yet" },
      { status: 503 }
    )
  }

  let body: CheckoutBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const name = typeof body.name === "string" ? body.name.trim() : ""
  const email = typeof body.email === "string" ? body.email.trim() : ""
  const rateCode = typeof body.rate === "string" ? body.rate : undefined
  const tier = isTutorTier(body.tier) ? body.tier : DEFAULT_TIER
  const service = typeof body.service === "string" ? body.service : undefined
  const slots = Array.isArray(body.slots)
    ? body.slots.filter((s): s is string => typeof s === "string")
    : []

  if (!isTierConfigured(tier)) {
    return NextResponse.json(
      { error: "This lesson type cannot be booked online yet — please contact us" },
      { status: 503 }
    )
  }

  if (!name || !/.+@.+\..+/.test(email)) {
    return NextResponse.json(
      { error: "Please provide your name and a valid email" },
      { status: 400 }
    )
  }
  if (slots.length === 0 || slots.length > MAX_LESSONS_PER_CHECKOUT) {
    return NextResponse.json(
      { error: `Select between 1 and ${MAX_LESSONS_PER_CHECKOUT} lessons` },
      { status: 400 }
    )
  }

  // Normalize to UTC instants and reject anything unparsable or in the past.
  const wanted: number[] = []
  for (const s of slots) {
    const ms = Date.parse(s)
    if (Number.isNaN(ms) || ms < Date.now()) {
      return NextResponse.json(
        { error: "One of the selected times is no longer valid" },
        { status: 400 }
      )
    }
    wanted.push(ms)
  }
  if (new Set(wanted).size !== wanted.length) {
    return NextResponse.json(
      { error: "Duplicate lesson times selected" },
      { status: 400 }
    )
  }

  // Verify every selected slot is still open with Cal.com right now. The
  // queried window must cover each candidate lesson in full — Cal.com omits
  // slots that do not fit entirely inside the requested range.
  try {
    const rangeStart = new Date(Math.min(...wanted) - 60_000).toISOString()
    const rangeEnd = new Date(
      Math.max(...wanted) + (LESSON_DURATION_MINUTES + 1) * 60_000
    ).toISOString()
    const open = await fetchSlots(rangeStart, rangeEnd, tier)
    const openSet = new Set(
      Object.values(open)
        .flat()
        .map((t) => Date.parse(t))
    )
    const taken = wanted.filter((ms) => !openSet.has(ms))
    if (taken.length > 0) {
      return NextResponse.json(
        { error: "Sorry, one of your chosen times was just booked by someone else. Please refresh and pick again." },
        { status: 409 }
      )
    }
  } catch (err) {
    console.error("checkout availability check:", err)
    return NextResponse.json(
      { error: "Could not verify availability, please try again" },
      { status: 502 }
    )
  }

  // Family rates apply to Head Tutor lessons only; families with a negotiated
  // rate don't get the bundle discount stacked on top of it.
  const baseUnit = unitRateFor(tier, rateCode, service)
  const unitAmount = hasCustomRate(tier, rateCode)
    ? baseUnit
    : bundleUnitCents(baseUnit, slots.length)
  const origin = req.nextUrl.origin
  const slotsUtc = wanted
    .sort((a, b) => a - b)
    .map((ms) => new Date(ms).toISOString().replace(".000Z", "Z"))

  // Trusted post-pay families skip payment: lessons are booked immediately
  // and a Stripe invoice is emailed automatically after each lesson happens
  // (see /api/cron/postpay-invoices). The postPay flag can only come from
  // RATE_CODES on the server, never from the browser, and only applies to
  // Head Tutor lessons.
  if (tier === "head" && isPostPayCode(rateCode)) {
    const booked: string[] = []
    const failed: string[] = []
    for (const slot of slotsUtc) {
      const result = await createBooking(slot, { name, email }, {
        postPay: "true",
        rateCode: rateCode as string,
        priceCents: String(unitAmount),
      })
      if (result.ok) booked.push(slot)
      else failed.push(slot)
    }
    if (booked.length === 0) {
      return NextResponse.json(
        { error: "Sorry, your chosen times were just booked by someone else. Please refresh and pick again." },
        { status: 409 }
      )
    }
    const lines = [
      `New post-pay booking from ${name} (${email}) — no payment taken, invoices go out automatically after each lesson.`,
      "",
      "Confirmed lessons:",
      ...booked.map((s) => `  - ${describeSlot(s)}`),
    ]
    if (failed.length > 0) {
      lines.push(
        "",
        `NOTE: ${failed.length} slot(s) could not be booked (likely taken meanwhile):`,
        ...failed.map((s) => `  - ${describeSlot(s)}`)
      )
    }
    await notifyOwner("Aulawell: new lessons booked (post-pay)", lines.join("\n"))
    const params = new URLSearchParams({ mode: "postpay", slots: booked.join(",") })
    if (failed.length > 0) params.set("failed", String(failed.length))
    return NextResponse.json({ url: `${origin}/book/success?${params}` })
  }

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      customer_creation: "always",
      billing_address_collection: "auto",
      submit_type: "book",
      line_items: [
        {
          quantity: slotsUtc.length,
          price_data: {
            currency: CURRENCY,
            unit_amount: unitAmount,
            product_data: { name: `${LESSON_NAME} — ${TUTOR_TIERS[tier].label}` },
          },
        },
      ],
      metadata: {
        slots: slotsUtc.join(","),
        student_name: name,
        student_email: email,
        rate_code: rateCode ?? "",
        tier,
        service: service ?? "",
      },
      payment_intent_data: {
        metadata: {
          booking_source: "aulawell.co",
          lesson_count: String(slotsUtc.length),
          student_email: email,
        },
      },
      success_url: `${origin}/book/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/book?cancelled=1`,
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
    })
    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error("checkout session:", err)
    return NextResponse.json(
      { error: "Could not start the payment, please try again" },
      { status: 502 }
    )
  }
}
