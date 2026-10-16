import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { photos } from "@/lib/content";
import { ClosingBand, manifesto, meta, NameSection, PageHero, Quote, ValuesSection } from "@/components/site/blocks";

export const Route = createFileRoute("/chi-siamo")({
  head: () => meta("Chi siamo · Vita Nova Lux", "Socio, non fondo. La holding italiana del gruppo Hadlaan e il legame tra Italia e Golfo."),
  component: About,
});

function About() {
  const { t } = useLang();
  return (
    <>
      <PageHero eyebrow={{ it: "Chi siamo", en: "About us" }} title={{ it: "Socio, non fondo.", en: "A partner, not a fund." }} lead={{ it: "Siamo la holding italiana del gruppo Hadlaan. Entriamo nelle imprese per restarci.", en: "We are the Italian holding of the Hadlaan group. We join companies to stay." }} />
      <NameSection />
      <ValuesSection />
      <section className="section-y bg-surface-raised">
        <div className="container-site grid items-center gap-12 md:grid-cols-2">
          <img src={photos.cortile} alt={t({ it: "Cortile di un palazzo storico italiano", en: "Courtyard of a historic Italian palazzo" })} className="aspect-[4/3] w-full object-cover" loading="lazy" />
          <div>
            <p className="eyebrow">{t({ it: "Italia e Golfo", en: "Italy and the Gulf" })}</p>
            <h2 className="t-h2 mt-3">{t({ it: "Il legame con Hadlaan.", en: "Our link with Hadlaan." })}</h2>
            <p className="mt-6 prose-w text-ink-muted">{t({ it: "[Testo Hadlaan da fornire a cura del cliente]", en: "[Hadlaan text to be supplied by the client]" })}</p>
          </div>
        </div>
      </section>
      <Quote {...manifesto} />
      <ClosingBand />
    </>
  );
}
