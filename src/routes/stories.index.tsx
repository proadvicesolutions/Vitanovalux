import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { series, stories } from "@/lib/content";
import { ClosingBand, meta, PageHero } from "@/components/site/blocks";
import { StoryIndex } from "@/components/site/experience";

export const Route = createFileRoute("/stories/")({
  head: () => meta("Stories · Vita Nova Lux", "The Vita Nova Lux editorial series: Volti, Dietro la luce, Il Nuovo Lusso, VNL Perspective and more."),
  component: Stories,
});

function Stories() {
  const { t } = useLang();
  const [active, setActive] = useState<string | null>(null);
  const list = active ? stories.filter((s) => s.series === active) : stories;
  const chip = (on: boolean) =>
    `rounded-full border px-4 py-2 t-label font-medium transition-colors duration-200 ${on ? "border-ink bg-ink text-on-band" : "border-line-strong hover:border-ink"}`;
  return (
    <>
      <PageHero
        eyebrow={{ en: "Stories", it: "Storie" }}
        title={{ en: "Every company is a story worth telling.", it: "Ogni impresa è una storia da raccontare." }}
      />
      <section className="bg-surface pt-16 md:pt-24">
        <div className="container-site">
          <div className="flex flex-wrap gap-2" role="group" aria-label={t({ en: "Filter by series", it: "Filtra per serie" })}>
            <button type="button" aria-pressed={!active} className={chip(!active)} onClick={() => setActive(null)}>{t({ en: "All", it: "Tutte" })}</button>
            {series.map((s) => (
              <button key={s} type="button" aria-pressed={active === s} className={chip(active === s)} onClick={() => setActive(s)}>{s}</button>
            ))}
          </div>
        </div>
      </section>
      <StoryIndex stories={list} heading={false} />
      <ClosingBand />
    </>
  );
}
