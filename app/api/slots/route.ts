import { NextRequest, NextResponse } from "next/server"
import { fetchSlots, isBookingConfigured, isTierConfigured } from "@/lib/booking/cal"
import { BOOKING_WINDOW_DAYS, CURRENCY, DEFAULT_TIER, isTutorTier } from "@/lib/booking/config"
import { hasCustomRate, isPostPayCode, unitRateFor } from "@/lib/booking/rates"
import { isStripeConfigured } from "@/lib/booking/stripe"

export const dynamic = "force-dynamic"

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

export async function GET(req: NextRequest) {
  const configured = isBookingConfigured() && isStripeConfigured()
  const rate = req.nextUrl.searchParams.get("rate")
  const tierParam = req.nextUrl.searchParams.get("tier")
  const tier = isTutorTier(tierParam) ? tierParam : DEFAULT_TIER

  const priceCents = unitRateFor(tier, rate)
  const customRate = hasCustomRate(tier, rate)
  // Post-pay (and family rates generally) only apply to Head Tutor lessons.
  const postPay = tier === "head" && isPostPayCode(rate)
  // Presencial booking stays off until the associate tutor's calendar exists.
  const tierAvailable = configured && isTierConfigured(tier)

  const base = { configured, tierAvailable, priceCents, customRate, currency: CURRENCY, postPay }

  if (!configured || !tierAvailable) {
    return NextResponse.json({ ...base, slots: {} })
  }

  const start = req.nextUrl.searchParams.get("start")
  const end = req.nextUrl.searchParams.get("end")
  if (!start || !end || !ISO_DATE.test(start) || !ISO_DATE.test(end)) {
    return NextResponse.json(
      { error: "start and end must be YYYY-MM-DD" },
      { status: 400 }
    )
  }

  // Clamp the range to [now, now + booking window].
  const now = Date.now()
  const max = now + BOOKING_WINDOW_DAYS * 24 * 60 * 60 * 1000
  const startMs = Math.max(Date.parse(`${start}T00:00:00Z`), now)
  const endMs = Math.min(Date.parse(`${end}T23:59:59Z`), max)
  if (startMs >= endMs) {
    return NextResponse.json({ ...base, slots: {} })
  }

  try {
    const slots = await fetchSlots(
      new Date(startMs).toISOString(),
      new Date(endMs).toISOString(),
      tier
    )
    return NextResponse.json({ ...base, slots })
  } catch (err) {
    console.error("slots route:", err)
    return NextResponse.json(
      { error: "Could not load availability" },
      { status: 502 }
    )
  }
}
