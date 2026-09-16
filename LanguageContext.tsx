import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { content, type Lang, type SiteContent } from "@/data/content";

interface LanguageValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: SiteContent;
}

const LanguageContext = createContext<LanguageValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "es";
    const stored = window.localStorage.getItem("sender:lang");
    return stored === "en" ? "en" : "es";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("sender:lang", l);
    document.documentElement.lang = l;
  };

  const value = useMemo(() => ({ lang, setLang, t: content[lang] }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
