import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import {
  BookOpen,
  UserCheck,
  Compass,
  Library,
  Heart,
  Eye,
} from "lucide-react"
import { FadeIn } from "@/components/ui/fade-in"
import { Eyebrow } from "@/components/marketing/Eyebrow"
import { ctaOnNavy, ctaOnNavyGhost } from "@/lib/ui"

export const metadata: Metadata = {
  title: "About Aulawell — The Classroom, Made Well",
  description:
    "Aulawell is a premium English learning and mentoring platform for British and international learners worldwide — academic excellence with wellbeing built in. Meet our Founder and Academic Director, Amy Fernandez-Kong.",
}

const heroIntro =
  "Aulawell brings together excellent English teaching and genuine care for the learner. The name says it plainly: a classroom, made well — where academic progress and wellbeing are treated as one and the same."

const aulaCopy =
  "Aula is Spanish for classroom. It stands for the heart of what we do: learning, literacy, teaching and steady academic growth, shaped one-to-one around each learner and where they are going."

const wellCopy =
  "Well is what makes that learning last. It stands for confidence, motivation, support and wellbeing — the conditions that turn effort into sustainable progress rather than pressure for its own sake."

const pullQuote = "Aulawell is the classroom, made well."

const positioningIntro =
  "Aulawell is a premium English learning and mentoring platform for British and international learners worldwide. It is a considered alternative to the tutor marketplace — high-touch, carefully overseen, and built around a single learner at a time."

const combines = [
  {
    icon: BookOpen,
    title: "Excellent English tuition",
    body: "Bespoke one-to-one teaching shaped around the curriculum, the goal and what comes next.",
  },
  {
    icon: UserCheck,
    title: "Carefully selected educators",
    body: "Every learner is taught by a carefully selected Aulawell tutor, chosen for the match.",
  },
  {
    icon: Compass,
    title: "Mentored academic coaching",
    body: "Guidance that helps learners build habits, direction and independence, not just answers.",
  },
  {
    icon: Library,
    title: "Reading and literacy development",
    body: "Deep, curriculum-aware work on reading, comprehension and written expression.",
  },
  {
    icon: Heart,
    title: "Learner confidence and wellbeing",
    body: "Motivation and support built into the teaching, so progress feels achievable and sustained.",
  },
  {
    icon: Eye,
    title: "Parent visibility of progress",
    body: "Clear communication so families always understand how a learner is getting on.",
  },
]

const amyBio = [
  "Amy Fernandez-Kong brings a unique blend of academic expertise and global perspective to her teaching of English as both an academic subject and a foreign language. Born in China and having grown up in Venezuela and the United Kingdom, Amy draws on a rich international background that informs her inclusive and adaptable teaching style.",
  "She holds a Bachelor's degree in English Literature from the University of Manchester and began her teaching journey in Madrid and Lisboa as an English as a Foreign Language teacher. In 2016 she earned a CELTA certification from International House Los Angeles, and in 2013 she completed her teacher training qualification in Literature — solidifying her ability to teach both language and literature with depth and confidence.",
  "With extensive experience across the UK and international education sectors, Amy has managed residential tuition camps in the UK and tutored families across Spain, Portugal, Dubai, Singapore and Russia. She has supported students in gaining admission to top UK schools such as St Mary's Ascot, St Paul's and Harrow, as well as elite universities including Oxford, Cambridge and Durham, and internationally at institutions such as Princeton, the University of Pennsylvania and Duke.",
  "As the Founder and Academic Director of Aulawell, Amy remains passionate about education and continues to teach in mainstream classrooms. She is also a sought-after speaker at conferences, where she shares insights on guiding parents through the challenges of social media and explores the evolving role of artificial intelligence in education.",
]

const closingIntro =
  "Whether you know exactly what your learner needs or you would like to talk it through first, the next step is a simple one."

export default function AboutPage() {
  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="border-b border-navy/10 bg-cream-panel/40">
        <div className="mx-auto max-w-[1100px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <FadeIn>
            <Eyebrow>About Aulawell</Eyebrow>
            <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.1] tracking-tight text-navy sm:text-5xl">
              The classroom, made well.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink">
              {heroIntro}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Brand concept — Aula + Well */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-2xl">
            <Eyebrow>The name</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl text-navy sm:text-4xl">
              Two ideas, held together
            </h2>
          </FadeIn>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <FadeIn>
              <div className="flex h-full flex-col rounded-2xl border border-navy/12 bg-white p-7 shadow-sm">
                <span className="font-serif text-2xl italic text-gold-ink">
                  Aula
                </span>
                <h3 className="mt-3 font-serif text-xl text-navy">
                  The learning
                </h3>
                <p className="mt-3 text-ink-soft">{aulaCopy}</p>
              </div>
            </FadeIn>
            <FadeIn delay={120}>
              <div className="flex h-full flex-col rounded-2xl border border-navy/12 bg-white p-7 shadow-sm">
                <span className="font-serif text-2xl italic text-gold-ink">
                  Well
                </span>
                <h3 className="mt-3 font-serif text-xl text-navy">
                  The wellbeing
                </h3>
                <p className="mt-3 text-ink-soft">{wellCopy}</p>
              </div>
            </FadeIn>
          </div>

          <FadeIn className="mt-12">
            <figure className="rounded-2xl border border-navy/10 bg-cream-panel/40 p-8 text-center sm:p-12">
              <blockquote className="font-serif text-2xl leading-snug text-navy sm:text-3xl">
                &ldquo;{pullQuote}&rdquo;
              </blockquote>
            </figure>
          </FadeIn>
        </div>
      </section>

      {/* Positioning + what it combines */}
      <section className="bg-cream-panel/40 py-16 sm:py-20">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <Eyebrow className="justify-center">What Aulawell is</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl text-navy sm:text-4xl">
              One platform, six things done well
            </h2>
            <p className="mt-4 text-ink-soft">{positioningIntro}</p>
          </FadeIn>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {combines.map((item, i) => (
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
        </div>
      </section>

      {/* Core promise */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[900px] px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <Eyebrow className="justify-center">Our promise</Eyebrow>
            <p className="mt-6 font-serif text-3xl leading-tight text-navy sm:text-4xl">
              Academic excellence with wellbeing built in.
            </p>
            <p className="mx-auto mt-5 max-w-xl text-lg text-ink-soft">
              It is the standard every Aulawell lesson is measured against — real
              progress a family can see, achieved in a way that keeps the learner
              motivated and well.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Meet Amy */}
      <section className="bg-cream-panel/40 py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1100px] items-start gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
          <FadeIn>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-xl">
              <Image
                src="/amy-tutor.jpeg"
                alt="Amy Fernandez-Kong, Aulawell's Founder and Academic Director"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <Eyebrow>Meet Amy</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl text-navy sm:text-4xl">
              Founder and Academic Director
            </h2>
            <div className="mt-6 space-y-4">
              {amyBio.map((para) => (
                <p key={para} className="leading-relaxed text-ink">
                  {para}
                </p>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-navy py-16 text-white sm:py-20">
        <div className="mx-auto max-w-[900px] px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <Eyebrow onDark className="justify-center">
              Start with Aulawell
            </Eyebrow>
            <h2 className="mt-6 font-serif text-3xl sm:text-4xl">
              Ready to find the right English support?
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
