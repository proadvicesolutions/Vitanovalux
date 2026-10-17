import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { personName, stories } from "@/lib/content";
import { ClosingBand, StoryCard, StoryMeta } from "@/components/site/blocks";

export const Route = createFileRoute("/stories/$slug")({
  loader: ({ params }) => {
    const story = stories.find((s) => s.slug === params.slug);
    if (!story) throw notFound();
    return story;
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.title.en} · Vita Nova Lux` : "Story not found · Vita Nova Lux";
    const desc = loaderData ? `${loaderData.series}: ${loaderData.title.en}` : "Story not available.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  component: Article,
});

function Article() {
  const s = Route.useLoaderData();
  const { t } = useLang();
  const more = stories.filter((x) => x.slug !== s.slug).slice(0, 3);
  return (
    <>
      <article>
        <header className="relative isolate overflow-hidden bg-band text-on-band">
          <img src={s.photo} alt={t(s.alt)} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-50" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-band via-band/70 to-band/20" />
          <div className="container-site flex min-h-[560px] flex-col justify-end pb-16 pt-32 lg:min-h-[680px] lg:pb-24">
            <Link to="/stories" className="inline-flex items-center gap-2 t-label text-on-band-muted hover:text-on-band"><ArrowLeft size={16} strokeWidth={1.5} aria-hidden />{t({ en: "All stories", it: "Tutte le storie" })}</Link>
            <div className="mt-10 [&_.numeral]:!text-gold [&_time]:!text-on-band-muted"><StoryMeta s={s} /></div>
            <h1 className="t-hero mt-6 max-w-[1000px]">{t(s.title)}</h1>
          </div>
        </header>
        <div className="section-xl bg-surface">
          <div className="container-site">
            <div className="mx-auto max-w-[720px] space-y-8">
              <p className="t-reading">{t({ en: "[Article text to be added. Short sentences, first person plural.]", it: "[Testo dell'articolo da inserire. Frasi brevi, prima persona plurale.]" })}</p>
              <p className="text-[19px] leading-8 text-ink-muted">{t({ en: "We tell the journey, not the exit. Every company that joins the group becomes a story worth telling.", it: "Raccontiamo il percorso, non l'uscita. Ogni impresa entrata nel gruppo diventa una storia da raccontare." })}</p>
              <p className="border-t border-line pt-6 t-label text-ink-muted">{t({ en: "By", it: "Di" })} {t(personName)}</p>
            </div>
          </div>
        </div>
      </article>
      <section className="section-y border-t border-line bg-surface">
        <div className="container-site">
          <h2 className="t-h2">{t({ en: "More stories", it: "Altre storie" })}</h2>
          <div className="mt-10 grid gap-14 md:grid-cols-3 md:gap-10">
            {more.map((x) => <StoryCard key={x.slug} s={x} />)}
          </div>
        </div>
      </section>
      <ClosingBand />
    </>
  );
}
