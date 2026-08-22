"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

type NavChild = { title: string; href: string; note?: string }
type NavItem = { title: string; href?: string; children?: NavChild[] }

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

  return (
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
                      "absolute left-0 top-full min-w-[16rem] pt-2 transition-all duration-150",
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

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className="border-t border-navy/10 bg-cream md:hidden">
          <div className="mx-auto max-w-[1340px] space-y-1 px-4 py-4 sm:px-6">
            {NAV.map((item) =>
              item.children ? (
                <div key={item.title} className="py-1">
                  <p className="px-1 pb-1 text-xs font-semibold uppercase tracking-widest text-gold-ink">
                    {item.title}
                  </p>
                  <div className="flex flex-col">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-center gap-2 rounded-lg px-1 py-2 text-[0.95rem] font-medium text-navy/85 hover:text-gold-ink"
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
                </div>
              ) : (
                <Link
                  key={item.title}
                  href={item.href!}
                  className="block rounded-lg px-1 py-2 text-[0.95rem] font-semibold text-navy hover:text-gold-ink"
                >
                  {item.title}
                </Link>
              )
            )}
            <Link
              href="/book"
              className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-full bg-navy px-6 text-sm font-semibold text-white"
            >
              Book
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
