import React from "react";
import { useLang } from "@/i18n/LanguageContext";

export function Quote() {
  const { t } = useLang();

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("contact");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="quote" className="py-24 sm:py-32 bg-[#494949] text-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-[0.68rem] tracking-[0.24em] uppercase font-bold text-[#0085b2] mb-6 block">
            SENDER CHILE
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-[-0.03em] leading-tight text-white mb-6">
            {t.quote.title}
          </h2>
          <p className="text-base sm:text-xl text-white/80 font-normal leading-relaxed mb-10 max-w-xl mx-auto">
            {t.quote.body}
          </p>
          <a
            href="#contact"
            onClick={handleCtaClick}
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase bg-[#1e73be] hover:bg-[#1e73be]/90 text-white transition-all shadow-md cursor-pointer"
          >
            {t.quote.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
