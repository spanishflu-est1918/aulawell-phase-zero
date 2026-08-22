import Link from "next/link"
import Image from "next/image"
import { MessageCircle, Mail, MapPin } from "lucide-react"
import { CONTACT_INFO } from "@/lib/constants"

const paymentLogos = [
  { src: "/payment-logos/apple-pay.svg", alt: "Apple Pay", w: 50 },
  { src: "/payment-logos/visa.svg", alt: "Visa", w: 50 },
  { src: "/payment-logos/mastercard.svg", alt: "Mastercard", w: 50 },
  { src: "/payment-logos/google-pay.svg", alt: "Google Pay", w: 50 },
  { src: "/payment-logos/paypal.svg", alt: "PayPal", w: 50 },
  { src: "/payment-logos/revolut.svg", alt: "Revolut", w: 80 },
]

export function Footer() {
  return (
    <footer className="bg-navy-dark text-white">
      <div className="mx-auto max-w-[1340px] px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-serif text-2xl">Aulawell</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Premium English learning and mentoring for British and international
              learners worldwide. Academic excellence with wellbeing built in.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold">
              Services
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><FooterLink href="/services/school-english">School English</FooterLink></li>
              <li><FooterLink href="/services/exam-academic-english">Exam &amp; Academic English</FooterLink></li>
              <li><FooterLink href="/services/english-qualifications">English Qualifications</FooterLink></li>
              <li><FooterLink href="/services/university-applications">University Applications</FooterLink></li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold">
              Explore
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><FooterLink href="/about">About Aulawell</FooterLink></li>
              <li><FooterLink href="/about/tutors">Meet the Tutors</FooterLink></li>
              <li><FooterLink href="/about/how-it-works">How It Works</FooterLink></li>
              <li><FooterLink href="/aulawell-hub">Aulawell Hub</FooterLink></li>
              <li><FooterLink href="/book">Book English Support</FooterLink></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <MessageCircle className="h-4 w-4 text-white/50" />
                <a
                  href={`https://wa.me/${CONTACT_INFO.WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/75 transition-colors hover:text-white"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-white/50" />
                <a href={`mailto:${CONTACT_INFO.EMAIL}`} className="text-white/75 transition-colors hover:text-white">
                  {CONTACT_INFO.EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-white/50" />
                <span className="text-white/75">{CONTACT_INFO.LOCATION}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment + trust badges */}
        <div className="mt-12 border-t border-white/15 pt-8">
          <div className="mb-6 flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {paymentLogos.map((logo) => (
              <Image
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={logo.w}
                height={24}
                className="h-6 w-auto opacity-70 brightness-0 invert transition-opacity hover:opacity-100"
              />
            ))}
          </div>

          <div className="mb-8 flex flex-wrap items-center justify-center gap-6">
            <a
              href="https://www.gov.uk/government/organisations/disclosure-and-barring-service/about"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105"
            >
              <Image
                src="/images/badges/dbs-checked.png"
                alt="DBS Checked"
                width={150}
                height={75}
                className="h-16 w-auto opacity-70 brightness-0 invert transition-opacity hover:opacity-100"
              />
            </a>
            <a
              href="https://www.thetutorsassociation.org.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105"
            >
              <Image
                src="/images/badges/tutors-association.avif"
                alt="The Tutors&apos; Association Individual Member 2024-2025"
                width={80}
                height={30}
                className="h-10 w-auto opacity-70 brightness-0 invert transition-opacity hover:opacity-100"
              />
            </a>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 text-sm text-white/60 sm:flex-row">
            <p>&copy; {new Date().getFullYear()} Aulawell. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <FooterLink href="/enquire">Enquire</FooterLink>
              <FooterLink href="/privacy-policy">Privacy</FooterLink>
              <FooterLink href="/terms">Terms</FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-white/75 transition-colors hover:text-white">
      {children}
    </Link>
  )
}
