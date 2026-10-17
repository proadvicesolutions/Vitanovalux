import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import mark from "@/assets/vnl-segno-negativo.svg.asset.json";
import { useLang, type T } from "@/lib/i18n";
import { fmtDate, seriesLabel, personName, personRole, values, type Person, type Story } from "@/lib/content";
import { CometRing } from "./CometRing";

const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

export function Eyebrow({ children, band = false, className = "" }: { children: ReactNode; band?: boolean; className?: string }) {
  return <p className={`eyebrow eyebrow-line ${band ? "eyebrow-band" : ""} ${className}`}>{children}</p>;
}

export function MoreLink({ to, label, band = false }: { to: "/people" | "/stories" | "/companies" | "/about"; label: T; band?: boolean }) {
  const { t } = useLang();
  return (
    <Link to={to} className={`group inline-flex items-center gap-3 t-label font-semibold ${band ? "text-on-band" : "text-ink"}`}>
      <span className="border-b-2 border-gold pb-1">{t(label)}</span>
      <ArrowRight size={18} strokeWidth={1.5} aria-hidden className="transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );
}

/* The four values: a numbered list on night blue, not a row of cards. */
export function ValuesSection() {
  const { t } = useLang();
  return (
    <section className="relative overflow-hidden bg-footer text-on-band section-xl">
      <CometRing className="pointer-events-none absolute -right-[18rem] -top-[10rem] w-[44rem] text-band-raised opacity-70 lg:-right-[14rem] lg:w-[56rem]" showSun={false} />
      <div className="container-site relative grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow band>{t({ en: "Our values", it: "I nostri valori" })}</Eyebrow>
          <h2 className="t-statement mt-6">{t({ en: "Four values, one way of telling.", it: "Quattro valori, un modo di raccontare." })}</h2>
        </div>
        <ol className="lg:col-span-7 lg:col-start-6">
          {values.map((v, i) => (
            <li key={v.title.en} className="grid gap-3 border-t rule-band py-8 md:grid-cols-[72px_1fr_1.1fr] md:gap-8 md:py-10">
              <span className="numeral !text-gold pt-2">{ROMAN[i]}</span>
              <h3 className="t-h1">{t(v.title)}</h3>
              <p className="text-on-band-muted md:pt-2">{t(v.text)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* The name: a large statement and the two readings, Latin and English. */
export function NameSection() {
  const { t } = useLang();
  return (
    <section className="section-xl bg-surface">
      <div className="container-site grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow>{t({ en: "The name", it: "Il nome" })}</Eyebrow>
          <h2 className="t-statement mt-6">{t({ en: "One name, two lights.", it: "Un nome, due luci." })}</h2>
          <p className="t-reading mt-8 !text-[22px] !leading-8 text-gold-ink">Nuova luce, nuovo lusso.</p>
        </div>
        <div className="grid gap-12 lg:col-span-6 lg:col-start-7">
          <div className="border-t border-line pt-8">
            <p className="numeral">{t({ en: "LATIN", it: "LATINO" })} · VITA · NOVA · LUX</p>
            <p className="t-reading mt-5">{t({ en: "New life, new light for Italian companies of value.", it: "Nuova vita, nuova luce alle imprese italiane che hanno valore." })}</p>
          </div>
          <div className="border-t border-line pt-8">
            <p className="numeral">{t({ en: "ENGLISH", it: "INGLESE" })} · LUX</p>
            <p className="t-reading mt-5">{t({ en: "A new luxury inside the company: quality, care, value that lasts.", it: "Un nuovo lusso dentro l'impresa: qualità, cura, valore che dura." })}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PersonCard({ p }: { p: Person }) {
  const { t, q } = useLang();
  return (
    <article className="group">
      <div className="overflow-hidden">
        <img src={p.photo} alt={t(p.alt)} className="img-zoom aspect-[4/5] w-full object-cover" loading="lazy" />
      </div>
      <h3 className="t-h3 mt-6">{t(personName)}</h3>
      <p className="t-label mt-1 text-ink-muted">{t(personRole)}</p>
      <blockquote className="mt-4 text-[18px] leading-7">{q(p.quote)}</blockquote>
    </article>
  );
}

/* Home: one large portrait with its quote, two supporting portraits. */
export function FeaturedPeople({ people, eyebrow, title }: { people: Person[]; eyebrow?: T; title?: T }) {
  const { t, q } = useLang();
  const [lead, ...rest] = people;
  if (!lead) return null;
  return (
    <section className="section-xl bg-surface-raised">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="group overflow-hidden lg:col-span-6">
          <img src={lead.photo} alt={t(lead.alt)} className="img-zoom aspect-[4/5] h-full w-full object-cover" loading="lazy" />
        </div>
        <div className="flex flex-col lg:col-span-6">
          <Eyebrow>{t(eyebrow ?? { en: "The people of VNL", it: "Le persone di VNL" })}</Eyebrow>
          <h2 className="t-statement mt-6">{t(title ?? { en: "People before numbers.", it: "Le persone prima dei numeri." })}</h2>
          <blockquote className="t-reading mt-10">{q(lead.quote)}</blockquote>
          <p className="t-label mt-5"><span className="font-semibold">{t(personName)}</span> <span className="text-ink-muted">· {t(personRole)}</span></p>
          <div className="mt-12 grid grid-cols-2 gap-6 lg:mt-auto lg:pt-12">
            {rest.slice(0, 2).map((p) => (
              <figure key={p.photo} className="group">
                <div className="overflow-hidden"><img src={p.photo} alt={t(p.alt)} className="img-zoom aspect-[4/5] w-full object-cover" loading="lazy" /></div>
                <figcaption className="mt-4 text-[15px] leading-6 text-ink-muted">{q(p.quote)}</figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-10"><MoreLink to="/people" label={{ en: "All the people", it: "Tutte le persone" }} /></div>
        </div>
      </div>
    </section>
  );
}

/* A large quote, optionally over a photograph that fades into night blue. */
export function Quote({ text, name, role, photo }: { text: T; name: string; role: T; photo?: string }) {
  const { t, q } = useLang();
  return (
    <section className="relative overflow-hidden bg-band text-on-band section-xl">
      {photo && (
        <>
          <img src={photo} alt="" aria-hidden className="absolute inset-y-0 right-0 h-full w-full object-cover opacity-60 lg:w-3/5" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-band via-band/95 to-band/30 lg:via-band/85" />
        </>
      )}
      <figure className="container-site relative">
        <img src={mark.url} alt="" aria-hidden className="h-16 w-16 md:h-20 md:w-20" />
        <blockquote className="t-statement mt-10 max-w-[980px] !font-normal">{q(text)}</blockquote>
        <figcaption className="mt-10 t-label">
          <span className="font-semibold text-gold">{name}</span>
          <span className="text-on-band-muted"> · {t(role)}</span>
        </figcaption>
      </figure>
    </section>
  );
}

export function StoryMeta({ s }: { s: Story }) {
  const { lang } = useLang();
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="numeral !text-[12px] !tracking-[2px]">{t(seriesLabel[s.series]).toUpperCase()}</span>
      <span aria-hidden className="h-px w-6 bg-line-strong" />
      <time dateTime={s.date} className="t-caption text-ink-muted">{fmtDate(s.date, lang)}</time>
    </div>
  );
}

export function StoryCard({ s, size = "md" }: { s: Story; size?: "lg" | "md" | "row" }) {
  const { t } = useLang();
  if (size === "row") {
    return (
      <Link to="/stories/$slug" params={{ slug: s.slug }} className="group grid grid-cols-[40%_1fr] items-start gap-6">
        <div className="overflow-hidden"><img src={s.photo} alt={t(s.alt)} className="img-zoom aspect-[4/5] w-full object-cover" loading="lazy" /></div>
        <div className="pt-1">
          <StoryMeta s={s} />
          <h3 className="t-h3 mt-4 decoration-gold decoration-2 underline-offset-[6px] group-hover:underline">{t(s.title)}</h3>
        </div>
      </Link>
    );
  }
  return (
    <Link to="/stories/$slug" params={{ slug: s.slug }} className="group block">
      <div className="overflow-hidden"><img src={s.photo} alt={t(s.alt)} className={`img-zoom w-full object-cover ${size === "lg" ? "aspect-[5/4]" : "aspect-[4/3]"}`} loading="lazy" /></div>
      <div className="mt-6"><StoryMeta s={s} /></div>
      <h3 className={`mt-4 decoration-gold decoration-2 underline-offset-[6px] group-hover:underline ${size === "lg" ? "t-h1" : "t-h3"}`}>{t(s.title)}</h3>
    </Link>
  );
}

/* Home: one large story and two in rows. */
export function StoriesFeature({ stories }: { stories: Story[] }) {
  const { t } = useLang();
  const [lead, ...rest] = stories;
  if (!lead) return null;
  return (
    <section className="section-xl bg-surface">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>{t({ en: "Stories", it: "Storie" })}</Eyebrow>
            <h2 className="t-statement mt-6">{t({ en: "Every company is a story.", it: "Ogni impresa è una storia." })}</h2>
          </div>
          <MoreLink to="/stories" label={{ en: "All stories", it: "Tutte le storie" }} />
        </div>
        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7"><StoryCard s={lead} size="lg" /></div>
          <div className="grid content-start gap-12 lg:col-span-5">
            {rest.slice(0, 2).map((s) => <StoryCard key={s.slug} s={s} size="row" />)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Inner page opener on night blue, with the Comet ring cropped at the right edge. */
export function PageHero({ eyebrow, title, lead, photo }: { eyebrow?: T; title: T; lead?: T; photo?: string }) {
  const { t } = useLang();
  return (
    <section className="relative overflow-hidden bg-band text-on-band">
      {photo ? (
        <>
          <img src={photo} alt="" aria-hidden className="absolute inset-y-0 right-0 h-full w-full object-cover opacity-70 lg:w-1/2" />
          <div className="absolute inset-0 bg-gradient-to-r from-band via-band/90 to-band/20" />
        </>
      ) : (
        <CometRing className="pointer-events-none absolute -bottom-[16rem] -right-[12rem] w-[36rem] text-band-raised lg:-bottom-[22rem] lg:-right-[8rem] lg:w-[52rem]" />
      )}
      <div className="container-site relative pb-20 pt-24 md:pb-28 md:pt-32 lg:pb-36 lg:pt-40">
        {eyebrow && <Eyebrow band>{t(eyebrow)}</Eyebrow>}
        <h1 className="t-hero mt-8 max-w-[980px]">{t(title)}</h1>
        {lead && <p className="t-lead mt-8 prose-w text-on-band-muted">{t(lead)}</p>}
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, children }: { eyebrow?: T; title: T; children?: ReactNode }) {
  const { t } = useLang();
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && <Eyebrow>{t(eyebrow)}</Eyebrow>}
        <h2 className="t-statement mt-6">{t(title)}</h2>
      </div>
      {children}
    </div>
  );
}

export function ClosingBand() {
  const { t } = useLang();
  return (
    <section className="relative overflow-hidden bg-band text-on-band section-xl">
      <CometRing className="pointer-events-none absolute -right-[8rem] top-1/2 w-[22rem] -translate-y-1/2 text-on-band-muted/25 md:right-[4%] md:w-[24rem] lg:w-[30rem]" />
      <div className="container-site relative flex flex-col items-start gap-10">
        <Eyebrow band>{t({ en: "Contact", it: "Contatti" })}</Eyebrow>
        <h2 className="t-hero max-w-[900px]">{t({ en: "Have a company to grow? Let's talk.", it: "Hai un'impresa da far crescere? Parliamone." })}</h2>
        <Link to="/contact" className="btn btn-primary">{t({ en: "Write to us", it: "Scrivici" })}</Link>
      </div>
    </section>
  );
}

export const manifesto = {
  text: { it: "Gli altri raccontano i numeri. Noi raccontiamo le persone che fanno l'impresa.", en: "Others tell numbers. We tell the people who make the company." },
  name: { en: "[Name Surname]", it: "[Nome Cognome]" },
  role: { it: "Presidente, Vita Nova Lux", en: "Chair, Vita Nova Lux" },
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
