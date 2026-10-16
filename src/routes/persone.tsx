import { createFileRoute } from "@tanstack/react-router";
import { morePeople, people } from "@/lib/content";
import { ClosingBand, meta, PageHero, PersonCard, Quote } from "@/components/site/blocks";

export const Route = createFileRoute("/persone")({
  head: () => meta("Persone · Vita Nova Lux", "Imprenditori, manager e team delle imprese che crescono con Vita Nova Lux."),
  component: People,
});

function People() {
  return (
    <>
      <PageHero eyebrow={{ it: "Le persone di VNL", en: "The people of VNL" }} title={{ it: "Le persone prima dei numeri.", en: "People before numbers." }} lead={{ it: "Volti veri, voci vere. Sono loro a fare l'impresa.", en: "Real faces, real voices. They are the ones who make the company." }} />
      <section className="section-y">
        <div className="container-site grid gap-12 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {[...people, ...morePeople].map((p) => <PersonCard key={p.photo + p.quote.it} p={p} />)}
        </div>
      </section>
      <Quote text={{ it: "Un'impresa cresce quando qualcuno ci crede ogni mattina.", en: "A company grows when someone believes in it every morning." }} name="[Nome Cognome]" role={{ it: "[Ruolo · Impresa]", en: "[Role · Company]" }} />
      <ClosingBand />
    </>
  );
}
