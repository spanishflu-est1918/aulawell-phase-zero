import { Quote } from "lucide-react"
import { Eyebrow } from "@/components/marketing/Eyebrow"
import { FadeIn } from "@/components/ui/fade-in"
import { TESTIMONIALS } from "@/lib/testimonials"

export function Testimonials() {
  return (
    <section className="bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <Eyebrow>What families say</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl text-navy sm:text-4xl">
            A five-year journey, not a single lesson
          </h2>
        </FadeIn>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.name} delay={i * 120}>
              <figure className="flex h-full flex-col rounded-2xl border border-navy/10 bg-white p-7 shadow-sm">
                <Quote className="h-7 w-7 text-gold" aria-hidden />
                <blockquote className="mt-4 flex-grow text-[0.975rem] leading-relaxed text-ink">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-navy/10 pt-4">
                  <span className="font-serif text-lg text-navy">{t.name}</span>
                  <span className="mt-0.5 block text-xs font-semibold uppercase tracking-widest text-gold-ink">
                    {t.role}
                  </span>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
