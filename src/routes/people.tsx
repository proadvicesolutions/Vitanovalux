import { createFileRoute } from "@tanstack/react-router";
import { morePeople, people, photos } from "@/lib/content";
import { ClosingBand, FeaturedPeople, meta, PageHero, PersonCard, Quote } from "@/components/site/blocks";

export const Route = createFileRoute("/people")({
  head: () => meta("People · Vita Nova Lux", "Entrepreneurs, managers and teams of the companies growing with Vita Nova Lux."),
  component: People,
});

function People() {
  return (
    <>
      <PageHero
        eyebrow={{ en: "The people of VNL", it: "Le persone di VNL" }}
        title={{ en: "People before numbers.", it: "Le persone prima dei numeri." }}
        lead={{ en: "Real faces, real voices. They are the ones who make the company.", it: "Volti veri, voci vere. Sono loro a fare l'impresa." }}
        photo={photos.firenze}
      />
      <FeaturedPeople people={people} eyebrow={{ en: "Faces", it: "Volti" }} title={{ en: "The faces behind the companies.", it: "I volti dietro le imprese." }} />
      <section className="section-xl bg-surface">
        <div className="container-site grid gap-14 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
          {morePeople.map((p, i) => (
            <div key={p.photo + p.quote.en} className={i === 1 ? "lg:mt-24" : ""}>
              <PersonCard p={p} />
            </div>
          ))}
        </div>
      </section>
      <Quote
        text={{ en: "A company grows when someone believes in it every morning.", it: "Un'impresa cresce quando qualcuno ci crede ogni mattina." }}
        name="[Name Surname]"
        role={{ en: "[Role · Company]", it: "[Ruolo · Impresa]" }}
        photo={photos.bottega}
      />
      <ClosingBand />
    </>
  );
}
