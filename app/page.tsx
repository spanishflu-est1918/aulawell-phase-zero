import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import BookingCalendar from "@/components/booking/BookingCalendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, BookOpen, Target, Star, CheckCircle } from "lucide-react"
import { FadeIn } from "@/components/ui/fade-in"
import { CONTACT_INFO } from "@/lib/constants"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Aulawell English - Expert English Tutoring | Private & Group Classes",
  description: "Professional English tutoring for Academic English (GCSE, A-Level, IB) and Language courses (IELTS, FCE). Private lessons and small group classes available.",
  openGraph: {
    title: "Aulawell English - Expert English Tutoring",
    description: "Transform your English skills with expert tutoring",
    type: "website",
  },
}

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-navy text-white min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E)")`}}></div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeIn>
                <div className="inline-flex items-center gap-2 text-gold text-sm font-semibold tracking-wider uppercase mb-6">
                  <span className="w-12 h-px bg-gold"></span>
                  Unlock Potential
                </div>
                <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight font-serif">
                  Expert English Tutoring for Academic Success
                </h1>
              </FadeIn>
              
              <FadeIn delay={200}>
                <p className="text-xl text-gray-200 mb-8">
                  Professional English tutoring for Academic English (GCSE, A-Level, IB) and Language courses (IELTS, FCE)
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button asChild size="lg" className="bg-gold hover:bg-gold/90 text-navy font-semibold border-0 shadow-lg hover:shadow-xl transition-all">
                    <Link href="/contact">Book Free Consultation</Link>
                  </Button>
                  <Button asChild size="lg" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 shadow-lg hover:shadow-xl transition-all">
                    <a href={`https://wa.me/${CONTACT_INFO.WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                      WhatsApp Me
                    </a>
                  </Button>
                </div>
              </FadeIn>

              <FadeIn delay={400}>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-gold w-5 h-5 flex-shrink-0" />
                    <span>Expert Native English-Speaking Tutors</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-gold w-5 h-5 flex-shrink-0" />
                    <span>Personalized Learning Plans</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-gold w-5 h-5 flex-shrink-0" />
                    <span>Proven Results with High Success Rates</span>
                  </div>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={200} className="relative">
              <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/main.jpeg"
                  alt="English tutoring student"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/20 to-transparent" />
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-4 font-serif">
              Who and What We Support at Aulawell
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We provide English tutoring for students aged 9 - 18 as well as adults all over the globe. Whether you want to enter a particular school, improve your child&apos;s confidence in English or work with a tutor for Home Education, Aulawell is here to answer your questions, mentor your child and give you peace of mind.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FadeIn delay={100}>
              <Card className="hover:shadow-xl transition-all duration-300 h-full hover:-translate-y-1 bg-white border-navy/10">
                <CardHeader>
                  <div className="bg-navy/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <GraduationCap className="h-8 w-8 text-navy" />
                  </div>
                  <CardTitle className="text-navy text-xl">Academic English</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>11+, 12+, SATS, Common Entrance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>General Certificate of Secondary Education (GCSEs)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>International General Certificate of Secondary Education (IGCSEs)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>A levels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>International Baccalaureate (IB)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Exam Board expertise</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Essay Writing Support</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-navy hover:bg-navy/90">
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={200}>
              <Card className="hover:shadow-xl transition-all duration-300 h-full hover:-translate-y-1 bg-white border-gold/20">
                <CardHeader>
                  <div className="bg-gold/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <BookOpen className="h-8 w-8 text-gold" />
                  </div>
                  <CardTitle className="text-navy text-xl">English Language</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>General English Fluency (A1 - C1)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>First Certificate Examination (FCE)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Cambridge Advanced Examination</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>IELTS Preparation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Business English</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-navy hover:bg-navy/90">
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={300}>
              <Card className="hover:shadow-xl transition-all duration-300 h-full hover:-translate-y-1 bg-white border-green-600/20">
                <CardHeader>
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <Target className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-navy text-xl">Further Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Home Education</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Study Skills support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Mentoring and Coaching</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>SEN Specialist support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Personal Statement Masterclass (US, UK & AUS)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>SAT preparation (US universities)</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-navy hover:bg-navy/90">
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-b from-white to-navy/5">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-4 font-serif">
              Why Choose Aulawell?
            </h2>
          </FadeIn>

          <div className="max-w-4xl mx-auto space-y-12">
            <FadeIn delay={100}>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="bg-gold/10 rounded-full w-16 h-16 flex items-center justify-center">
                    <GraduationCap className="h-8 w-8 text-gold" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 text-navy">Global Expertise, Local Insight</h3>
                  <p className="text-slate-600 leading-relaxed">
                    With an international background and teaching experience spanning Europe, Latin America, and Asia, our tutors brings a deep cultural understanding to every lesson—helping students worldwide feel confident and supported.
                  </p>
                </div>
              </div>
            </FadeIn>

            <div className="border-t border-slate-200"></div>

            <FadeIn delay={200}>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="bg-navy/10 rounded-full w-16 h-16 flex items-center justify-center">
                    <Target className="h-8 w-8 text-navy" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 text-navy">Tailored for Every Learner</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Whether you&apos;re preparing for school exams, university essays, job applications, or simply want to improve your conversational fluency, our bespoke programmes are built around you.
                  </p>
                </div>
              </div>
            </FadeIn>

            <div className="border-t border-slate-200"></div>

            <FadeIn delay={300}>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 text-navy">Dual Specialisms = Better Results</h3>
                  <p className="text-slate-600 leading-relaxed mb-3">
                    You get the best of both:
                  </p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="font-semibold">Academic English</span> – critical reading, essay writing, research skills, SAT/AP/IB prep.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold">General English</span> – grammar, vocabulary, speaking, listening, pronunciation.
                    </li>
                  </ul>
                </div>
              </div>
            </FadeIn>

            <div className="border-t border-slate-200"></div>

            <FadeIn delay={400}>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="bg-gold/10 rounded-full w-16 h-16 flex items-center justify-center">
                    <Star className="h-8 w-8 text-gold" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 text-navy">Proven Track Record</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Students have earned spots at top schools and universities worldwide—including Oxford, Cambridge, Princeton, Duke—and topped language exams across multiple levels.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Class Options Section */}
      <section className="py-20 bg-gold/5">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-4 font-serif">
              Tutorial Options
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We offer a range of tutoring times and formats to accommodate our global network of families.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FadeIn delay={100}>
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full bg-white/80">
                <CardHeader>
                  <CardTitle className="text-navy">Face-to-Face Tuition</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">We provide convenient face-to-face tutoring sessions or small groups at your home. This service is only available for families and students based in Madrid, Spain.</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>One-to-one sessions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>Small group sessions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>Holiday top-up sessions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>Holiday booster courses (2 hours a day for 3 days)</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-gold hover:bg-gold/90 text-white">
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={200}>
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full bg-white/80">
                <CardHeader>
                  <CardTitle className="text-navy">Online Tuition</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">Our flagship tutoring provision for families who prefer the flexibility of online tutoring.</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>One-to-one sessions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>Small group sessions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>Holiday top-up sessions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>Holiday booster courses (2 hours a day for 3 days)</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-gold hover:bg-gold/90 text-white">
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={300}>
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full bg-white/80">
                <CardHeader>
                  <CardTitle className="text-navy">Additional Support and Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-6">If these tutoring options don&apos;t suit you or your child&apos;s needs, please contact us and we will try to accommodate your requirements.</p>
                  <Button asChild className="w-full bg-gold hover:bg-gold/90 text-white">
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-4 font-serif">
              What Our Students Say
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Success stories from students who achieved their goals with us
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <FadeIn delay={100}>
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full bg-white/80">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-gold fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-4">
                    &quot;My tutor helped me improve from a grade 6 to a grade 9 in GCSE English. 
                    The personalized approach made all the difference!&quot;
                  </p>
                  <div className="font-semibold text-navy">Sarah M.</div>
                  <div className="text-sm text-slate-500">GCSE Student</div>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={200}>
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full bg-white/80">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-gold fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-4">
                    &quot;I achieved an 8.0 in IELTS thanks to the excellent preparation. 
                    The mock tests and feedback were invaluable.&quot;
                  </p>
                  <div className="font-semibold text-navy">Ahmed K.</div>
                  <div className="text-sm text-slate-500">IELTS Student</div>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={300}>
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full bg-white/80">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-gold fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-4">
                    &quot;The A-Level English Literature support was outstanding. 
                    I got an A* and secured my place at Oxford!&quot;
                  </p>
                  <div className="font-semibold text-navy">Emma T.</div>
                  <div className="text-sm text-slate-500">A-Level Student</div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-4 font-serif">
                Book a Lesson
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Pick your dates on the calendar and pay securely per lesson &mdash; it only takes a minute
              </p>
            </div>
            <FadeIn>
              <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-slate-100" />}>
                <BookingCalendar />
              </Suspense>
            </FadeIn>
            <p className="mt-8 text-center text-slate-600">
              <Link
                href="/book"
                className="font-medium text-navy underline underline-offset-4 transition-colors hover:text-gold"
              >
                How booking works
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-serif">
              Ready to Start Your English Learning Journey?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Book a free consultation to discuss your goals and create a personalized learning plan
            </p>
            <Button asChild size="lg" className="bg-gold hover:bg-gold/90 text-white border-0 shadow-lg hover:shadow-xl transition-all">
              <Link href="/contact">Get Started Today</Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}