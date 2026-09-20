import React, { createContext, useContext, useState, useEffect } from "react";
import { siteContent, type SiteLanguage, type SiteContent } from "@/content/site";

interface LanguageContextValue {
  lang: SiteLanguage;
  setLang: (lang: SiteLanguage) => void;
  t: SiteContent;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<SiteLanguage>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("sender-lang");
      if (stored === "es" || stored === "en") return stored;
      const navLang = navigator.language?.toLowerCase() || "";
      if (navLang.startsWith("es")) return "es";
    }
    return "es";
  });

  const setLang = (nextLang: SiteLanguage) => {
    setLangState(nextLang);
    try {
      localStorage.setItem("sender-lang", nextLang);
      document.documentElement.lang = nextLang;
    } catch {}
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value: LanguageContextValue = {
    lang,
    setLang,
    t: siteContent[lang] as unknown as SiteContent,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLang must be used within a LanguageProvider");
  }
  return ctx;
}
