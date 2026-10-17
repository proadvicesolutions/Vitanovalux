import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useLang, type T } from "@/lib/i18n";
import { fmtDate, seriesLabel, personName, personRole, values, type Person, type Story } from "@/lib/content";

/* ------------------------------------------------------------------ */
/* Shared: reduced motion                                               */
/* ------------------------------------------------------------------ */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/* ------------------------------------------------------------------ */
/* 1. Torch: the photo stays in the dark, the visitor brings the light  */
/* ------------------------------------------------------------------ */
export function Torch({ src, alt, className = "", children, radius = 300 }: { src: string; alt: string; className?: string; children?: ReactNode; radius?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [manual, setManual] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--x", `${(((e.clientX - r.left) / r.width) * 100).toFixed(2)}%`);
      el.style.setProperty("--y", `${(((e.clientY - r.top) / r.height) * 100).toFixed(2)}%`);
      setManual(true);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerdown", move);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerdown", move);
    };
  }, [reduced]);
  const style = { "--r": `${radius}px` } as CSSProperties;
  return (
    <div ref={ref} style={style} className={`torch ${manual || reduced ? "" : "torch-drift"} relative isolate overflow-hidden bg-[#081629] ${className}`}>
      <img src={src} alt="" aria-hidden className="torch-dark absolute inset-0 h-full w-full object-cover" />
      <img src={src} alt={alt} className="torch-lit absolute inset-0 h-full w-full object-cover" />
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. The Comet that grows with the scroll: Vita · Nova · Lux           */
/* ------------------------------------------------------------------ */
/* Exact logo geometry (r 66, 330° tail, width 1.2 → 28, power 1.6). The scroll only reveals it, from the tail to the head. */
function cometPath(reveal: number) {
  const cx = 100, cy = 100, r = 66, n = 160;
  const th1 = (-45 * Math.PI) / 180;
  const th0 = th1 - (330 * Math.PI) / 180;
  const end = Math.max(0.01, Math.min(1, reveal));
  const out: string[] = [];
  const inn: string[] = [];
  for (let i = 0; i <= n; i++) {
    const t = (i / n) * end;
    const th = th0 + (th1 - th0) * t;
    const w = 1.2 + 26.8 * t ** 1.6;
    out.push(`${(cx + (r + w / 2) * Math.cos(th)).toFixed(2)} ${(cy + (r + w / 2) * Math.sin(th)).toFixed(2)}`);
    inn.push(`${(cx + (r - w / 2) * Math.cos(th)).toFixed(2)} ${(cy + (r - w / 2) * Math.sin(th)).toFixed(2)}`);
  }
  return `M${[...out, ...inn.reverse()].join(" L")}Z`;
}

type Chapter = { word: string; kicker: T; title: T; text: T };

export function CometChapters({ chapters }: { chapters: Chapter[] }) {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [p, setP] = useState(0);
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      setP(Math.max(0, Math.min(1, -r.top / total)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  if (reduced) {
    return (
      <section className="bg-[#081629] text-on-band section-xl">
        <div className="container-site grid gap-16">
          {chapters.map((c) => (
            <div key={c.word}>
              <p className="eyebrow eyebrow-band">{t(c.kicker)}</p>
              <p className="chapter-word mt-4">{c.word}</p>
              <h2 className="t-statement mt-6 max-w-[760px]">{t(c.title)}</h2>
              <p className="t-lead mt-6 prose-w text-on-band-muted">{t(c.text)}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  const idx = Math.min(chapters.length - 1, Math.floor(p * chapters.length * 0.999));
  const sun = Math.min(1, Math.max(0, (p - 0.8) / 0.12));
  return (
    <section ref={ref} className="relative bg-[#081629] text-on-band" style={{ height: `${chapters.length * 110}vh` }}>
      <div className="sticky top-0 flex h-[100svh] items-end overflow-hidden pb-10 md:items-center md:pb-0">
        <svg viewBox="16 16 168 168" aria-hidden className="pointer-events-none absolute right-[6vw] top-[11vh] w-[58vw] max-w-[420px] md:right-[6vw] md:top-1/2 md:w-[46vmin] md:max-w-none md:-translate-y-1/2 lg:w-[62vmin]">
          <mask id="comet-gap" maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
            <rect width="200" height="200" fill="#fff" />
            <circle cx={146.67} cy={53.33} r={24.5} fill="#000" fillOpacity={sun} />
          </mask>
          <path d={cometPath(p / 0.8)} fill="#8A9BB0" mask="url(#comet-gap)" />
          <circle cx={146.67} cy={53.33} r={21} fill="#E9B949" opacity={sun} />
        </svg>
        <div className="container-site relative w-full">
          <div className="flex items-center gap-4 t-caption tracking-[3px] text-on-band-muted">
            {chapters.map((c, i) => (
              <span key={c.word} className={`transition-colors duration-300 ${i === idx ? "text-gold" : ""}`}>{c.word.toUpperCase()}</span>
            ))}
          </div>
          <div className="relative mt-10 min-h-[420px] md:min-h-[460px]">
            {chapters.map((c, i) => (
              <div key={c.word} aria-hidden={i !== idx} className={`absolute inset-0 transition-all duration-700 ${i === idx ? "translate-y-0 opacity-100" : i < idx ? "-translate-y-8 opacity-0" : "translate-y-8 opacity-0"}`}>
                <p className="eyebrow eyebrow-band">{t(c.kicker)}</p>
                <p className="chapter-word mt-2">{c.word}</p>
                <h2 className="t-statement mt-4 max-w-[680px]">{t(c.title)}</h2>
                <p className="t-lead mt-6 max-w-[520px] text-on-band-muted">{t(c.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Masthead: the name as a magazine cover                            */
/* ------------------------------------------------------------------ */
export function Masthead({ photo, alt }: { photo: string; alt: T }) {
  const { t } = useLang();
  return (
    <section className="overflow-hidden bg-surface pt-10 md:pt-14">
      <div className="container-site">
        <div className="flex flex-wrap items-center justify-between gap-3 border-y border-ink py-3 t-caption font-semibold uppercase tracking-[3px]">
          <span>Nº 01</span>
          <span className="hidden md:inline">{t({ en: "New light, new luxury", it: "Nuova luce, nuovo lusso" })}</span>
          <span>{t({ en: "Italy · the Gulf", it: "Italia · Golfo" })}</span>
        </div>
        <h2 className="masthead mt-6 text-ink" aria-label="Vita Nova Lux">VITA NOVA</h2>
      </div>
      <div className="relative mt-4 md:mt-6">
        <img src={photo} alt={t(alt)} className="aspect-[4/5] w-full object-cover md:aspect-[21/9]" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-band/80 via-transparent to-transparent" />
        <div className="container-site absolute inset-x-0 bottom-0 flex flex-col gap-6 pb-6 md:flex-row md:items-end md:justify-between md:pb-10">
          <p aria-hidden className="masthead text-on-band">LUX</p>
          <p className="t-reading max-w-[440px] text-on-band md:pb-6">{t({ en: "In Latin, new life and new light. In English, luxury: quality, care, value that lasts.", it: "In latino, nuova vita e nuova luce. In inglese, lusso: qualità, cura, valore che dura." })}</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Values ticker                                                     */
/* ------------------------------------------------------------------ */
export function ValuesTicker() {
  const { t } = useLang();
  const items = values.map((v) => t(v.title));
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden}>
      {items.map((w) => (
        <span key={w} className="flex items-center gap-10">
          <span className="ticker-word">{w}</span>
          <span className="h-4 w-4 shrink-0 rounded-full bg-gold" />
        </span>
      ))}
    </div>
  );
  return (
    <section className="overflow-hidden border-y border-band-raised bg-band py-8 text-on-band md:py-10" aria-label={t({ en: "Our values", it: "I nostri valori" })}>
      <div className="ticker flex w-max">{row(false)}{row(true)}</div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5. People as magazine covers, scrolling sideways                     */
/* ------------------------------------------------------------------ */
export function CoverGallery({ people, eyebrow, title }: { people: Person[]; eyebrow: T; title: T }) {
  const { t, q } = useLang();
  return (
    <section className="bg-[#081629] text-on-band section-xl">
      <div className="container-site flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow eyebrow-line eyebrow-band">{t(eyebrow)}</p>
          <h2 className="t-hero mt-6 max-w-[900px]">{t(title)}</h2>
        </div>
        <p className="t-label text-on-band-muted">{t({ en: "Scroll sideways →", it: "Scorri di lato →" })}</p>
      </div>
      <div className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 pl-4 pr-4 md:pl-[max(48px,calc((100vw-1200px)/2))] [scrollbar-width:thin]">
        {people.map((p, i) => (
          <article key={p.photo + p.quote.en} className="group relative aspect-[3/4] w-[82vw] shrink-0 snap-start overflow-hidden sm:w-[420px]">
            <img src={p.photo} alt={t(p.alt)} className="img-zoom absolute inset-0 h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/85" />
            <header className="absolute inset-x-0 top-0 flex items-start justify-between p-6">
              <span className="cover-mast">VNL</span>
              <span className="t-caption font-semibold tracking-[3px] text-on-band">Nº {String(i + 1).padStart(2, "0")}</span>
            </header>
            <div className="absolute inset-x-0 bottom-0 p-6">
              <blockquote className="t-reading !text-[24px] !leading-[32px] text-on-band">{q(p.quote)}</blockquote>
              <p className="mt-4 t-label"><span className="font-semibold text-gold">{t(personName)}</span> <span className="text-on-band-muted">· {t(personRole)}</span></p>
            </div>
          </article>
        ))}
        <div className="w-4 shrink-0 md:w-12" aria-hidden />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Manifesto in giant type                                           */
/* ------------------------------------------------------------------ */
export function Manifesto({ text, name, role }: { text: T; name: T; role: T }) {
  const { t, q } = useLang();
  return (
    <section className="bg-surface section-xl">
      <figure className="container-site">
        <blockquote className="manifesto text-ink">{q(text)}</blockquote>
        <figcaption className="mt-12 flex items-center gap-4 t-label">
          <span className="h-px w-12 bg-gold" aria-hidden />
          <span className="font-semibold">{t(name)}</span>
          <span className="text-ink-muted">{t(role)}</span>
        </figcaption>
      </figure>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Stories as a magazine index, the image follows the cursor         */
/* ------------------------------------------------------------------ */
export function StoryIndex({ stories, heading = true }: { stories: Story[]; heading?: boolean }) {
  const { t, lang } = useLang();
  const [hover, setHover] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const listRef = useRef<HTMLOListElement>(null);
  return (
    <section className="bg-surface section-xl">
      <div className="container-site">
        {heading && (
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow eyebrow-line">{t({ en: "Stories", it: "Storie" })}</p>
              <h2 className="t-hero mt-6">{t({ en: "In this issue.", it: "In questo numero." })}</h2>
            </div>
            <Link to="/stories" className="group inline-flex items-center gap-2 t-label font-semibold"><span className="border-b-2 border-gold pb-1">{t({ en: "All stories", it: "Tutte le storie" })}</span><ArrowUpRight size={18} strokeWidth={1.5} aria-hidden /></Link>
          </div>
        )}
        <ol
          ref={listRef}
          className={`relative ${heading ? "mt-14" : ""} border-t border-ink`}
          onPointerMove={(e) => {
            const r = listRef.current?.getBoundingClientRect();
            if (r) setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
          }}
          onPointerLeave={() => setHover(null)}
        >
          {stories.map((s, i) => (
            <li key={s.slug} onPointerEnter={() => setHover(i)} className="border-b border-line-strong/60">
              <Link to="/stories/$slug" params={{ slug: s.slug }} className="group grid items-center gap-4 py-7 md:grid-cols-[80px_1fr_220px] md:gap-8 md:py-10">
                <span className="numeral">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex items-start gap-5">
                  <img src={s.photo} alt="" aria-hidden className="h-20 w-16 shrink-0 object-cover md:hidden" loading="lazy" />
                  <span className="index-title transition-colors duration-200 group-hover:text-gold-ink">{t(s.title)}</span>
                </span>
                <span className="flex flex-col gap-1 t-caption text-ink-muted md:items-end md:text-right">
                  <span className="font-semibold uppercase tracking-[2px] text-ink">{t(seriesLabel[s.series])}</span>
                  <time dateTime={s.date}>{fmtDate(s.date, lang)}</time>
                </span>
              </Link>
            </li>
          ))}
          {hover !== null && stories[hover] && (
            <img
              src={stories[hover].photo}
              alt=""
              aria-hidden
              className="pointer-events-none absolute z-10 hidden h-[340px] w-[270px] -translate-x-1/2 -translate-y-1/2 object-cover shadow-lift [@media(pointer:fine)]:md:block"
              style={{ left: pos.x, top: pos.y }}
            />
          )}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 8. Inner page hero with the torch                                    */
/* ------------------------------------------------------------------ */
export function TorchHero({ photo, alt, eyebrow, title, lead }: { photo: string; alt: T; eyebrow: T; title: T; lead?: T }) {
  const { t } = useLang();
  return (
    <Torch src={photo} alt={t(alt)} className="min-h-[620px] text-on-band lg:min-h-[760px]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#081629] via-[#081629]/30 to-transparent" />
      <div className="container-site pointer-events-none relative flex min-h-[620px] flex-col justify-end pb-16 pt-32 lg:min-h-[760px] lg:pb-24">
        <p className="eyebrow eyebrow-line eyebrow-band">{t(eyebrow)}</p>
        <h1 className="t-hero mt-8 max-w-[1000px]">{t(title)}</h1>
        {lead && <p className="t-lead mt-8 prose-w text-on-band-muted">{t(lead)}</p>}
      </div>
    </Torch>
  );
}
