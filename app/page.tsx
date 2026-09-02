import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import {
  BookOpen,
  GraduationCap,
  Globe,
  Compass,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import { FadeIn } from "@/components/ui/fade-in"
import { Eyebrow } from "@/components/marketing/Eyebrow"
import { Testimonials } from "@/components/marketing/Testimonials"
import { PackageHierarchy } from "@/components/marketing/PackageHierarchy"
import { SERVICES, CURRICULUM_STRIP, ONE_TO_ONE_NOTE } from "@/lib/services-content"
import { ctaPrimary, ctaSecondary, ctaOnNavy, ctaOnNavyGhost } from "@/lib/ui"

export const metadata: Metadata = {
  title: "Aulawell — Premium English Tuition for Learners With Places to Go",
  description:
    "Bespoke one-to-one English tuition and mentoring for British and international learners worldwide — school English, exams, IELTS and Cambridge, and university applications. Academic excellence with wellbeing built in.",
  openGraph: {
    title: "Aulawell — English tuition for learners with places to go",
    description:
      "Premium, high-touch one-to-one English tuition for British and international learners worldwide.",
    type: "website",
  },
}

const serviceIcons: Record<string, typeof BookOpen> = {
  "school-english": BookOpen,
  "exam-academic-english": GraduationCap,
  "english-qualifications": Globe,
  "university-applications": Compass,
}

// The brand concept, tightened for the homepage — the fuller version lives
// on /about. Aula (classroom, academic excellence) + Well (wellbeing,
// confidence, resilience) is the whole positioning; keep this short.
const aulaCopy =
  "Spanish for classroom — rigorous, one-to-one academic support that builds real skills, from school English to the qualifications that open doors."
const wellCopy =
  "What makes the learning last — confidence, motivation and resilience woven into every lesson, so progress holds long after it ends."

const howItWorks = [
  { step: "01", title: "Choose your service", body: "School English, exams, English qualifications or university applications." },
  { step: "02", title: "Choose your package", body: "A single lesson, a 5-lesson boost or 10-lesson term support." },
  { step: "03", title: "Choose your educator level", body: "An Aulawell Tutor from £35, or Head Tutor Amy directly — we confirm the specific tutor match." },
  { step: "04", title: "Secure your place", body: "Complete a short learner profile so we can prepare properly." },
  { step: "05", title: "Start learning", body: "Book your lessons and begin — online worldwide or in person." },
]

export default function HomePage() {
  return (
    <div className="bg-cream">
      {/* 1 · Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-24">
          <div>
            <FadeIn>
              <Eyebrow>British &amp; International English Tuition</Eyebrow>
              <h1 className="mt-6 font-serif text-4xl leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-6xl">
                English tuition for learners with places to go.
              </h1>
            </FadeIn>
            <FadeIn delay={150}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink">
                Bespoke one-to-one English support for British and international
                learners worldwide — shaped around the curriculum, the goal and
                what comes next.
              </p>
              <p className="mt-4 max-w-xl text-base text-ink-soft">
                Premium, high-touch tuition for school English, exams and
                international learning.
              </p>
            </FadeIn>
            <FadeIn delay={300}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/book" className={ctaPrimary}>
                  Book English Support
                </Link>
                <Link href="/services" className={ctaSecondary}>
                  Explore Services
                </Link>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={200}>
            <div className="relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] rounded-tr-[6rem] shadow-2xl shadow-navy/15">
                <Image
                  src="/main.jpeg"
                  alt="A student working one-to-one with an Aulawell tutor"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-navy/10 bg-white px-5 py-4 shadow-xl sm:block">
                <p className="font-serif text-2xl text-navy">1:1</p>
                <p className="text-xs font-medium uppercase tracking-widest text-gold-ink">
                  Bespoke tuition
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2 · Curriculum support strip */}
      <section className="border-y border-navy/10 bg-cream-panel/50">
        <div className="mx-auto grid max-w-[1280px] gap-px px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {CURRICULUM_STRIP.map((band) => (
            <div key={band.label} className="py-6 lg:px-6 lg:text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-ink">
                {band.label}
              </p>
              <p className="mt-1.5 font-serif text-lg text-navy">{band.levels}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 · Core services */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <Eyebrow>How we help</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl text-navy sm:text-4xl">
              Purposeful support, shaped around where the learner is going
            </h2>
          </FadeIn>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {SERVICES.map((service, i) => {
              const Icon = serviceIcons[service.slug] ?? BookOpen
              return (
                <FadeIn key={service.slug} delay={i * 100}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-navy/12 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cream-panel">
                      <Icon className="h-6 w-6 text-navy" />
                    </div>
                    <h3 className="mt-5 font-serif text-2xl text-navy">
                      {service.navTitle}
                    </h3>
                    <p className="mt-3 flex-grow text-[0.975rem] leading-relaxed text-ink-soft">
                      {service.cardSummary}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-ink">
                      Explore
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4 · Ways to learn / package overview */}
      <section className="bg-cream-panel/40 py-20 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <Eyebrow>Ways to work together</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl text-navy sm:text-4xl">
              Clear packages, priced from the start
            </h2>
            <p className="mt-4 text-ink-soft">{ONE_TO_ONE_NOTE}</p>
          </FadeIn>

          <div className="mt-14">
            <PackageHierarchy />
          </div>
        </div>
      </section>

      {/* 5 · Why Aulawell — the brand concept, Aula + Well */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <Eyebrow className="justify-center">Why Aulawell</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl text-navy sm:text-4xl">
              Academic excellence, with wellbeing built in
            </h2>
          </FadeIn>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <FadeIn>
              <div className="flex h-full flex-col rounded-2xl border border-navy/12 bg-white p-7 shadow-sm">
                <span className="font-serif text-2xl italic text-gold-ink">Aula</span>
                <h3 className="mt-2 font-serif text-lg text-navy">The classroom</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{aulaCopy}</p>
              </div>
            </FadeIn>
            <FadeIn delay={120}>
              <div className="flex h-full flex-col rounded-2xl border border-navy/12 bg-white p-7 shadow-sm">
                <span className="font-serif text-2xl italic text-gold-ink">Well</span>
                <h3 className="mt-2 font-serif text-lg text-navy">The wellbeing</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{wellCopy}</p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={200} className="mt-10 text-center">
            <p className="font-serif text-xl italic text-navy sm:text-2xl">
              Aulawell is the classroom, made well.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 6 · Meet the Tutors */}
      <section className="bg-cream-panel/40 py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <FadeIn>
            <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] rounded-bl-[6rem] shadow-xl shadow-navy/15">
              <Image
                src="/amy-tutor.jpeg"
                alt="Amy, Aulawell's Founder and Academic Director"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <Eyebrow>Meet the tutors</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl text-navy sm:text-4xl">
              Led by Amy. Delivered by carefully selected tutors.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink">
              Aulawell is founded and led by Amy, our Founder and Academic
              Director. Every learner is taught by a carefully selected Aulawell
              tutor, with Amy overseeing teaching quality and tutor matching — and
              available to teach directly as Head Tutor.
            </p>
            <p className="mt-4 text-ink-soft">
              Amy retains final decision-making authority for tutor allocation,
              availability and any special requirements, so every family is
              matched with the right educator.
            </p>
            <Link href="/about/tutors" className={`${ctaSecondary} mt-8`}>
              Meet the Tutors
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* 7 · Testimonials */}
      <Testimonials />

      {/* 8 · Aulawell Hub / Sherpy vision */}
      <section className="bg-navy py-20 text-white sm:py-24">
        <div className="mx-auto max-w-[1100px] px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <Eyebrow onDark>Aulawell Hub · Coming Soon</Eyebrow>
            <h2 className="mx-auto mt-5 max-w-3xl font-serif text-3xl sm:text-4xl">
              A reading and literacy space built for progress beyond the lesson
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
              The Aulawell Hub is a future learning platform for readers, writers
              and English learners — combining guided reading, curriculum-aware
              literacy support, thoughtful resources and Sherpy, Aulawell&apos;s
              learning companion who helps learners read more, think more deeply
              and keep moving.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/aulawell-hub" className={ctaOnNavy}>
                Explore the Aulawell Hub
              </Link>
              <Link href="/aulawell-hub#waitlist" className={ctaOnNavyGhost}>
                Join the Waitlist
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 9 · How it works */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl text-navy sm:text-4xl">
              From choosing a service to the first lesson
            </h2>
            <p className="mt-4 text-ink-soft">
              Already know what you need? Follow the steps below. Not sure
              yet?{" "}
              <Link href="/consultation" className="font-medium text-navy underline underline-offset-4 hover:text-gold-ink">
                Book a free 30-minute consultation
              </Link>{" "}
              and we&apos;ll point you to the right fit first.
            </p>
          </FadeIn>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {howItWorks.map((item, i) => (
              <FadeIn key={item.step} delay={i * 80}>
                <div className="flex h-full flex-col rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
                  <span className="font-serif text-3xl text-gold">{item.step}</span>
                  <h3 className="mt-3 font-serif text-lg text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-10 text-center">
            <Link href="/about/how-it-works" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-ink hover:text-navy">
              See the full booking journey
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* 10 · Final booking CTA */}
      <section className="bg-cream-panel/60 py-20 sm:py-24">
        <div className="mx-auto max-w-[900px] px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <Sparkles className="mx-auto h-8 w-8 text-gold" />
            <h2 className="mt-5 font-serif text-3xl text-navy sm:text-4xl">
              Ready to find the right English support?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">
              Choose a service and package, pick your educator, and we&apos;ll take
              care of the rest — online worldwide, or in person in Madrid and Lisbon.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/book" className={ctaPrimary}>
                Book English Support
              </Link>
              <Link href="/enquire" className={ctaSecondary}>
                Enquire About Bespoke Support
              </Link>
            </div>
            <p className="mt-6 text-sm text-ink-soft">
              Not sure which package or tier fits?{" "}
              <Link href="/consultation" className="font-medium text-navy underline underline-offset-4 hover:text-gold-ink">
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
