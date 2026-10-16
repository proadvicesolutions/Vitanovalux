import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import mark from "@/assets/vnl-segno-negativo.svg.asset.json";
import { useLang, type T } from "@/lib/i18n";
import { fmtDate, personName, personRole, values, type Person, type Story } from "@/lib/content";

export function ValueCard({ title, text }: { title: T; text: T }) {
  const { t } = useLang();
  return (
    <article className="rounded-sm border-t-2 border-gold bg-surface-raised p-8">
      <p className="eyebrow">{t({ it: "Valore", en: "Value" })}</p>
      <h3 className="t-h3 mt-4">{t(title)}</h3>
      <p className="mt-3 text-ink-muted">{t(text)}</p>
    </article>
  );
}

export function ValuesSection() {
  const { t } = useLang();
  return (
    <section className="section-y">
      <div className="container-site">
        <h2 className="t-h2 max-w-[680px]">{t({ it: "Quattro valori, un modo di raccontare.", en: "Four values, one way of telling." })}</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => <ValueCard key={v.title.it} {...v} />)}
        </div>
      </div>
    </section>
  );
}

export function NameSection() {
  const { t } = useLang();
  return (
    <section className="section-y bg-surface-raised">
      <div className="container-site grid gap-12 md:grid-cols-[1fr_1fr_1fr]">
        <h2 className="t-h2">{t({ it: "Un nome, due luci.", en: "One name, two lights." })}</h2>
        <div className="border-t border-line pt-6">
          <p className="eyebrow">{t({ it: "Latino", en: "Latin" })}</p>
          <p className="t-lead mt-4">{t({ it: "Vita, Nova, Lux: nuova vita, nuova luce alle imprese italiane che hanno valore.", en: "Vita, Nova, Lux: new life, new light for Italian companies of value." })}</p>
        </div>
        <div className="border-t border-line pt-6">
          <p className="eyebrow">{t({ it: "Inglese", en: "English" })}</p>
          <p className="t-lead mt-4">{t({ it: "Lux: un nuovo lusso dentro l'impresa: qualità, cura, valore che dura.", en: "Lux: a new luxury inside the company: quality, care, value that lasts." })}</p>
        </div>
      </div>
    </section>
  );
}

export function PersonCard({ p }: { p: Person }) {
  const { t, q } = useLang();
  return (
    <article>
      <img src={p.photo} alt={t(p.alt)} className="aspect-[3/4] w-full object-cover" loading="lazy" />
      <h3 className="t-h3 mt-6">{personName}</h3>
      <p className="t-label mt-1 text-ink-muted">{personRole}</p>
      <blockquote className="t-lead mt-4">{q(p.quote)}</blockquote>
    </article>
  );
}

export function Quote({ text, name, role }: { text: T; name: string; role: T }) {
  const { t, q } = useLang();
  return (
    <section className="section-hero bg-band text-on-band">
      <figure className="container-site grid gap-8 md:grid-cols-[96px_1fr] md:gap-12">
        <img src={mark.url} alt="" aria-hidden className="h-16 w-16 md:h-24 md:w-24" />
        <div>
          <blockquote className="t-quote-xl max-w-[900px]">{q(text)}</blockquote>
          <figcaption className="mt-8 t-label">
            <span className="font-semibold text-gold">{name}</span>
            <span className="text-on-band-muted">, {t(role)}</span>
          </figcaption>
        </div>
      </figure>
    </section>
  );
}

export function StoryCard({ s }: { s: Story }) {
  const { t, lang } = useLang();
  return (
    <Link to="/storie/$slug" params={{ slug: s.slug }} className="group block">
      <img src={s.photo} alt={t(s.alt)} className="aspect-[4/3] w-full object-cover" loading="lazy" />
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <span className="rounded-sm border border-line-strong px-2 py-1 text-[12px] font-semibold uppercase leading-4 tracking-wider">{s.series}</span>
        <time dateTime={s.date} className="t-caption text-ink-muted">{fmtDate(s.date, lang)}</time>
      </div>
      <h3 className="t-h3 mt-4 decoration-gold decoration-2 underline-offset-[6px] group-hover:underline">{t(s.title)}</h3>
    </Link>
  );
}

export function PageHero({ eyebrow, title, lead }: { eyebrow?: T; title: T; lead?: T }) {
  const { t } = useLang();
  return (
    <section className="section-hero bg-band text-on-band">
      <div className="container-site">
        {eyebrow && <p className="eyebrow eyebrow-band">{t(eyebrow)}</p>}
        <h1 className="t-display mt-4 max-w-[900px]">{t(title)}</h1>
        {lead && <p className="t-lead mt-6 prose-w text-on-band-muted">{t(lead)}</p>}
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, children }: { eyebrow?: T; title: T; children?: ReactNode }) {
  const { t } = useLang();
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && <p className="eyebrow">{t(eyebrow)}</p>}
        <h2 className="t-h2 mt-3">{t(title)}</h2>
      </div>
      {children}
    </div>
  );
}

export function ClosingBand() {
  const { t } = useLang();
  return (
    <section className="section-y bg-band-raised text-on-band">
      <div className="container-site flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <h2 className="t-h1 max-w-[680px]">{t({ it: "Hai un'impresa da far crescere? Parliamone.", en: "Have a company to grow? Let's talk." })}</h2>
        <Link to="/contatti" className="btn btn-primary">{t({ it: "Contatti", en: "Contact" })}</Link>
      </div>
    </section>
  );
}

export const manifesto = {
  text: { it: "Gli altri raccontano i numeri. Noi raccontiamo le persone che fanno l'impresa.", en: "Others tell numbers. We tell the people who make the company." },
  name: "[Nome Cognome]",
  role: { it: "Presidente, Vita Nova Lux", en: "Chairman, Vita Nova Lux" },
};

export function meta(title: string, description: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
