import { GraduationCap, UserCheck } from "lucide-react"
import { EDUCATOR_LEVELS } from "@/lib/pricing"

const icons = {
  "aulawell-tutor": UserCheck,
  "head-tutor": GraduationCap,
} as const

// Explains the two educator tiers a family chooses between at checkout.
export function EducatorLevels() {
  return (
    <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
      {EDUCATOR_LEVELS.map((level) => {
        const Icon = icons[level.id]
        return (
          <div
            key={level.id}
            className="flex flex-col rounded-2xl border border-navy/12 bg-white p-7 shadow-sm"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cream-panel">
              <Icon className="h-6 w-6 text-navy" />
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-3">
              <h3 className="font-serif text-xl text-navy">{level.name}</h3>
              <span className="text-sm font-semibold text-gold-ink">{level.fromLabel}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{level.description}</p>
          </div>
        )
      })}
    </div>
  )
}
