import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { companies } from "@/lib/content";
import { ClosingBand, meta, PageHero } from "@/components/site/blocks";

export const Route = createFileRoute("/imprese")({
  head: () => meta("Imprese · Vita Nova Lux", "Le imprese italiane che crescono con noi: storie di cura, qualità e durata."),
  component: Companies,
});

function Companies() {
  const { t } = useLang();
  return (
    <>
      <PageHero eyebrow={{ it: "Imprese", en: "Companies" }} title={{ it: "Le imprese che crescono con noi.", en: "The companies growing with us." }} />
      <section className="section-y">
        <div className="container-site grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {companies.map((c) => (
            <article key={c.photo + c.sector.it} className="overflow-hidden rounded-sm bg-surface-raised transition-shadow duration-200 hover:shadow-lift">
              <img src={c.photo} alt={t(c.alt)} className="aspect-[4/3] w-full object-cover" loading="lazy" />
              <div className="p-6">
                <p className="eyebrow">{t(c.sector)}</p>
                <h2 className="t-h3 mt-3">{t({ it: "[Impresa]", en: "[Company]" })}</h2>
                <p className="mt-3 text-ink-muted">{t(c.text)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <ClosingBand />
    </>
  );
}
