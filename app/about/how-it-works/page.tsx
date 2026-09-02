import Link from "next/link"
import type { Metadata } from "next"
import {
  FileText,
  Users,
  MapPin,
  GraduationCap,
  Handshake,
} from "lucide-react"
import { FadeIn } from "@/components/ui/fade-in"
import { Eyebrow } from "@/components/marketing/Eyebrow"
import { ctaSecondary, ctaOnNavy, ctaOnNavyGhost } from "@/lib/ui"

export const metadata: Metadata = {
  title: "How It Works — Aulawell",
  description:
    "Aulawell is product-led: choose a service, choose a package, choose your educator, and start learning. Here is the full booking journey, from first choice to first lesson.",
}

const heroIntro =
  "If you already know what your learner needs, you can choose a service and package and be booked in a few simple steps. If you're not sure yet, a free consultation gets you a recommendation first. Here is exactly how both paths work."

const steps = [
  {
    step: "01",
    title: "Choose your service",
    body: "School English, Exam & Academic English, English Qualifications, or University Applications.",
  },
  {
    step: "02",
    title: "Choose your package",
    body: "A Single Lesson Clinic, a 5-Lesson package, or 10-Lesson Term Support.",
  },
  {
    step: "03",
    title: "Choose your educator level",
    body: "An Aulawell Tutor from £35, or Head Tutor Amy from £45 — Amy still confirms the specific tutor match.",
  },
  {
    step: "04",
    title: "Secure payment",
    body: "Complete checkout securely to confirm your place.",
  },
  {
    step: "05",
    title: "Complete a short learner profile",
    body: "Tell us about the learner and the goal so we can prepare properly.",
  },
  {
    step: "06",
    title: "Educator confirmed",
    body: "If you chose Amy, you book directly into her calendar. If you chose an Aulawell Tutor, Amy confirms your tutor match and sends your booking link within one working day.",
  },
  {
    step: "07",
    title: "Lessons booked and onboarding sent",
    body: "Your lessons are scheduled and your onboarding details are on their way.",
  },
]

const enquireIntro =
  "Some support does not start at checkout. Enquire first if your situation is one of these:"

const enquireCases = [
  {
    icon: Handshake,
    title: "School or agency contracts",
    body: "Institutional arrangements that sit outside standard packages.",
  },
  {
    icon: Users,
    title: "Complex learning needs",
    body: "Where a conversation helps us plan the right support before you commit.",
  },
  {
    icon: MapPin,
    title: "In-person requests",
    body: "Face-to-face tuition that needs availability to be confirmed first.",
  },
  {
    icon: GraduationCap,
    title: "Bespoke university-application support",
    body: "Tailored programmes shaped around a specific applicant and their goals.",
  },
  {
    icon: FileText,
    title: "Partnerships",
    body: "Collaborations and longer-term arrangements we design together.",
  },
]

const reassurance =
  "All launch tuition is one-to-one. Group tuition is a future product, and we will share it when it is ready."

const closingIntro =
  "If a service and package fit your learner, you can book in minutes. If your situation is more particular, tell us about it and we will guide you."

export default function HowItWorksPage() {
  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="border-b border-navy/10 bg-cream-panel/40">
        <div className="mx-auto max-w-[1100px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <FadeIn>
            <Eyebrow>How It Works</Eyebrow>
            <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.1] tracking-tight text-navy sm:text-5xl">
              From choosing a service to the first lesson.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink">
              {heroIntro}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* The purchase journey */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <Eyebrow className="justify-center">If you&apos;re ready to book</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl text-navy sm:text-4xl">
              Seven steps to your first lesson
            </h2>
            <p className="mt-4 text-ink-soft">
              Prefer a recommendation first?{" "}
              <Link href="/consultation" className="font-medium text-navy underline underline-offset-4 hover:text-gold-ink">
                Book a free 30-minute consultation
              </Link>{" "}
              instead — no payment, no obligation.
            </p>
          </FadeIn>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((item, i) => (
              <FadeIn key={item.step} delay={i * 70}>
                <div className="flex h-full flex-col rounded-2xl border border-navy/12 bg-white p-7 shadow-sm">
                  <span className="font-serif text-3xl text-gold">
                    {item.step}
                  </span>
                  <h3 className="mt-3 font-serif text-lg text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {item.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-10">
            <p className="mx-auto max-w-2xl rounded-xl border border-navy/10 bg-cream-panel/40 px-5 py-4 text-center text-sm leading-relaxed text-ink-soft">
              {reassurance}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* When to enquire instead */}
      <section className="bg-cream-panel/40 py-16 sm:py-20">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <Eyebrow className="justify-center">When to enquire instead</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl text-navy sm:text-4xl">
              Some support starts with a conversation
            </h2>
            <p className="mt-4 text-ink-soft">{enquireIntro}</p>
          </FadeIn>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {enquireCases.map((item, i) => (
              <FadeIn key={item.title} delay={i * 80}>
                <div className="flex h-full flex-col rounded-2xl border border-navy/12 bg-white p-7 shadow-sm">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cream-panel">
                    <item.icon className="h-5 w-5 text-gold-ink" />
                  </div>
                  <h3 className="mt-4 font-serif text-lg text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {item.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-10 text-center">
            <Link href="/enquire" className={ctaSecondary}>
              Enquire
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-navy py-16 text-white sm:py-20">
        <div className="mx-auto max-w-[900px] px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <Eyebrow onDark className="justify-center">
              Get started
            </Eyebrow>
            <h2 className="mt-6 font-serif text-3xl sm:text-4xl">
              Ready when you are
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/75">
              {closingIntro}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/book" className={ctaOnNavy}>
                Book English Support
              </Link>
              <Link href="/enquire" className={ctaOnNavyGhost}>
                Enquire
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/75">
              Not sure which package or tier fits?{" "}
              <Link href="/consultation" className="font-medium text-white underline underline-offset-4 hover:text-gold">
                Book a free 30-minute consultation
              </Link>
              .
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
