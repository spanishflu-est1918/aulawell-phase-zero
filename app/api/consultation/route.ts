import { NextRequest, NextResponse } from "next/server"
import { createConsultationBooking, fetchConsultationSlots, isConsultationConfigured } from "@/lib/booking/cal"
import { describeSlot, notifyOwner } from "@/lib/booking/notify"
import { createLead } from "@/lib/airtable"

export const dynamic = "force-dynamic"

interface ConsultationBody {
  slot?: unknown
  name?: unknown
  email?: unknown
  phone?: unknown
  stage?: unknown
  topic?: unknown
}

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : ""
}

export async function POST(req: NextRequest) {
  if (!isConsultationConfigured()) {
    return NextResponse.json(
      { error: "Consultation booking is not available yet" },
      { status: 503 }
    )
  }

  let body: ConsultationBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const name = str(body.name)
  const email = str(body.email)
  const phone = str(body.phone)
  const stage = str(body.stage)
  const topic = str(body.topic)
  const slot = str(body.slot)

  if (!name || !/.+@.+\..+/.test(email)) {
    return NextResponse.json(
      { error: "Please provide your name and a valid email" },
      { status: 400 }
    )
  }
  const slotMs = Date.parse(slot)
  if (!slot || Number.isNaN(slotMs) || slotMs < Date.now()) {
    return NextResponse.json(
      { error: "Please choose a valid time" },
      { status: 400 }
    )
  }

  // Re-verify the slot is still open right now, same pattern as paid
  // checkout — a free booking is just as capable of double-booking a slot
  // two people picked at once.
  try {
    const rangeStart = new Date(slotMs - 60_000).toISOString()
    const rangeEnd = new Date(slotMs + 31 * 60_000).toISOString()
    const open = await fetchConsultationSlots(rangeStart, rangeEnd)
    const openSet = new Set(Object.values(open).flat().map((t) => Date.parse(t)))
    if (!openSet.has(slotMs)) {
      return NextResponse.json(
        { error: "Sorry, that time was just booked by someone else. Please refresh and pick again." },
        { status: 409 }
      )
    }
  } catch (err) {
    console.error("consultation availability check:", err)
    return NextResponse.json(
      { error: "Could not verify availability, please try again" },
      { status: 502 }
    )
  }

  const slotUtc = new Date(slotMs).toISOString().replace(".000Z", "Z")
  const result = await createConsultationBooking(slotUtc, { name, email }, {
    booking_source: "aulawell.co",
    learner_stage: stage,
    topic,
  })

  if (!result.ok) {
    return NextResponse.json(
      { error: "Sorry, that time was just booked by someone else. Please refresh and pick again." },
      { status: 409 }
    )
  }

  // Consultations sit in the same pipeline as enquiries, with their own
  // source so they can be told apart.
  await createLead({
    name,
    email,
    phone,
    topic: topic || "Consultation",
    stage,
    message: `Free 30-minute consultation booked for ${describeSlot(slotUtc)}.`,
    source: "Consultation booking",
  })

  await notifyOwner(
    "Aulawell: consultation booked",
    [
      `${name} (${email}) booked a free consultation for ${describeSlot(slotUtc)}.`,
      phone ? `WhatsApp: ${phone}` : "",
      stage ? `Learner stage: ${stage}` : "",
      "",
      topic || "(no topic given)",
    ]
      .filter(Boolean)
      .join("\n")
  )

  return NextResponse.json({ ok: true })
}
