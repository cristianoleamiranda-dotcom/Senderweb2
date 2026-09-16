import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useLang } from "@/i18n/LanguageContext";
import { images } from "@/data/content";
import { Reveal, RevealImage, RevealLines } from "./ui/Reveal";
import { Kicker, Section } from "./ui/Primitives";

export function About() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const yB = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <Section id="nosotros" labelledBy="about-title" className="bg-ink py-28 sm:py-36 lg:py-48">
      <div ref={ref} className="mx-auto max-w-[1600px]">
        <Kicker>{t.about.kicker}</Kicker>

        <div className="mt-8 grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Headline + lead */}
          <div className="lg:col-span-7">
            <RevealLines as="h2" lines={t.about.title} className="display text-[clamp(2.6rem,7.5vw,7.5rem)] uppercase text-paper" />
            <span id="about-title" className="sr-only">
              {t.about.title.join(" ")}
            </span>
            <Reveal delay={0.15}>
              <p className="mt-10 max-w-2xl text-balance text-xl font-light leading-snug text-paper sm:text-2xl lg:text-[1.9rem] lg:leading-[1.25]">{t.about.lead}</p>
            </Reveal>
          </div>

          {/* Editorial image — portrait, offset */}
          <motion.div style={{ y: yA }} className="lg:col-span-4 lg:col-start-9 lg:-mt-16">
            <RevealImage src={images.aboutImg} alt="Técnico ensamblando un módulo de transmisión RF en el taller de Sender" className="aspect-[4/5]" />
            <p className="label mt-3 flex justify-between">
              <span>Workshop · RF assembly</span>
              <span>Santiago</span>
            </p>
          </motion.div>
        </div>

        <div className="mt-20 grid gap-14 lg:mt-28 lg:grid-cols-12 lg:gap-10">
          {/* Second image — landscape, low */}
          <motion.div style={{ y: yB }} className="order-2 lg:order-1 lg:col-span-5">
            <RevealImage src={images.capBroadcast} alt="Sala de transmisores de radiodifusión con racks de equipos" className="aspect-[16/11]" />
            <p className="label mt-3 flex justify-between">
              <span>Transmitter plant</span>
              <span>24/7</span>
            </p>
          </motion.div>

          {/* Paragraphs + pillars */}
          <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
            {t.about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className="mb-6 max-w-xl text-base leading-relaxed text-paper/65 sm:text-lg">{p}</p>
              </Reveal>
            ))}
            <dl className="mt-10 grid grid-cols-1 border-t border-line sm:grid-cols-2">
              {t.about.pillars.map((pl, i) => (
                <Reveal key={pl.k} delay={0.1 + i * 0.08} className="border-b border-line py-6 sm:pr-8 sm:[&:nth-child(odd)]:border-r">
                  <dt className="label">{pl.k}</dt>
                  <dd className="mt-2 text-paper/85">{pl.v}</dd>
                </Reveal>
              ))}
            </dl>
            <Reveal delay={0.3}>
              <blockquote className="mt-10 border-l border-signal pl-6">
                <p className="text-balance text-base italic leading-relaxed text-paper/60">{t.about.mission}</p>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
