import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { people, photos, stories } from "@/lib/content";
import { ClosingBand, manifesto, meta, NameSection, PersonCard, Quote, SectionHead, StoryCard, ValuesSection } from "@/components/site/blocks";

export const Route = createFileRoute("/")({
  head: () => meta("Vita Nova Lux · Nuova luce, nuovo lusso.", "Holding di investimento del gruppo Hadlaan. Investiamo nelle imprese italiane di valore e nelle persone che le guidano."),
  component: Home,
});

function Home() {
  const { t } = useLang();
  return (
    <>
      <section className="bg-band text-on-band">
        <div className="container-site grid items-center gap-12 pt-16 md:pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:py-32">
          <div>
            <p className="eyebrow eyebrow-band">{t({ it: "Holding di investimento · Made in Italy", en: "Investment holding · Made in Italy" })}</p>
            <h1 className="t-display mt-6">{t({ it: "Nuova luce alle imprese italiane.", en: "New light for Italian companies." })}</h1>
            <p className="t-lead mt-6 prose-w text-on-band-muted">{t({ it: "Investiamo nelle imprese di valore e nelle persone che le guidano. Socio, non fondo.", en: "We invest in companies of value and in the people who lead them. A partner, not a fund." })}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/persone" className="btn btn-primary">{t({ it: "Conosci le persone", en: "Meet the people" })}</Link>
              <Link to="/chi-siamo" className="btn btn-secondary-band">{t({ it: "Chi siamo", en: "About us" })}</Link>
            </div>
          </div>
          <img src={photos.studio} alt={t({ it: "Ritratto di un imprenditore nel suo studio, luce laterale", en: "Portrait of an entrepreneur in his study, side light" })} className="-mx-4 aspect-[4/5] w-[calc(100%+2rem)] max-w-none object-cover md:mx-0 md:w-full lg:max-h-[640px]" />
        </div>
      </section>

      <NameSection />
      <ValuesSection />

      <section className="section-y bg-surface-raised">
        <div className="container-site">
          <SectionHead eyebrow={{ it: "Le persone di VNL", en: "The people of VNL" }} title={{ it: "Le persone prima dei numeri.", en: "People before numbers." }}>
            <Link to="/persone" className="link-gold inline-flex items-center gap-2 t-label">{t({ it: "Tutte le persone", en: "All the people" })}<ArrowRight size={16} strokeWidth={1.5} aria-hidden /></Link>
          </SectionHead>
          <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-8">
            {people.map((p) => <PersonCard key={p.photo} p={p} />)}
          </div>
        </div>
      </section>

      <Quote {...manifesto} />

      <section className="section-y">
        <div className="container-site">
          <SectionHead title={{ it: "Storie", en: "Stories" }}>
            <Link to="/storie" className="link-gold inline-flex items-center gap-2 t-label">{t({ it: "Tutte le storie", en: "All stories" })}<ArrowRight size={16} strokeWidth={1.5} aria-hidden /></Link>
          </SectionHead>
          <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-8">
            {stories.slice(0, 3).map((s) => <StoryCard key={s.slug} s={s} />)}
          </div>
        </div>
      </section>

      <ClosingBand />
    </>
  );
}
