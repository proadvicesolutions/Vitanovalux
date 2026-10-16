import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { people, photos, stories } from "@/lib/content";
import { ClosingBand, Eyebrow, FeaturedPeople, manifesto, meta, NameSection, Quote, StoriesFeature, ValuesSection } from "@/components/site/blocks";
import { CometRing } from "@/components/site/CometRing";

export const Route = createFileRoute("/")({
  head: () => meta("Vita Nova Lux · Nuova luce, nuovo lusso.", "The Italian investment holding of the Hadlaan group. We invest in Italian companies of value and in the people who lead them."),
  component: Home,
});

function Home() {
  const { t } = useLang();
  return (
    <>
      {/* Hero: full-bleed chiaroscuro portrait fading into night blue, the Comet ring behind the headline. */}
      <section className="relative isolate overflow-hidden bg-band text-on-band">
        <img
          src={photos.studio}
          alt={t({ en: "Portrait of an entrepreneur in his study, side light", it: "Ritratto di un imprenditore nel suo studio, luce laterale" })}
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center] opacity-80 lg:left-auto lg:w-[62%] lg:opacity-100"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-band from-[30%] via-band/70 via-[55%] to-band/10 lg:bg-gradient-to-r lg:from-band lg:from-[38%] lg:via-band/70 lg:via-[52%] lg:to-transparent" />
        <CometRing className="pointer-events-none absolute -left-[14rem] -top-[12rem] -z-10 w-[40rem] text-band-raised opacity-80 lg:-left-[18rem] lg:-top-[16rem] lg:w-[58rem]" showSun={false} />
        <div className="container-site flex min-h-[640px] flex-col justify-end pb-16 pt-40 md:min-h-[720px] lg:min-h-[min(860px,calc(100svh-80px))] lg:justify-center lg:pb-24 lg:pt-24">
          <div className="max-w-[760px]">
            <Eyebrow band>{t({ en: "Investment holding · Made in Italy", it: "Holding di investimento · Made in Italy" })}</Eyebrow>
            <h1 className="t-hero mt-8">{t({ en: "New light for Italian companies.", it: "Nuova luce alle imprese italiane." })}</h1>
            <p className="t-lead mt-8 max-w-[560px] text-on-band-muted">{t({ en: "We invest in companies of value and in the people who lead them. A partner, not a fund.", it: "Investiamo nelle imprese di valore e nelle persone che le guidano. Socio, non fondo." })}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/people" className="btn btn-primary">{t({ en: "Meet the people", it: "Conosci le persone" })}</Link>
              <Link to="/about" className="btn btn-secondary-band">{t({ en: "About us", it: "Chi siamo" })}</Link>
            </div>
          </div>
        </div>
        <div className="container-site relative hidden border-t rule-band lg:block">
          <div className="flex items-center justify-between py-6 t-caption text-on-band-muted">
            <span className="tracking-[2px] uppercase">Nuova luce, nuovo lusso.</span>
            <span>{t({ en: "Italy · the Gulf", it: "Italia · Golfo" })}</span>
          </div>
        </div>
      </section>

      <NameSection />
      <ValuesSection />
      <FeaturedPeople people={people} />
      <Quote {...manifesto} photo={photos.cortile} />
      <StoriesFeature stories={stories} />
      <ClosingBand />
    </>
  );
}
