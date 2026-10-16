import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "it" | "en";
export type T = { it: string; en: string };

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "en",
  setLang: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const saved = localStorage.getItem("vnl-lang");
    if (saved === "en" || saved === "it") setLangState(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("vnl-lang", l);
  };
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export function useLang() {
  const { lang, setLang } = useContext(Ctx);
  const t = (v: T | string) => (typeof v === "string" ? v : v[lang]);
  const q = (v: T | string) => (lang === "it" ? `«${t(v)}»` : `“${t(v)}”`);
  return { lang, setLang, t, q };
}
