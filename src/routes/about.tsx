import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { photos } from "@/lib/content";
import { ClosingBand, Eyebrow, manifesto, meta, NameSection, PageHero, Quote, ValuesSection } from "@/components/site/blocks";

export const Route = createFileRoute("/about")({
  head: () => meta("About us · Vita Nova Lux", "A partner, not a fund. The Italian holding of the Hadlaan group and the link between Italy and the Gulf."),
  component: About,
});

function About() {
  const { t } = useLang();
  return (
    <>
      <PageHero
        eyebrow={{ en: "About us", it: "Chi siamo" }}
        title={{ en: "A partner, not a fund.", it: "Socio, non fondo." }}
        lead={{ en: "We are the Italian holding of the Hadlaan group. We join companies to stay.", it: "Siamo la holding italiana del gruppo Hadlaan. Entriamo nelle imprese per restarci." }}
        photo={photos.still}
      />
      <NameSection />
      <ValuesSection />
      <section className="section-xl bg-surface-raised">
        <div className="container-site grid items-center gap-14 lg:grid-cols-12">
          <div className="group overflow-hidden lg:col-span-6">
            <img src={photos.cortile} alt={t({ en: "Courtyard of a historic Italian palazzo", it: "Cortile di un palazzo storico italiano" })} className="img-zoom aspect-[4/5] w-full object-cover" loading="lazy" />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Eyebrow>{t({ en: "Italy and the Gulf", it: "Italia e Golfo" })}</Eyebrow>
            <h2 className="t-statement mt-6">{t({ en: "Our link with Hadlaan.", it: "Il legame con Hadlaan." })}</h2>
            <p className="t-reading mt-8 text-ink-muted">{t({ en: "[Hadlaan text to be supplied by the client]", it: "[Testo Hadlaan da fornire a cura del cliente]" })}</p>
          </div>
        </div>
      </section>
      <Quote {...manifesto} />
      <ClosingBand />
    </>
  );
}
