import React, { useRef, useEffect } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { siteImages } from "@/content/site";

export function About() {
  const { t } = useLang();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play/pause video only when visible using IntersectionObserver (rootMargin: -15% 0px -15% 0px)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { rootMargin: "-15% 0px -15% 0px" }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-24 sm:py-32 bg-white text-[#494949] border-t border-[#494949]/10">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Label / Kicker */}
        <div className="mb-8">
          <span className="text-[0.68rem] tracking-[0.24em] uppercase font-bold text-[#1e73be]">
            {t.about.label}
          </span>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Main Copy Column */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-[-0.03em] leading-[1.08] text-[#494949] mb-8">
              {t.about.title}
            </h2>
            <div className="space-y-6 text-base sm:text-lg font-normal leading-relaxed text-[#494949]/85 max-w-2xl">
              <p>{t.about.body}</p>
              <p>{t.about.secondary}</p>
            </div>

            {/* Technical stats grid */}
            <div className="mt-12 pt-8 border-t border-[#494949]/15 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
              {t.about.stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1e73be]">
                    {stat.value}
                  </span>
                  <span className="mt-1 text-[0.72rem] tracking-[0.14em] uppercase text-[#494949]/70 font-medium">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Media Column: loop video / workshop image */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-[#494949]/10 border border-[#494949]/15">
              <img
                src={siteImages.about}
                alt="Taller de ensamble e ingeniería RF de SENDER en Santiago, Chile"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-[0.65rem] tracking-[0.18em] uppercase">
                RF LAB · SANTIAGO
              </div>
            </div>
            <p className="text-[0.72rem] tracking-[0.16em] uppercase text-[#494949]/60 font-medium">
              Ingeniería y soporte técnico directo desde Santiago de Chile
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
