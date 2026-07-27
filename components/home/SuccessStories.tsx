import { Card, CardContent } from "@/components/ui/card"
import { FadeIn } from "@/components/ui/fade-in"
import { SUCCESS_STORIES } from "@/lib/site-content"

export default function SuccessStories() {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-20">
      <div className="container mx-auto px-4">
        <FadeIn className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-navy lg:text-4xl">
            Success Stories
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Real students, real outcomes &mdash; a few of the journeys behind the numbers
          </p>
        </FadeIn>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {SUCCESS_STORIES.map((story, i) => (
            <FadeIn key={story.name} delay={(i + 1) * 100}>
              <Card className="h-full bg-white/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="flex h-full flex-col pt-6">
                  <span className="self-start rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold">
                    {story.programme}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-navy">{story.headline}</h3>
                  <p className="mt-3 flex-1 text-slate-600">{story.body}</p>
                  <div className="mt-4 font-semibold text-navy">{story.name}</div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
