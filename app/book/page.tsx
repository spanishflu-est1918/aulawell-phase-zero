import { Suspense } from "react"
import Link from "next/link"
import type { Metadata } from "next"
import BookingCalendar from "@/components/booking/BookingCalendar"
import { FadeIn } from "@/components/ui/fade-in"
import { Eyebrow } from "@/components/marketing/Eyebrow"
import { EducatorLevels } from "@/components/marketing/EducatorLevels"
import { ctaSecondary } from "@/lib/ui"

export const metadata: Metadata = {
  title: "Book English Support | Aulawell",
  description:
    "Book bespoke one-to-one English tuition. Choose your service and package, pick your educator, and secure your place. Online worldwide or in person in Madrid and Lisbon.",
}

const steps = [
  { step: "01", title: "Choose your service", body: "School English, exams, English qualifications or university applications." },
  { step: "02", title: "Choose your package", body: "A single lesson, a 5-lesson boost or 10-lesson term support." },
  { step: "03", title: "Choose your educator", body: "An Aulawell Tutor, or Head Tutor Amy directly." },
  { step: "04", title: "Secure your place", body: "Pay securely and complete a short learner profile." },
  { step: "05", title: "Start learning", body: "Book your lessons and begin — online or in person." },
]

export default function BookPage() {
  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="border-b border-navy/10 bg-cream-panel/40">
        <div className="mx-auto max-w-[1100px] px-4 py-14 text-center sm:px-6 lg:px-8 lg:py-16">
          <FadeIn>
            <Eyebrow className="justify-center">Book English Support</Eyebrow>
            <h1 className="mx-auto mt-6 max-w-3xl font-serif text-4xl leading-[1.1] tracking-tight text-navy sm:text-5xl">
              Bespoke one-to-one English support, booked around your goals
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink">
              Choose your service and package, pick your educator, and secure your
              place. Online worldwide, or in person in Madrid and Lisbon.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Steps */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((item, i) => (
              <FadeIn key={item.step} delay={i * 70}>
                <div className="flex h-full flex-col rounded-2xl border border-navy/10 bg-white p-5 shadow-sm">
                  <span className="font-serif text-2xl text-gold">{item.step}</span>
                  <h3 className="mt-2 font-serif text-base text-navy">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Educator levels */}
      <section className="bg-cream-panel/40 py-16 sm:py-20">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <Eyebrow className="justify-center">Choose your educator</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl text-navy sm:text-4xl">
              Work with an Aulawell Tutor, or with Amy directly
            </h2>
          </FadeIn>
          <div className="mt-12">
            <EducatorLevels />
          </div>
          <FadeIn className="mx-auto mt-8 max-w-2xl rounded-xl border border-navy/12 bg-white px-6 py-5 text-center shadow-sm">
            <p className="text-sm leading-relaxed text-ink">
              Where an Aulawell Tutor match is needed: purchase your package now, and
              we&apos;ll confirm your educator and send your booking link within one
              working day. Amy retains final decision-making for tutor allocation,
              availability and special requirements.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Booking calendar */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <Eyebrow className="justify-center">Secure booking</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl text-navy sm:text-4xl">
              Pick your lessons
            </h2>
            <p className="mt-4 text-ink-soft">
              Choose your dates and pay securely. Final package options and Head
              Tutor appointments are confirmed transparently at checkout.
            </p>
          </FadeIn>

          <div className="mt-12">
            <FadeIn>
              <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-white/60" />}>
                <BookingCalendar />
              </Suspense>
            </FadeIn>
          </div>

          <p className="mt-10 text-center text-ink-soft">
            Need bespoke support, in-person confirmation or a partnership?{" "}
            <Link href="/enquire" className="font-medium text-navy underline underline-offset-4 hover:text-gold-ink">
              Send an enquiry
            </Link>{" "}
            and we&apos;ll reply within one working day.
          </p>

          <div className="mt-8 text-center">
            <Link href="/services" className={ctaSecondary}>
              Browse services first
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
