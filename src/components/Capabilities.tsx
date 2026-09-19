import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/i18n/LanguageContext";
import type { Capability } from "@/data/content";
import { cn } from "@/utils/cn";
import { Reveal, RevealImage, RevealLines } from "@/ui/Reveal";
import { Arrow, Kicker, Section } from "@/ui/Primitives";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Capabilities() {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const items = t.capabilities.items;

  return (
    <Section id="soluciones" labelledBy="capabilities-title" className="bg-ink pb-24 pt-8 sm:pb-32 lg:pb-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Kicker>{t.capabilities.kicker}</Kicker>
            <div className="mt-8">
              <RevealLines as="h2" lines={[t.capabilities.title]} className="display text-[clamp(2.6rem,7.5vw,7.5rem)] uppercase text-paper" />
              <span id="capabilities-title" className="sr-only">
                {t.capabilities.title}
              </span>
            </div>
          </div>
          <Reveal className="lg:col-span-4" delay={0.2}>
            <p className="max-w-sm text-base leading-relaxed text-paper/60 lg:ml-auto">{t.capabilities.intro}</p>
          </Reveal>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* Desktop: index list + sticky large image                      */}
        {/* ------------------------------------------------------------ */}
        <div className="mt-20 hidden lg:grid lg:grid-cols-12 lg:gap-12">
          <ul className="lg:col-span-7" role="list">
            {items.map((c, i) => (
              <CapRow key={c.id} c={c} active={active === i} onActivate={() => setActive(i)} hoverLabel={t.capabilities.hover} />
            ))}
          </ul>
          <div className="lg:col-span-5">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden bg-graphite">
              <AnimatePresence mode="sync" initial={false}>
                <motion.img
                  key={items[active].id}
                  src={items[active].image}
                  alt={items[active].alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: EASE }}
                />
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-6">
                <div className="flex items-end justify-between">
                  <span className="mono text-[0.62rem] tracking-[0.2em] text-paper/70">
                    {items[active].index} / 0{items.length}
                  </span>
                  <span className="mono text-[0.62rem] tracking-[0.2em] text-signal-soft">{items[active].title}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* Mobile / tablet: stacked editorial blocks with large images    */}
        {/* ------------------------------------------------------------ */}
        <div className="mt-16 flex flex-col gap-20 lg:hidden">
          {items.map((c, i) => (
            <article key={c.id} className="group">
              <RevealImage src={c.image} alt={c.alt} className={cn("aspect-[4/5] sm:aspect-[16/10]", i % 2 === 1 && "sm:ml-[12%]")} />
              <div className="mt-6 flex items-start justify-between gap-6">
                <div>
                  <span className="mono text-xs tracking-[0.2em] text-signal-soft">{c.index}</span>
                  <h3 className="display mt-2 text-3xl uppercase text-paper sm:text-4xl">{c.title}</h3>
                  <p className="mt-3 text-paper/65">{c.description}</p>
                </div>
                <Arrow direction="up-right" className="mt-2 shrink-0 text-2xl text-paper/50" />
              </div>
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                {c.specs.map((s) => (
                  <li key={s} className="label text-paper/50">
                    {s}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

function CapRow({ c, active, onActivate, hoverLabel }: { c: Capability; active: boolean; onActivate: () => void; hoverLabel: string }) {
  return (
    <li className="border-t border-line last:border-b">
      <a
        href="#contacto"
        onMouseEnter={onActivate}
        onFocus={onActivate}
        onClick={(e) => e.preventDefault()}
        aria-current={active ? "true" : undefined}
        className={cn("group relative grid grid-cols-12 items-start gap-6 py-9 transition-colors duration-700", active ? "text-paper" : "text-paper/45 hover:text-paper")}
      >
        {/* active indicator */}
        <span
          aria-hidden="true"
          className={cn("absolute left-0 top-0 h-px bg-signal transition-[width] duration-700 ease-out-expo", active ? "w-full" : "w-0")}
        />
        <span className="mono col-span-1 pt-2 text-xs tracking-[0.2em] text-signal-soft">{c.index}</span>
        <div className="col-span-9">
          <h3 className="display text-[clamp(2rem,3.6vw,3.6rem)] uppercase transition-transform duration-700 ease-out-expo group-hover:translate-x-2">{c.title}</h3>
          <div className={cn("grid transition-[grid-template-rows,opacity] duration-700 ease-out-expo", active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
            <div className="overflow-hidden">
              <p className="mt-4 max-w-md text-base text-paper/70">{c.description}</p>
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                {c.specs.map((s) => (
                  <li key={s} className="label text-paper/50">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <span className="col-span-2 flex items-center justify-end gap-3 pt-3">
          <span className={cn("label transition-opacity duration-500", active ? "opacity-100" : "opacity-0")}>{hoverLabel}</span>
          <Arrow direction="up-right" className={cn("text-xl transition-all duration-700 ease-out-expo", active ? "text-signal-soft" : "text-paper/40", "group-hover:-translate-y-0.5 group-hover:translate-x-0.5")} />
        </span>
      </a>
    </li>
  );
}
