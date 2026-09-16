import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useLang } from "@/i18n/LanguageContext";
import { Reveal, RevealLines } from "./ui/Reveal";
import { Kicker, Section } from "./ui/Primitives";

export function Process() {
  const { t } = useLang();
  const steps = t.process.steps;
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 26, mass: 0.5 });
  const lineScale = useTransform(p, [0, 1], [0, 1]);

  return (
    <Section id="proceso" labelledBy="process-title" className="bg-graphite py-28 sm:py-36 lg:py-48">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Kicker>{t.process.kicker}</Kicker>
            <div className="mt-8 lg:sticky lg:top-32">
              <RevealLines as="h2" lines={t.process.title} className="display text-[clamp(2.6rem,7vw,7rem)] uppercase text-paper" />
              <span id="process-title" className="sr-only">
                {t.process.title.join(" ")}
              </span>
              <Reveal delay={0.2}>
                <p className="mt-8 max-w-sm text-base leading-relaxed text-paper/60">{t.process.intro}</p>
              </Reveal>
            </div>
          </div>

          <div className="relative lg:col-span-6 lg:col-start-7">
            {/* Track */}
            <div className="absolute bottom-0 left-[7px] top-0 w-px bg-line lg:left-[7px]" aria-hidden="true">
              <motion.div className="h-full w-full origin-top bg-signal" style={{ scaleY: lineScale }} />
            </div>

            <ol ref={ref} className="flex flex-col">
              {steps.map((s, i) => (
                <Step key={s.index} index={s.index} title={s.title} text={s.text} i={i} total={steps.length} progress={p} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Step({
  index,
  title,
  text,
  i,
  total,
  progress,
}: {
  index: string;
  title: string;
  text: string;
  i: number;
  total: number;
  progress: ReturnType<typeof useSpring>;
}) {
  const at = i / (total - 1);
  const dot = useTransform(progress, [Math.max(0, at - 0.08), at], [0, 1]);
  const color = useTransform(dot, [0, 1], ["#232628", "#1E73BE"]);
  const glow = useTransform(dot, [0, 1], ["0 0 0 0 rgba(30,115,190,0)", "0 0 0 6px rgba(30,115,190,0.18)"]);
  const opacity = useTransform(dot, [0, 1], [0.45, 1]);

  return (
    <motion.li style={{ opacity }} className="relative grid grid-cols-[16px_1fr] gap-6 py-10 first:pt-0 last:pb-0 sm:gap-10 lg:py-14">
      <motion.span aria-hidden="true" className="relative top-2 h-4 w-4 rounded-full" style={{ backgroundColor: color, boxShadow: glow }} />
      <div className="grid gap-4 sm:grid-cols-12">
        <span className="mono sm:col-span-2 text-xs tracking-[0.2em] text-signal-soft">{index}</span>
        <div className="sm:col-span-10">
          <h3 className="display text-[clamp(1.9rem,4vw,3.6rem)] uppercase text-paper">{title}</h3>
          <p className="mt-4 max-w-md text-base leading-relaxed text-paper/60">{text}</p>
        </div>
      </div>
    </motion.li>
  );
}
