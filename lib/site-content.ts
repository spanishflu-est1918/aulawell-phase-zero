// Homepage outcome numbers and success stories. This is the only file to
// edit when updating either section — change the values, redeploy, done.

export interface SiteStat {
  // The number the counter rolls up to when it scrolls into view.
  value: number
  // Shown after the number, e.g. "+" or "%".
  suffix?: string
  label: string
}

// !! Two of these are placeholder estimates (marked below). Replace them with
// your real figures before deploying — never publish a number you couldn't
// stand behind if a parent asked about it.
export const SITE_STATS: SiteStat[] = [
  { value: 10, suffix: "+", label: "Years teaching English" }, // PLACEHOLDER — set your real figure
  { value: 150, suffix: "+", label: "Students tutored worldwide" }, // PLACEHOLDER — set your real figure
  { value: 3, label: "Continents taught across" },
  { value: 9, suffix: "+", label: "Exams & qualifications covered" },
]

export interface SuccessStory {
  name: string
  // Short badge shown above the story, e.g. "IGCSE English Literature".
  programme: string
  headline: string
  body: string
}

// Written in Aulawell's voice as factual outcome stories — deliberately NOT
// quotation-mark testimonials. Only attribute quoted words to a student or
// parent once they have approved the exact wording in writing; then they can
// move into a quoted testimonial format.
export const SUCCESS_STORIES: SuccessStory[] = [
  {
    name: "Sofia",
    programme: "IGCSE English Literature",
    headline: "From overwhelmed to exam-ready",
    body:
      "Sofia arrived dreading unseen texts and time-pressured essays. Lesson by lesson we built the analytical skills the paper demands — how to unpick a poem, plan quickly and write with confidence — and she passed her IGCSE Literature exam with those skills hers to keep.",
  },
  {
    name: "Diogo",
    programme: "Cambridge C1 Advanced",
    headline: "Full marks in Cambridge Advanced",
    body:
      "Diogo set his sights on the Cambridge Advanced qualification. With structured exam practice, honest feedback and steady encouragement through the wobbles, he didn't just pass — he achieved full marks.",
  },
  {
    name: "Bettina, parent",
    programme: "Personalised curriculum support",
    headline: "A plan built around one child",
    body:
      "For Bettina's family, the difference was a caring, personalised support plan: one tutor who knows her child, tracks the curriculum's demands and adapts every lesson — so school pressure never becomes home pressure.",
  },
]
