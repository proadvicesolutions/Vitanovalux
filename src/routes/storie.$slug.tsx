import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { fmtDate, stories } from "@/lib/content";
import { ClosingBand } from "@/components/site/blocks";

export const Route = createFileRoute("/storie/$slug")({
  loader: ({ params }) => {
    const story = stories.find((s) => s.slug === params.slug);
    if (!story) throw notFound();
    return story;
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.title.it} · Vita Nova Lux` : "Storia non trovata · Vita Nova Lux";
    const desc = loaderData ? `${loaderData.series}: ${loaderData.title.it}` : "Storia non disponibile.";
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
  const { t, lang } = useLang();
  return (
    <>
      <article className="section-y">
        <div className="container-site">
          <Link to="/storie" className="link-gold inline-flex items-center gap-2 t-label"><ArrowLeft size={16} strokeWidth={1.5} aria-hidden />{t({ it: "Tutte le storie", en: "All stories" })}</Link>
          <header className="mt-10 max-w-[900px]">
            <p className="eyebrow">{s.series}</p>
            <h1 className="t-h1 mt-4">{t(s.title)}</h1>
          </header>
          <img src={s.photo} alt={t(s.alt)} className="mt-10 aspect-[16/9] w-full object-cover" />
          <div className="mx-auto mt-12 prose-w space-y-6">
            <p className="t-lead">{t({ it: "[Testo dell'articolo da inserire. Frasi brevi, prima persona plurale.]", en: "[Article text to be added. Short sentences, first person plural.]" })}</p>
            <p className="text-ink-muted">{t({ it: "Raccontiamo il percorso, non l'uscita. Ogni impresa entrata nel gruppo diventa una storia da raccontare.", en: "We tell the journey, not the exit. Every company that joins the group becomes a story worth telling." })}</p>
            <p className="border-t border-line pt-6 t-label text-ink-muted">
              {t({ it: "Di", en: "By" })} [Nome Cognome] · <time dateTime={s.date}>{fmtDate(s.date, lang)}</time>
            </p>
          </div>
        </div>
      </article>
      <ClosingBand />
    </>
  );
}
