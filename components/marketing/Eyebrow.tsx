import { cn } from "@/lib/utils"

// Small uppercase gold label with a short rule, used above section headings.
export function Eyebrow({
  children,
  className,
  onDark = false,
}: {
  children: React.ReactNode
  className?: string
  onDark?: boolean
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em]",
        onDark ? "text-gold" : "text-gold-ink",
        className
      )}
    >
      <span className={cn("h-px w-8", onDark ? "bg-gold/70" : "bg-gold-ink/50")} />
      {children}
    </span>
  )
}
