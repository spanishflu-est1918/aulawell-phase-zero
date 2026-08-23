import { NextRequest, NextResponse } from "next/server"
import { fetchConsultationSlots, isConsultationConfigured } from "@/lib/booking/cal"
import { BOOKING_WINDOW_DAYS } from "@/lib/booking/config"

export const dynamic = "force-dynamic"

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

export async function GET(req: NextRequest) {
  const configured = isConsultationConfigured()
  if (!configured) {
    return NextResponse.json({ configured: false, slots: {} })
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
    return NextResponse.json({ configured: true, slots: {} })
  }

  try {
    const slots = await fetchConsultationSlots(
      new Date(startMs).toISOString(),
      new Date(endMs).toISOString()
    )
    return NextResponse.json({ configured: true, slots })
  } catch (err) {
    console.error("consultation slots route:", err)
    return NextResponse.json(
      { error: "Could not load availability" },
      { status: 502 }
    )
  }
}
