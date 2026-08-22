"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { CONTACT_INFO, WEB3FORMS_ACCESS_KEY } from "@/lib/constants"

const TOPICS = [
  "Not sure which service fits",
  "School English",
  "Exam & Academic English",
  "English Qualifications (IELTS / Cambridge)",
  "University Applications",
  "In-person tuition (Madrid / Lisbon)",
  "Complex or additional learning needs",
  "School or agency partnership",
  "Aulawell Hub / Reading Hub waitlist",
]

const STAGES = [
  "KS2",
  "KS3 (Years 7–9)",
  "US Middle School (Grades 6–8)",
  "GCSE / IGCSE",
  "A Level / IB / MYP",
  "IELTS / Cambridge",
  "University applications",
  "Adult learner",
  "Other",
]

// Map ?interest= / ?service= query params to a default topic.
function defaultTopic(interest: string | null, service: string | null): string {
  const key = (interest || service || "").toLowerCase()
  if (key.includes("hub") || key.includes("reading")) return TOPICS[8]
  if (key.includes("school-english")) return TOPICS[1]
  if (key.includes("exam")) return TOPICS[2]
  if (key.includes("english-qualifications") || key.includes("ielts") || key.includes("cambridge"))
    return TOPICS[3]
  if (key.includes("university")) return TOPICS[4]
  if (key.includes("in-person") || key.includes("madrid") || key.includes("lisbon")) return TOPICS[5]
  if (key.includes("partnership") || key.includes("agency") || key.includes("school-contract"))
    return TOPICS[7]
  return ""
}

const fieldClass =
  "w-full rounded-lg border border-navy/15 bg-white px-3.5 py-2.5 text-sm text-navy shadow-sm transition-colors placeholder:text-ink-soft/70 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"

export function EnquireForm() {
  const params = useSearchParams()
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: defaultTopic(params.get("interest"), params.get("service")),
    stage: "",
    location: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  function update(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("sending")

    // Primary path: our server route records the enquiry in Airtable and sends
    // the internal notification. Falls back to Web3Forms / the visitor's email
    // client so the form is never a dead end.
    try {
      const res = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) throw new Error("submit failed")
      setStatus("success")
      setForm({ name: "", email: "", phone: "", topic: "", stage: "", location: "", message: "" })
      return
    } catch {
      // Fall through to the client-side fallback below.
    }

    if (WEB3FORMS_ACCESS_KEY) {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `New Aulawell enquiry — ${form.topic || "General"}`,
            from_name: form.name,
            ...form,
          }),
        })
        const data = await res.json()
        if (!res.ok || !data.success) throw new Error("submit failed")
        setStatus("success")
        setForm({ name: "", email: "", phone: "", topic: "", stage: "", location: "", message: "" })
        return
      } catch {
        // fall through to mailto
      }
    }

    const subject = encodeURIComponent(`Aulawell enquiry from ${form.name}`)
    const emailBody = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nEnquiry about: ${form.topic}\nLearner stage: ${form.stage}\nLocation / time zone: ${form.location}\n\n${form.message}`
    )
    window.location.href = `mailto:${CONTACT_INFO.EMAIL}?subject=${subject}&body=${emailBody}`
    setStatus("idle")
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-navy/12 bg-white p-8 shadow-sm">
        <h2 className="font-serif text-2xl text-navy">Thank you — your enquiry is on its way.</h2>
        <p className="mt-3 text-ink">
          We&apos;ll be in touch personally, usually within one working day. If it&apos;s
          urgent, you can also reach us on WhatsApp or by email.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <a
            href={`https://wa.me/${CONTACT_INFO.WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-gold-ink hover:text-navy"
          >
            Message on WhatsApp
          </a>
          <span className="text-navy/20">·</span>
          <a href={`mailto:${CONTACT_INFO.EMAIL}`} className="font-semibold text-gold-ink hover:text-navy">
            {CONTACT_INFO.EMAIL}
          </a>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-navy/12 bg-white p-7 shadow-sm sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-navy">
            Name *
          </label>
          <input id="name" name="name" required value={form.name} onChange={update} className={fieldClass} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy">
            Email *
          </label>
          <input id="email" name="email" type="email" required value={form.email} onChange={update} className={fieldClass} />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-navy">
            Phone / WhatsApp
          </label>
          <input id="phone" name="phone" type="tel" value={form.phone} onChange={update} className={fieldClass} />
        </div>
        <div>
          <label htmlFor="topic" className="mb-1.5 block text-sm font-medium text-navy">
            What are you enquiring about? *
          </label>
          <select id="topic" name="topic" required value={form.topic} onChange={update} className={fieldClass}>
            <option value="">Select an option</option>
            {TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="stage" className="mb-1.5 block text-sm font-medium text-navy">
            Learner stage
          </label>
          <select id="stage" name="stage" value={form.stage} onChange={update} className={fieldClass}>
            <option value="">Select (optional)</option>
            {STAGES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="location" className="mb-1.5 block text-sm font-medium text-navy">
            Location &amp; time zone
          </label>
          <input
            id="location"
            name="location"
            value={form.location}
            onChange={update}
            placeholder="e.g. Madrid, or GMT+1"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy">
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={update}
          placeholder="Tell us about your learner, their goals and anything we should know."
          className={fieldClass}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-navy px-7 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-navy-dark disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send Enquiry"}
      </button>

      {status === "error" && (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Sorry, your enquiry couldn&apos;t be sent. Please email us directly at{" "}
          <a href={`mailto:${CONTACT_INFO.EMAIL}`} className="underline underline-offset-2">
            {CONTACT_INFO.EMAIL}
          </a>
          .
        </p>
      )}
    </form>
  )
}
