import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FadeIn } from "@/components/ui/fade-in"
import { TUTOR_TIERS, bundleUnitCents, formatPrice } from "@/lib/booking/config"

// Package prices are derived from the same tier prices + bundle rule the
// checkout uses, so what the site shows is always exactly what Stripe charges.
const PACKAGES = [
  {
    name: "Single Lesson",
    lessons: 1,
    tagline: "Try Aulawell with zero commitment",
    points: ["No enrollment fee, no deposit, no contract", "Book online in under two minutes"],
  },
  {
    name: "Exam Sprint",
    lessons: 5,
    tagline: "Five focused lessons before an exam",
    points: [
      "Past papers, marked essays and exam technique",
      "IGCSE, GCSE, A-Level, IB and Cambridge exams",
    ],
  },
  {
    name: "Term Support",
    lessons: 10,
    tagline: "Your weekly slot, held all term",
    points: [
      "Continuity with one tutor who knows your child",
      "Progress tracked against the school curriculum",
    ],
  },
]

function tierLine(tierPriceCents: number, lessons: number) {
  const unit = bundleUnitCents(tierPriceCents, lessons)
  return {
    unit,
    total: unit * lessons,
    savings: (tierPriceCents - unit) * lessons,
  }
}

export default function Packages() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <FadeIn className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-navy lg:text-4xl">
            Lessons &amp; Packages
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Transparent pricing, paid per lesson &mdash; choose our Lead Tutor online,
            or an Associate Tutor online or in person in Madrid
          </p>
        </FadeIn>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {PACKAGES.map((pkg, i) => {
            const head = tierLine(TUTOR_TIERS.head.priceCents, pkg.lessons)
            const associate = tierLine(TUTOR_TIERS.associate.priceCents, pkg.lessons)
            const presencial = tierLine(TUTOR_TIERS.presencial.priceCents, pkg.lessons)
            return (
              <FadeIn key={pkg.name} delay={(i + 1) * 100}>
                <Card className="flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-navy">{pkg.name}</CardTitle>
                    <p className="text-sm text-slate-500">{pkg.tagline}</p>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <div className="mb-4 space-y-3">
                      <div className="rounded-lg bg-navy/5 px-4 py-3">
                        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          {TUTOR_TIERS.head.label}
                        </div>
                        <div className="text-lg font-bold text-navy">
                          {formatPrice(head.total)}
                          <span className="ml-1 text-sm font-normal text-slate-500">
                            ({formatPrice(head.unit)}/lesson)
                          </span>
                        </div>
                        {head.savings > 0 && (
                          <div className="text-xs font-medium text-green-700">
                            Save {formatPrice(head.savings)}
                          </div>
                        )}
                      </div>
                      <div className="rounded-lg bg-slate-50 px-4 py-3">
                        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          {TUTOR_TIERS.associate.label}
                        </div>
                        <div className="text-lg font-bold text-navy">
                          {formatPrice(associate.total)}
                          <span className="ml-1 text-sm font-normal text-slate-500">
                            ({formatPrice(associate.unit)}/lesson)
                          </span>
                        </div>
                        {associate.savings > 0 && (
                          <div className="text-xs font-medium text-green-700">
                            Save {formatPrice(associate.savings)}
                          </div>
                        )}
                      </div>
                      <div className="rounded-lg bg-gold/5 px-4 py-3">
                        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          {TUTOR_TIERS.presencial.label}
                        </div>
                        <div className="text-lg font-bold text-navy">
                          {formatPrice(presencial.total)}
                          <span className="ml-1 text-sm font-normal text-slate-500">
                            ({formatPrice(presencial.unit)}/lesson)
                          </span>
                        </div>
                        {presencial.savings > 0 && (
                          <div className="text-xs font-medium text-green-700">
                            Save {formatPrice(presencial.savings)}
                          </div>
                        )}
                      </div>
                    </div>
                    <ul className="mb-6 flex-1 space-y-2 text-sm">
                      {pkg.points.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                          <span className="text-slate-600">{point}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full bg-navy hover:bg-navy/90">
                      <Link href="/book">
                        {pkg.lessons === 1 ? "Book a lesson" : `Book ${pkg.lessons} lessons`}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </FadeIn>
            )
          })}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-slate-500">
          The bundle price applies automatically when you select 5 or 10+ lessons in one
          booking &mdash; pick any mix of dates on the{" "}
          <Link href="/book" className="text-navy underline underline-offset-4 hover:text-gold transition-colors">
            calendar
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
