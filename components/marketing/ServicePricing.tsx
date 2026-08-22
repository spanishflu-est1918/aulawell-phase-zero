import {
  AULAWELL_TUTOR_PRICES,
  HEAD_TUTOR_PRICES,
  PRICING_NOTE,
  CURRENCY_SYMBOL,
} from "@/lib/pricing"

function money(n: number) {
  return `From ${CURRENCY_SYMBOL}${n}`
}

// Two-tier "From" pricing table for a core tuition service (School / Exam).
export function ServicePricing({
  priceRow,
}: {
  priceRow: "School English" | "Exam English"
}) {
  const tutor = AULAWELL_TUTOR_PRICES.find((r) => r.service === priceRow)
  const head = HEAD_TUTOR_PRICES.find((r) => r.service === priceRow)
  if (!tutor || !head) return null

  const rows = [
    { label: "Aulawell Tutor", data: tutor },
    { label: "Head Tutor — Amy", data: head },
  ]

  return (
    <div className="mx-auto max-w-3xl">
      <div className="overflow-hidden rounded-2xl border border-navy/12 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-navy text-white">
              <th className="px-5 py-4 font-semibold">Educator</th>
              <th className="px-5 py-4 text-right font-semibold">Single</th>
              <th className="px-5 py-4 text-right font-semibold">5 lessons</th>
              <th className="px-5 py-4 text-right font-semibold">First 10 lessons</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.label} className={i === 1 ? "border-t border-navy/10" : ""}>
                <td className="px-5 py-4 font-medium text-navy">{row.label}</td>
                <td className="px-5 py-4 text-right text-ink">{money(row.data.single)}</td>
                <td className="px-5 py-4 text-right text-ink">{money(row.data.five)}</td>
                <td className="px-5 py-4 text-right text-ink">{money(row.data.ten)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-ink-soft">{PRICING_NOTE}</p>
    </div>
  )
}
