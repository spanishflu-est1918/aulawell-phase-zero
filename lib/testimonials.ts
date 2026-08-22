// Client-approved testimonials supplied by Aulawell. Quote wording is exact —
// do not paraphrase or edit without a new approved version.

export interface Testimonial {
  name: string
  role: string
  quote: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Begoña",
    role: "Parent",
    quote:
      "We have had a five-plus-year journey with Amy — from our son passing his Year 7 school entrance exam to achieving an A in IGCSE English Literature. He is now at Duke University.",
  },
  {
    name: "Lucía",
    role: "Student",
    quote:
      "I have received so much help and motivation from my Aulawell tutor — from struggling with essay writing at KS3 to achieving Grades 7 and 8 in my English exams. I'm really happy!",
  },
  {
    name: "Diogo",
    role: "CAE student",
    quote:
      "Working with Amy for my CAE exam was a big factor in my success. She challenged me to read more widely and gave me the specific exam practice I couldn't find elsewhere.",
  },
]
