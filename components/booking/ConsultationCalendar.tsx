"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { CalendarDays, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WhatsAppField } from "@/components/marketing/WhatsAppField"
import { isValidWhatsApp } from "@/lib/phone"
import { BOOKING_TIMEZONE } from "@/lib/booking/config"

interface SlotsResponse {
  configured?: boolean
  slots?: Record<string, string[]>
  error?: string
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]
const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
const STAGES = [
  "KS2", "KS3 (Years 7–9)", "US Middle School (Grades 6–8)", "GCSE / IGCSE",
  "A Level / IB / MYP", "IELTS / Cambridge", "University applications",
  "Adult learner", "Other",
]

function pad(n: number): string {
  return String(n).padStart(2, "0")
}
function monthKey(year: number, month: number): string {
  return `${year}-${pad(month + 1)}`
}
function slotTimeLabel(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit", minute: "2-digit", hour12: false, timeZone: BOOKING_TIMEZONE,
  }).format(new Date(iso))
}
function slotDayLabel(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short", day: "numeric", month: "short", timeZone: BOOKING_TIMEZONE,
  }).format(new Date(iso))
}

const fieldClass =
  "w-full rounded-lg border border-navy/15 bg-white px-3.5 py-2.5 text-sm text-navy shadow-sm transition-colors placeholder:text-ink-soft/70 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"

