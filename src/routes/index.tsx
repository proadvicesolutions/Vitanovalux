import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { homePeople, photos, stories } from "@/lib/content";
import heroStudio from "@/assets/home-hero-studio.jpg";
import firenzeWide from "@/assets/home-firenze-wide.jpg";
import { ClosingBand, manifesto, meta } from "@/components/site/blocks";
import { CometChapters, CoverGallery, Manifesto, Masthead, StoryIndex, Torch, ValuesTicker } from "@/components/site/experience";

export const Route = createFileRoute("/")({
  head: () => meta("Vita Nova Lux · Nuova luce, nuovo lusso.", "The Italian investment holding of the Hadlaan group. We invest in Italian companies of value and in the people who lead them."),
  component: Home,
});

const chapters = [
  {
    word: "Vita",
    kicker: { en: "I · New life", it: "I · Nuova vita" },
    title: { en: "We join Italian companies to stay.", it: "Entriamo nelle imprese italiane per restarci." },
    text: { en: "A partner, not a fund: we tell the journey, not the exit.", it: "Socio, non fondo: raccontiamo il percorso, non l'uscita." },
  },
  {
    word: "Nova",
    kicker: { en: "II · New light", it: "II · Nuova luce" },
    title: { en: "Every company that joins becomes a story.", it: "Ogni impresa che entra diventa una storia." },
    text: { en: "We put the people who make it in the light: founders, craftsmen, families, teams.", it: "Mettiamo in luce le persone che la fanno: fondatori, artigiani, famiglie, team." },
  },
  {
    word: "Lux",
    kicker: { en: "III · New luxury", it: "III · Nuovo lusso" },
    title: { en: "Luxury is quality, care and value that lasts.", it: "Il lusso è qualità, cura e valore che dura." },
    text: { en: "Not display. The patience of doing things well, for the long term.", it: "Non ostentazione. La pazienza di fare bene le cose, nel lungo periodo." },
  },
];

function Home() {
  const { t } = useLang();
  return (
    <>
      {/* The visitor brings the light: the portrait stays dark except where the pointer (or finger) passes. */}
      <Torch src={heroStudio} alt={t({ en: "Portrait of an entrepreneur in his study, side light", it: "Ritratto di un imprenditore nel suo studio, luce laterale" })} className="min-h-[100svh] text-on-band" radius={340}>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#081629]/90 via-[#081629]/30 to-transparent" />
        <div className="container-site pointer-events-none relative flex min-h-[calc(100svh-80px)] flex-col justify-end pb-14 pt-28 lg:pb-20">
          <p className="eyebrow eyebrow-line eyebrow-band">{t({ en: "Investment holding · Made in Italy", it: "Holding di investimento · Made in Italy" })}</p>
          <h1 className="t-hero mt-8 max-w-[900px] xl:!text-[128px] xl:!leading-[120px]">{t({ en: "New light for Italian companies.", it: "Nuova luce alle imprese italiane." })}</h1>
          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="t-lead max-w-[520px] text-on-band-muted">{t({ en: "We invest in companies of value and in the people who lead them.", it: "Investiamo nelle imprese di valore e nelle persone che le guidano." })}</p>
            <div className="pointer-events-auto flex flex-wrap gap-4">
              <Link to="/people" className="btn btn-primary">{t({ en: "Meet the people", it: "Conosci le persone" })}</Link>
              <Link to="/about" className="btn btn-secondary-band">{t({ en: "About us", it: "Chi siamo" })}</Link>
            </div>
          </div>
          <p className="mt-12 flex items-center gap-3 t-caption uppercase tracking-[3px] text-on-band-muted">
            <span className="inline-block h-2 w-2 rounded-full bg-gold shadow-[0_0_16px_4px_rgba(233,185,73,.6)]" aria-hidden />
            {t({ en: "Move to bring the light", it: "Muoviti per portare la luce" })}
          </p>
        </div>
      </Torch>

      <Masthead photo={firenzeWide} alt={{ en: "Entrepreneur at a window in Florence", it: "Imprenditrice alla finestra, Firenze" }} />
      <CometChapters chapters={chapters} />
      <ValuesTicker />
      <CoverGallery people={homePeople} eyebrow={{ en: "The people of VNL", it: "Le persone di VNL" }} title={{ en: "People before numbers.", it: "Le persone prima dei numeri." }} />
      <Manifesto {...manifesto} />
      <StoryIndex stories={stories.slice(0, 5)} />
      <ClosingBand />
    </>
  );
}
