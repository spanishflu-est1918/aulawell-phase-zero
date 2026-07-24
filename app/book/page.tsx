import { Suspense } from "react"
import Link from "next/link"
import type { Metadata } from "next"
import { CalendarCheck, MessageSquare, CreditCard } from "lucide-react"
import BookingCalendar from "@/components/booking/BookingCalendar"
import { FadeIn } from "@/components/ui/fade-in"

export const metadata: Metadata = {
  title: "Book a Lesson | Aulawell Tuition",
  description:
    "Choose your lesson dates on our calendar and pay securely per lesson. Expert English tutoring for international students.",
}

const steps = [
  {
    icon: MessageSquare,
    title: "1. Send an enquiry",
    text: "New to Aulawell? Contact us first so we can understand your goals and agree your personal rate.",
  },
  {
    icon: CalendarCheck,
    title: "2. Pick your dates",
    text: "Choose as many lesson slots as you like on the calendar — book a single lesson or a whole month at once.",
  },
  {
    icon: CreditCard,
    title: "3. Pay per lesson",
    text: "One secure Stripe payment sized by the number of lessons you booked. Confirmations arrive by email.",
  },
]

export default function BookPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-navy mb-4 font-serif">
              Book Your Lessons
            </h1>
            <p className="text-xl text-slate-600">
              Choose your dates &mdash; payment is taken securely per lesson when you book
            </p>
          </div>
        </div>
      </section>

      {/* Calendar */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-slate-100" />}>
                <BookingCalendar />
              </Suspense>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navy font-serif mb-4">How booking works</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <FadeIn key={step.title} delay={i * 100}>
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-navy">
                      <step.icon className="h-6 w-6 text-gold" />
                    </div>
                    <h3 className="mb-2 font-semibold text-navy">{step.title}</h3>
                    <p className="text-sm text-slate-600">{step.text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
            <p className="mt-12 text-center text-slate-600">
              First time here?{" "}
              <Link
                href="/contact"
                className="font-medium text-navy underline underline-offset-4 transition-colors hover:text-gold"
              >
                Send us an enquiry
              </Link>{" "}
              and we&apos;ll reply within 24 hours with your personal booking link.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
