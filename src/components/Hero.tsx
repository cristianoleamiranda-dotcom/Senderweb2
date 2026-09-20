import React, { useRef, useEffect, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { cn } from "@/utils/cn";
import { scrollToId } from "@/hooks/useLenis";

/* ------------------------------------------------------------------ */
/* Hero cinematográfico con video transport                           */
/* scroll / touch / keyboard → controlan el video (no el documento)  */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { id: "top",       labelEs: "INICIO",     labelEn: "HOME" },
  { id: "nosotros",  labelEs: "NOSOTROS",   labelEn: "ABOUT" },
  { id: "ingenieria", labelEs: "INGENIERÍA", labelEn: "ENGINEERING" },
  { id: "proyectos", labelEs: "PROYECTOS",  labelEn: "PROJECTS" },
  { id: "contacto",  labelEs: "CONTACTO",   labelEn: "CONTACT" },
] as const;

const TICKET_ES = "INGENIERÍA DE LA SEÑAL";
const TICKET_EN = "ENGINEERING THE SIGNAL";

export function Hero() {
  const { t, lang, setLang } = useLang();
  const videoRef = useRef<HTMLVideoElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const locRef = useRef<HTMLSpanElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  const [videoReady, setVideoReady] = useState(false);

  const reducedMotion = typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  // ---- Transport state (refs — no React state para rendimiento) ----
  const transportRef = useRef<"armed" | "released">("armed");
  const progressRef = useRef(0);
  const currentTimeRef = useRef(0);
  const navInProgressRef = useRef(false);
  const playbackRateRef = useRef(1);
  const lastReverseSeekRef = useRef(0);
  const rafRef = useRef(0);
  const lastFrameRef = useRef(0);
  const armedLockRef = useRef(false);
  const releasePendingRef = useRef(false);

  const easeCubic = (x: number) => x * x * (3 - 2 * x);

  function releaseTransport(video?: HTMLVideoElement) {
    if (releasePendingRef.current) return;
    releasePendingRef.current = true;
    transportRef.current = "released";
    progressRef.current = 1;
    armedLockRef.current = true;
    if (video) {
      video.play().catch(() => {});
      try { video.playbackRate = 3; } catch {}
    }
    setTimeout(() => {
      armedLockRef.current = false;
      if (transportRef.current === "released" && window.scrollY <= 2) {
        rearmTransport(video);
      }
    }, 4000);
  }

  function rearmTransport(video?: HTMLVideoElement) {
    transportRef.current = "armed";
    progressRef.current = 0;
    currentTimeRef.current = 0;
    if (video) {
      video.pause();
      video.currentTime = 0;
      try { video.playbackRate = 1; } catch {}
      video.play().catch(() => {});
    }
    playbackRateRef.current = 1;
  }

  function navigateToSection(id: string, e?: React.MouseEvent) {
    if (e) e.preventDefault();
    if (transportRef.current !== "armed") {
      scrollToId(id);
      return;
    }
    navInProgressRef.current = true;
    transportRef.current = "released";
    history.replaceState(null, "", `#${id}`);
    scrollToId(id);
    setTimeout(() => { navInProgressRef.current = false; }, 1000);
  }

  function playForward(dt: number, video: HTMLVideoElement) {
    if (transportRef.current !== "armed") return;
    if (progressRef.current >= 1) {
      if (video.currentTime < video.duration - 0.05) {
        video.currentTime = Math.min(video.duration, video.currentTime + dt * playbackRateRef.current * 0.5);
        video.play().catch(() => {});
      } else {
        releaseTransport(video);
      }
      return;
    }
    const target = progressRef.current * (video.duration || 0);
    const diff = target - currentTimeRef.current;
    const lerp = 1 - Math.exp(-dt * 8);
    currentTimeRef.current += diff * lerp;
    video.currentTime = currentTimeRef.current;
    video.play().catch(() => {});
    playbackRateRef.current = Math.min(
      3,
      playbackRateRef.current + Math.min(0.5, Math.abs(diff) * 0.01)
    );
    video.playbackRate = playbackRateRef.current;
    if (Math.random() < 0.12) {
      playbackRateRef.current = Math.max(1, playbackRateRef.current - 0.12);
    }
  }

  function playReverse(now: number, video: HTMLVideoElement) {
    if (video.seeking) return;
    const elapsed = now - lastReverseSeekRef.current;
    if (elapsed < 1000 / 12) return;
    lastReverseSeekRef.current = now;
    const step = 0.08 * Math.max(1, playbackRateRef.current);
    const newTime = Math.max(0, video.currentTime - step);
    video.currentTime = newTime;
    currentTimeRef.current = newTime;
  }

  function applyUiDisplacement() {
    const k = easeCubic(Math.min(1, Math.max(0, (currentTimeRef.current - 0.2) / 2.4)));
    if (navRef.current) navRef.current.style.transform = `translateX(${-130 * k}%)`;
    if (ctaRef.current) ctaRef.current.style.transform = `translateX(${160 * k}%)`;
    if (wordmarkRef.current) wordmarkRef.current.style.transform = `translateY(${-300 * k}%)`;
    if (chipsRef.current) chipsRef.current.style.transform = `translateX(${-140 * k}%)`;
    if (locRef.current) locRef.current.style.transform = `translateX(${200 * k}%)`;
    if (fadeRef.current) fadeRef.current.style.opacity = String(1 - k * 1.15);
  }

  // ---- RAF loop ----
  useEffect(() => {
    if (reducedMotion || !videoRef.current) return;
    let disposed = false;
    const video = videoRef.current!;

    const loop = (now: number) => {
      if (disposed) return;
      const dt = Math.min(0.1, (now - lastFrameRef.current) / 1000);
      lastFrameRef.current = now;

      if (transportRef.current === "armed") {
        if (progressRef.current >= 0.999) {
          releaseTransport(video);
          rafRef.current = requestAnimationFrame(loop);
          return;
        }
        if (progressRef.current > (currentTimeRef.current / (video.duration || 1))) {
          playForward(dt, video);
        } else {
          playReverse(now, video);
        }
        applyUiDisplacement();
      } else {
        const videoNow = video.currentTime;
        const target = video.duration ? progressRef.current * video.duration : 0;
        const diff = target - videoNow;
        if (Math.abs(diff) > 0.05) {
          video.currentTime += diff * (1 - Math.exp(-dt * 8));
          currentTimeRef.current = video.currentTime;
        }
        if (video.currentTime >= video.duration - 0.01) {
          video.pause();
          video.currentTime = video.duration;
        }
        if (window.scrollY <= 2 && !navInProgressRef.current && !armedLockRef.current) {
          rearmTransport(video);
        }
        applyUiDisplacement();
      }
      if (!disposed) rafRef.current = requestAnimationFrame(loop);
    };

    video.play().catch(() => {});
    try { video.currentTime = 0; } catch {}

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafRef.current);
      video.pause();
    };
  }, [videoReady]);

  // ---- Wheel listener ----
  useEffect(() => {
    if (reducedMotion || !videoRef.current) return;
    const handleWheel = (e: WheelEvent) => {
      if (transportRef.current !== "armed" || navInProgressRef.current || armedLockRef.current) return;
      e.preventDefault();
      window.scrollTo(0, 0);
      const delta = Math.abs(e.deltaY) * 0.00045;
      if (e.deltaY > 0) {
        progressRef.current = Math.min(1, progressRef.current + delta);
        const video = videoRef.current!;
        if (!video.paused) {
          playbackRateRef.current = Math.min(
            3,
            playbackRateRef.current + Math.min(0.5, Math.abs(e.deltaY) * 0.006)
          );
          video.playbackRate = playbackRateRef.current;
        }
      } else {
        progressRef.current = Math.max(0, progressRef.current - delta);
      }
      if (progressRef.current >= 0.999) {
        releaseTransport(videoRef.current!);
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [videoReady]);

  // ---- Touch listeners ----
  useEffect(() => {
    if (reducedMotion || !videoRef.current) return;
    const wrap = document.getElementById("hero") ?? document.body;
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (transportRef.current !== "armed" || navInProgressRef.current || armedLockRef.current) return;
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (transportRef.current !== "armed") return;
      const deltaY = touchStartY - e.touches[0].clientY;
      const delta = Math.abs(deltaY) * 0.00045;
      if (deltaY > 0) {
        progressRef.current = Math.min(1, progressRef.current + delta);
      } else {
        progressRef.current = Math.max(0, progressRef.current - delta);
      }
      touchStartY = e.touches[0].clientY;
      if (progressRef.current >= 0.999) {
        releaseTransport(videoRef.current!);
      }
    };
    wrap.addEventListener("touchstart", handleTouchStart, { passive: true });
    wrap.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      wrap.removeEventListener("touchstart", handleTouchStart);
      wrap.removeEventListener("touchmove", handleTouchMove);
    };
  }, [videoReady]);

  // ---- Keyboard listener ----
  useEffect(() => {
    if (reducedMotion || !videoRef.current) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Tab") return;
      if (transportRef.current !== "armed" || navInProgressRef.current || armedLockRef.current) return;
      const step = 0.025;
      if (e.key === "ArrowDown") {
        progressRef.current = Math.min(1, progressRef.current + step);
        e.preventDefault();
      } else if (e.key === "ArrowUp") {
        progressRef.current = Math.max(0, progressRef.current - step);
        e.preventDefault();
      } else if (e.key === "PageDown") {
        progressRef.current = Math.min(1, progressRef.current + 0.12);
        e.preventDefault();
      } else if (e.key === "PageUp") {
        progressRef.current = Math.max(0, progressRef.current - 0.12);
        e.preventDefault();
      } else if (e.key === " " || e.code === "Space") {
        progressRef.current = Math.min(1, progressRef.current + 0.12);
        e.preventDefault();
      }
      if (progressRef.current >= 0.999) {
        releaseTransport(videoRef.current!);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [videoReady]);

  // ---- Video metadata ----
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onMeta = () => {
      setVideoReady(true);
      video.removeEventListener("loadedmetadata", onMeta);
    };
    video.addEventListener("loadedmetadata", onMeta);
    if (video.readyState >= 1) setVideoReady(true);
    return () => video.removeEventListener("loadedmetadata", onMeta);
  }, []);

  const ticketText = lang === "es" ? TICKET_ES : TICKET_EN;
  const ctaLabel = lang === "es" ? "Solicitar asesoría" : "Request consultation";

  return (
    <section
      id="hero"
      ref={heroRef}
      className="hero container-type-inline-size relative isolate h-[100svh] min-h-[640px] w-full overflow-hidden bg-white"
      aria-label="SENDER — Engineering the Signal"
    >
      {/* ===== Video layer ===== */}
      <div className="hero-video-wrap absolute inset-0 -z-10">
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
        {/* Hero gradient overlay */}
        <div
          ref={fadeRef}
          id="hero-fade"
          className="absolute inset-0 bg-gradient-to-b from-white via-white/82 via-white/42 to-transparent pointer-events-none"
          aria-hidden="true"
          style={{ opacity: 1 }}
        />
      </div>

      {/* ===== Hero top: nav + lang + CTA ===== */}
      <div className="hero-top absolute top-0 left-0 right-0 z-20 px-5 sm:px-8 lg:px-12 xl:px-16 py-6 lg:py-8">
        <nav
          ref={navRef}
          id="nav"
          className="flex items-center justify-between max-w-[1600px] mx-auto"
          aria-label="Navegación principal"
        >
          {/* Brand */}
          <a
            href="#top"
            onClick={(e) => navigateToSection("top", e)}
            className="group flex items-center gap-3"
            aria-label="SENDER — inicio"
          >
            <span className="relative flex h-2 w-2 items-center justify-center" aria-hidden="true">
              <span className="absolute h-2 w-2 rounded-full bg-[#1e73be]" />
              <span className="absolute h-2 w-2 rounded-full bg-[#1e73be] [animation:ping-signal_2.8s_ease-out_infinite]" />
            </span>
            <span className="font-semibold tracking-[0.12em] text-[#1e73be] text-lg sm:text-xl">
              SENDER
            </span>
          </a>

          {/* Nav pills */}
          <ul className="flex items-center gap-1 sm:gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = lang === "es"
                ? (link.labelEs === t.nav.solutions && link.id === "top")
                : (link.labelEn === t.nav.solutions && link.id === "top");
              // La nav usa solutions como primer link, lo mostramos como "INICIO/HOME"
              const displayLabel = lang === "es" ? link.labelEs : link.labelEn;
              const activeColor = "#1e73be";
              const inactiveColor = "#494949";
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => navigateToSection(link.id, e)}
                    className={cn(
                      "relative inline-flex items-center px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.2em] transition-colors",
                      "focus-visible:outline-2 focus-visible:outline-[#1e73be]",
                    )}
                    style={{ color: isActive ? activeColor : inactiveColor }}
                  >
                    {displayLabel}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right cluster: language + CTA */}
          <div className="flex items-center gap-4">
            {/* Language switcher */}
            <div className="flex items-center gap-1" role="group" aria-label="Idioma / Language">
              {(["es", "en"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={cn(
                    "px-2 py-1 text-[0.68rem] uppercase tracking-[0.2em] transition-colors",
                    "focus-visible:outline-2 focus-visible:outline-[#1e73be]",
                    lang === l ? "text-[#1e73be]" : "text-[#494949] hover:text-[#1e73be]",
                  )}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* CTA */}
            <div
              ref={ctaRef}
              className={cn(
                "px-4 py-2 border text-[0.7rem] uppercase tracking-[0.2em] transition-colors",
                "focus-visible:outline-2 focus-visible:outline-[#1e73be]",
                "border-[#494949] text-[#494949] hover:bg-[#494949] hover:text-white",
              )}
            >
              {ctaLabel}
            </div>
          </div>
        </nav>
      </div>

      {/* ===== Ticket / kicker line ===== */}
      <div className="hero-ticket absolute top-[10vh] left-5 sm:left-8 lg:left-12 xl:left-16 z-20">
        <span className="label text-[#494949] tracking-[0.2em]">
          {ticketText}
        </span>
      </div>

      {/* ===== Wordmark SENDER ===== */}
      <div className="hero-wordmark-wrap absolute inset-0 flex items-center justify-center pointer-events-none px-5 sm:px-8 lg:px-12 xl:px-16">
        <h1
          ref={wordmarkRef}
          id="hero-word"
          className="font-medium tracking-[-0.055em] whitespace-nowrap text-[#494949] select-none leading-[0.78]"
          style={{ fontSize: "clamp(4rem, 16cqw, 16rem)" }}
          aria-label="SENDER"
        >
          SENDER
        </h1>
      </div>

      {/* ===== Hero foot: chips + location ===== */}
      <div className="hero-foot absolute bottom-0 left-0 right-0 z-20 px-5 sm:px-8 lg:px-12 xl:px-16 py-6 lg:py-8">
        <div className="flex items-center justify-between max-w-[1600px] mx-auto">
          <div
            ref={chipsRef}
            id="chips"
            className="flex items-center gap-3"
            aria-label="Áreas de ingeniería"
          >
            {["RF ENGINEERING", "BROADCASTING", "TRANSMISSION"].map((chip, i) => (
              <span
                key={i}
                className={cn(
                  "inline-flex items-center px-3 py-1 text-[0.7rem] uppercase tracking-[0.2em] transition-colors",
                  "focus-visible:outline-2 focus-visible:outline-[#1e73be]",
                  i === 0
                    ? "bg-white text-[#494949] border border-[#494949]"
                    : "bg-transparent text-white border border-white",
                )}
              >
                {chip}
              </span>
            ))}
          </div>
          <span
            ref={locRef}
            id="loc"
            className="text-[0.7rem] uppercase tracking-[0.2em] text-white"
          >
            CHILE · LATAM
          </span>
        </div>
      </div>

      {/* ===== Mobile scroll hint (only when armed) ===== */}
      {typeof window !== "undefined" && transportRef.current === "armed" && window.scrollY <= 2 && (
        <p className="label absolute bottom-20 left-5 sm:hidden text-white/60">
          Scroll para controlar el video →
        </p>
      )}
    </section>
  );
}
