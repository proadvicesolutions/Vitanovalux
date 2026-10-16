import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { series, stories } from "@/lib/content";
import { ClosingBand, meta, PageHero, StoryCard } from "@/components/site/blocks";

export const Route = createFileRoute("/stories/")({
  head: () => meta("Stories · Vita Nova Lux", "The Vita Nova Lux editorial series: Volti, Dietro la luce, Il Nuovo Lusso, VNL Perspective and more."),
  component: Stories,
});

function Stories() {
  const { t } = useLang();
  const [active, setActive] = useState<string | null>(null);
  const list = active ? stories.filter((s) => s.series === active) : stories;
  const [lead, ...rest] = list;
  const chip = (on: boolean) =>
    `rounded-full border px-4 py-2 t-label font-medium transition-colors duration-200 ${on ? "border-ink bg-ink text-on-band" : "border-line-strong hover:border-ink"}`;
  return (
    <>
      <PageHero
        eyebrow={{ en: "Stories", it: "Storie" }}
        title={{ en: "Every company is a story worth telling.", it: "Ogni impresa è una storia da raccontare." }}
      />
      <section className="section-xl bg-surface">
        <div className="container-site">
          <div className="flex flex-wrap gap-2" role="group" aria-label={t({ en: "Filter by series", it: "Filtra per serie" })}>
            <button type="button" aria-pressed={!active} className={chip(!active)} onClick={() => setActive(null)}>{t({ en: "All", it: "Tutte" })}</button>
            {series.map((s) => (
              <button key={s} type="button" aria-pressed={active === s} className={chip(active === s)} onClick={() => setActive(s)}>{s}</button>
            ))}
          </div>
          {lead && (
            <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-8"><StoryCard s={lead} size="lg" /></div>
              <div className="grid content-start gap-12 lg:col-span-4">
                {rest.slice(0, 2).map((s) => <StoryCard key={s.slug} s={s} />)}
              </div>
            </div>
          )}
          {rest.length > 2 && (
            <div className="mt-20 grid gap-14 border-t border-line pt-14 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
              {rest.slice(2).map((s) => <StoryCard key={s.slug} s={s} />)}
            </div>
          )}
        </div>
      </section>
      <ClosingBand />
    </>
  );
}
