import Link from "next/link"
import type { Metadata } from "next"
import {
  Layers,
  BookOpen,
  ListChecks,
  ShoppingBag,
  LineChart,
  Link2,
  Compass,
  ArrowRight,
} from "lucide-react"
import { FadeIn } from "@/components/ui/fade-in"
import { Eyebrow } from "@/components/marketing/Eyebrow"
import { ctaPrimary, ctaSecondary } from "@/lib/ui"

export const metadata: Metadata = {
  title: "Aulawell Hub | Coming Soon",
  description:
    "The Aulawell Hub is a future reading and literacy platform for readers, writers and English learners — guided reading, curriculum-aware literacy support, resources and Sherpy, Aulawell's learning companion. Join the waitlist.",
}

const heroIntro =
  "The Aulawell Hub is a future learning platform for readers, writers and English learners — combining guided reading, curriculum-aware literacy support, thoughtful resources and Sherpy, Aulawell's learning companion."

const comingHeading = "More than a blog or a folder of worksheets"

const comingIntro =
  "Every part of the Hub is still in development. Here is what we are building — a considered, curriculum-aware home for literacy that grows with each learner."

const comingItems = [
  {
    icon: Layers,
    title: "Tiered memberships",
    body: "Planned membership levels so families can choose the depth of support that suits their learner.",
  },
  {
    icon: BookOpen,
    title: "Guided reading pathways",
    body: "Structured reading journeys that help learners build stamina, comprehension and confidence over time.",
  },
  {
    icon: ListChecks,
    title: "Curriculum-aligned literacy activities",
    body: "Reading and writing activities designed to sit alongside the curriculum a learner is already following.",
  },
  {
    icon: ShoppingBag,
    title: "Individual paid resources",
    body: "Carefully made resources available to buy on their own, without a membership, when a family needs something specific.",
  },
  {
    icon: LineChart,
    title: "Parent reporting",
    body: "Clear visibility for parents, so families can see how a learner is progressing between lessons.",
  },
  {
    icon: Link2,
    title: "Tutor-linked activities",
    body: "Activities that connect to a learner's tuition, so practice in the Hub reinforces work with their tutor.",
  },
  {
    icon: Compass,
    title: "Sherpy learning companion",
    body: "A supportive guide, in development, to help learners read more, practise consistently and keep moving.",
  },
]

const sherpyCopy =
  "Sherpy is Aulawell's future reading, literacy and learner-confidence companion. The name evokes a sherpa: a supportive guide who helps a learner navigate the climb. Sherpy helps learners read more, think more deeply, practise consistently and keep moving."

const sherpyQualities = [
  "Encouraging",
  "Intelligent",
  "Personal",
  "Calm",
  "Age-appropriate",
  "Curriculum-aware",
  "Safe",
]

const sherpyBoundary =
  "Sherpy is not a generic AI chatbot, an essay writer or a replacement tutor."

const waitlistCopy =
  "Membership is still in development. Register your interest now and we will let you know the moment the Hub opens, so your family can be among the first through the door."

export default function AulawellHubPage() {
  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="border-b border-navy/10 bg-cream-panel/40">
        <div className="mx-auto max-w-[1100px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <FadeIn>
            <Eyebrow>Aulawell Hub · Coming Soon</Eyebrow>
            <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.1] tracking-tight text-navy sm:text-5xl">
              A reading and literacy space built for progress beyond the lesson.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink">
              {heroIntro}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="#waitlist" className={ctaPrimary}>
                Join the Waitlist
              </Link>
              <Link href="/enquire" className={ctaSecondary}>
                Join the Reading Hub
              </Link>
              <Link href="/enquire" className={ctaSecondary}>
                Shop Resources
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* What's coming */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-2xl">
            <Eyebrow>What&apos;s coming</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl text-navy sm:text-4xl">
              {comingHeading}
            </h2>
            <p className="mt-4 text-ink-soft">{comingIntro}</p>
          </FadeIn>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {comingItems.map((item, i) => (
              <FadeIn key={item.title} delay={i * 80}>
                <div className="flex h-full flex-col rounded-2xl border border-navy/12 bg-white p-7 shadow-sm">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cream-panel">
                    <item.icon className="h-5 w-5 text-gold-ink" />
                  </div>
                  <div className="mt-5 flex items-center gap-2">
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold-ink">
                      In development
                    </span>
                  </div>
                  <h3 className="mt-2 font-serif text-xl text-navy">{item.title}</h3>
                  <p className="mt-2 flex-grow text-sm leading-relaxed text-ink-soft">
                    {item.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Sherpy */}
      <section className="bg-navy py-16 text-white sm:py-20">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-2xl">
            <Eyebrow onDark>Meet Sherpy · In development</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl sm:text-4xl">
              A supportive guide for the climb
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
              {sherpyCopy}
            </p>
          </FadeIn>

          <FadeIn delay={150} className="mt-8">
            <ul className="flex flex-wrap gap-3">
              {sherpyQualities.map((quality) => (
                <li
                  key={quality}
                  className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm font-medium text-gold"
                >
                  {quality}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={250}>
            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-white/55">
              {sherpyBoundary}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Waitlist */}
      <section
        id="waitlist"
        className="scroll-mt-24 bg-cream-panel/40 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-[900px] px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <Eyebrow className="justify-center">Join the waitlist</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl text-navy sm:text-4xl">
              Be first to know when the Hub opens
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
              {waitlistCopy}
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="/enquire" className={ctaPrimary}>
                Join the Waitlist
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
