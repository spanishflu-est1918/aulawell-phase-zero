"use client"

import { isValidWhatsApp } from "@/lib/phone"

const fieldClass =
  "w-full rounded-lg border border-navy/15 bg-white px-3.5 py-2.5 text-sm text-navy shadow-sm transition-colors placeholder:text-ink-soft/70 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"

export interface WhatsAppFieldProps {
  phone: string
  onPhoneChange: (value: string) => void
  consent: boolean
  onConsentChange: (value: boolean) => void
  idPrefix?: string
  label?: string
  required?: boolean
}

// A WhatsApp number input paired with an explicit opt-in checkbox, so
// consent is recorded at the point of capture rather than assumed. Reused on
// the enquiry form, the consultation booking form and the paid booking form.
export function WhatsAppField({
  phone,
  onPhoneChange,
  consent,
  onConsentChange,
  idPrefix = "whatsapp",
  label = "WhatsApp number",
  required = false,
}: WhatsAppFieldProps) {
  const showConsent = phone.trim().length > 0
  const invalid = showConsent && !isValidWhatsApp(phone)

  return (
    <div>
      <label htmlFor={idPrefix} className="mb-1.5 block text-sm font-medium text-navy">
        {label} {required && <span className="text-gold-ink">*</span>}
      </label>
      <input
        id={idPrefix}
        name={idPrefix}
        type="tel"
        value={phone}
        onChange={(e) => onPhoneChange(e.target.value)}
        placeholder="+34 600 000 000"
        className={fieldClass}
      />
      {invalid && (
        <p className="mt-1.5 text-xs text-red-600">
          Include your country code, e.g. +34 600 000 000.
        </p>
      )}
      {showConsent && !invalid && (
        <label className="mt-2.5 flex items-start gap-2.5 text-xs leading-relaxed text-ink-soft">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => onConsentChange(e.target.checked)}
            className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-navy/30 text-navy focus:ring-navy/30"
          />
          I agree to be contacted about this on WhatsApp.
        </label>
      )}
    </div>
  )
}
