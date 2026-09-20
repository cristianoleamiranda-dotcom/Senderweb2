import React from "react";
import { useLang } from "@/i18n/LanguageContext";

export function Products() {
  const { t } = useLang();

  return (
    <section id="products" className="py-24 sm:py-32 bg-[#ffffff] text-[#494949] border-t border-[#494949]/10">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          <span className="text-[0.68rem] tracking-[0.24em] uppercase font-bold text-[#1e73be]">
            {t.nav.products}
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-light tracking-[-0.03em] leading-tight text-[#494949]">
            {t.products.title}
          </h2>
        </div>

        {/* 8 Product Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.products.items.map((prod, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-sm border border-[#494949]/15 hover:border-[#1e73be] bg-white transition-all flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <span className="text-[0.68rem] font-mono tracking-[0.2em] text-[#0085b2] font-semibold block mb-3">
                  0{idx + 1}
                </span>
                <h3 className="text-lg sm:text-xl font-medium tracking-tight text-[#494949] mb-3">
                  {prod.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-[#494949]/80 font-normal">
                {prod.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
