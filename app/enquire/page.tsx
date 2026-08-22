import { Suspense } from "react"
import Link from "next/link"
import type { Metadata } from "next"
import { Mail, MessageCircle, Check } from "lucide-react"
import { Eyebrow } from "@/components/marketing/Eyebrow"
import { EnquireForm } from "@/components/marketing/EnquireForm"
import { CONTACT_INFO } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Enquire | Aulawell English Tuition",
  description:
    "Enquire about bespoke English tuition, in-person lessons in Madrid and Lisbon, complex learning needs, school and agency partnerships, or the Aulawell Hub.",
}

const enquireFor = [
  "School or agency contracts",
  "Complex or additional learning needs",
  "In-person requests that need availability confirmed",
  "Bespoke university-application support",
  "Partnerships",
]

export default function EnquirePage() {
  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="border-b border-navy/10 bg-cream-panel/40">
        <div className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <Eyebrow>Enquire</Eyebrow>
          <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.1] tracking-tight text-navy sm:text-5xl">
            Tell us what your learner needs
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink">
            For standard packages you can book directly. Use this form when you
            need a conversation first — bespoke support, in-person lessons,
            partnerships, or anything that needs a personal recommendation.
          </p>
        </div>
      </section>

      {/* Form + info */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-[1100px] gap-10 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:gap-14 lg:px-8">
          <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-white/60" />}>
            <EnquireForm />
          </Suspense>

          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-xl text-navy">When to enquire</h2>
              <ul className="mt-4 space-y-2.5">
                {enquireFor.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-ink">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-ink" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-ink-soft">
                Ready to go? You can{" "}
                <Link href="/book" className="font-medium text-navy underline underline-offset-2 hover:text-gold-ink">
                  book English support
                </Link>{" "}
                directly instead.
              </p>
            </div>

            <div className="rounded-2xl border border-navy/12 bg-white p-6 shadow-sm">
              <h3 className="font-serif text-lg text-navy">Prefer to talk?</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-gold-ink" />
                  <a
                    href={`https://wa.me/${CONTACT_INFO.WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink hover:text-navy"
                  >
                    Message us on WhatsApp
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gold-ink" />
                  <a href={`mailto:${CONTACT_INFO.EMAIL}`} className="text-ink hover:text-navy">
                    {CONTACT_INFO.EMAIL}
                  </a>
                </li>
              </ul>
              <p className="mt-4 text-xs text-ink-soft">
                Online worldwide · In person in Madrid and Lisbon
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
