import Link from "next/link"
import { Check, ArrowRight, Monitor, MapPin } from "lucide-react"
import { Eyebrow } from "@/components/marketing/Eyebrow"
import { ServicePricing } from "@/components/marketing/ServicePricing"
import { PackageHierarchy } from "@/components/marketing/PackageHierarchy"
import { FadeIn } from "@/components/ui/fade-in"
import { ctaPrimary, ctaSecondary } from "@/lib/ui"
import { PRICING_NOTE } from "@/lib/pricing"
import { ONE_TO_ONE_NOTE, type Service } from "@/lib/services-content"

export function ServiceDetail({ service }: { service: Service }) {
  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="border-b border-navy/10 bg-cream-panel/40">
        <div className="mx-auto max-w-[1100px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <FadeIn>
            <Eyebrow>{service.eyebrow}</Eyebrow>
            <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.1] tracking-tight text-navy sm:text-5xl">
              {service.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink">
              {service.intro}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="#packages" className={ctaPrimary}>
                See packages &amp; pricing
              </Link>
              <Link href="/enquire" className={ctaSecondary}>
                Enquire
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Who it's for + focus */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1100px] gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <FadeIn>
            <h2 className="font-serif text-2xl text-navy sm:text-3xl">Who this is for</h2>
            <ul className="mt-6 space-y-3">
              {service.forWho.map((item) => (
                <li key={item} className="flex items-start gap-3 text-ink">
                  <Check className="mt-1 h-5 w-5 flex-shrink-0 text-gold-ink" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {service.delivery && (
              <div className="mt-10">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-gold-ink">
                  Delivery
                </h3>
                <ul className="mt-4 space-y-3">
                  {service.delivery.map((d, i) => (
                    <li key={d} className="flex items-start gap-3 text-ink">
                      {i === 0 ? (
                        <Monitor className="mt-0.5 h-5 w-5 flex-shrink-0 text-navy" />
                      ) : (
                        <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-navy" />
                      )}
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </FadeIn>

          {service.focus && (
            <FadeIn delay={150}>
              <div className="rounded-2xl border border-navy/10 bg-white p-8 shadow-sm">
                <h2 className="font-serif text-2xl text-navy">What we focus on</h2>
                <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {service.focus.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-ink">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-ink" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Products */}
      <section id="packages" className="scroll-mt-24 bg-cream-panel/40 py-16 sm:py-20">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-2xl">
            <Eyebrow>Packages</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl text-navy sm:text-4xl">
              Ways to work together
            </h2>
            <p className="mt-3 text-ink-soft">{ONE_TO_ONE_NOTE}</p>
          </FadeIn>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {service.products.map((product) => (
              <div
                key={product.name}
                className="flex flex-col rounded-2xl border border-navy/12 bg-white p-7 shadow-sm"
              >
                <h3 className="font-serif text-xl text-navy">{product.name}</h3>
                {product.description && (
                  <p className="mt-2 flex-grow text-sm leading-relaxed text-ink-soft">
                    {product.description}
                  </p>
                )}
                <Link
                  href={product.ctaHref}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-ink hover:text-navy"
                >
                  {product.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>

          {service.note && (
            <p className="mt-8 max-w-2xl rounded-xl border border-navy/10 bg-white px-5 py-4 text-sm leading-relaxed text-ink-soft">
              {service.note}
            </p>
          )}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <Eyebrow className="justify-center">
              {service.pricing === "consultation" ? "Booking & pricing" : "Pricing"}
            </Eyebrow>
            <h2 className="mt-5 font-serif text-3xl text-navy sm:text-4xl">
              {service.pricing === "consultation"
                ? "How booking works"
                : "Transparent “from” pricing"}
            </h2>
          </FadeIn>

          <div className="mt-12">
            {service.pricing === "school-exam-table" && service.priceRow && (
              <ServicePricing priceRow={service.priceRow} />
            )}

            {service.pricing === "package-hierarchy" && (
              <div>
                <PackageHierarchy />
                <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-ink-soft">
                  {PRICING_NOTE}
                </p>
              </div>
            )}

            {service.pricing === "consultation" && (
              <div className="mx-auto max-w-2xl rounded-2xl border border-navy/12 bg-white p-8 text-center shadow-sm">
                <p className="text-ink">
                  University Applications support is booked as individual
                  consultations and programmes. Pricing for each option is
                  confirmed when you book, and bespoke support can be arranged on
                  enquiry.
                </p>
                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link href="/consultation" className={ctaPrimary}>
                    Book a Consultation
                  </Link>
                  <Link href="/enquire" className={ctaSecondary}>
                    Enquire
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-navy py-16 text-white sm:py-20">
        <div className="mx-auto max-w-[900px] px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-serif text-3xl sm:text-4xl">
              The first step is a conversation
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/75">
              Choose a package and educator to get started, or tell us what your
              learner needs and we&apos;ll guide you to the right support.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href={`/book?service=${service.slug}`}
                className="inline-flex h-12 items-center justify-center rounded-full bg-gold px-7 text-sm font-semibold text-navy transition-colors hover:bg-gold/90"
              >
                Book English Support
              </Link>
              <Link
                href="/enquire"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Enquire
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
