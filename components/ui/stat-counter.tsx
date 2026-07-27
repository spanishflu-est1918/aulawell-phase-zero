"use client"

import { useEffect, useRef, useState } from "react"

interface StatCounterProps {
  value: number
  suffix?: string
  durationMs?: number
}

// Rolls from 0 to value the first time it scrolls into view. Users who
// prefer reduced motion see the final number immediately.
export function StatCounter({ value, suffix = "", durationMs = 1600 }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || started.current) return
        started.current = true
        observer.disconnect()
        const startTime = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - startTime) / durationMs, 1)
          const eased = 1 - Math.pow(1 - t, 3)
          setDisplay(Math.round(eased * value))
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value, durationMs])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}
