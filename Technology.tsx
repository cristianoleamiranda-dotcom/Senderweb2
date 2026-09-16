import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useLang } from "@/i18n/LanguageContext";
import { cn } from "@/utils/cn";
import { Reveal, RevealLines } from "./ui/Reveal";
import { Kicker, Section } from "./ui/Primitives";

/**
 * Log-scale spectrum positions (0..1) for each band, between 100 kHz and 1 GHz.
 * Values are approximate centres for visualization only.
 */
const SPECTRUM: Record<string, { lo: number; hi: number; cycles: number }> = {
  AM: { lo: 490e3, hi: 1700e3, cycles: 3 },
  FM: { lo: 87.5e6, hi: 108e6, cycles: 9 },
  HF: { lo: 2e6, hi: 30e6, cycles: 5 },
  VHF: { lo: 134e6, hi: 174e6, cycles: 11 },
  UHF: { lo: 300e6, hi: 1e9, cycles: 14 },
  NAVTEX: { lo: 490e3, hi: 518e3, cycles: 2.4 },
};
const MIN = Math.log10(1e5);
const MAX = Math.log10(1e9);
const pos = (f: number) => (Math.log10(f) - MIN) / (MAX - MIN);

export function Technology() {
  const { t } = useLang();
  const bands = t.technology.bands;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(bands.length - 1, Math.floor(v * bands.length));
    if (idx !== active) setActive(idx);
  });

  const beam = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

  return (
    <Section id="tecnologia" labelledBy="technology-title" className="bg-ink pt-32 sm:pt-40 lg:pt-48">
      <div className="mx-auto max-w-[1600px]">
        <Kicker>{t.technology.kicker}</Kicker>
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <RevealLines as="h2" lines={t.technology.title} className="display text-[clamp(2.6rem,7.5vw,7.5rem)] uppercase text-paper" />
            <span id="technology-title" className="sr-only">
              {t.technology.title.join(" ")}
            </span>
          </div>
          <Reveal className="lg:col-span-4" delay={0.2}>
            <p className="max-w-sm text-base leading-relaxed text-paper/60 lg:ml-auto">{t.technology.intro}</p>
          </Reveal>
        </div>
      </div>

      {/* Scroll-driven stage */}
      <div ref={ref} className="relative mx-auto mt-16 max-w-[1600px]" style={{ height: `${bands.length * 70 + 40}svh` }}>
        <div className="sticky top-0 flex h-[100svh] min-h-[620px] flex-col justify-center py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            {/* Visualization */}
            <div className="relative lg:col-span-7">
              <Spectrum bands={bands} active={active} />
              {/* beam intensity indicator */}
              <div className="mt-6 flex items-center justify-between">
                <span className="label">Spectrum · log scale · 100 kHz → 1 GHz</span>
                <div className="flex items-center gap-3">
                  <span className="label">Coverage</span>
                  <div className="h-px w-24 bg-line">
                    <motion.div className="h-full bg-signal" style={{ scaleX: beam, transformOrigin: "left" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Band list */}
            <ol className="lg:col-span-5 lg:pl-8" aria-label="Bandas de operación">
              {bands.map((b, i) => {
                const on = i === active;
                const past = i < active;
                return (
                  <li key={b.code} className={cn("border-t border-line transition-colors duration-700 last:border-b", on ? "text-paper" : past ? "text-paper/55" : "text-paper/25")}>
                    <div className="grid grid-cols-12 items-baseline gap-3 py-4 lg:py-5">
                      <span className="mono col-span-1 text-[0.62rem] tracking-[0.2em]">{String(i + 1).padStart(2, "0")}</span>
                      <span className={cn("display col-span-4 text-[clamp(1.6rem,3.2vw,3rem)] transition-transform duration-700 ease-out-expo", on && "translate-x-1")}>{b.code}</span>
                      <span className={cn("mono col-span-7 text-right text-[0.72rem] tracking-[0.08em] transition-colors duration-700", on ? "text-signal-soft" : "")}>{b.range}</span>
                    </div>
                    <div className={cn("grid transition-[grid-template-rows,opacity] duration-700 ease-out-expo", on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                      <div className="overflow-hidden">
                        <p className="pb-5 pl-[8.33%] text-sm leading-relaxed text-paper/65">{b.use}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
              <li className="mt-4 label list-none text-paper/35" aria-hidden="true">
                {t.technology.note}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Spectrum visualization                                              */
/* ------------------------------------------------------------------ */
function Spectrum({ bands, active }: { bands: { code: string; range: string }[]; active: number }) {
  const W = 800;
  const H = 420;
  const axisY = 330;
  const code = bands[active]?.code ?? "AM";
  const band = SPECTRUM[code] ?? SPECTRUM.AM;

  const x0 = pos(band.lo) * W;
  const x1 = pos(band.hi) * W;
  const cx = (x0 + x1) / 2;

  // Time-based phase for a slow, precise oscillation.
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setPhase((p) => (p + dt * 1.2) % (Math.PI * 2));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Carrier wave path across the stage with an amplitude envelope centred on the band.
  const wave = useMemo(() => {
    const pts: string[] = [];
    const baseY = 225;
    const n = 220;
    for (let i = 0; i <= n; i++) {
      const x = (i / n) * W;
      const d = Math.abs(x - cx) / (W * 0.35);
      const env = Math.exp(-d * d * 2.2);
      const y = baseY + Math.sin((x / W) * Math.PI * 2 * band.cycles + phase) * 70 * env;
      pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return pts.join(" ");
  }, [cx, band.cycles, phase]);

  const ticks = [1e5, 1e6, 1e7, 1e8, 1e9];
  const fmt = (f: number) => (f >= 1e9 ? "1 GHz" : f >= 1e6 ? `${f / 1e6} MHz` : `${f / 1e3} kHz`);

  return (
    <div className="relative aspect-[800/420] w-full overflow-hidden border border-line bg-graphite">
      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        aria-hidden="true"
        style={{
          backgroundImage: "linear-gradient(to right, #232628 1px, transparent 1px), linear-gradient(to bottom, #232628 1px, transparent 1px)",
          backgroundSize: "6.25% 25%",
        }}
      />
      <svg viewBox={`0 0 ${W} ${H}`} className="relative h-full w-full" role="img" aria-label={`Visualización de espectro: banda ${code} activa`}>
        {/* Band window */}
        <motion.rect
          initial={false}
          x={x0}
          width={Math.max(x1 - x0, 6)}
          animate={{ x: x0, width: Math.max(x1 - x0, 6) }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          y={40}
          height={axisY - 40}
          fill="#1E73BE"
          fillOpacity={0.08}
          stroke="#1E73BE"
          strokeOpacity={0.5}
          strokeWidth={0.75}
        />
        {/* Mast (vertical) at band centre */}
        <motion.line initial={false} x1={cx} x2={cx} animate={{ x1: cx, x2: cx }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} y1={40} y2={axisY} stroke="#5C95CE" strokeWidth={0.75} strokeDasharray="2 4" />

        {/* Carrier wave */}
        <path d={wave} fill="none" stroke="#5C95CE" strokeWidth={1.25} />
        <path d={wave} fill="none" stroke="#F5F5F5" strokeWidth={0.4} opacity={0.5} />

        {/* Propagation arcs from the mast centre */}
        {[0, 1, 2].map((k) => (
          <motion.circle
            key={`${code}-${k}`}
            cx={cx}
            cy={axisY}
            r={20}
            fill="none"
            stroke="#5C95CE"
            strokeWidth={0.6}
            initial={{ r: 10, opacity: 0 }}
            animate={{ r: [10, 260], opacity: [0, 0.35, 0] }}
            transition={{ duration: 6, delay: k * 2, repeat: Infinity, ease: "easeOut" }}
          />
        ))}

        {/* Axis */}
        <line x1={0} x2={W} y1={axisY} y2={axisY} stroke="#8A9096" strokeWidth={0.75} />
        {ticks.map((f) => {
          const x = pos(f) * W;
          return (
            <g key={f}>
              <line x1={x} x2={x} y1={axisY} y2={axisY + 10} stroke="#8A9096" strokeWidth={0.75} />
              <text x={x} y={axisY + 30} textAnchor={f === 1e5 ? "start" : f === 1e9 ? "end" : "middle"} fontSize={11} fill="#8A9096" fontFamily="IBM Plex Mono, monospace" letterSpacing="1">
                {fmt(f)}
              </text>
            </g>
          );
        })}
        {/* minor ticks (log decades) */}
        {ticks.slice(0, -1).flatMap((f) =>
          [2, 3, 4, 5, 6, 7, 8, 9].map((m) => {
            const x = pos(f * m) * W;
            return <line key={`${f}-${m}`} x1={x} x2={x} y1={axisY} y2={axisY + 5} stroke="#8A9096" strokeWidth={0.5} opacity={0.6} />;
          }),
        )}

        {/* Band markers for every band (ghosted) */}
        {bands.map((b, i) => {
          const s = SPECTRUM[b.code];
          if (!s) return null;
          const bx0 = pos(s.lo) * W;
          const bx1 = pos(s.hi) * W;
          const on = i === active;
          return <rect key={b.code} x={bx0} y={axisY - 3} width={Math.max(bx1 - bx0, 4)} height={3} fill={on ? "#1E73BE" : "#8A9096"} opacity={on ? 1 : 0.35} />;
        })}
      </svg>

      {/* Readout */}
      <div className="absolute left-4 top-4 flex flex-col gap-1 sm:left-6 sm:top-6">
        <AnimatePresence mode="wait">
          <motion.span
            key={code}
            className="display text-[clamp(2.4rem,6vw,5rem)] text-paper"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {code}
          </motion.span>
        </AnimatePresence>
        <span className="mono text-[0.68rem] tracking-[0.2em] text-signal-soft">{bands[active]?.range}</span>
      </div>
      <div className="mono absolute right-4 top-4 text-right text-[0.6rem] leading-relaxed tracking-[0.2em] text-paper/40 sm:right-6 sm:top-6" aria-hidden="true">
        <span className="block">CARRIER</span>
        <span className="block text-signal-soft">LOCKED</span>
      </div>
    </div>
  );
}
