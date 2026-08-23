import { emailShell } from "./email"
import { CONTACT_INFO } from "./constants"

const waLink = `https://wa.me/${CONTACT_INFO.WHATSAPP_NUMBER}`

// ---------------------------------------------------------------------------
// Enquiry acknowledgement — sent the moment a parent submits /enquire, so
// silence never loses someone waiting to hear back (audit Phase 6).
// ---------------------------------------------------------------------------
export function enquiryAcknowledgement(name: string): { subject: string; html: string; text: string } {
  const firstName = name.split(" ")[0] || name
  const subject = "We've received your enquiry — Aulawell"
  const html = emailShell(`
    <p style="margin:0 0 16px;">Hi ${firstName},</p>
    <p style="margin:0 0 16px;">Thank you for getting in touch with Aulawell. We've received your enquiry and Amy will reply personally, usually within one working day.</p>
    <p style="margin:0 0 16px;">If it's urgent in the meantime, you're welcome to message us directly:</p>
    <p style="margin:0 0 4px;"><a href="${waLink}" style="color:#13283f;font-weight:600;">Message on WhatsApp</a></p>
    <p style="margin:0;"><a href="mailto:${CONTACT_INFO.EMAIL}" style="color:#13283f;font-weight:600;">${CONTACT_INFO.EMAIL}</a></p>
  `)
  const text = `Hi ${firstName},\n\nThank you for getting in touch with Aulawell. We've received your enquiry and Amy will reply personally, usually within one working day.\n\nIf it's urgent in the meantime: WhatsApp ${waLink} or email ${CONTACT_INFO.EMAIL}.`
  return { subject, html, text }
}

// ---------------------------------------------------------------------------
// Consultation booking confirmation.
// ---------------------------------------------------------------------------
export function consultationConfirmation(input: {
  name: string
  whenLabel: string
}): { subject: string; html: string; text: string } {
  const firstName = input.name.split(" ")[0] || input.name
  const subject = "Your Aulawell consultation is confirmed"
  const html = emailShell(`
    <p style="margin:0 0 16px;">Hi ${firstName},</p>
    <p style="margin:0 0 16px;">Your free 30-minute consultation with Aulawell is confirmed for:</p>
    <p style="margin:0 0 16px;padding:14px 18px;background-color:#f7f3eb;border-radius:10px;font-weight:600;color:#13283f;">${input.whenLabel} (Madrid time)</p>
    <p style="margin:0 0 16px;">Cal.com has sent a separate calendar invite with the joining details — please check your inbox (and spam folder) for that too.</p>
    <p style="margin:0 0 16px;">Need to reschedule, or have anything to add before we speak? Just reply to this email or message us on WhatsApp.</p>
    <p style="margin:0;"><a href="${waLink}" style="color:#13283f;font-weight:600;">Message on WhatsApp</a></p>
  `)
  const text = `Hi ${firstName},\n\nYour free 30-minute consultation with Aulawell is confirmed for ${input.whenLabel} (Madrid time).\n\nCal.com has sent a separate calendar invite with the joining details.\n\nNeed to reschedule? Reply to this email or WhatsApp us: ${waLink}`
  return { subject, html, text }
}

// ---------------------------------------------------------------------------
// Paid lesson booking confirmation.
// ---------------------------------------------------------------------------
export function bookingConfirmation(input: {
  name: string
  educatorLabel: string
  amountLabel: string
  lessonLines: string[]
}): { subject: string; html: string; text: string } {
  const firstName = input.name.split(" ")[0] || input.name
  const plural = input.lessonLines.length > 1
  const subject = `Your Aulawell lesson${plural ? "s are" : " is"} confirmed`
  const lessonListHtml = input.lessonLines
    .map((l) => `<li style="margin-bottom:6px;">${l}</li>`)
    .join("")
  const html = emailShell(`
    <p style="margin:0 0 16px;">Hi ${firstName},</p>
    <p style="margin:0 0 16px;">Thank you — your booking is confirmed with ${input.educatorLabel}.</p>
    <ul style="margin:0 0 16px;padding-left:20px;color:#13283f;">${lessonListHtml}</ul>
    <p style="margin:0 0 16px;">Amount paid: <strong>${input.amountLabel}</strong></p>
    <p style="margin:0 0 16px;">Cal.com has sent a separate calendar invite for each lesson with the joining details — please check your inbox (and spam folder).</p>
    <p style="margin:0 0 16px;">Need to reschedule or have a question before your first lesson? Just reply to this email or message us on WhatsApp.</p>
    <p style="margin:0;"><a href="${waLink}" style="color:#13283f;font-weight:600;">Message on WhatsApp</a></p>
  `)
  const text = `Hi ${firstName},\n\nThank you — your booking is confirmed with ${input.educatorLabel}.\n\n${input.lessonLines.join("\n")}\n\nAmount paid: ${input.amountLabel}\n\nCal.com has sent a separate calendar invite for each lesson with the joining details.\n\nNeed to reschedule? Reply to this email or WhatsApp us: ${waLink}`
  return { subject, html, text }
}

// ---------------------------------------------------------------------------
// Rebook nudge — sent when a student/group has exactly 1 lesson left in
// their current package, to invite booking the next one before it runs out.
// ---------------------------------------------------------------------------
export function rebookNudge(input: {
  studentGroupName: string
}): { subject: string; html: string; text: string } {
  const subject = `Just one lesson left — book ${input.studentGroupName}'s next package`
  const html = emailShell(`
    <p style="margin:0 0 16px;">Hi there,</p>
    <p style="margin:0 0 16px;">Just a heads up — ${input.studentGroupName} has <strong>one lesson remaining</strong> in their current package with Aulawell.</p>
    <p style="margin:0 0 16px;">To keep lessons running without a gap, let us know if you'd like to book the next package. You can reply to this email or message us directly and we'll get it sorted.</p>
    <p style="margin:0;"><a href="${waLink}" style="color:#13283f;font-weight:600;">Message on WhatsApp</a></p>
  `)
  const text = `Hi there,\n\nJust a heads up — ${input.studentGroupName} has one lesson remaining in their current package with Aulawell.\n\nTo keep lessons running without a gap, let us know if you'd like to book the next package — reply to this email or WhatsApp us: ${waLink}`
  return { subject, html, text }
}
