import React from "react";
import { useLang } from "@/i18n/LanguageContext";

export function Process() {
  const { t } = useLang();

  return (
    <section id="process" className="py-24 sm:py-32 bg-[#ffffff] text-[#494949] border-t border-[#494949]/10">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          <span className="text-[0.68rem] tracking-[0.24em] uppercase font-bold text-[#1e73be]">
            {t.nav.engineering}
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-light tracking-[-0.03em] leading-tight text-[#494949]">
            {t.process.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#494949]/70">
            {t.process.note}
          </p>
        </div>

        {/* 4 Static Process Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {t.processCards.map((card) => (
            <div
              key={card.num}
              className="group p-6 sm:p-8 rounded-sm bg-white border border-[#494949]/15 hover:border-[#1e73be] transition-colors flex flex-col justify-between min-h-[260px]"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-mono tracking-[0.2em] font-semibold text-[#1e73be]">
                    {card.num}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#494949]/30 group-hover:bg-[#1e73be] transition-colors" />
                </div>
                <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-[#494949] mb-4">
                  {card.label}
                </h3>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-[#494949]/80 font-normal">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