export default function ConsultationCalendar() {
  const today = useMemo(() => new Date(), [])
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [monthSlots, setMonthSlots] = useState<Record<string, Record<string, string[]>>>({})
  const [loadingMonth, setLoadingMonth] = useState(true)
  const [configured, setConfigured] = useState(true)
  const [loadError, setLoadError] = useState("")
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [whatsappConsent, setWhatsappConsent] = useState(false)
  const [stage, setStage] = useState("")
  const [topic, setTopic] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [success, setSuccess] = useState(false)

  const key = monthKey(viewYear, viewMonth)
  const slots = monthSlots[key]

  const loadMonth = useCallback(async (year: number, month: number) => {
    const mKey = monthKey(year, month)
    const lastDay = new Date(year, month + 1, 0).getDate()
    setLoadingMonth(true)
    setLoadError("")
    try {
      const params = new URLSearchParams({ start: `${mKey}-01`, end: `${mKey}-${pad(lastDay)}` })
      const res = await fetch(`/api/consultation/slots?${params}`)
      const data: SlotsResponse = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Request failed")
      setConfigured(data.configured !== false)
      setMonthSlots((prev) => ({ ...prev, [mKey]: data.slots ?? {} }))
    } catch {
      setLoadError("failed")
    } finally {
      setLoadingMonth(false)
    }
  }, [])

  useEffect(() => {
    loadMonth(viewYear, viewMonth)
  }, [viewYear, viewMonth, loadMonth])

  const changeMonth = (delta: number) => {
    const d = new Date(viewYear, viewMonth + delta, 1)
    if (d < new Date(today.getFullYear(), today.getMonth(), 1)) return
    setViewYear(d.getFullYear())
    setViewMonth(d.getMonth())
    setSelectedDay(null)
  }

  const handleSubmit = async () => {
    setSubmitError("")
    if (!name.trim() || !email.trim()) {
      setSubmitError("Please enter your name and email.")
      return
    }
    if (!selected) {
      setSubmitError("Please choose a time.")
      return
    }
    if (phone.trim() && isValidWhatsApp(phone) && !whatsappConsent) {
      setSubmitError("Please confirm you're happy to be contacted on WhatsApp, or leave the number blank.")
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slot: selected, name, email, phone, whatsappConsent, stage, topic }),
      })
      const data: { ok?: boolean; error?: string } = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Could not book that time")
      setSuccess(true)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong, please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (!configured) {
    return (
      <div className="rounded-2xl border border-navy/12 bg-white p-10 text-center shadow-sm">
        <CalendarDays className="mx-auto mb-4 h-10 w-10 text-gold" />
        <h3 className="mb-2 font-serif text-xl text-navy">Consultation booking is almost ready</h3>
        <p className="mx-auto max-w-md text-ink-soft">
          We&apos;re putting the finishing touches on this. In the meantime,{" "}
          <Link href="/enquire" className="text-navy underline underline-offset-4 hover:text-gold-ink">
            send us an enquiry
          </Link>{" "}
          and we&apos;ll arrange a time personally.
        </p>
      </div>
    )
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-navy/12 bg-white p-10 text-center shadow-sm">
        <CalendarDays className="mx-auto mb-4 h-10 w-10 text-gold" />
        <h3 className="mb-2 font-serif text-xl text-navy">Your consultation is booked</h3>
        <p className="mx-auto max-w-md text-ink-soft">
          We&apos;ve sent a calendar invite to {email}. We look forward to speaking with you.
        </p>
      </div>
    )
  }

  const firstOfMonth = new Date(viewYear, viewMonth, 1)
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const leadingBlanks = (firstOfMonth.getDay() + 6) % 7
  const cells: Array<string | null> = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => `${key}-${pad(i + 1)}`),
  ]
  const daySlots = selectedDay && slots ? slots[selectedDay] ?? [] : []

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-serif text-xl text-navy">{MONTH_NAMES[viewMonth]} {viewYear}</h3>
          <div className="flex gap-2">
            <button
              onClick={() => changeMonth(-1)}
              aria-label="Previous month"
              className="rounded-lg border border-navy/15 p-2 text-navy transition-colors hover:bg-cream-panel disabled:opacity-40"
              disabled={viewYear === today.getFullYear() && viewMonth === today.getMonth()}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => changeMonth(1)}
              aria-label="Next month"
              className="rounded-lg border border-navy/15 p-2 text-navy transition-colors hover:bg-cream-panel"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {loadError && (
          <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            We couldn&apos;t load the calendar. Please try again in a moment.
          </p>
        )}

        <div className="grid grid-cols-7 gap-1 text-center">
          {WEEKDAYS.map((d) => (
            <div key={d} className="py-2 text-xs font-semibold uppercase tracking-wide text-ink-soft/70">
              {d}
            </div>
          ))}
          {cells.map((date, i) => {
            if (!date) return <div key={`blank-${i}`} />
            const available = Boolean(slots?.[date]?.length)
            const isSelectedDay = selectedDay === date
            const hasChosen = selected && slots?.[date]?.includes(selected)
            return (
              <button
                key={date}
                onClick={() => available && setSelectedDay(isSelectedDay ? null : date)}
                disabled={!available}
                className={`relative aspect-square rounded-lg text-sm font-medium transition-colors ${
                  isSelectedDay ? "bg-navy text-white" : available ? "bg-cream-panel/60 text-navy hover:bg-gold/20" : "text-ink-soft/40"
                }`}
              >
                {Number(date.slice(-2))}
                {(available || hasChosen) && (
                  <span className={`absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full ${hasChosen ? "bg-gold" : isSelectedDay ? "bg-white" : "bg-gold/60"}`} />
                )}
              </button>
            )
          })}
        </div>

        {loadingMonth && (
          <p className="mt-4 flex items-center gap-2 text-sm text-ink-soft">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading availability…
          </p>
        )}

        {selectedDay && !loadingMonth && (
          <div className="mt-6">
            <h4 className="mb-3 font-semibold text-navy">
              Available times — {slotDayLabel(daySlots[0] ?? `${selectedDay}T12:00:00`)}
              <span className="ml-2 text-xs font-normal text-ink-soft/70">(Madrid time)</span>
            </h4>
            {daySlots.length === 0 ? (
              <p className="text-sm text-ink-soft">No times available on this day.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {daySlots.map((iso) => {
                  const chosen = selected === iso
                  return (
                    <button
                      key={iso}
                      onClick={() => setSelected(iso)}
                      className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                        chosen ? "border-navy bg-navy text-white" : "border-navy/15 text-navy hover:border-gold hover:bg-gold/10"
                      }`}
                    >
                      {slotTimeLabel(iso)}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>

      <aside className="h-fit rounded-2xl border border-navy/12 bg-white p-6 shadow-sm">
        <h4 className="mb-4 font-serif text-lg text-navy">Your details</h4>
        {selected ? (
          <p className="mb-4 rounded-lg bg-cream-panel/60 px-3 py-2 text-sm text-navy">
            {slotDayLabel(selected)}, {slotTimeLabel(selected)}
          </p>
        ) : (
          <p className="mb-4 text-sm text-ink-soft">Pick a time from the calendar to continue.</p>
        )}

        <div className="space-y-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" aria-label="Name" className={fieldClass} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email address" aria-label="Email address" className={fieldClass} />
          <WhatsAppField
            phone={phone}
            onPhoneChange={setPhone}
            consent={whatsappConsent}
            onConsentChange={setWhatsappConsent}
            idPrefix="consultation-whatsapp"
          />
          <select value={stage} onChange={(e) => setStage(e.target.value)} aria-label="Learner stage" className={fieldClass}>
            <option value="">Learner stage (optional)</option>
            {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="What would you like to talk about?"
            rows={3}
            className={fieldClass}
          />
          <Button onClick={handleSubmit} disabled={submitting} className="w-full">
            {submitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Booking…
              </span>
            ) : (
              "Book Free Consultation"
            )}
          </Button>
          {submitError && <p className="text-sm text-red-600">{submitError}</p>}
        </div>
      </aside>
    </div>
  )
}
