import Link from "next/link"
import type { Metadata } from "next"
import { CheckCircle } from "lucide-react"
import { BOOKING_TIMEZONE, formatPrice } from "@/lib/booking/config"
import { getStripe, isStripeClientConfigured } from "@/lib/booking/stripe"
import { Button } from "@/components/ui/button"

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
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id: sessionId } = await searchParams

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
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-slate-50 to-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="mx-auto mb-6 h-14 w-14 text-gold" />
            <h1 className="text-4xl font-bold text-navy mb-4 font-serif">
              {paid ? "Payment received" : "Thank you!"}
            </h1>
            {paid ? (
              <>
                <p className="text-xl text-slate-600 mb-8">
                  Your payment{amount ? ` of ${formatPrice(amount)}` : ""} was successful.
                  We&apos;re confirming the selected times now; calendar invitations will
                  arrive by email shortly.
                </p>
                {lessons.length > 0 && (
                  <ul className="mx-auto mb-10 max-w-md space-y-2 text-left">
                    {lessons.map((iso) => (
                      <li
                        key={iso}
                        className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-700"
                      >
                        {describeSlot(iso)}
                        <span className="ml-2 text-xs text-slate-400">(Madrid time)</span>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <p className="text-xl text-slate-600 mb-8">
                We couldn&apos;t confirm this payment session. If you completed a payment,
                you&apos;ll still receive your confirmation email shortly &mdash; or{" "}
                <Link href="/contact" className="text-navy underline underline-offset-4 hover:text-gold transition-colors">
                  contact us
                </Link>{" "}
                and we&apos;ll sort it out.
              </p>
            )}
            <Button asChild>
              <Link href="/">Back to home</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
