import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { companies, photos } from "@/lib/content";
import { ClosingBand, meta, PageHero } from "@/components/site/blocks";

export const Route = createFileRoute("/companies")({
  head: () => meta("Companies · Vita Nova Lux", "The Italian companies growing with us: stories of care, quality and durability."),
  component: Companies,
});

const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

function Companies() {
  const { t } = useLang();
  return (
    <>
      <PageHero
        eyebrow={{ en: "Companies", it: "Imprese" }}
        title={{ en: "The companies growing with us.", it: "Le imprese che crescono con noi." }}
        lead={{ en: "Workshops, ateliers and family houses: each one keeps its name, its hands and its way of working.", it: "Botteghe, atelier e case di famiglia: ognuna conserva il suo nome, le sue mani e il suo modo di lavorare." }}
        photo={photos.mani}
      />
      <section className="section-xl bg-surface">
        <div className="container-site grid gap-24 lg:gap-32">
          {companies.map((c, i) => (
            <article key={c.photo + c.sector.en} className="group grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
              <div className={`overflow-hidden lg:col-span-7 ${i % 2 ? "lg:order-2 lg:col-start-6" : ""}`}>
                <img src={c.photo} alt={t(c.alt)} className="img-zoom aspect-[4/3] w-full object-cover" loading="lazy" />
              </div>
              <div className={`lg:col-span-4 ${i % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-9"}`}>
                <p className="numeral">{ROMAN[i]} · {t(c.sector).toUpperCase()}</p>
                <h2 className="t-statement mt-6">{t({ en: "[Company]", it: "[Impresa]" })}</h2>
                <p className="t-reading mt-6 text-ink-muted">{t(c.text)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <ClosingBand />
    </>
  );
}
