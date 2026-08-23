import Image from "next/image"
import type { TeamMember } from "@/lib/team-content"
import { FadeIn } from "@/components/ui/fade-in"

export function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {members.map((m, i) => (
        <FadeIn key={m.name} delay={i * 90}>
          <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-navy/12 bg-white shadow-sm sm:flex-row">
            <div className="relative h-64 w-full flex-shrink-0 sm:h-auto sm:w-40">
              <Image
                src={m.photo}
                alt={`${m.name}, ${m.role}`}
                fill
                className="object-cover object-[center_18%]"
                sizes="(max-width: 640px) 100vw, 160px"
              />
            </div>
            <div className="flex flex-col justify-center p-6">
              <h3 className="font-serif text-xl text-navy">{m.name}</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gold-ink">
                {m.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{m.bio}</p>
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  )
}
