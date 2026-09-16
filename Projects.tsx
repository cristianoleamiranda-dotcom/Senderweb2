import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useLang } from "@/i18n/LanguageContext";
import type { Project } from "@/data/content";
import { scrollToId } from "@/hooks/useLenis";
import { Reveal, RevealLines } from "./ui/Reveal";
import { Arrow, Kicker, Section } from "./ui/Primitives";

export function Projects() {
  const { t } = useLang();
  const items = t.projects.items;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  return (
    <Section id="proyectos" labelledBy="projects-title" className="bg-ink pt-24 sm:pt-32 lg:pt-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Kicker>{t.projects.kicker}</Kicker>
            <div className="mt-8">
              <RevealLines as="h2" lines={[t.projects.title]} className="display text-[clamp(2.6rem,7.5vw,7.5rem)] uppercase text-paper" />
              <span id="projects-title" className="sr-only">
                {t.projects.title}
              </span>
            </div>
          </div>
          <Reveal className="lg:col-span-4" delay={0.2}>
            <p className="mono text-sm uppercase tracking-[0.2em] text-signal-soft lg:text-right">{t.projects.subtitle}</p>
          </Reveal>
        </div>
      </div>

      {/* Stacked sticky projects */}
      <div ref={containerRef} className="relative mt-16 lg:mt-24">
        {items.map((p, i) => (
          <ProjectPanel key={p.id} p={p} i={i} total={items.length} progress={scrollYProgress} labels={t.projects.labels} view={t.projects.view} />
        ))}
      </div>
    </Section>
  );
}

function ProjectPanel({
  p,
  i,
  total,
  progress,
  labels,
  view,
}: {
  p: Project;
  i: number;
  total: number;
  progress: MotionValue<number>;
  labels: { location: string; technology: string; year: string };
  view: string;
}) {
  // Each panel occupies 1/total of the container's scroll range.
  const start = i / total;
  const end = (i + 1) / total;
  // Previous panel recedes as the next one covers it.
  const isLast = i === total - 1;
  const scale = useTransform(progress, [start, end], [1, isLast ? 1 : 0.94]);
  const dim = useTransform(progress, [start, end], [0, isLast ? 0 : 0.55]);
  const imgY = useTransform(progress, [Math.max(0, start - 1 / total), end], ["-6%", "6%"]);

  return (
    <div className="sticky top-0 h-[100svh] min-h-[600px]">
      <motion.article
        style={{ scale, transformOrigin: "center top" }}
        className="relative h-full w-full overflow-hidden bg-graphite"
        aria-labelledby={`project-${p.id}`}
      >
        <motion.img
          src={p.image}
          alt={p.alt}
          loading="lazy"
          decoding="async"
          style={{ y: imgY }}
          className="absolute inset-0 h-[112%] w-full -translate-y-[6%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/20" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" aria-hidden="true" />
        <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-ink" aria-hidden="true" />

        <div className="relative flex h-full flex-col justify-between px-5 pb-8 pt-24 sm:px-8 sm:pb-10 lg:px-12 lg:pt-28 xl:px-16">
          {/* Top bar */}
          <div className="flex items-center justify-between">
            <span className="mono text-[0.68rem] tracking-[0.24em] text-paper/70">PROJECT {p.index}</span>
            <span className="mono text-[0.68rem] tracking-[0.24em] text-signal-soft">{p.category}</span>
          </div>

          {/* Bottom content */}
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <h3 id={`project-${p.id}`} className="display max-w-4xl text-[clamp(2.2rem,6vw,6rem)] uppercase text-paper">
                {p.name}
              </h3>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/70 sm:text-lg">{p.summary}</p>
            </div>
            <div className="lg:col-span-4">
              <dl className="grid grid-cols-3 gap-4 border-t border-paper/15 pt-5 lg:grid-cols-1 lg:gap-5">
                <Field k={labels.location} v={p.location} />
                <Field k={labels.technology} v={p.technology} className="col-span-2 lg:col-span-1" />
                <Field k={labels.year} v={p.year} />
              </dl>
              <a
                href="#contacto"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("contacto");
                }}
                className="group mt-8 inline-flex items-center gap-3 mono text-[0.72rem] uppercase tracking-[0.2em] text-paper transition-colors hover:text-signal-soft"
              >
                <span className="link-line">{view}</span>
                <Arrow className="transition-transform duration-500 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Frame counter */}
        <div className="mono absolute right-5 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-1 text-[0.6rem] tracking-[0.2em] text-paper/40 sm:right-8 lg:flex lg:right-12 xl:right-16" aria-hidden="true">
          {Array.from({ length: total }).map((_, k) => (
            <span key={k} className={k === i ? "text-signal-soft" : ""}>
              {k === i ? "—" : "·"} 0{k + 1}
            </span>
          ))}
        </div>
      </motion.article>
    </div>
  );
}

function Field({ k, v, className }: { k: string; v: string; className?: string }) {
  const editable = v.startsWith("[");
  return (
    <div className={className}>
      <dt className="label">{k}</dt>
      <dd className={`mono mt-1.5 text-[0.78rem] tracking-[0.06em] ${editable ? "text-paper/40" : "text-paper/90"}`}>{v}</dd>
    </div>
  );
}
