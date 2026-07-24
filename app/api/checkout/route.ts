import { NextRequest, NextResponse } from "next/server"
import { fetchSlots, isBookingConfigured } from "@/lib/booking/cal"
import {
  CURRENCY,
  LESSON_DURATION_MINUTES,
  LESSON_NAME,
  MAX_LESSONS_PER_CHECKOUT,
} from "@/lib/booking/config"
import { rateForCode } from "@/lib/booking/rates"
import { getStripe, isStripeConfigured } from "@/lib/booking/stripe"

export const dynamic = "force-dynamic"

interface CheckoutBody {
  slots?: unknown
  name?: unknown
  email?: unknown
  rate?: unknown
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
  const slots = Array.isArray(body.slots)
    ? body.slots.filter((s): s is string => typeof s === "string")
    : []

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
    const open = await fetchSlots(rangeStart, rangeEnd)
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

  const unitAmount = rateForCode(rateCode)
  const origin = req.nextUrl.origin
  const slotsUtc = wanted
    .sort((a, b) => a - b)
    .map((ms) => new Date(ms).toISOString().replace(".000Z", "Z"))

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
            product_data: { name: LESSON_NAME },
          },
        },
      ],
      metadata: {
        slots: slotsUtc.join(","),
        student_name: name,
        student_email: email,
        rate_code: rateCode ?? "",
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
