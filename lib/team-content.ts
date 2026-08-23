// Named Aulawell tutors and specialists shown on /about/tutors. Photos live in
// public/tutors/. Keep bios factual — specialty areas as given, nothing
// fabricated (no invented qualifications, institutions or years).

export interface TeamMember {
  name: string
  photo: string
  role: string
  bio: string
}

export const ENGLISH_TUTORS: TeamMember[] = [
  {
    name: "Anna",
    photo: "/tutors/anna.jpg",
    role: "English Tutor · EFL · Academic Support & Mentoring",
    bio: "Anna works with EFL learners on building real confidence in English — strong foundations in reading, writing and speaking, paired with the academic support and mentoring that keeps progress steady through school.",
  },
  {
    name: "Ashai",
    photo: "/tutors/ashai.jpg",
    role: "English Language & Arts (ELA) · EFL · Academic Support & Mentoring",
    bio: "Ashai brings both English Language Arts and EFL expertise, helping learners strengthen their academic English while building the study skills and confidence that carry them through exams and beyond.",
  },
]

export const UNIVERSITY_SPECIALISTS: TeamMember[] = [
  {
    name: "Falaknaz",
    photo: "/tutors/falaknaz.jpg",
    role: "SAT Preparation & US Universities Consultant",
    bio: "Falaknaz guides students through SAT preparation and US university applications — from building a strategic college list to strengthening the reading and writing skills the Digital SAT rewards.",
  },
  {
    name: "Stephanie",
    photo: "/tutors/steph.jpg",
    role: "UCAS & UK University Consultant",
    bio: "Stephanie specialises in UCAS applications and UK university strategy, helping students plan a realistic, ambitious route and write an application that reflects their strongest self.",
  },
]
