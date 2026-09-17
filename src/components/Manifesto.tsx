import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useLang } from "@/i18n/LanguageContext";
import { Reveal, RevealLines } from "@/ui/Reveal";
import { Section } from "@/ui/Primitives";

export function Manifesto() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineW = useTransform(scrollYProgress, [0.15, 0.6], ["0%", "100%"]);
  const drift = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <Section id="manifiesto" labelledBy="manifesto-title" className="bg-ink py-32 sm:py-44 lg:py-56">
      <div ref={ref} className="relative mx-auto max-w-[1600px]">
        {/* Chapter mark */}
        <Reveal y={10} className="mb-16 flex items-center justify-between lg:mb-24">
          <span className="label">02 — Manifiesto</span>
          <span className="label hidden sm:block">Signal → Engineering</span>
        </Reveal>

        <RevealLines
          as="h2"
          lines={t.manifesto.title}
          className="display text-[clamp(2.8rem,9.5vw,9.5rem)] uppercase text-paper"
          lineClassName="[&:nth-child(1)]:pl-0"
        />

        {/* Progress hairline synced with scroll */}
        <div className="my-16 h-px w-full bg-line lg:my-24">
          <motion.div className="h-full bg-signal" style={{ width: lineW }} />
        </div>

        <div className="grid gap-12 lg:grid-cols-12">
          <motion.p
            style={{ x: drift }}
            className="mono hidden text-[0.62rem] uppercase leading-loose tracking-[0.22em] text-paper/35 lg:col-span-3 lg:block"
            aria-hidden="true"
          >
            RELIABILITY
            <br />
            IS NOT
            <br />
            OPTIONAL
          </motion.p>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={0.1}>
              <p className="text-balance text-2xl font-light leading-snug text-paper sm:text-3xl lg:text-[2.6rem] lg:leading-[1.15]">{t.manifesto.body[0]}</p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper/60 sm:text-xl">{t.manifesto.body[1]}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
