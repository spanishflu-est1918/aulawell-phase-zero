// Daily cron (see vercel.json): finds students/groups with exactly 1 lesson
// left in their current package and emails the parent a rebook invite, so a
// family is never surprised by lessons quietly running out.
//
// Idempotency: "Rebook Notified For Package Size" on the record is compared
// to the current Package Size — a nudge only fires once per package, and
// fires again automatically once a new package is started for the same
// student (see lib/airtable.ts listRebookCandidates/markRebookNudgeSent).

import { NextRequest, NextResponse } from "next/server"
import { listRebookCandidates, markRebookNudgeSent } from "@/lib/airtable"
import { sendParentEmail } from "@/lib/email"
import { rebookNudge } from "@/lib/email-templates"
import { notifyOwner } from "@/lib/booking/notify"

export const dynamic = "force-dynamic"
export const maxDuration = 60

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const candidates = await listRebookCandidates()
  const sent: string[] = []
  const errors: string[] = []

  for (const c of candidates) {
    const { subject, html, text } = rebookNudge({ studentGroupName: c.studentGroupName })
    const emailed = await sendParentEmail({ to: c.parentEmail, subject, html, text })

    // Only mark as notified once the email actually sent — if Resend isn't
    // configured or a send fails, leave it unmarked so the next run retries
    // instead of silently skipping this student forever.
    if (!emailed) {
      errors.push(c.studentGroupName)
      continue
    }

    const marked = await markRebookNudgeSent(c.id, c.packageSize)
    if (marked) {
      sent.push(c.studentGroupName)
    } else {
      // Sent but couldn't mark — safe to leave unmarked too (retrying just
      // resends the email next run, which is preferable to never marking).
      errors.push(c.studentGroupName)
    }
  }

  if (sent.length > 0) {
    await notifyOwner(
      "Aulawell: rebook nudges sent",
      `Sent a "1 lesson left" rebook nudge to:\n\n${sent.join("\n")}`
    )
  }
  if (errors.length > 0) {
    await notifyOwner(
      "Aulawell: rebook nudge — action needed",
      `Could not fully send a rebook nudge for:\n\n${errors.join("\n")}\n\nCheck Resend/Airtable and follow up manually.`
    )
  }

  return NextResponse.json({ ok: true, sent: sent.length, errors: errors.length })
}
