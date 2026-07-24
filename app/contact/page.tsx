"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MessageCircle, MapPin, Clock } from "lucide-react"
import { CONTACT_INFO, WEB3FORMS_ACCESS_KEY } from "@/lib/constants"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  })

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Until a Web3Forms key is configured, fall back to the visitor's email app
    // so the form is never a dead end.
    if (!WEB3FORMS_ACCESS_KEY) {
      const subject = encodeURIComponent("Tuition enquiry from " + formData.name)
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\n\n${formData.message}`
      )
      window.location.href = `mailto:${CONTACT_INFO.EMAIL}?subject=${subject}&body=${body}`
      return
    }

    setStatus("sending")
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "New enquiry from the Aulawell website",
          from_name: formData.name,
          ...formData,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error("submit failed")
      setStatus("success")
      setFormData({ name: "", email: "", phone: "", service: "", message: "" })
    } catch {
      setStatus("error")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-slate-600">
              Get in touch to start your English learning journey
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Send us a message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="service" className="block text-sm font-medium mb-1">
                          Service Interested In *
                        </label>
                        <select
                          id="service"
                          name="service"
                          required
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select a service</option>
                          <option value="academic-english">Academic English (KS3-IB)</option>
                          <option value="general-english">General English</option>
                          <option value="exam-prep">Exam Preparation (FCE/IELTS)</option>
                          <option value="business-english">Business English</option>
                          <option value="group-classes">Group Classes</option>
                          <option value="private-lessons">Private Lessons</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-1">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Tell us about your learning goals..."
                        ></textarea>
                      </div>

                      <Button type="submit" className="w-full" disabled={status === "sending"}>
                        {status === "sending" ? "Sending…" : "Send Message"}
                      </Button>

                      {status === "success" && (
                        <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                          Thank you for your enquiry! We&apos;ll get back to you within 24 hours.
                        </p>
                      )}
                      {status === "error" && (
                        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                          Sorry, your message couldn&apos;t be sent. Please email us directly at{" "}
                          <a href={`mailto:${CONTACT_INFO.EMAIL}`} className="underline underline-offset-2">
                            {CONTACT_INFO.EMAIL}
                          </a>
                          .
                        </p>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">
                    Get in Touch
                  </h2>
                  <p className="text-slate-600 mb-8">
                    We&apos;re here to answer any questions you have about our English tutoring services. 
                    Reach out via any of the methods below, and we&apos;ll get back to you within 24 hours.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <a href={CONTACT_INFO.PHONE_HREF} className="text-slate-600 hover:text-blue-600">
                        {CONTACT_INFO.PHONE_DISPLAY}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a href={`mailto:${CONTACT_INFO.EMAIL}`} className="text-slate-600 hover:text-blue-600">
                        {CONTACT_INFO.EMAIL}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MessageCircle className="h-6 w-6 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">WhatsApp</h3>
                      <a
                        href={`https://wa.me/${CONTACT_INFO.WHATSAPP_NUMBER}?text=Hi,%20I'm%20interested%20in%20tutoring`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-green-600"
                      >
                        Message us on WhatsApp
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Location</h3>
                      <p className="text-slate-600">{CONTACT_INFO.LOCATION}</p>
                      <p className="text-sm text-slate-500">Online tutoring available worldwide</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Office Hours</h3>
                      <p className="text-slate-600">Monday - Friday: 9:00 AM - 7:00 PM</p>
                      <p className="text-slate-600">Saturday: 10:00 AM - 4:00 PM</p>
                      <p className="text-slate-600">Sunday: Closed</p>
                    </div>
                  </div>
                </div>

                {/* Quick WhatsApp CTA */}
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Prefer WhatsApp?</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Send us a quick message for immediate assistance
                    </p>
                    <Button asChild className="bg-green-600 hover:bg-green-700">
                      <a
                        href={`https://wa.me/${CONTACT_INFO.WHATSAPP_NUMBER}?text=Hi,%20I'm%20interested%20in%20tutoring`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Chat on WhatsApp
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Have questions? Check out our FAQ section or contact us directly for personalized assistance.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-semibold mb-2">How do I book a free consultation?</h3>
                <p className="text-sm text-slate-600">
                  Simply fill out the contact form above or send us a WhatsApp message. 
                  We&apos;ll arrange a convenient time for your free 30-minute consultation.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Do you offer online tutoring?</h3>
                <p className="text-sm text-slate-600">
                  Yes! We offer both in-person and online tutoring sessions to accommodate 
                  students worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}