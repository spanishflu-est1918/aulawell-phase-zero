import { Suspense } from "react"
import type { Metadata } from "next"
import { Eyebrow } from "@/components/marketing/Eyebrow"
import { FadeIn } from "@/components/ui/fade-in"
import ConsultationCalendar from "@/components/booking/ConsultationCalendar"

export const metadata: Metadata = {
  title: "Book a Free Consultation | Aulawell",
  description:
    "Book a free 30-minute consultation to talk through your learner's goals and find the right English support — no payment, no obligation.",
}

export default function ConsultationPage() {
  return (
    <div className="bg-cream">
      <section className="border-b border-navy/10 bg-cream-panel/40">
        <div className="mx-auto max-w-[1100px] px-4 py-14 text-center sm:px-6 lg:px-8 lg:py-16">
          <FadeIn>
            <Eyebrow className="justify-center">Free Consultation</Eyebrow>
            <h1 className="mx-auto mt-6 max-w-2xl font-serif text-4xl leading-[1.1] tracking-tight text-navy sm:text-5xl">
              Let&apos;s talk through what would help
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink">
              A free, no-obligation 30-minute conversation about your
              learner&apos;s goals — so we can point you to the right service
              and package before you book anything.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-white/60" />}>
              <ConsultationCalendar />
            </Suspense>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
