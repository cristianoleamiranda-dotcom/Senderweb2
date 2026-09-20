import React from "react";
import { useLang } from "@/i18n/LanguageContext";

export function Work() {
  const { t } = useLang();

  return (
    <section id="work" className="py-24 sm:py-32 bg-[#ffffff] text-[#494949] border-t border-[#494949]/10">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          <span className="text-[0.68rem] tracking-[0.24em] uppercase font-bold text-[#1e73be]">
            {t.nav.projects}
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-light tracking-[-0.03em] leading-tight text-[#494949]">
            {t.projects.title}
          </h2>
        </div>

        {/* 6 Real Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.projects.items.map((proj, idx) => (
            <div
              key={idx}
              className="group rounded-sm border border-[#494949]/15 overflow-hidden bg-white flex flex-col"
            >
              {/* Project Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#494949]/10">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[0.65rem] tracking-[0.16em] uppercase font-medium bg-black/60 backdrop-blur-sm text-white">
                    0{idx + 1}
                  </span>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-medium tracking-tight text-[#494949] mb-2 group-hover:text-[#1e73be] transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-sm text-[#494949]/80 font-normal leading-relaxed">
                    {proj.subtitle}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#494949]/10 flex items-center justify-between text-[0.68rem] font-mono tracking-[0.16em] uppercase text-[#494949]/60">
                  <span>SENDER RF</span>
                  <span>CHILE</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
