// Shared class strings for consistent, premium call-to-action styling.

export const ctaBase =
  "inline-flex h-12 items-center justify-center rounded-full px-7 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-navy/40"

// Navy filled — primary action on light backgrounds.
export const ctaPrimary = `${ctaBase} bg-navy text-white shadow-sm hover:bg-navy-dark`

// Outline — secondary action on light backgrounds.
export const ctaSecondary = `${ctaBase} border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-white`

// Gold filled — used sparingly for emphasis.
export const ctaGold = `${ctaBase} bg-gold text-navy shadow-sm hover:bg-gold/90`

// On dark (navy) sections.
export const ctaOnNavy = `${ctaBase} bg-gold text-navy shadow-sm hover:bg-gold/90`
export const ctaOnNavyGhost = `${ctaBase} border border-white/25 text-white hover:bg-white/10`
