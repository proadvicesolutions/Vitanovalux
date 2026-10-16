import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { series, stories } from "@/lib/content";
import { meta, PageHero, StoryCard } from "@/components/site/blocks";

export const Route = createFileRoute("/storie/")({
  head: () => meta("Storie · Vita Nova Lux", "Le serie editoriali di Vita Nova Lux: Volti, Dietro la luce, Il Nuovo Lusso, VNL Perspective e altre."),
  component: Stories,
});

function Stories() {
  const { t } = useLang();
  const [active, setActive] = useState<string | null>(null);
  const list = active ? stories.filter((s) => s.series === active) : stories;
  const chip = (on: boolean) =>
    `rounded-sm border px-3 py-2 t-label font-medium transition-colors duration-200 ${on ? "border-ink bg-ink text-on-band" : "border-line-strong hover:border-ink"}`;
  return (
    <>
      <PageHero eyebrow={{ it: "Storie", en: "Stories" }} title={{ it: "Ogni impresa è una storia da raccontare.", en: "Every company is a story worth telling." }} />
      <section className="section-y">
        <div className="container-site">
          <div className="flex flex-wrap gap-2" role="group" aria-label={t({ it: "Filtra per serie", en: "Filter by series" })}>
            <button type="button" aria-pressed={!active} className={chip(!active)} onClick={() => setActive(null)}>{t({ it: "Tutte", en: "All" })}</button>
            {series.map((s) => (
              <button key={s} type="button" aria-pressed={active === s} className={chip(active === s)} onClick={() => setActive(s)}>{s}</button>
            ))}
          </div>
          <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {list.map((s) => <StoryCard key={s.slug} s={s} />)}
          </div>
        </div>
      </section>
    </>
  );
}
