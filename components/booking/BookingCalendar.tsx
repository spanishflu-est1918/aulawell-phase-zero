"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CalendarDays, ChevronLeft, ChevronRight, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WhatsAppField } from "@/components/marketing/WhatsAppField"
import { isValidWhatsApp } from "@/lib/phone"
import {
  BOOKING_TIMEZONE,
  DEFAULT_TIER,
  MAX_LESSONS_PER_CHECKOUT,
  TUTOR_TIERS,
  type TutorTier,
  bundleUnitCents,
  formatPrice,
  isTutorTier,
} from "@/lib/booking/config"

interface SlotsResponse {
  configured?: boolean
  tierAvailable?: boolean
  priceCents?: number
  customRate?: boolean
  currency?: string
  postPay?: boolean
  slots?: Record<string, string[]>
  error?: string
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]
const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]

function pad(n: number): string {
  return String(n).padStart(2, "0")
}

function monthKey(year: number, month: number): string {
  return `${year}-${pad(month + 1)}`
}

function slotTimeLabel(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: BOOKING_TIMEZONE,
  }).format(new Date(iso))
}

function slotDayLabel(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: BOOKING_TIMEZONE,
  }).format(new Date(iso))
}

export default function BookingCalendar() {
  const searchParams = useSearchParams()
  const rate = searchParams.get("rate") ?? ""
  const cancelled = searchParams.get("cancelled") === "1"
  const tierParam = searchParams.get("tier")
  // Which service page the visitor came from — only affects Head Tutor
  // pricing (school vs exam), see lib/booking/rates.ts.
  const service = searchParams.get("service") ?? ""

  const today = useMemo(() => new Date(), [])
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [monthSlots, setMonthSlots] = useState<Record<string, Record<string, string[]>>>({})
  const [loadingMonth, setLoadingMonth] = useState(true)
  const [configured, setConfigured] = useState(true)
  const [loadError, setLoadError] = useState("")
  const [priceCents, setPriceCents] = useState<number | null>(null)
  const [postPay, setPostPay] = useState(false)
  const [customRate, setCustomRate] = useState(false)
  const [tier, setTier] = useState<TutorTier>(isTutorTier(tierParam) ? tierParam : DEFAULT_TIER)
  const [tierAvailable, setTierAvailable] = useState(true)
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [selected, setSelected] = useState<string[]>([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [whatsappConsent, setWhatsappConsent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const key = monthKey(viewYear, viewMonth)
  // Availability differs per tutor, so the cache is keyed by tier too.
  const slots = monthSlots[`${tier}:${key}`]

  const loadMonth = useCallback(async (year: number, month: number) => {
    const mKey = monthKey(year, month)
    const lastDay = new Date(year, month + 1, 0).getDate()
    setLoadingMonth(true)
    setLoadError("")
    try {
      const params = new URLSearchParams({
        start: `${mKey}-01`,
        end: `${mKey}-${pad(lastDay)}`,
        tier,
      })
      if (rate) params.set("rate", rate)
      if (service) params.set("service", service)
      const res = await fetch(`/api/slots?${params}`)
      const data: SlotsResponse = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Request failed")
      setConfigured(data.configured !== false)
      setTierAvailable(data.tierAvailable !== false)
      if (typeof data.priceCents === "number") setPriceCents(data.priceCents)
      setPostPay(data.postPay === true)
      setCustomRate(data.customRate === true)
      setMonthSlots((prev) => ({ ...prev, [`${tier}:${mKey}`]: data.slots ?? {} }))
    } catch {
      setLoadError("failed")
    } finally {
      setLoadingMonth(false)
    }
  }, [rate, tier, service])

  useEffect(() => {
    loadMonth(viewYear, viewMonth)
  }, [viewYear, viewMonth, loadMonth])

  const switchTier = (next: TutorTier) => {
    if (next === tier) return
    setTier(next)
    // Selected times belong to the other tutor's calendar.
    setSelected([])
    setSelectedDay(null)
    setSubmitError("")
  }

  const changeMonth = (delta: number) => {
    const d = new Date(viewYear, viewMonth + delta, 1)
    // Don&apos;t navigate into the past.
    if (d < new Date(today.getFullYear(), today.getMonth(), 1)) return
    setViewYear(d.getFullYear())
    setViewMonth(d.getMonth())
    setSelectedDay(null)
  }

  const toggleSlot = (iso: string) => {
    setSubmitError("")
    setSelected((prev) =>
      prev.includes(iso)
        ? prev.filter((s) => s !== iso)
        : prev.length < MAX_LESSONS_PER_CHECKOUT
          ? [...prev, iso].sort()
          : prev
    )
  }

  const handleCheckout = async () => {
    setSubmitError("")
    if (!name.trim() || !email.trim()) {
      setSubmitError("Please enter your name and email so we can confirm your lessons.")
      return
    }
    if (phone.trim() && isValidWhatsApp(phone) && !whatsappConsent) {
      setSubmitError("Please confirm you're happy to be contacted on WhatsApp, or leave the number blank.")
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slots: selected,
          name,
          email,
          phone: phone || undefined,
          whatsappConsent,
          rate: rate || undefined,
          tier,
          service: service || undefined,
        }),
      })
      const data: { url?: string; error?: string } = await res.json()
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Could not start the payment")
      }
      window.location.assign(data.url)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong, please try again.")
      setSubmitting(false)
    }
  }

  if (!configured) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-10 text-center">
        <CalendarDays className="mx-auto mb-4 h-10 w-10 text-gold" />
        <h3 className="mb-2 text-xl font-semibold text-navy">Online booking is almost ready</h3>
        <p className="mx-auto max-w-md text-slate-600">
          We&apos;re putting the finishing touches on online booking. In the meantime,{" "}
          <Link href="/enquire" className="text-navy underline underline-offset-4 hover:text-gold transition-colors">
            send us an enquiry
          </Link>{" "}
          and we&apos;ll arrange your lessons personally.
        </p>
      </div>
    )
  }

  // Build the month grid (Monday-first).
  const firstOfMonth = new Date(viewYear, viewMonth, 1)
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const leadingBlanks = (firstOfMonth.getDay() + 6) % 7
  const cells: Array<string | null> = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => `${key}-${pad(i + 1)}`),
  ]

  const daySlots = selectedDay && slots ? slots[selectedDay] ?? [] : []
  // Families with a negotiated rate keep it as-is; everyone else gets the
  // bundle discount at 5+ / 10+ lessons — mirroring the server's maths.
  const unitCents =
    priceCents !== null
      ? customRate
        ? priceCents
        : bundleUnitCents(priceCents, selected.length)
      : null
  const total = unitCents !== null ? unitCents * selected.length : null
  const savings =
    priceCents !== null && unitCents !== null ? (priceCents - unitCents) * selected.length : 0

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div>
        {cancelled && (
          <p className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Your payment was cancelled — your lessons haven&apos;t been booked. Pick your dates again whenever you&apos;re ready.
          </p>
        )}

        {/* Tutor tier switcher */}
        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          {(Object.keys(TUTOR_TIERS) as TutorTier[]).map((t) => {
            const info = TUTOR_TIERS[t]
            const active = t === tier
            const shownPrice =
              active && priceCents !== null ? priceCents : info.priceCents
            return (
              <button
                key={t}
                onClick={() => switchTier(t)}
                aria-pressed={active}
                className={`rounded-xl border p-4 text-left transition-colors ${
                  active
                    ? "border-navy bg-navy text-white"
                    : "border-slate-200 bg-white text-navy hover:border-gold"
                }`}
              >
                <span className="block font-semibold">{info.label}</span>
                <span className={`block text-sm ${active ? "text-gray-200" : "text-slate-500"}`}>
                  {info.description}
                </span>
                <span className={`mt-1 block text-sm font-semibold ${active ? "text-gold" : "text-navy"}`}>
                  {formatPrice(shownPrice)} / lesson
                </span>
              </button>
            )
          })}
        </div>

        {!tierAvailable && !loadingMonth ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center">
            <CalendarDays className="mx-auto mb-4 h-8 w-8 text-gold" />
            <h4 className="mb-2 text-lg font-semibold text-navy">
              Associate tutor lessons are arranged personally
            </h4>
            <p className="mx-auto max-w-md text-slate-600">
              Online booking for this associate tutor option is coming soon. For now,{" "}
              <Link href="/enquire" className="text-navy underline underline-offset-4 hover:text-gold transition-colors">
                send us an enquiry
              </Link>{" "}
              and we&apos;ll match you with a tutor and arrange times directly.
            </p>
          </div>
        ) : (
        <>
        {/* Month header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-navy">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => changeMonth(-1)}
              aria-label="Previous month"
              className="rounded-lg border border-slate-200 p-2 text-navy transition-colors hover:bg-slate-50 disabled:opacity-40"
              disabled={viewYear === today.getFullYear() && viewMonth === today.getMonth()}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => changeMonth(1)}
              aria-label="Next month"
              className="rounded-lg border border-slate-200 p-2 text-navy transition-colors hover:bg-slate-50"
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

        {/* Day grid */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {WEEKDAYS.map((d) => (
            <div key={d} className="py-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              {d}
            </div>
          ))}
          {cells.map((date, i) => {
            if (!date) return <div key={`blank-${i}`} />
            const available = Boolean(slots?.[date]?.length)
            const isSelectedDay = selectedDay === date
            const hasChosen = selected.some((s) => slots?.[date]?.includes(s))
            return (
              <button
                key={date}
                onClick={() => available && setSelectedDay(isSelectedDay ? null : date)}
                disabled={!available}
                className={`relative aspect-square rounded-lg text-sm font-medium transition-colors ${
                  isSelectedDay
                    ? "bg-navy text-white"
                    : available
                      ? "bg-slate-50 text-navy hover:bg-gold/20"
                      : "text-slate-300"
                }`}
              >
                {Number(date.slice(-2))}
                {(available || hasChosen) && (
                  <span
                    className={`absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full ${
                      hasChosen ? "bg-gold" : isSelectedDay ? "bg-white" : "bg-gold/60"
                    }`}
                  />
                )}
              </button>
            )
          })}
        </div>

        {loadingMonth && (
          <p className="mt-4 flex items-center gap-2 text-sm text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading availability…
          </p>
        )}

        {/* Time slots for the selected day */}
        {selectedDay && !loadingMonth && (
          <div className="mt-6">
            <h4 className="mb-3 font-semibold text-navy">
              Available times — {slotDayLabel(daySlots[0] ?? `${selectedDay}T12:00:00`)}
              <span className="ml-2 text-xs font-normal text-slate-400">(Madrid time)</span>
            </h4>
            {daySlots.length === 0 ? (
              <p className="text-sm text-slate-500">No times available on this day.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {daySlots.map((iso) => {
                  const chosen = selected.includes(iso)
                  return (
                    <button
                      key={iso}
                      onClick={() => toggleSlot(iso)}
                      className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                        chosen
                          ? "border-navy bg-navy text-white"
                          : "border-slate-200 text-navy hover:border-gold hover:bg-gold/10"
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
        </>
        )}
      </div>

      {/* Selection summary + checkout */}
      <aside className="h-fit rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h4 className="mb-4 font-semibold text-navy">Your lessons</h4>
        {selected.length === 0 ? (
          <p className="text-sm text-slate-500">
            Pick one or more dates and times from the calendar — you pay for exactly the lessons you book.
          </p>
        ) : (
          <ul className="mb-4 space-y-2">
            {selected.map((iso) => (
              <li key={iso} className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-sm">
                <span className="text-slate-700">
                  {slotDayLabel(iso)}, {slotTimeLabel(iso)}
                </span>
                <button
                  onClick={() => toggleSlot(iso)}
                  aria-label={`Remove ${slotDayLabel(iso)} ${slotTimeLabel(iso)}`}
                  className="text-slate-400 transition-colors hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}

        {selected.length > 0 && (
          <>
            {total !== null && unitCents !== null && (
              <div className="mb-4 border-t border-slate-200 pt-4 text-sm text-slate-700">
                <p>
                  {selected.length} lesson{selected.length > 1 ? "s" : ""} ×{" "}
                  {formatPrice(unitCents)} ={" "}
                  <span className="font-semibold text-navy">{formatPrice(total)}</span>
                </p>
                {savings > 0 && (
                  <p className="mt-1 text-xs font-medium text-green-700">
                    Bundle price applied &mdash; you save {formatPrice(savings)}
                  </p>
                )}
              </div>
            )}
            <div className="space-y-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Parent / student name"
                aria-label="Parent or student name"
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                aria-label="Email address"
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy"
              />
              <WhatsAppField
                phone={phone}
                onPhoneChange={setPhone}
                consent={whatsappConsent}
                onConsentChange={setWhatsappConsent}
                idPrefix="booking-whatsapp"
              />
              <Button onClick={handleCheckout} disabled={submitting} className="w-full">
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Redirecting…
                  </span>
                ) : postPay ? (
                  "Book lessons"
                ) : (
                  "Book & pay securely"
                )}
              </Button>
              {submitError && <p className="text-sm text-red-600">{submitError}</p>}
              <p className="text-xs text-slate-400">
                {postPay
                  ? "No payment needed today — you will receive an invoice by email after each lesson."
                  : "Payment is processed securely by Stripe. Your card details never touch this website."}
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
