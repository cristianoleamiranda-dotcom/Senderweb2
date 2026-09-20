import React from "react";
import { useLang } from "@/i18n/LanguageContext";

export function Footer() {
  const { t } = useLang();

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 bg-[#ffffff] text-[#494949] border-t border-[#494949]/15">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="font-semibold tracking-[0.14em] text-[#494949] text-base">
            SENDER
          </span>
          <span className="text-[#494949]/30">·</span>
          <span className="text-xs uppercase tracking-[0.16em] text-[#494949]/70">
            {t.footer.tagline}
          </span>
        </div>

        <div className="text-xs tracking-[0.16em] uppercase text-[#494949]/60 text-center sm:text-left">
          © {new Date().getFullYear()} SENDER · {t.footer.rights}
        </div>

        <div>
          <a
            href="#hero"
            onClick={scrollToTop}
            className="text-[0.72rem] tracking-[0.2em] uppercase font-semibold text-[#1e73be] hover:underline"
          >
            ↑ Volver arriba
          </a>
        </div>
      </div>
    </footer>
  );
}
