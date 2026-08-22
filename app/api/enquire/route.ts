import { NextRequest, NextResponse } from "next/server"
import { createLead } from "@/lib/airtable"
import { notifyOwner } from "@/lib/booking/notify"

export const dynamic = "force-dynamic"

interface EnquiryBody {
  name?: unknown
  email?: unknown
  phone?: unknown
  topic?: unknown
  stage?: unknown
  location?: unknown
  message?: unknown
}

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : ""
}

export async function POST(req: NextRequest) {
  let body: EnquiryBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const name = str(body.name)
  const email = str(body.email)
  const phone = str(body.phone)
  const topic = str(body.topic)
  const stage = str(body.stage)
  const location = str(body.location)
  const message = str(body.message)

  if (!name || !/.+@.+\..+/.test(email)) {
    return NextResponse.json(
      { error: "Please provide your name and a valid email" },
      { status: 400 }
    )
  }

  // 1) Operational source of truth (fail-soft — never blocks the enquiry).
  await createLead({ name, email, phone, topic, stage, location, message })

  // 2) Internal notification to Aulawell (Web3Forms, same channel as contact).
  const lines = [
    `New enquiry from ${name} (${email})`,
    phone ? `Phone: ${phone}` : "",
    topic ? `Enquiring about: ${topic}` : "",
    stage ? `Learner stage: ${stage}` : "",
    location ? `Location / time zone: ${location}` : "",
    "",
    message || "(no message)",
  ].filter(Boolean)
  await notifyOwner(`New Aulawell enquiry — ${topic || "General"}`, lines.join("\n"))

  return NextResponse.json({ ok: true })
}
