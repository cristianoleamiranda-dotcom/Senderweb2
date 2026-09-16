import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useLang } from "@/i18n/LanguageContext";
import { scrollToId, getLenis } from "@/hooks/useLenis";
import { cn } from "@/utils/cn";
import { Arrow } from "./ui/Primitives";

const LINKS = [
  { id: "soluciones", key: "solutions" },
  { id: "proyectos", key: "projects" },
  { id: "tecnologia", key: "technology" },
  { id: "nosotros", key: "about" },
] as const;

export function Nav() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    // let overflow restore before scrolling
    requestAnimationFrame(() => scrollToId(id));
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,padding] duration-700 ease-out-expo",
          scrolled ? "bg-ink/85 backdrop-blur-md" : "bg-transparent",
        )}
      >
        <nav
          aria-label="Principal"
          className={cn(
            "flex items-center justify-between px-5 sm:px-8 lg:px-12 xl:px-16 transition-[padding] duration-700 ease-out-expo",
            scrolled ? "py-4" : "py-6 lg:py-8",
          )}
        >
          {/* Brand */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              go("top");
            }}
            className="group flex items-center gap-3"
            aria-label="Sender — inicio"
          >
            <span className="relative flex h-2 w-2 items-center justify-center" aria-hidden="true">
              <span className="absolute h-2 w-2 bg-signal" />
              <span className="absolute h-2 w-2 bg-signal [animation:ping-signal_2.8s_ease-out_infinite]" />
            </span>
            <span className={cn("display font-semibold tracking-[0.12em] transition-all duration-700", scrolled ? "text-base" : "text-lg")}>
              SENDER
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-10 lg:flex">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    go(l.id);
                  }}
                  className="link-line mono text-[0.7rem] uppercase tracking-[0.2em] text-paper/80 transition-colors hover:text-paper"
                >
                  {t.nav[l.key]}
                </a>
              </li>
            ))}
          </ul>

          {/* Right cluster */}
          <div className="flex items-center gap-5 sm:gap-8">
            <LangToggle lang={lang} setLang={setLang} />
            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault();
                go("contacto");
              }}
              className="group hidden items-center gap-2 mono text-[0.7rem] uppercase tracking-[0.2em] text-paper transition-colors hover:text-signal-soft sm:inline-flex"
            >
              {t.nav.cta}
              <Arrow className="transition-transform duration-500 group-hover:translate-x-1" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="relative flex h-10 w-10 items-center justify-center lg:hidden"
            >
              <span className={cn("absolute h-px w-6 bg-paper transition-transform duration-500 ease-out-expo", open ? "rotate-45" : "-translate-y-[4px]")} />
              <span className={cn("absolute h-px w-6 bg-paper transition-transform duration-500 ease-out-expo", open ? "-rotate-45" : "translate-y-[4px]")} />
            </button>
          </div>
        </nav>

        {/* Scroll progress — a thin signal line */}
        <motion.div
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-px w-full origin-left bg-signal"
          style={{ scaleX: progress, opacity: scrolled ? 1 : 0 }}
        />
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-40 flex flex-col justify-end bg-ink px-5 pb-10 pt-28 sm:px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className="flex flex-col gap-2">
              {[...LINKS, { id: "contacto", key: "contact" } as const].map((l, i) => (
                <li key={l.id} className="overflow-hidden">
                  <motion.a
                    href={`#${l.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(l.id);
                    }}
                    className="display flex items-baseline gap-4 py-2 text-[clamp(2.4rem,11vw,4rem)] uppercase text-paper"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.8, delay: 0.08 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="mono text-xs text-signal-soft">0{i + 1}</span>
                    {t.nav[l.key]}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              className="mt-12 flex items-center justify-between border-t border-line pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="label">Engineering the Signal</span>
              <span className="label">Santiago · Chile</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function LangToggle({ lang, setLang }: { lang: "es" | "en"; setLang: (l: "es" | "en") => void }) {
  return (
    <div className="mono flex items-center gap-1 text-[0.68rem] tracking-[0.2em]" role="group" aria-label="Idioma / Language">
      {(["es", "en"] as const).map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-paper/30">/</span>}
          <button
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={cn("px-1 py-1 uppercase transition-colors", lang === l ? "text-signal-soft" : "text-paper/50 hover:text-paper")}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}
