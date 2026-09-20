import React, { useRef, useState, useEffect } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useVideoScrub } from "@/hooks/useVideoScrub";

interface HeroProps {
  onTransportStateChange?: (state: "armed" | "released") => void;
}

export function Hero({ onTransportStateChange }: HeroProps) {
  const { t, lang, setLang } = useLang();
  const reducedMotion = useReducedMotion();

  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navWrapRef = useRef<HTMLDivElement>(null);
  const ctaWrapRef = useRef<HTMLAnchorElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const locRef = useRef<HTMLSpanElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  const [currentTransportState, setCurrentTransportState] = useState<"armed" | "released">("armed");

  const { navigateToSection } = useVideoScrub({
    videoRef,
    containerRef: heroRef,
    reducedMotion,
    onStateChange: (st) => {
      setCurrentTransportState(st);
      onTransportStateChange?.(st);
    },
    onUiUpdate: (_progress, _currentTime, k) => {
      // Direct DOM updates for maximum 60/120fps performance
      if (navWrapRef.current) {
        navWrapRef.current.style.transform = `translateX(${-130 * k}%)`;
        navWrapRef.current.style.opacity = String(Math.max(0, 1 - k * 1.15));
      }
      if (ctaWrapRef.current) {
        ctaWrapRef.current.style.transform = `translateX(${160 * k}%)`;
        ctaWrapRef.current.style.opacity = String(Math.max(0, 1 - k * 1.15));
      }
      if (wordmarkRef.current) {
        wordmarkRef.current.style.transform = `translateY(${-300 * k}%)`;
        wordmarkRef.current.style.opacity = String(Math.max(0, 1 - k * 1.15));
      }
      if (chipsRef.current) {
        chipsRef.current.style.transform = `translateX(${-140 * k}%)`;
        chipsRef.current.style.opacity = String(Math.max(0, 1 - k * 1.15));
      }
      if (locRef.current) {
        locRef.current.style.transform = `translateX(${200 * k}%)`;
        locRef.current.style.opacity = String(Math.max(0, 1 - k * 1.15));
      }
      if (fadeRef.current) {
        fadeRef.current.style.opacity = String(Math.max(0, 1 - k * 1.15));
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = String(Math.max(0, 1 - k * 2.5));
      }
    },
  });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    navigateToSection(id);
  };

  const navItems = [
    { id: "hero", label: t.nav.home },
    { id: "about", label: t.nav.about },
    { id: "process", label: t.nav.engineering },
    { id: "products", label: t.nav.products },
    { id: "work", label: t.nav.projects },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <section
      id="hero"
      ref={heroRef}
      className="hero relative isolate h-[100svh] min-h-[640px] w-full overflow-hidden bg-white select-none"
      style={{ containerType: "inline-size" }}
      aria-label="SENDER — Engineering the Signal"
    >
      {/* ===== Video Background Layer ===== */}
      <div id="hero-video-wrap" className="absolute inset-0 -z-10 bg-black">
        <video
          ref={videoRef}
          id="hero-video"
          className="h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="./assets/sender-hero.mp4" type="video/mp4" />
        </video>

        {/* Hero gradient fade according to spec */}
        <div
          ref={fadeRef}
          id="hero-fade"
          className="absolute inset-0 pointer-events-none transition-opacity"
          style={{
            background:
              "linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0.82) 28%, rgba(255,255,255,0.42) 60%, rgba(255,255,255,0) 100%)",
            opacity: 1,
          }}
          aria-hidden="true"
        />
      </div>

      {/* ===== Hero Top Bar: Brand, Navigation Pills, Language Switcher, CTA ===== */}
      <div className="hero-top absolute top-0 left-0 right-0 z-20 px-4 sm:px-8 lg:px-12 py-5 sm:py-6">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          {/* Brand + Nav pills cluster */}
          <div ref={navWrapRef} className="flex items-center gap-6 lg:gap-8 transition-transform will-change-transform">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, "hero")}
              className="flex items-center gap-2 group cursor-pointer"
              aria-label="SENDER"
            >
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="absolute h-2 w-2 rounded-full bg-[#1e73be]" />
                <span className="absolute h-3 w-3 rounded-full bg-[#1e73be]/40 animate-ping" />
              </span>
              <span className="text-lg sm:text-xl font-semibold tracking-[0.14em] text-[#494949] group-hover:text-[#1e73be] transition-colors">
                SENDER
              </span>
            </a>

            {/* Desktop Navigation Pills */}
            <nav id="nav" className="hidden md:flex items-center gap-1.5" aria-label="Navegación Hero">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className="px-3 py-1 rounded-full text-[0.72rem] font-medium tracking-[0.15em] uppercase text-[#494949] hover:text-[#1e73be] hover:bg-[#494949]/5 transition-all"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Right cluster: Language switcher + CTA button */}
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
              ref={ctaWrapRef}
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact")}
              className="inline-flex items-center justify-center px-4 sm:px-5 py-2 rounded-full text-[0.72rem] font-medium tracking-[0.16em] uppercase border border-[#494949] text-[#494949] hover:bg-[#1e73be] hover:border-[#1e73be] hover:text-white transition-all will-change-transform cursor-pointer"
            >
              {t.hero.cta}
            </a>
          </div>
        </div>
      </div>

      {/* ===== Hero Eyebrow Line ===== */}
      <div className="absolute top-[13vh] sm:top-[15vh] left-4 sm:left-8 lg:left-12 z-10 pointer-events-none">
        <span className="text-[0.68rem] sm:text-[0.75rem] uppercase tracking-[0.25em] font-medium text-[#494949]/80">
          {t.hero.eyebrow}
        </span>
      </div>

      {/* ===== Hero Main Wordmark ===== */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
        <h1
          ref={wordmarkRef}
          id="hero-word"
          className="hero-wordmark font-medium whitespace-nowrap text-[#494949] will-change-transform"
          style={{
            fontSize: "clamp(4.2rem, 16cqw, 17rem)",
            lineHeight: 0.78,
            letterSpacing: "-0.055em",
          }}
          aria-label="SENDER"
        >
          SENDER
        </h1>
      </div>

      {/* ===== Hero Foot: Technical Chips + Location ===== */}
      <div className="hero-foot absolute bottom-0 left-0 right-0 z-20 px-4 sm:px-8 lg:px-12 py-5 sm:py-6">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Pills / Chips */}
          <div
            ref={chipsRef}
            id="chips"
            className="flex flex-wrap items-center gap-2 will-change-transform"
            aria-label="Especialidades técnicas"
          >
            <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[0.68rem] tracking-[0.18em] uppercase font-medium bg-white text-[#494949] border border-white shadow-sm">
              RF ENGINEERING
            </span>
            <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[0.68rem] tracking-[0.18em] uppercase font-medium bg-black/25 backdrop-blur-sm text-white border border-white/60">
              BROADCASTING
            </span>
            <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[0.68rem] tracking-[0.18em] uppercase font-medium bg-black/25 backdrop-blur-sm text-white border border-white/60">
              TRANSMISSION
            </span>
          </div>

          {/* Location */}
          <div ref={locRef} className="will-change-transform">
            <span
              id="loc"
              className="text-[0.72rem] tracking-[0.24em] uppercase font-medium text-white drop-shadow-sm"
            >
              {t.hero.location}
            </span>
          </div>
        </div>
      </div>

      {/* ===== Interactive Hint (visible when armed) ===== */}
      {currentTransportState === "armed" && !reducedMotion && (
        <div
          ref={hintRef}
          className="absolute bottom-16 sm:bottom-20 left-4 sm:left-8 lg:left-12 z-20 pointer-events-none transition-opacity"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white/90 text-[0.65rem] tracking-[0.18em] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0085b2] animate-pulse" />
            {t.hero.hint}
          </div>
        </div>
      )}
    </section>
  );
}
