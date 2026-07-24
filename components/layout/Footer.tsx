import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"
import { CONTACT_INFO } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Aulawell Tuition</h3>
            <p className="text-slate-300 mb-4">
              Bespoke tutoring service offering premium tuition to children of all ages and nationalities.
              We help students achieve academic excellence and build confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-slate-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/book" className="text-slate-300 hover:text-white transition-colors">
                  Book a Lesson
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-slate-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-300 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-400" />
                <a href={CONTACT_INFO.PHONE_HREF} className="text-slate-300 hover:text-white transition-colors">
                  {CONTACT_INFO.PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-400" />
                <a href={`mailto:${CONTACT_INFO.EMAIL}`} className="text-slate-300 hover:text-white transition-colors">
                  {CONTACT_INFO.EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-400" />
                <span className="text-slate-300">{CONTACT_INFO.LOCATION}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods and Badges */}
        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mb-6">
            <Image
              src="/payment-logos/apple-pay.svg"
              alt="Apple Pay"
              width={50}
              height={24}
              className="h-6 w-auto brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
            />
            <Image
              src="/payment-logos/visa.svg"
              alt="Visa"
              width={50}
              height={24}
              className="h-6 w-auto brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
            />
            <Image
              src="/payment-logos/mastercard.svg"
              alt="Mastercard"
              width={50}
              height={24}
              className="h-6 w-auto brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
            />
            <Image
              src="/payment-logos/google-pay.svg"
              alt="Google Pay"
              width={50}
              height={24}
              className="h-6 w-auto brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
            />
            <Image
              src="/payment-logos/paypal.svg"
              alt="PayPal"
              width={50}
              height={24}
              className="h-6 w-auto brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
            />
            <Image
              src="/payment-logos/revolut.svg"
              alt="Revolut"
              width={80}
              height={24}
              className="h-6 w-auto brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
          
          {/* Badges */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-6">
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
                className="h-20 w-auto brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
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
                className="h-10 w-auto brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
              />
            </a>
          </div>
          
          <div className="text-center text-white/70">
            <p>&copy; {new Date().getFullYear()} Aulawell Tuition. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}