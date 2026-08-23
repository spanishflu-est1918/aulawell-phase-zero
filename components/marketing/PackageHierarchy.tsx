import Link from "next/link"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { ctaSecondary } from "@/lib/ui"
import { PACKAGE_HIERARCHY, OFFER_RULES } from "@/lib/pricing"

// The prioritised package overview: Term Support featured, then Skills Boost,
// then Single Lesson Clinic — followed by concise offer terms.
export function PackageHierarchy({
  showOfferRules = true,
}: {
  showOfferRules?: boolean
}) {
  return (
    <div className="mx-auto max-w-[1180px]">
      <div className="grid items-stretch gap-6 lg:grid-cols-3">
        {PACKAGE_HIERARCHY.map((pkg) => (
          <div
            key={pkg.name}
            className={cn(
              "relative flex flex-col rounded-2xl border p-7",
              pkg.featured
                ? "border-navy bg-navy text-white shadow-xl lg:-mt-3 lg:mb-3"
                : "border-navy/12 bg-white text-navy shadow-sm"
            )}
          >
            {pkg.badge && (
              <span className="absolute -top-3 left-7 rounded-full bg-gold px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-navy">
                {pkg.badge}
              </span>
            )}

            <h3
              className={cn(
                "font-serif text-xl leading-snug",
                pkg.featured ? "text-white" : "text-navy"
              )}
            >
              {pkg.name}
            </h3>
            <p
              className={cn(
                "mt-2 text-sm",
                pkg.featured ? "text-white/75" : "text-ink-soft"
              )}
            >
              {pkg.strapline}
            </p>

            <p
              className={cn(
                "mt-5 text-lg font-semibold",
                pkg.featured ? "text-gold" : "text-navy"
              )}
            >
              {pkg.fromLabel}
            </p>

            {pkg.highlight && (
              <p
                className={cn(
                  "mt-3 flex items-start gap-2 text-sm",
                  pkg.featured ? "text-white/85" : "text-ink"
                )}
              >
                <Check
                  className={cn(
                    "mt-0.5 h-4 w-4 flex-shrink-0",
                    pkg.featured ? "text-gold" : "text-gold-ink"
                  )}
                />
                {pkg.highlight}
              </p>
            )}

            <div className="flex-grow" />

            <Link
              href={pkg.ctaHref}
              className={cn(
                "mt-7 w-full",
                pkg.featured
                  ? "inline-flex h-12 items-center justify-center rounded-full bg-gold px-7 text-sm font-semibold text-navy transition-colors hover:bg-gold/90"
                  : ctaSecondary
              )}
            >
              {pkg.cta}
            </Link>
          </div>
        ))}
      </div>

      {showOfferRules && (
        <div className="mx-auto mt-8 max-w-3xl rounded-xl border border-navy/10 bg-cream-panel/60 px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-ink">
            Offer terms
          </p>
          <ul className="mt-3 space-y-1.5">
            {OFFER_RULES.map((rule) => (
              <li key={rule} className="text-sm leading-relaxed text-ink-soft">
                {rule}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-ink-soft">
            Full terms are set out in our{" "}
            <Link href="/terms" className="font-medium text-navy underline underline-offset-2 hover:text-gold-ink">
              Terms &amp; Conditions
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  )
}
