import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Linkedin, Instagram } from "lucide-react";
import { useEffect, useState } from "react";
import { CometRing } from "./CometRing";
import logoH from "@/assets/vnl-orizzontale-negativo.svg.asset.json";
import logoV from "@/assets/vnl-verticale-payoff-negativo.svg.asset.json";
import { useLang } from "@/lib/i18n";

export const nav = [
  { to: "/about", label: { it: "Chi siamo", en: "About us" } },
  { to: "/people", label: { it: "Persone", en: "People" } },
  { to: "/companies", label: { it: "Imprese", en: "Companies" } },
  { to: "/stories", label: { it: "Storie", en: "Stories" } },
] as const;

function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center gap-1 t-label text-on-band-muted" role="group" aria-label="Language / Lingua">
      {(["en", "it"] as const).map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span aria-hidden>/</span>}
          <button
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={`px-1 font-semibold uppercase transition-colors duration-200 ${lang === l ? "text-on-band" : "hover:text-on-band"}`}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}

function Burger({ open }: { open: boolean }) {
  // Two asymmetric strokes and the sun: on open they cross into an X and the sun goes out.
  return (
    <span className={`burger ${open ? "is-open" : ""}`} aria-hidden>
      <span className="burger-line burger-a" />
      <span className="burger-line burger-b" />
      <span className="burger-sun" />
    </span>
  );
}

export function NavBar() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);
  const linkCls = "t-label font-medium text-on-band py-2 border-b-2 border-transparent transition-colors duration-200 hover:border-on-band-muted";
  const activeCls = { className: "!border-gold" };
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#081629]">
        <div className="container-site flex h-16 items-center justify-between md:h-20">
          <Link to="/" aria-label="Vita Nova Lux, home">
            <img src={logoH.url} alt="Vita Nova Lux" className="h-8 w-auto md:h-10" />
          </Link>
          <nav aria-label={t({ it: "Principale", en: "Main" })} className="hidden items-center gap-8 lg:flex">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className={linkCls} activeProps={activeCls}>
                {t(n.label)}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-6 lg:flex">
            <LangSwitch />
            <Link to="/contact" className="btn btn-primary">{t({ it: "Contatti", en: "Contact" })}</Link>
          </div>
          <button
            type="button"
            className="-mr-2 flex h-12 w-12 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t({ it: "Chiudi menu", en: "Close menu" }) : t({ it: "Apri menu", en: "Open menu" })}
            onClick={() => setOpen(!open)}
          >
            <Burger open={open} />
          </button>
        </div>
      </header>

      {/* Mobile menu: the light opens from the burger and fills the screen. */}
      <div id="mobile-menu" className={`menu-overlay lg:hidden ${open ? "is-open" : ""}`} aria-hidden={!open} inert={!open}>
        <CometRing className="menu-comet" ring="#8A9BB0" />
        <div className="container-site relative flex h-full flex-col pb-8 pt-24">
          <p className="menu-item eyebrow eyebrow-band" style={{ ["--i" as string]: 0 }}>{t({ en: "Index", it: "Indice" })} · Nº 01</p>
          <nav aria-label={t({ it: "Menu mobile", en: "Mobile menu" })} className="mt-6 flex flex-col">
            {nav.map((n, i) => {
              const active = path === n.to || path.startsWith(n.to + "/");
              return (
                <Link key={n.to} to={n.to} className="menu-item menu-link group" style={{ ["--i" as string]: i + 1 }}>
                  <span className="menu-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`menu-word ${active ? "text-gold" : ""}`}>{t(n.label)}</span>
                  {active && <span className="ml-auto h-3 w-3 shrink-0 rounded-full bg-gold shadow-[0_0_18px_6px_rgba(233,185,73,.45)]" aria-hidden />}
                </Link>
              );
            })}
          </nav>
          <div className="menu-item mt-auto" style={{ ["--i" as string]: 6 }}>
            <Link to="/contact" className="flex items-center justify-between rounded-full bg-gold px-7 py-5 t-lead font-semibold text-[#081629]">
              {t({ en: "Let's talk", it: "Parliamone" })}
              <ArrowUpRight aria-hidden />
            </Link>
            <div className="mt-6 flex items-center justify-between">
              <LangSwitch />
              <p className="t-caption text-on-band-muted">Nuova luce, nuovo lusso.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function Footer() {
  const { t } = useLang();
  const col = "t-label text-on-band-muted hover:text-on-band transition-colors duration-200";
  return (
    <footer className="bg-footer text-on-band">
      <div className="container-site border-b border-band-raised py-16 md:py-24">
        <p className="t-statement max-w-[900px]">Nuova luce, nuovo lusso.</p>
        <p className="t-lead mt-4 text-on-band-muted">{t({ en: "New light, new luxury.", it: "Nuova luce alle imprese italiane." })}</p>
      </div>
      <div className="container-site section-y grid gap-12 md:grid-cols-[1fr_auto_auto] md:gap-20">
        <img src={logoV.url} alt="Vita Nova Lux, Nuova luce, nuovo lusso." className="w-[220px]" />
        <div>
          <h2 className="eyebrow eyebrow-band">{t({ it: "Il gruppo", en: "The group" })}</h2>
          <ul className="mt-5 space-y-3">
            {nav.map((n) => (
              <li key={n.to}><Link to={n.to} className={col}>{t(n.label)}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="eyebrow eyebrow-band">{t({ it: "Contatti", en: "Contact" })}</h2>
          <ul className="mt-5 space-y-3">
            <li><Link to="/contact" className={col}>{t({ it: "Scrivici", en: "Write to us" })}</Link></li>
            <li><a href="#" className={`${col} inline-flex items-center gap-2`}><Linkedin size={16} strokeWidth={1.5} aria-hidden />LinkedIn</a></li>
            <li><a href="#" className={`${col} inline-flex items-center gap-2`}><Instagram size={16} strokeWidth={1.5} aria-hidden />Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-band-raised">
        <div className="container-site flex flex-col gap-2 py-6 t-caption text-on-band-muted md:flex-row md:justify-between">
          <p>Vita Nova Lux S.r.l. · {t({ it: "[indirizzo e P.IVA da inserire]", en: "[address and VAT no. to be added]" })}</p>
          <p><a href="#" className="hover:text-on-band">Privacy</a> · <a href="#" className="hover:text-on-band">{t({ it: "Cookie", en: "Cookies" })}</a></p>
        </div>
      </div>
    </footer>
  );
}
