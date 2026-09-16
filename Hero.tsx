import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useLang } from "@/i18n/LanguageContext";
import { images } from "@/data/content";
import { scrollToId } from "@/hooks/useLenis";
import { ButtonLink, MetaRow, Arrow } from "./ui/Primitives";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const nav = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <section id="top" ref={ref} className="relative isolate h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink" aria-label="Sender — Engineering the Signal">
      {/* Image layer */}
      <motion.div className="absolute inset-0 -z-20 will-change-transform" style={{ y: imgY, scale: imgScale }}>
        <motion.picture initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.8, ease: "easeOut" }}>
          <source media="(max-width: 767px)" srcSet={images.heroTall} />
          <img
            src={images.heroWide}
            alt="Torre de transmisión AM con vientos y caseta transmisora en la costa de Chile al anochecer"
            className="h-full w-full object-cover object-[70%_center] md:object-center"
            fetchPriority="high"
            decoding="async"
          />
        </motion.picture>
      </motion.div>

      {/* Tonal grading */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/40 to-ink/10" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/20 to-ink/50" aria-hidden="true" />

      {/* Ambient RF propagation — extremely subtle */}
      <SignalRings />

      {/* Content */}
      <motion.div style={{ y: textY, opacity: fade }} className="relative flex h-full flex-col justify-end px-5 pb-28 sm:px-8 sm:pb-24 lg:px-12 lg:pb-20 xl:px-16">
        <motion.p
          className="label mb-6 flex items-center gap-4 text-paper/70"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: EASE }}
        >
          <span className="h-px w-8 bg-signal" aria-hidden="true" />
          {t.hero.kicker}
        </motion.p>

        <h1 className="display text-[clamp(3.2rem,11.5vw,11.5rem)] uppercase text-paper">
          {t.hero.title.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
              <motion.span
                className="block will-change-transform"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.3, delay: 0.55 + i * 0.14, ease: EASE }}
              >
                {i === 1 ? (
                  <>
                    THE <span className="text-signal-soft">SIGNAL</span>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <motion.p
            className="max-w-xl text-balance text-base leading-relaxed text-paper/75 sm:text-lg lg:col-span-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.0, ease: EASE }}
          >
            {t.hero.subtitle}
          </motion.p>
          <motion.div
            className="flex flex-wrap items-center gap-3 sm:gap-4 lg:col-span-6 lg:justify-end"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.15, ease: EASE }}
          >
            <ButtonLink href="#manifiesto" onClick={nav("manifiesto")}>
              {t.hero.primary}
            </ButtonLink>
            <ButtonLink href="#contacto" variant="ghost" onClick={nav("contacto")}>
              {t.hero.secondary}
            </ButtonLink>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 hidden items-center justify-between border-t border-paper/10 pt-5 sm:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <MetaRow items={t.hero.meta} />
          <a href="#manifiesto" onClick={nav("manifiesto")} className="group label flex items-center gap-3 text-paper/60 transition-colors hover:text-paper">
            {t.hero.scroll}
            <span className="relative flex h-8 w-4 items-start justify-center overflow-hidden">
              <Arrow direction="down" className="motion-safe:animate-[scan_2.2s_ease-in-out_infinite]" />
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* Mobile scroll hint */}
      <motion.a
        href="#manifiesto"
        onClick={nav("manifiesto")}
        className="label absolute bottom-8 left-5 flex items-center gap-3 text-paper/60 sm:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        {t.hero.scroll}
        <Arrow direction="down" />
      </motion.a>

      {/* Coordinates / tech marks */}
      <motion.div
        className="mono absolute right-5 top-28 hidden flex-col items-end gap-1 text-[0.62rem] tracking-[0.2em] text-paper/40 sm:right-8 md:flex lg:right-12 xl:right-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        aria-hidden="true"
      >
        <span>33°29′S · 70°39′W</span>
        <span>TX · ON AIR</span>
      </motion.div>
    </section>
  );
}

/** Concentric propagation rings anchored at the mast position (right third). */
function SignalRings() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 hidden md:block" aria-hidden="true">
      <svg className="absolute right-[26%] top-[12%] h-[52vw] w-[52vw] max-h-[900px] max-w-[900px] -translate-y-1/2 translate-x-1/2 opacity-60" viewBox="0 0 200 200">
        {[0, 1, 2, 3].map((i) => (
          <motion.circle
            key={i}
            cx="100"
            cy="100"
            r="20"
            fill="none"
            stroke="#5C95CE"
            strokeWidth="0.25"
            initial={{ r: 12, opacity: 0 }}
            animate={{ r: [12, 95], opacity: [0, 0.5, 0] }}
            transition={{ duration: 9, delay: i * 2.25, repeat: Infinity, ease: "easeOut" }}
          />
        ))}
      </svg>
    </div>
  );
}
