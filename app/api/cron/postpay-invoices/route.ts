// Daily cron (see vercel.json): finds post-pay lessons that have already
// taken place and emails each family a Stripe invoice with a payment link.
// Stripe then handles the hosted payment page and unpaid-invoice reminders,
// so no manual invoicing is ever needed.
//
// Idempotency: each invoice stores the Cal.com booking uid in its metadata
// and is looked up before creating a new one; creates also carry per-uid
// idempotency keys as a second guard.

import { NextRequest, NextResponse } from "next/server"
import { fetchPastBookings, isBookingConfigured } from "@/lib/booking/cal"
import { CURRENCY, LESSON_NAME } from "@/lib/booking/config"
import { describeSlot, notifyOwner } from "@/lib/booking/notify"
import { unitRateFor } from "@/lib/booking/rates"
import { getStripe, isStripeClientConfigured } from "@/lib/booking/stripe"

export const dynamic = "force-dynamic"
export const maxDuration = 60

// How far back to look for uninvoiced lessons. Generous so a few failed cron
// runs never cause a lesson to slip through uninvoiced.
const LOOKBACK_DAYS = 14

const INVOICE_DUE_DAYS = 7

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  if (!isBookingConfigured() || !isStripeClientConfigured()) {
    return NextResponse.json({ error: "Booking not configured" }, { status: 503 })
  }

  const stripe = getStripe()
  const now = Date.now()
  const afterStart = new Date(now - LOOKBACK_DAYS * 24 * 60 * 60 * 1000).toISOString()

  let bookings
  try {
    bookings = await fetchPastBookings(afterStart)
  } catch (err) {
    console.error("postpay-invoices: could not list bookings", err)
    return NextResponse.json({ error: "Cal.com unavailable" }, { status: 502 })
  }

  const due = bookings.filter(
    (b) =>
      b.metadata?.postPay === "true" &&
      b.status !== "cancelled" &&
      b.uid &&
      !Number.isNaN(Date.parse(b.end)) &&
      Date.parse(b.end) <= now
  )

  const sent: string[] = []
  const errors: string[] = []

  for (const booking of due) {
    const uid = booking.uid
    try {
      const existing = await stripe.invoices.search({
        query: `metadata['cal_booking_uid']:'${uid}'`,
        limit: 1,
      })
      if (existing.data.length > 0) continue

      const attendee = booking.attendees?.[0]
      const email = attendee?.email
      if (!email) {
        errors.push(`${uid}: booking has no attendee email`)
        continue
      }

      const metaCents = Number(booking.metadata?.priceCents)
      const amount =
        Number.isFinite(metaCents) && metaCents > 0
          ? Math.round(metaCents)
          : unitRateFor("head", booking.metadata?.rateCode)

      const found = await stripe.customers.list({ email, limit: 1 })
      const customer =
        found.data[0] ??
        (await stripe.customers.create(
          { email, name: attendee?.name },
          { idempotencyKey: `postpay-customer-${uid}` }
        ))

      const invoice = await stripe.invoices.create(
        {
          customer: customer.id,
          collection_method: "send_invoice",
          days_until_due: INVOICE_DUE_DAYS,
          auto_advance: false,
          metadata: {
            cal_booking_uid: uid,
            lesson_start: booking.start,
            rate_code: booking.metadata?.rateCode ?? "",
          },
        },
        { idempotencyKey: `postpay-invoice-${uid}` }
      )
      await stripe.invoiceItems.create(
        {
          customer: customer.id,
          invoice: invoice.id,
          amount,
          currency: CURRENCY,
          description: `${LESSON_NAME} — ${describeSlot(booking.start)}`,
        },
        { idempotencyKey: `postpay-item-${uid}` }
      )
      await stripe.invoices.finalizeInvoice(invoice.id)
      // Emails the family the invoice with Stripe's hosted payment link.
      await stripe.invoices.sendInvoice(invoice.id)

      sent.push(`${attendee?.name ?? email} (${email}) — ${describeSlot(booking.start)}`)
    } catch (err) {
      console.error(`postpay-invoices: failed for booking ${uid}`, err)
      errors.push(`${uid}: ${err instanceof Error ? err.message : "unknown error"}`)
    }
  }

  if (sent.length > 0 || errors.length > 0) {
    const lines = []
    if (sent.length > 0) {
      lines.push(`Invoices emailed for ${sent.length} completed lesson(s):`)
      lines.push(...sent.map((s) => `  - ${s}`))
    }
    if (errors.length > 0) {
      lines.push("", "ATTENTION: some lessons could not be invoiced:")
      lines.push(...errors.map((e) => `  - ${e}`))
    }
    await notifyOwner(
      errors.length > 0
        ? "Aulawell invoicing: action needed"
        : "Aulawell: lesson invoices sent",
      lines.join("\n")
    )
  }

  return NextResponse.json({ checked: due.length, sent: sent.length, errors })
}
