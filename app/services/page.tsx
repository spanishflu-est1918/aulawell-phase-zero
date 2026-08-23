import Link from "next/link"
import type { Metadata } from "next"
import { BookOpen, GraduationCap, Globe, Compass, ArrowRight } from "lucide-react"
import { Eyebrow } from "@/components/marketing/Eyebrow"
import { PackageHierarchy } from "@/components/marketing/PackageHierarchy"
import { FadeIn } from "@/components/ui/fade-in"
import { SERVICES, ONE_TO_ONE_NOTE } from "@/lib/services-content"
import { ctaPrimary, ctaSecondary } from "@/lib/ui"

export const metadata: Metadata = {
  title: "Services | Aulawell English Tuition",
  description:
    "Bespoke one-to-one English tuition and advisory support: School English, Exam & Academic English, English Qualifications (IELTS, Cambridge) and University Applications.",
}

const serviceIcons: Record<string, typeof BookOpen> = {
  "school-english": BookOpen,
  "exam-academic-english": GraduationCap,
  "english-qualifications": Globe,
  "university-applications": Compass,
}

export default function ServicesPage() {
  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="border-b border-navy/10 bg-cream-panel/40">
        <div className="mx-auto max-w-[1100px] px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <FadeIn>
            <Eyebrow className="justify-center">Services</Eyebrow>
            <h1 className="mx-auto mt-6 max-w-3xl font-serif text-4xl leading-[1.1] tracking-tight text-navy sm:text-5xl">
              Purposeful support, shaped around where the learner is going
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink">
              Premium, high-touch one-to-one English tuition and advisory support
              for British and international learners worldwide — from foundational
              school English to exams, international qualifications and university
              applications.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Service cards */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
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
                    <h2 className="mt-5 font-serif text-2xl text-navy">
                      {service.navTitle}
                    </h2>
                    <p className="mt-3 flex-grow text-[0.975rem] leading-relaxed text-ink-soft">
                      {service.cardSummary}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-ink">
                      Explore {service.navTitle}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </FadeIn>
              )
            })}
          </div>

          <FadeIn className="mx-auto mt-10 max-w-2xl rounded-2xl border border-navy/12 bg-white px-6 py-6 text-center shadow-sm">
            <p className="text-ink">
              Not sure which route fits your learner? Tell us where they are and
              where they want to get to, and we&apos;ll point you to the right
              support.
            </p>
            <Link href="/enquire" className={`${ctaSecondary} mt-5`}>
              Enquire
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Packages */}
      <section className="bg-cream-panel/40 py-16 sm:py-20">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <Eyebrow className="justify-center">Packages</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl text-navy sm:text-4xl">
              Clear packages, priced from the start
            </h2>
            <p className="mt-3 text-ink-soft">{ONE_TO_ONE_NOTE}</p>
          </FadeIn>
          <div className="mt-12">
            <PackageHierarchy />
          </div>
          <FadeIn className="mt-10 text-center">
            <Link href="/book" className={ctaPrimary}>
              Book English Support
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
