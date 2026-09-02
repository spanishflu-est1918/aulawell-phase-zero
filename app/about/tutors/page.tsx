import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { ShieldCheck, BadgeCheck, UserCheck, CalendarClock } from "lucide-react"
import { FadeIn } from "@/components/ui/fade-in"
import { Eyebrow } from "@/components/marketing/Eyebrow"
import { EducatorLevels } from "@/components/marketing/EducatorLevels"
import { TeamGrid } from "@/components/marketing/TeamGrid"
import { ENGLISH_TUTORS, UNIVERSITY_SPECIALISTS } from "@/lib/team-content"
import { ctaOnNavy, ctaOnNavyGhost } from "@/lib/ui"

export const metadata: Metadata = {
  title: "Meet the Tutors — Aulawell",
  description:
    "Every Aulawell learner is taught one-to-one by a carefully selected tutor, with Amy — our Founder and Academic Director — overseeing teaching quality and personally matching each learner to a tutor.",
}


const processSteps = [
  {
    title: "Tell us what you need",
    body: "Get in touch with the course or support you're looking for, from ongoing academic support to exam preparation.",
  },
  {
    title: "We recommend the right fit",
    body: "We'll consult with you on the right tutor, package and next steps based on your learner's needs and goals.",
  },
  {
    title: "Book your package",
    body: "Choose the recommended package and confirm your place.",
  },
  {
    title: "Lessons commence",
    body: "Your learner begins working one-to-one with their Aulawell tutor, with progress monitored throughout.",
  },
  {
    title: "Stay informed",
    body: "Parents receive clear feedback on progress, priorities and next steps throughout the tutoring journey.",
  },
]


const amyStats = [
  { value: "100%", label: "of students achieved A–C grades" },
  { value: "72%", label: "achieved A–A*" },
]

const amyCredentials = [
  "BA English Literature, University of Manchester",
  "CELTA",
  "Teacher training qualified",
]

const amyPlacements = [
  "St Paul's",
  "Harrow",
  "Oxford",
  "Cambridge",
  "Princeton",
  "Penn",
  "Duke",
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
        <div className="mx-auto grid max-w-[1100px] items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-20">
          <FadeIn>
            <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] rounded-tr-[5rem] shadow-xl shadow-navy/15">
              <Image
                src="/amy-tutor.jpeg"
                alt="Amy, Aulawell's Founder and Academic Director"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <Eyebrow>Meet the Tutors</Eyebrow>
            <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.1] tracking-tight text-navy sm:text-5xl">
              Led by Amy. Delivered by carefully selected tutors.
            </h1>
            <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-ink">
              <p>
                <strong className="font-semibold text-navy">
                  Aulawell is founded and led by Amy, our Founder and Academic Director.
                </strong>
              </p>
              <p>
                Every learner is matched with a carefully selected Aulawell
                tutor, with Amy overseeing tutor selection, teaching quality
                and the right fit for each learner.
              </p>
              <p>
                Our tutors go beyond academic support, combining{" "}
                <strong className="font-semibold text-navy">
                  mentoring and coaching, exam-focused progress and clear
                  communication with parents
                </strong>
                .
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Meet Amy */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <FadeIn>
              <Eyebrow>Meet Amy</Eyebrow>
              <h2 className="mt-5 font-serif text-3xl text-navy sm:text-4xl">
                10+ years shaping English education, worldwide
              </h2>
              <div className="mt-6 space-y-4 leading-relaxed text-ink">
                <p>
                  Amy is the Founder and Academic Director of Aulawell, with{" "}
                  <strong className="font-semibold text-navy">
                    10+ years of experience in English education
                  </strong>{" "}
                  and an international perspective shaped by growing up
                  across{" "}
                  <strong className="font-semibold text-navy">
                    South America and the UK
                  </strong>
                  .
                </p>
                <p>
                  A Manchester English Literature graduate and qualified
                  teacher, Amy has taught students across a wide range of
                  abilities, from{" "}
                  <strong className="font-semibold text-navy">
                    gifted and talented learners to students with dyslexia
                    and ADHD
                  </strong>
                  .
                </p>
                <p>
                  Her students have achieved{" "}
                  <strong className="font-semibold text-navy">
                    100% A–C grades, with 72% achieving A–A*
                  </strong>
                  , and gained places at leading schools and universities
                  including{" "}
                  <strong className="font-semibold text-navy">
                    St Paul&apos;s, Harrow, Oxford, Cambridge, Princeton, Penn
                    and Duke
                  </strong>
                  .
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={120}>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {amyStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-navy/12 bg-white p-5 text-center shadow-sm"
                    >
                      <div className="font-serif text-3xl text-gold-ink">
                        {stat.value}
                      </div>
                      <p className="mt-1.5 text-xs leading-snug text-ink-soft">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-navy/12 bg-white p-6 shadow-sm">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gold-ink">
                    Qualifications
                  </h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-ink">
                    {amyCredentials.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-navy/12 bg-white p-6 shadow-sm">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gold-ink">
                    Students placed at
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink">
                    {amyPlacements.join(" · ")}
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* How tutoring works */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <Eyebrow className="justify-center">Our process</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl text-navy sm:text-4xl">
              How tutoring works
            </h2>
            <p className="mt-4 text-ink-soft">
              A simple, personal process designed around your learner.
            </p>
          </FadeIn>

          {/* Mobile: vertical timeline */}
          <ol className="mt-14 lg:hidden">
            {processSteps.map((step, i) => (
              <FadeIn key={step.title} delay={i * 80}>
                <li className="relative pb-10 pl-16 last:pb-0">
                  {i < processSteps.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute left-6 top-12 bottom-0 w-px bg-navy/15"
                    />
                  )}
                  <span className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold bg-cream font-serif text-lg text-navy">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="pt-2 font-serif text-lg text-navy">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 leading-relaxed text-ink-soft">
                    {step.body}
                  </p>
                </li>
              </FadeIn>
            ))}
          </ol>

          {/* Desktop: horizontal journey */}
          <div className="mt-16 hidden lg:flex lg:items-start">
            {processSteps.map((step, i) => (
              <div key={step.title} className="flex flex-1 items-start last:flex-none">
                <FadeIn delay={i * 80} className="flex w-40 flex-col items-center text-center xl:w-48">
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-gold bg-cream font-serif text-lg text-navy">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-serif text-lg text-navy">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    {step.body}
                  </p>
                </FadeIn>
                {i < processSteps.length - 1 && (
                  <div className="mt-6 h-px flex-1 bg-navy/15" aria-hidden />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* English tutors */}
      <section className="bg-cream-panel/40 py-16 sm:py-20">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <Eyebrow className="justify-center">English tutors</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl text-navy sm:text-4xl">
              Meet the team
            </h2>
          </FadeIn>
          <div className="mt-12">
            <TeamGrid members={ENGLISH_TUTORS} />
          </div>
        </div>
      </section>

      {/* University application specialists */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <Eyebrow className="justify-center">University applications</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl text-navy sm:text-4xl">
              Specialist advisors
            </h2>
            <p className="mt-4 text-ink-soft">
              For UCAS and US university applications, learners work with a
              dedicated specialist alongside their English tuition.
            </p>
          </FadeIn>
          <div className="mt-12">
            <TeamGrid members={UNIVERSITY_SPECIALISTS} />
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
