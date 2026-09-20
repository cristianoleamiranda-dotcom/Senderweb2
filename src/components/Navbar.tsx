import React, { useState, useEffect } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const { t, lang, setLang } = useLang();
  const [visible, setVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Only show sticky navbar once user has scrolled past the hero
      const threshold = window.innerHeight * 0.65;
      setVisible(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { id: "hero", label: t.nav.home },
    { id: "about", label: t.nav.about },
    { id: "process", label: t.nav.engineering },
    { id: "products", label: t.nav.products },
    { id: "work", label: t.nav.projects },
    { id: "contact", label: t.nav.contact },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          visible
            ? "translate-y-0 opacity-100 bg-white/95 backdrop-blur-md border-b border-[#494949]/15 shadow-sm"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
        aria-hidden={!visible}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-3.5 flex items-center justify-between gap-4">
          {/* Brand */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("hero");
            }}
            className="flex items-center gap-2 group cursor-pointer"
            aria-label="SENDER"
          >
            <span className="relative flex h-2 w-2 items-center justify-center">
              <span className="h-2 w-2 rounded-full bg-[#1e73be]" />
            </span>
            <span className="text-lg font-semibold tracking-[0.14em] text-[#494949] group-hover:text-[#1e73be] transition-colors">
              SENDER
            </span>
          </a>

          {/* Desktop Nav Pills */}
          <nav className="hidden md:flex items-center gap-1.5" aria-label="Navegación principal">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.id);
                }}
                className="px-3 py-1 rounded-full text-[0.72rem] font-medium tracking-[0.15em] uppercase text-[#494949] hover:text-[#1e73be] hover:bg-[#494949]/5 transition-all"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right cluster: Language + CTA + Mobile Hamburger */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Language Switcher */}
            <div
              className="flex items-center gap-1 text-[0.72rem] tracking-[0.18em] uppercase font-medium"
              role="group"
              aria-label="Seleccionar idioma"
            >
              <button
                type="button"
                onClick={() => setLang("es")}
                className={`px-1.5 py-0.5 transition-colors cursor-pointer ${
                  lang === "es"
                    ? "text-[#1e73be] font-bold"
                    : "text-[#494949]/70 hover:text-[#494949]"
                }`}
              >
                ES
              </button>
              <span className="text-[#494949]/30">|</span>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-1.5 py-0.5 transition-colors cursor-pointer ${
                  lang === "en"
                    ? "text-[#1e73be] font-bold"
                    : "text-[#494949]/70 hover:text-[#494949]"
                }`}
              >
                EN
              </button>
            </div>

            {/* CTA Button */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("contact");
              }}
              className="hidden sm:inline-flex items-center justify-center px-4 py-1.5 rounded-full text-[0.72rem] font-medium tracking-[0.16em] uppercase border border-[#494949] text-[#494949] hover:bg-[#1e73be] hover:border-[#1e73be] hover:text-white transition-all cursor-pointer"
            >
              {t.hero.cta}
            </a>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 md:hidden text-[#494949] hover:text-[#1e73be] transition-colors"
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-white/98 backdrop-blur-lg flex flex-col justify-between px-6 py-8 md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between border-b border-[#494949]/15 pb-4">
            <span className="text-xl font-semibold tracking-[0.14em] text-[#494949]">
              SENDER
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#494949]"
              aria-label="Cerrar menú"
            >
              <X size={26} />
            </button>
          </div>

          <nav className="flex flex-col gap-6 py-8" aria-label="Navegación móvil">
            {navItems.map((item, idx) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.id);
                }}
                className="text-2xl font-light tracking-[0.12em] uppercase text-[#494949] hover:text-[#1e73be] transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-xs font-mono text-[#0085b2]">0{idx + 1}</span>
              </a>
            ))}
          </nav>

          <div className="border-t border-[#494949]/15 pt-6 flex flex-col gap-4">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("contact");
              }}
              className="w-full text-center py-3 rounded-full bg-[#1e73be] text-white text-xs tracking-[0.2em] uppercase font-medium"
            >
              {t.hero.cta}
            </a>
            <div className="text-[0.7rem] tracking-[0.18em] uppercase text-[#494949]/60 text-center">
              Santiago · Chile · Latam
            </div>
          </div>
        </div>
      )}
    </>
  );
}
