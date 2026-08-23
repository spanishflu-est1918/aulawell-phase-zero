import { Shield } from "lucide-react"
import { FadeIn } from "@/components/ui/fade-in"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - Aulawell Tuition",
  description: "Privacy Policy for Aulawell Tuition - Learn how we collect, use, and protect your personal information in accordance with GDPR regulations.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy via-navy/95 to-navy text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/student-studying.jpg')] opacity-20 bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/70 to-navy/90" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <div className="flex items-center gap-4 mb-6">
                <Shield className="h-12 w-12 text-gold" />
                <h1 className="text-5xl lg:text-6xl font-bold font-serif">
                  Privacy Policy
                </h1>
              </div>
              <p className="text-2xl lg:text-3xl font-light leading-relaxed text-white/90">
                Your privacy and data protection are our priority
              </p>
              <div className="mt-8 text-lg">
                <p className="text-white/80">
                  <strong>Effective Date:</strong> August 2025
                </p>
                <p className="text-white/80 mt-2">
                  <strong>Last Updated:</strong> August 2025
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <FadeIn delay={200}>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-slate-600 mb-8">
                  Aulawell (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard information when you use our website{" "}
                  <a href="https://www.aulawell.co" className="text-navy hover:text-gold underline">
                    https://www.aulawell.co
                  </a>{" "}
                  and our tutoring services.
                </p>

                <h2 className="text-3xl font-bold text-navy mt-12 mb-6 font-serif">
                  1. Information We Collect
                </h2>
                <p className="text-lg text-slate-600 mb-6">
                  We may collect the following types of personal information:
                </p>
                <ul className="text-lg text-slate-600 space-y-3 mb-8">
                  <li><strong>Identity Data:</strong> name, age, or student information.</li>
                  <li><strong>Contact Data:</strong> email address, and — only where you provide it and explicitly opt in — a WhatsApp number.</li>
                  <li><strong>Service Data:</strong> academic subjects requested, progress notes, feedback.</li>
                  <li><strong>Payment Data:</strong> if applicable, billing details (processed securely via third-party payment processors; we do not store credit card details).</li>
                  <li><strong>Technical Data:</strong> IP address, browser type, cookies, and analytics data.</li>
                </ul>

                <h2 className="text-3xl font-bold text-navy mt-12 mb-6 font-serif">
                  2. How We Use Your Information
                </h2>
                <p className="text-lg text-slate-600 mb-6">
                  We use your personal data to:
                </p>
                <ul className="text-lg text-slate-600 space-y-3 mb-8">
                  <li>Provide tutoring and academic support services.</li>
                  <li>Manage consultations, bookings, and payments.</li>
                  <li>Communicate with you (confirmations, updates, resources).</li>
                  <li>Message you on WhatsApp — only if you have explicitly opted in when providing your number, and only about the enquiry, consultation or booking you gave it for.</li>
                  <li>Send marketing emails (only if you have opted in).</li>
                  <li>Improve our services and website performance.</li>
                </ul>

                <h2 className="text-3xl font-bold text-navy mt-12 mb-6 font-serif">
                  3. Legal Basis for Processing
                </h2>
                <p className="text-lg text-slate-600 mb-6">
                  We process your data under the following GDPR bases:
                </p>
                <ul className="text-lg text-slate-600 space-y-3 mb-8">
                  <li><strong>Contract:</strong> to deliver the services you request.</li>
                  <li><strong>Consent:</strong> for marketing emails and communications.</li>
                  <li><strong>Legitimate Interest:</strong> to improve our offerings and protect website security.</li>
                  <li><strong>Legal Obligation:</strong> when required by law.</li>
                </ul>

                <h2 className="text-3xl font-bold text-navy mt-12 mb-6 font-serif">
                  4. Sharing Your Data
                </h2>
                <p className="text-lg text-slate-600 mb-6">
                  We do not sell or rent your personal information. Data may be shared with:
                </p>
                <ul className="text-lg text-slate-600 space-y-3 mb-8">
                  <li><strong>Service providers</strong> (e.g., payment processors, email platforms, scheduling tools).</li>
                  <li><strong>Legal authorities</strong> if required to comply with law or protect rights.</li>
                </ul>

                <h2 className="text-3xl font-bold text-navy mt-12 mb-6 font-serif">
                  5. Cookies & Analytics
                </h2>
                <p className="text-lg text-slate-600 mb-8">
                  Our website uses cookies and analytics tools to improve user experience. You can disable cookies in your browser settings.
                </p>

                <h2 className="text-3xl font-bold text-navy mt-12 mb-6 font-serif">
                  6. Data Retention
                </h2>
                <p className="text-lg text-slate-600 mb-8">
                  We keep your personal data only as long as necessary for the purposes outlined or to comply with legal obligations.
                </p>

                <h2 className="text-3xl font-bold text-navy mt-12 mb-6 font-serif">
                  7. Your Rights (EU/UK GDPR)
                </h2>
                <p className="text-lg text-slate-600 mb-6">
                  You have the right to:
                </p>
                <ul className="text-lg text-slate-600 space-y-3 mb-8">
                  <li>Access, correct, or delete your data.</li>
                  <li>Withdraw consent at any time.</li>
                  <li>Request data portability.</li>
                  <li>Lodge a complaint with your local data protection authority.</li>
                </ul>

                <h2 className="text-3xl font-bold text-navy mt-12 mb-6 font-serif">
                  8. Security
                </h2>
                <p className="text-lg text-slate-600 mb-8">
                  We use appropriate technical and organizational measures to protect your information.
                </p>

                <h2 className="text-3xl font-bold text-navy mt-12 mb-6 font-serif">
                  9. Children&apos;s Privacy
                </h2>
                <p className="text-lg text-slate-600 mb-8">
                  We do not knowingly collect personal data from children under 13 without parental consent.
                </p>

                <h2 className="text-3xl font-bold text-navy mt-12 mb-6 font-serif">
                  10. Contact Us
                </h2>
                <p className="text-lg text-slate-600 mb-6">
                  If you have questions about this Privacy Policy or how your data is handled, contact us at:
                </p>
                <div className="bg-slate-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-navy mb-4">Aulawell</h3>
                  <p className="text-lg text-slate-600 mb-2">
                    <strong>Email:</strong>{" "}
                    <a href="mailto:Aulawelltuition@gmail.com" className="text-navy hover:text-gold underline">
                      Aulawelltuition@gmail.com
                    </a>
                  </p>
                  <p className="text-lg text-slate-600">
                    <strong>Phone:</strong>{" "}
                    <a href="tel:+34641550069" className="text-navy hover:text-gold underline">
                      +34 641550069
                    </a>
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  )
}