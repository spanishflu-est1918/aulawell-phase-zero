import { FileText } from "lucide-react"
import { FadeIn } from "@/components/ui/fade-in"
import { OFFER_RULES } from "@/lib/pricing"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Conditions - Aulawell Tuition",
  description: "Terms and Conditions for Aulawell Tuition - Understand our service terms, booking policies, payment options, and student responsibilities.",
}

export default function TermsPage() {
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
                <FileText className="h-12 w-12 text-gold" />
                <h1 className="text-5xl lg:text-6xl font-bold font-serif">
                  Terms & Conditions
                </h1>
              </div>
              <p className="text-2xl lg:text-3xl font-light leading-relaxed text-white/90">
                Service terms and conditions for our tutoring services
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
                  Welcome to Aulawell (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). These Terms and Conditions (&quot;Terms&quot;) govern your use of our website{" "}
                  <a href="https://www.aulawell.co" className="text-navy hover:text-gold underline">
                    https://www.aulawell.co
                  </a>{" "}
                  and the tutoring services we provide. By using our services, you agree to these Terms. Please read them carefully.
                </p>

                <div className="border-t border-slate-200 my-8"></div>

                <h2 className="text-3xl font-bold text-navy mt-12 mb-6 font-serif">
                  1. Services Provided
                </h2>
                <ul className="text-lg text-slate-600 space-y-3 mb-8">
                  <li>We provide academic tutoring, coaching, and educational support online and/or in person.</li>
                  <li>Specific details of each service (subject, level, duration, frequency) will be agreed upon in writing (e.g., consultation email, booking confirmation).</li>
                </ul>

                <div className="border-t border-slate-200 my-8"></div>

                <h2 className="text-3xl font-bold text-navy mt-12 mb-6 font-serif">
                  2. Booking and Payment
                </h2>
                <ul className="text-lg text-slate-600 space-y-3 mb-6">
                  <li>All lessons must be booked in advance through our scheduling system or by direct agreement.</li>
                  <li>We offer two payment options:</li>
                </ul>
                <div className="ml-6 mb-6">
                  <p className="text-lg text-slate-600 mb-2">
                    <strong>1. Per Session</strong> – Clients may pay for individual sessions. Payment is due 24 hours before the lesson via bank transfer or Biz (Spain).
                  </p>
                  <p className="text-lg text-slate-600 mb-4">
                    <strong>2. Package Payment</strong> – Clients may purchase a block of 5, 10, or 20 sessions at a discounted rate. Payment for packages is due in full at the time of booking.
                  </p>
                </div>
                <ul className="text-lg text-slate-600 space-y-3 mb-8">
                  <li><strong>Accepted payment methods:</strong> Bank transfer, Bizum and exceptional cases, in cash.</li>
                  <li>Lessons will only be confirmed once payment has been received (unless otherwise agreed).</li>
                </ul>

                <div className="border-t border-slate-200 my-8"></div>

                <h2 className="text-3xl font-bold text-navy mt-12 mb-6 font-serif">
                  Offers and Savings
                </h2>
                <p className="text-lg text-slate-600 mb-4">
                  All launch tuition is one-to-one. Starting prices are shown as
                  &quot;from&quot; prices for tuition with an Aulawell Tutor; Head Tutor
                  appointments and full package options are shared transparently at
                  checkout or following your booking enquiry. The following terms
                  apply to offers and savings:
                </p>
                <ul className="text-lg text-slate-600 space-y-3 mb-8 list-disc pl-6">
                  {OFFER_RULES.map((rule) => (
                    <li key={rule}>{rule}</li>
                  ))}
                </ul>

                <div className="border-t border-slate-200 my-8"></div>

                <h2 className="text-3xl font-bold text-navy mt-12 mb-6 font-serif">
                  3. Cancellations and Rescheduling
                </h2>
                <ul className="text-lg text-slate-600 space-y-3 mb-8">
                  <li>You may cancel or reschedule a session with at least 24 hours notice.</li>
                  <li>Cancellations made with less than <strong>30 minutes</strong> notice may be charged in full.</li>
                  <li>If we (the tutor) need to reschedule, we will provide as much notice as possible and offer an alternative time.</li>
                </ul>

                <div className="border-t border-slate-200 my-8"></div>

                <h2 className="text-3xl font-bold text-navy mt-12 mb-6 font-serif">
                  4. Refund Policy
                </h2>
                <ul className="text-lg text-slate-600 space-y-3 mb-8">
                  <li>Refunds are available only under the following conditions: long-term illness of student or tutor, or extended technical issues.</li>
                  <li>No refunds will be issued for completed lessons.</li>
                  <li>Any refunds will be processed via the original payment method.</li>
                </ul>

                <div className="border-t border-slate-200 my-8"></div>

                <h2 className="text-3xl font-bold text-navy mt-12 mb-6 font-serif">
                  5. Student Responsibilities
                </h2>
                <ul className="text-lg text-slate-600 space-y-3 mb-8">
                  <li>Students are expected to attend lessons on time and come prepared.</li>
                  <li>For minors, a parent/guardian must consent to services and ensure appropriate online learning conditions.</li>
                  <li>Disruptive or inappropriate behaviour may result in termination of services without refund.</li>
                </ul>

                <div className="border-t border-slate-200 my-8"></div>

                <h2 className="text-3xl font-bold text-navy mt-12 mb-6 font-serif">
                  6. Intellectual Property
                </h2>
                <ul className="text-lg text-slate-600 space-y-3 mb-8">
                  <li>All lesson materials, resources, and content provided remain the intellectual property of Aulawell unless otherwise stated.</li>
                  <li>You may use materials for personal educational purposes only.</li>
                  <li>Redistribution, resale, or sharing of materials without permission is prohibited.</li>
                </ul>

                <div className="border-t border-slate-200 my-8"></div>

                <h2 className="text-3xl font-bold text-navy mt-12 mb-6 font-serif">
                  7. Liability
                </h2>
                <ul className="text-lg text-slate-600 space-y-3 mb-8">
                  <li>While we strive to support academic progress, we cannot guarantee specific results, grades, or outcomes.</li>
                  <li>We are not liable for any indirect, incidental, or consequential damages resulting from the use of our services.</li>
                  <li>Parents/guardians are responsible for ensuring the suitability of services for minors.</li>
                </ul>

                <div className="border-t border-slate-200 my-8"></div>

                <h2 className="text-3xl font-bold text-navy mt-12 mb-6 font-serif">
                  8. Termination of Services
                </h2>
                <ul className="text-lg text-slate-600 space-y-3 mb-8">
                  <li>We reserve the right to suspend or terminate tutoring services if Terms are breached (e.g., repeated late payments, inappropriate conduct).</li>
                  <li>You may terminate services by providing written notice; unused prepaid sessions will be refunded according to our refund policy.</li>
                </ul>

                <div className="border-t border-slate-200 my-8"></div>

                <h2 className="text-3xl font-bold text-navy mt-12 mb-6 font-serif">
                  9. Confidentiality & Data Protection
                </h2>
                <ul className="text-lg text-slate-600 space-y-3 mb-8">
                  <li>We respect student confidentiality. Personal information will only be used in line with our Privacy Policy.</li>
                  <li>Any student progress notes are kept private and shared only with the student and (if applicable) parents/guardians.</li>
                </ul>

                <div className="border-t border-slate-200 my-8"></div>

                <h2 className="text-3xl font-bold text-navy mt-12 mb-6 font-serif">
                  10. Governing Law
                </h2>
                <ul className="text-lg text-slate-600 space-y-3 mb-8">
                  <li>These Terms shall be governed by and construed under the laws of the European Union and The United Kingdom.</li>
                  <li>Any disputes will be subject to the exclusive jurisdiction of the courts in the European Union.</li>
                </ul>

                <div className="border-t border-slate-200 my-8"></div>

                <h2 className="text-3xl font-bold text-navy mt-12 mb-6 font-serif">
                  11. Contact Information
                </h2>
                <p className="text-lg text-slate-600 mb-6">
                  If you have questions about these Terms, contact us at:
                </p>
                <div className="bg-slate-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-navy mb-4">Aulawell</h3>
                  <p className="text-lg text-slate-600 mb-2">
                    <strong>Email:</strong>{" "}
                    <a href="mailto:aulawelltuition@gmail.com" className="text-navy hover:text-gold underline">
                      aulawelltuition@gmail.com
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