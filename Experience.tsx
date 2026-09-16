import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { useLang } from "@/i18n/LanguageContext";
import type { Stat } from "@/data/content";
import { cn } from "@/utils/cn";
import { Reveal, RevealLines } from "./ui/Reveal";
import { Kicker, Section } from "./ui/Primitives";

export function Experience() {
  const { t } = useLang();
  return (
    <Section id="experiencia" labelledBy="experience-title" className="relative overflow-hidden bg-ink py-28 sm:py-36 lg:py-48">
      {/* Faint grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: "linear-gradient(to right, #17191B 1px, transparent 1px)",
          backgroundSize: "8.333% 100%",
        }}
      />
      <div className="relative mx-auto max-w-[1600px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Kicker>{t.experience.kicker}</Kicker>
            <div className="mt-8">
              <RevealLines as="h2" lines={t.experience.title} className="display text-[clamp(2.6rem,8vw,8rem)] uppercase text-paper" />
              <span id="experience-title" className="sr-only">
                {t.experience.title.join(" ")}
              </span>
            </div>
          </div>
          <Reveal className="lg:col-span-4" delay={0.2}>
            <p className="max-w-sm text-base leading-relaxed text-paper/60 lg:ml-auto">{t.experience.intro}</p>
          </Reveal>
        </div>

        <dl className="mt-20 grid grid-cols-2 gap-x-6 gap-y-14 border-t border-line pt-14 lg:grid-cols-4 lg:gap-x-10">
          {t.experience.stats.map((s, i) => (
            <StatBlock key={s.label} s={s} delay={i * 0.1} />
          ))}
        </dl>

        <div className="mt-20 grid gap-8 border-t border-line pt-10 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-8">
            <p className="display flex flex-wrap items-baseline gap-x-6 gap-y-2 text-[clamp(2rem,5vw,4.5rem)] uppercase text-paper">
              <span>{t.experience.reach[0]}</span>
              <span className="text-signal-soft">+</span>
              <span className="text-paper/60">{t.experience.reach[1]}</span>
            </p>
          </Reveal>
          <Reveal className="lg:col-span-4" delay={0.15}>
            <p className="label text-paper/40 lg:text-right">{t.experience.footnote}</p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function StatBlock({ s, delay }: { s: Stat; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const numeric = /^\d+/.test(s.value) ? parseInt(s.value, 10) : null;
  const suffix = numeric !== null ? s.value.replace(/^\d+/, "") : "";
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || numeric === null) return;
    const dur = 1400;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - k, 4);
      setN(Math.round(numeric * e));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, numeric]);

  return (
    <Reveal delay={delay}>
      <div ref={ref} className="flex flex-col gap-4">
        <dd className={cn("display order-1 text-[clamp(3rem,7vw,7rem)] leading-none", s.verified ? "text-paper" : "text-paper/30")}>
          {numeric !== null ? (
            <>
              {n}
              <span className="text-signal-soft">{suffix}</span>
            </>
          ) : (
            s.value
          )}
        </dd>
        <dt className="order-2 flex items-center gap-3">
          <span className={cn("h-1.5 w-1.5", s.verified ? "bg-signal" : "bg-paper/25")} aria-hidden="true" />
          <span className="label">{s.label}</span>
        </dt>
      </div>
    </Reveal>
  );
}
