import Link from "next/link"
import type { Metadata } from "next"
import { CheckCircle } from "lucide-react"
import { BOOKING_TIMEZONE, formatPrice } from "@/lib/booking/config"
import { getStripe, isStripeClientConfigured } from "@/lib/booking/stripe"
import { FadeIn } from "@/components/ui/fade-in"
import { ctaPrimary } from "@/lib/ui"

export const metadata: Metadata = {
  title: "Booking Confirmed | Aulawell Tuition",
  robots: { index: false },
}

function describeSlot(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: BOOKING_TIMEZONE,
  }).format(new Date(iso))
}

export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; mode?: string; slots?: string; failed?: string }>
}) {
  const { session_id: sessionId, mode, slots, failed } = await searchParams

  // Post-pay families: lessons are already booked on Cal.com with no payment
  // taken. The slot list here is display-only.
  if (mode === "postpay") {
    const lessons = (slots ?? "")
      .split(",")
      .filter((s) => s && !Number.isNaN(Date.parse(s)))
    const failedCount = Number(failed) || 0
    return (
      <div className="bg-cream">
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <FadeIn>
              <CheckCircle className="mx-auto h-14 w-14 text-gold" />
              <h1 className="mt-6 font-serif text-4xl text-navy sm:text-5xl">
                Lessons booked
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-ink">
                Your lessons are confirmed &mdash; calendar invitations will arrive by
                email shortly. No payment is needed today: after each lesson you&apos;ll
                receive an invoice by email with a secure online payment link.
              </p>
              {lessons.length > 0 && (
                <ul className="mx-auto mt-8 max-w-md space-y-2 text-left">
                  {lessons.map((iso) => (
                    <li
                      key={iso}
                      className="rounded-lg border border-navy/12 bg-white px-4 py-3 text-ink shadow-sm"
                    >
                      {describeSlot(iso)}
                      <span className="ml-2 text-xs text-ink-soft">(Madrid time)</span>
                    </li>
                  ))}
                </ul>
              )}
              {failedCount > 0 && (
                <p className="mx-auto mt-8 max-w-md rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                  {failedCount} of your chosen time{failedCount > 1 ? "s were" : " was"} no
                  longer available and {failedCount > 1 ? "were" : "was"} not booked &mdash;
                  please pick {failedCount > 1 ? "replacements" : "a replacement"} from the{" "}
                  <Link href="/book" className="underline underline-offset-4">
                    calendar
                  </Link>
                  .
                </p>
              )}
              <Link href="/" className={`${ctaPrimary} mt-10`}>
                Back to home
              </Link>
            </FadeIn>
          </div>
        </section>
      </div>
    )
  }

  let lessons: string[] = []
  let amount: number | null = null
  let paid = false
  if (sessionId && isStripeClientConfigured()) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(sessionId)
      paid = session.payment_status === "paid"
      amount = session.amount_total
      lessons = (session.metadata?.slots ?? "").split(",").filter(Boolean)
    } catch {
      paid = false
    }
  }

  return (
    <div className="bg-cream">
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <CheckCircle className="mx-auto h-14 w-14 text-gold" />
            <h1 className="mt-6 font-serif text-4xl text-navy sm:text-5xl">
              {paid ? "Payment received" : "Thank you!"}
            </h1>
            {paid ? (
              <>
                <p className="mt-6 text-lg leading-relaxed text-ink">
                  Your payment{amount ? ` of ${formatPrice(amount)}` : ""} was successful.
                  We&apos;re confirming the selected times now; calendar invitations will
                  arrive by email shortly.
                </p>
                {lessons.length > 0 && (
                  <ul className="mx-auto mt-8 max-w-md space-y-2 text-left">
                    {lessons.map((iso) => (
                      <li
                        key={iso}
                        className="rounded-lg border border-navy/12 bg-white px-4 py-3 text-ink shadow-sm"
                      >
                        {describeSlot(iso)}
                        <span className="ml-2 text-xs text-ink-soft">(Madrid time)</span>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <p className="mt-6 text-lg leading-relaxed text-ink">
                We couldn&apos;t confirm this payment session. If you completed a payment,
                you&apos;ll still receive your confirmation email shortly &mdash; or{" "}
                <Link href="/enquire" className="text-navy underline underline-offset-4 hover:text-gold-ink">
                  contact us
                </Link>{" "}
                and we&apos;ll sort it out.
              </p>
            )}
            <Link href="/" className={`${ctaPrimary} mt-10`}>
              Back to home
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
