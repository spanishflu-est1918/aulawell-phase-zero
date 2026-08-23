import { NextRequest, NextResponse } from "next/server"
import {
  findTutorIdByName,
  findStudentGroupIdByName,
  normalizeLessonStatus,
  createLessonRecord,
} from "@/lib/airtable"
import { notifyOwner } from "@/lib/booking/notify"

export const dynamic = "force-dynamic"

// Called by the Google Apps Script bound to the "Tutor Lesson Log" form's
// response sheet, once per submission. Protected by a shared secret (not
// Google auth) since Apps Script calls this as a plain server-to-server
// request — see docs/LESSON-COMPLETION-SETUP.md for the Apps Script itself.
interface LessonCompletionBody {
  secret?: unknown
  tutor?: unknown
  studentGroup?: unknown
  lessonDate?: unknown
  status?: unknown
  durationMinutes?: unknown
}

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : ""
}

export async function POST(req: NextRequest) {
  const expectedSecret = process.env.LESSON_COMPLETION_WEBHOOK_SECRET
  if (!expectedSecret) {
    console.error("[lesson-completion] LESSON_COMPLETION_WEBHOOK_SECRET not set")
    return NextResponse.json({ error: "Not configured" }, { status: 503 })
  }

  let body: LessonCompletionBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  if (str(body.secret) !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const tutorName = str(body.tutor)
  const studentGroupName = str(body.studentGroup)
  const lessonDate = str(body.lessonDate)
  const rawStatus = str(body.status)
  const durationMinutes = str(body.durationMinutes)

  if (!tutorName || !studentGroupName || !lessonDate || !rawStatus) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const [tutorId, studentGroupId] = await Promise.all([
    findTutorIdByName(tutorName),
    findStudentGroupIdByName(studentGroupName),
  ])

  // A tutor or student name that doesn't match Airtable exactly (typo, new
  // person not added yet) must never be silently dropped — flag it for Amy.
  if (!tutorId || !studentGroupId) {
    const problems = [
      !tutorId ? `Tutor "${tutorName}" not found in Airtable Tutors.` : "",
      !studentGroupId ? `Student/Group "${studentGroupName}" not found in Airtable Students & Groups.` : "",
    ].filter(Boolean)
    await notifyOwner(
      "Aulawell: lesson log could not be recorded — action needed",
      [
        "A tutor submitted the Lesson Log form, but it couldn't be matched to Airtable:",
        "",
        ...problems,
        "",
        `Tutor: ${tutorName}`,
        `Student/Group: ${studentGroupName}`,
        `Date: ${lessonDate}`,
        `Status: ${rawStatus}`,
        "",
        "Please add the missing record (or fix the name) and re-enter this lesson manually.",
      ].join("\n")
    )
    return NextResponse.json({ error: "Could not match tutor or student/group" }, { status: 422 })
  }

  const status = normalizeLessonStatus(rawStatus)
  const recordId = await createLessonRecord({
    tutorId,
    studentGroupId,
    lessonDate,
    status,
    durationMinutes,
  })

  if (!recordId) {
    await notifyOwner(
      "Aulawell: lesson log write failed — action needed",
      `Matched ${tutorName} / ${studentGroupName} but the Airtable write itself failed. Please enter this lesson (${lessonDate}, ${rawStatus}) manually.`
    )
    return NextResponse.json({ error: "Airtable write failed" }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
