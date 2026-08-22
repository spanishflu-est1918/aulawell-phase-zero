// Content source of truth for the Services section: the four service pages and
// the homepage "core services" cards. Copy lives here as plain strings and is
// rendered via {expressions} in JSX, which keeps apostrophes clean for ESLint.

export interface ServiceProduct {
  name: string
  description?: string
  cta: string
  ctaHref: string
}

export interface Service {
  slug: string
  navTitle: string
  // Short summary for the homepage / services index cards.
  cardSummary: string
  eyebrow: string
  headline: string
  intro: string
  forWho: string[]
  focus?: string[]
  delivery?: string[]
  products: ServiceProduct[]
  // Pricing display mode for this page.
  pricing: "school-exam-table" | "package-hierarchy" | "consultation"
  // Which row of the two-tier table to show (school-exam-table mode only).
  priceRow?: "School English" | "Exam English"
  // Optional honest framing note shown near the products.
  note?: string
}

export const SERVICES: Service[] = [
  {
    slug: "school-english",
    navTitle: "School English",
    cardSummary:
      "Foundational English for KS3 and US Middle School — reading, writing and confidence that build towards GCSE and IGCSE.",
    eyebrow: "School English · KS3 & US Middle School",
    headline: "Build the English skills that set students up for future success.",
    intro:
      "Bespoke one-to-one English tuition for Years 7–9 in the UK and international British curriculum, and for US Middle School English Language Arts learners in Grades 6–8.",
    forWho: [
      "KS3 Years 7–9 in the UK and international British curriculum",
      "US Middle School English Language Arts, Grades 6–8",
    ],
    focus: [
      "Reading and comprehension",
      "Purposeful writing and creative expression",
      "Speaking, discussion and communication",
      "Grammar and vocabulary",
      "Confidence in English",
      "Independent learning",
      "Foundations for GCSE and IGCSE",
    ],
    delivery: [
      "Online worldwide",
      "In person in Madrid and Lisbon, subject to tutor availability",
    ],
    products: [
      {
        name: "Single Lesson Clinic",
        description: "One focused session for a specific issue, text or priority.",
        cta: "Book a Single Lesson",
        ctaHref: "/book?service=school-english&package=single-lesson",
      },
      {
        name: "5-Lesson Skills Boost",
        description: "Flexible support built around one defined goal.",
        cta: "Book a 5-Lesson Package",
        ctaHref: "/book?service=school-english&package=skills-boost",
      },
      {
        name: "10-Lesson Term Support",
        description: "Weekly structure and sustained progress across a term.",
        cta: "Book Term Support",
        ctaHref: "/book?service=school-english&package=term-support",
      },
    ],
    pricing: "school-exam-table",
    priceRow: "School English",
  },
  {
    slug: "exam-academic-english",
    navTitle: "Exam & Academic English",
    cardSummary:
      "Expert preparation for GCSE, IGCSE, A Level, IB and MYP English, plus the academic writing and essay skills behind top grades.",
    eyebrow: "Exam & Academic English · GCSE, IGCSE, A Level, IB & MYP",
    headline:
      "Expert English support for the qualifications that open the next door.",
    intro:
      "Bespoke one-to-one support for GCSE and IGCSE English Language and Literature, A Level English, IB and MYP English, and the academic reading, writing and essay skills behind them.",
    forWho: [
      "GCSE / IGCSE English Language and Literature",
      "A Level English",
      "IB / MYP English",
      "Academic writing, literature and essay support",
    ],
    focus: [
      "Close reading and textual analysis",
      "Essay structure, argument and evidence",
      "Exam technique and mark-scheme awareness",
      "Unseen texts under timed conditions",
      "Coursework and NEA support",
      "Confident, precise academic writing",
    ],
    delivery: [
      "Online worldwide",
      "In person in Madrid and Lisbon, subject to tutor availability",
    ],
    products: [
      {
        name: "Single Exam Clinic",
        description: "One focused session for a specific text, question or skill.",
        cta: "Book a Single Lesson",
        ctaHref: "/book?service=exam-academic-english&package=single-lesson",
      },
      {
        name: "5-Lesson Exam Sprint",
        description: "Targeted preparation for one defined exam goal.",
        cta: "Book a 5-Lesson Package",
        ctaHref: "/book?service=exam-academic-english&package=exam-sprint",
      },
      {
        name: "10-Lesson Exam Programme",
        description: "Structured, sustained preparation across a term.",
        cta: "Book Term Support",
        ctaHref: "/book?service=exam-academic-english&package=exam-programme",
      },
    ],
    pricing: "school-exam-table",
    priceRow: "Exam English",
  },
  {
    slug: "english-qualifications",
    navTitle: "English Qualifications",
    cardSummary:
      "Personalised English for international and EFL learners, including focused preparation for IELTS, B2 First and C1 Advanced.",
    eyebrow: "English Qualifications · IELTS, B2 First & C1 Advanced",
    headline: "English for life, learning and the world beyond the classroom.",
    intro:
      "Flexible, personalised English tuition for international and EFL learners, including focused preparation for IELTS, B2 First and C1 Advanced.",
    forWho: [
      "General English",
      "Academic English",
      "IELTS",
      "Cambridge B2 First",
      "Cambridge C1 Advanced / CAE",
    ],
    focus: [
      "Speaking and listening fluency",
      "Reading and Use of English",
      "Academic and everyday writing",
      "Vocabulary and grammar in use",
      "Exam strategy for IELTS and Cambridge",
    ],
    delivery: [
      "Online worldwide",
      "In person in Madrid and Lisbon, subject to tutor availability",
    ],
    products: [
      {
        name: "English Level & Goals Session",
        description: "An initial session to assess level and agree clear goals.",
        cta: "Book a Single Lesson",
        ctaHref: "/book?service=english-qualifications&package=level-goals",
      },
      {
        name: "5-Lesson Confidence Builder",
        description: "Flexible support built around one defined goal.",
        cta: "Book a 5-Lesson Package",
        ctaHref: "/book?service=english-qualifications&package=confidence-builder",
      },
      {
        name: "10-Lesson English Progress Programme",
        description: "Structured progress across speaking, writing and skills.",
        cta: "Book Term Support",
        ctaHref: "/book?service=english-qualifications&package=progress-programme",
      },
      {
        name: "IELTS / Cambridge Preparation Programme",
        description:
          "Tailored exam preparation, shaped after an initial assessment of level and goals.",
        cta: "Book a Preparation Programme",
        ctaHref: "/book?service=english-qualifications&package=prep-programme",
      },
    ],
    pricing: "package-hierarchy",
    note:
      "A 10-lesson programme is tailored preparation, not a complete IELTS or Cambridge course. After an initial assessment we agree the right preparation for your goals.",
  },
  {
    slug: "university-applications",
    navTitle: "University Applications",
    cardSummary:
      "Specialist, one-to-one advisory support for UK and US university applications — strategy, UCAS writing and SAT preparation.",
    eyebrow: "University Applications · UK & US",
    headline:
      "Specialist guidance for the university journey — from strategy to a stronger application.",
    intro:
      "Bookable, one-to-one advisory support for UK and US university applications. We help students plan, write and refine — building a clearer, stronger application. We do not guarantee admission.",
    forWho: [
      "Students applying to UK universities through UCAS",
      "Students applying to US universities and sitting the SAT",
      "Families seeking independent application strategy",
    ],
    products: [
      {
        name: "UK University Strategy Consultation",
        description: "Plan a realistic, ambitious UK university and course strategy.",
        cta: "Book a Consultation",
        ctaHref: "/book?service=university-applications&package=uk-strategy",
      },
      {
        name: "UCAS Application Writing & Review",
        description: "Structured support to write and strengthen the UCAS application.",
        cta: "Book a Consultation",
        ctaHref: "/book?service=university-applications&package=ucas-writing",
      },
      {
        name: "UCAS Application Refresh",
        description: "A focused review to sharpen an existing draft application.",
        cta: "Book a Consultation",
        ctaHref: "/book?service=university-applications&package=ucas-refresh",
      },
      {
        name: "US University & SAT Strategy Consultation",
        description: "Plan US applications and a realistic SAT preparation route.",
        cta: "Book a Consultation",
        ctaHref: "/book?service=university-applications&package=us-strategy",
      },
      {
        name: "Digital SAT Reading & Writing Preparation",
        description: "Targeted preparation for the Digital SAT Reading and Writing section.",
        cta: "Book a Preparation Programme",
        ctaHref: "/book?service=university-applications&package=sat-prep",
      },
    ],
    pricing: "consultation",
  },
]

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug)
}

// Homepage curriculum support strip.
export interface CurriculumBand {
  label: string
  levels: string
}

export const CURRICULUM_STRIP: CurriculumBand[] = [
  { label: "Curriculum Support", levels: "KS2 · KS3 · US Grades 6–8" },
  { label: "Exam English", levels: "GCSE · IGCSE" },
  { label: "Advanced Study", levels: "A Level · IB · MYP" },
  { label: "English Qualifications", levels: "IELTS · B2 First · C1 Advanced" },
]

// Global note: launch tuition is one-to-one.
export const ONE_TO_ONE_NOTE =
  "All launch tuition is one-to-one. Group tuition is a future product."
