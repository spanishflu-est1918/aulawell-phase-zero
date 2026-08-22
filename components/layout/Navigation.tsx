"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

type NavChild = { title: string; href: string; note?: string }
type NavItem = {
  title: string
  href?: string
  children?: NavChild[]
  // Panels near the right edge of the nav must open flush with the
  // trigger's right edge, or they overflow past the viewport (and even
  // while closed, an offscreen `invisible` panel still inflates the
  // page's scrollable width since `visibility:hidden` keeps layout).
  align?: "left" | "right"
}

const NAV: NavItem[] = [
  { title: "Home", href: "/" },
  {
    title: "Services",
    children: [
      { title: "School English", href: "/services/school-english" },
      { title: "Exam & Academic English", href: "/services/exam-academic-english" },
      { title: "English Qualifications", href: "/services/english-qualifications" },
      { title: "University Applications", href: "/services/university-applications" },
    ],
  },
  {
    title: "Aulawell Hub",
    children: [{ title: "Reading Hub", href: "/aulawell-hub", note: "Coming Soon" }],
  },
  {
    title: "About",
    align: "right",
    children: [
      { title: "About Aulawell", href: "/about" },
      { title: "Meet the Tutors", href: "/about/tutors" },
      { title: "How It Works", href: "/about/how-it-works" },
    ],
  },
]

// One shared style for every top-level label so desktop alignment, size,
// weight and line height are identical across links and dropdown triggers.
const topLabel =
  "flex h-16 items-center gap-1 px-3 text-[0.9rem] font-medium leading-none tracking-tight text-navy/90 transition-colors hover:text-gold-ink focus-visible:outline-none focus-visible:text-gold-ink"

export function Navigation() {
  const pathname = usePathname()
  const [openMenu, setOpenMenu] = React.useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  // Close menus on route change.
  React.useEffect(() => {
    setOpenMenu(null)
    setMobileOpen(false)
  }, [pathname])

  // Lock body scroll while the full-screen mobile menu is open.
  React.useEffect(() => {
    if (!mobileOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileOpen])

  return (
    <>
    <nav className="sticky top-0 z-50 w-full border-b border-navy/10 bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/80">
      <div className="mx-auto flex h-16 max-w-[1340px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center" aria-label="Aulawell home">
          <Image
            src="/aulawell-logo.png"
            alt="Aulawell"
            width={300}
            height={80}
            className="h-11 w-auto sm:h-12"
            priority
          />
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center md:flex">
          <ul className="flex items-center">
            {NAV.map((item) =>
              item.children ? (
                <li
                  key={item.title}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(item.title)}
                  onMouseLeave={() => setOpenMenu(null)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenMenu(null)
                  }}
                >
                  <button
                    type="button"
                    className={topLabel}
                    aria-haspopup="true"
                    aria-expanded={openMenu === item.title}
                    onClick={() =>
                      setOpenMenu((cur) => (cur === item.title ? null : item.title))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setOpenMenu(null)
                    }}
                  >
                    {item.title}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        openMenu === item.title && "rotate-180"
                      )}
                    />
                  </button>

                  <div
                    className={cn(
                      "absolute top-full min-w-[16rem] pt-2 transition-all duration-150",
                      item.align === "right" ? "right-0" : "left-0",
                      openMenu === item.title
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-1 opacity-0"
                    )}
                  >
                    <ul className="overflow-hidden rounded-xl border border-navy/10 bg-white p-1.5 shadow-xl shadow-navy/5">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="flex items-center justify-between gap-4 rounded-lg px-3.5 py-2.5 text-sm font-medium text-navy/85 transition-colors hover:bg-cream hover:text-gold-ink"
                          >
                            {child.title}
                            {child.note && (
                              <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-gold-ink">
                                {child.note}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.title}>
                  <Link href={item.href!} className={topLabel}>
                    {item.title}
                  </Link>
                </li>
              )
            )}
          </ul>

          <Link
            href="/book"
            className="ml-4 inline-flex h-10 items-center rounded-full bg-navy px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-navy-dark"
          >
            Book
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="rounded-lg p-2 text-navy transition-colors hover:bg-cream-panel md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
    </nav>

    {/* Mobile navigation — full-height drawer below the fixed header. Kept
        OUTSIDE <nav> deliberately: nav uses backdrop-blur, and
        backdrop-filter creates a new containing block for fixed-position
        descendants, which would collapse this drawer's height to 0. */}
      <div
        aria-hidden={!mobileOpen}
        className={cn(
          "fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col bg-cream md:hidden",
          "transition-all duration-300 ease-out",
          mobileOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0 pointer-events-none"
        )}
      >
        <div className="flex-1 overflow-y-auto overscroll-contain px-6 pb-4 pt-6">
          {NAV.map((item, i) => (
            <div
              key={item.title}
              className={cn(i > 0 && "mt-6 border-t border-navy/10 pt-6")}
            >
              {item.children ? (
                <>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gold-ink">
                    {item.title}
                  </p>
                  <div className="mt-1 flex flex-col">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-center gap-2 rounded-lg py-3 text-[1.05rem] font-medium text-navy/90 transition-colors active:text-gold-ink"
                      >
                        {child.title}
                        {child.note && (
                          <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-gold-ink">
                            {child.note}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={item.href!}
                  className="block py-1 text-lg font-semibold text-navy transition-colors active:text-gold-ink"
                >
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* CTA anchored at the bottom of the drawer, always reachable. */}
        <div className="border-t border-navy/10 bg-cream px-6 py-5">
          <Link
            href="/book"
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-navy text-sm font-semibold text-white shadow-sm transition-colors active:bg-navy-dark"
          >
            Book English Support
          </Link>
        </div>
      </div>
    </>
  )
}
