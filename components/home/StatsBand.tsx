import { StatCounter } from "@/components/ui/stat-counter"
import { FadeIn } from "@/components/ui/fade-in"
import { SITE_STATS } from "@/lib/site-content"

export default function StatsBand() {
  return (
    <section className="bg-navy py-14 text-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-10 text-center md:grid-cols-4">
          {SITE_STATS.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 100}>
              <div>
                <div className="font-serif text-4xl font-bold text-gold lg:text-5xl">
                  <StatCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-sm text-gray-200">{stat.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
