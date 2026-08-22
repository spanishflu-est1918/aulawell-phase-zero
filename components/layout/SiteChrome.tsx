"use client"

import { usePathname } from "next/navigation"
import { Navigation } from "@/components/layout/Navigation"
import { ContactBar } from "@/components/layout/ContactBar"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppButton } from "@/components/WhatsAppButton"

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isPreview = pathname.startsWith("/rebuild-preview") || pathname.startsWith("/website-mockup")

  if (isPreview) return <>{children}</>

  return (
    <div className="flex min-h-screen flex-col">
      <ContactBar />
      <Navigation />
      <main className="flex-grow">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
