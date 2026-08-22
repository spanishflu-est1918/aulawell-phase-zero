import Link from "next/link"
import type { Metadata } from "next"
import { ShieldCheck, BadgeCheck, UserCheck, CalendarClock } from "lucide-react"
import { FadeIn } from "@/components/ui/fade-in"
import { Eyebrow } from "@/components/marketing/Eyebrow"
import { EducatorLevels } from "@/components/marketing/EducatorLevels"
import { ctaOnNavy, ctaOnNavyGhost } from "@/lib/ui"

export const metadata: Metadata = {
  title: "Meet the Tutors — Aulawell",
  description:
    "Every Aulawell learner is taught one-to-one by a carefully selected tutor, with Amy — our Founder and Academic Director — overseeing teaching quality and personally matching each learner to a tutor.",
}

const heroIntro =
  "Aulawell is founded and led by Amy, our Founder and Academic Director. Every learner is taught one-to-one by a carefully selected tutor, with Amy overseeing teaching quality and matching each family to the right educator."

const model = [
  "Every learner is taught one-to-one by a carefully selected Aulawell tutor, chosen for the subject, the goal and the learner.",
  "Amy, our Founder and Academic Director, oversees teaching quality and personally matches each learner to a tutor.",
  "Families may also choose to work with Amy directly as Head Tutor, from the first lesson.",
  "Amy retains final decision-making authority for tutor allocation, availability, exceptional pricing and any special requirements.",
]

const levelsIntro =
  "At checkout you choose the educator level that fits your learner and your budget. Both are delivered one-to-one and overseen by Amy."

const standards = [
  {
    icon: UserCheck,
    title: "Carefully selected educators",
    body: "Tutors are chosen for their subject expertise and their fit with the learner — never drawn from an open marketplace.",
  },
  {
    icon: ShieldCheck,
    title: "DBS-checked tutors",
    body: "Aulawell tutors are DBS-checked, so families can feel confident about who is teaching their learner.",
  },
  {
    icon: BadgeCheck,
    title: "Professional membership",
    body: "Aulawell holds membership of The Tutors' Association, reflecting a commitment to professional standards.",
  },
]

const matchingNote =
  "Purchase your package now. We will confirm your educator and send your booking link within one working day."

const closingIntro =
  "Choose to work with Amy directly, or let us match your learner to the right Aulawell tutor. Either way, the next step is simple."

export default function TutorsPage() {
  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="border-b border-navy/10 bg-cream-panel/40">
        <div className="mx-auto max-w-[1100px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <FadeIn>
            <Eyebrow>Meet the Tutors</Eyebrow>
            <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.1] tracking-tight text-navy sm:text-5xl">
              Led by Amy. Delivered by carefully selected tutors.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink">
              {heroIntro}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* The model */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-2xl">
            <Eyebrow>How our tutoring works</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl text-navy sm:text-4xl">
              A led model, not a marketplace
            </h2>
          </FadeIn>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {model.map((point, i) => (
              <FadeIn key={point} delay={i * 90}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-navy/12 bg-white p-7 shadow-sm">
                  <span className="font-serif text-2xl leading-none text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="leading-relaxed text-ink">{point}</p>
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
            <Eyebrow className="justify-center">Educator levels</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl text-navy sm:text-4xl">
              Two ways to work with us
            </h2>
            <p className="mt-4 text-ink-soft">{levelsIntro}</p>
          </FadeIn>

          <div className="mt-12">
            <EducatorLevels />
          </div>
        </div>
      </section>

      {/* Standards */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <Eyebrow className="justify-center">Standards</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl text-navy sm:text-4xl">
              Trust built into every match
            </h2>
          </FadeIn>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {standards.map((item, i) => (
              <FadeIn key={item.title} delay={i * 90}>
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

          {/* Matching note callout */}
          <FadeIn className="mt-12">
            <div className="mx-auto flex max-w-3xl items-start gap-4 rounded-2xl border border-navy/12 bg-cream-panel/40 p-7 shadow-sm">
              <CalendarClock className="mt-0.5 h-6 w-6 flex-shrink-0 text-gold-ink" />
              <div>
                <h3 className="font-serif text-lg text-navy">
                  When an Aulawell Tutor match is needed
                </h3>
                <p className="mt-2 leading-relaxed text-ink">{matchingNote}</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-navy py-16 text-white sm:py-20">
        <div className="mx-auto max-w-[900px] px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <Eyebrow onDark className="justify-center">
              Get matched
            </Eyebrow>
            <h2 className="mt-6 font-serif text-3xl sm:text-4xl">
              Ready to meet your educator?
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
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
