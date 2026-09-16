import { useLang } from "@/i18n/LanguageContext";
import { company } from "@/data/content";
import { scrollToId } from "@/hooks/useLenis";
import { Arrow } from "./ui/Primitives";

const LINKS = [
  { id: "soluciones", key: "solutions" },
  { id: "proyectos", key: "projects" },
  { id: "tecnologia", key: "technology" },
  { id: "nosotros", key: "about" },
  { id: "contacto", key: "contact" },
] as const;

export function Footer() {
  const { t } = useLang();
  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <footer className="relative bg-ink px-5 pb-8 pt-20 sm:px-8 lg:px-12 lg:pt-28 xl:px-16">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <a href="#top" onClick={go("top")} className="display inline-block text-[clamp(2.4rem,6vw,5.5rem)] tracking-[0.06em] text-paper" aria-label="Sender">
              SENDER
            </a>
            <p className="mono mt-4 text-[0.72rem] uppercase tracking-[0.24em] text-signal-soft">{t.footer.tagline}</p>
          </div>

          {/* Nav */}
          <nav className="lg:col-span-3" aria-label="Footer">
            <p className="label mb-5">{t.footer.nav}</p>
            <ul className="flex flex-col gap-3">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} onClick={go(l.id)} className="link-line mono text-[0.72rem] uppercase tracking-[0.2em] text-paper/70 hover:text-paper">
                    {t.nav[l.key]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Reach */}
          <div className="lg:col-span-2">
            <p className="label mb-5">{t.footer.reach}</p>
            <ul className="mono flex flex-col gap-3 text-[0.72rem] uppercase tracking-[0.2em] text-paper/70">
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 bg-signal" aria-hidden="true" />
                Chile
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 bg-paper/30" aria-hidden="true" />
                International
              </li>
            </ul>
          </div>

          {/* Channels — real channels only */}
          <div className="lg:col-span-2">
            <p className="label mb-5">{t.footer.channels}</p>
            <ul className="mono flex flex-col gap-3 text-[0.72rem] tracking-[0.12em] text-paper/70">
              <li>
                <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className="link-line hover:text-paper">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={company.youtube} target="_blank" rel="noopener noreferrer" className="link-line hover:text-paper">
                  YouTube
                </a>
              </li>
              <li>
                <a href={`mailto:${company.emails[0]}`} className="link-line hover:text-paper">
                  {company.emails[0]}
                </a>
              </li>
              <li>
                <a href={company.phoneHref} className="link-line hover:text-paper">
                  {company.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label">{t.footer.legal}</p>
          <div className="flex items-center gap-8">
            <p className="label">© {new Date().getFullYear()}</p>
            <a href="#top" onClick={go("top")} className="group label flex items-center gap-2 text-paper/60 hover:text-paper">
              {t.footer.back}
              <Arrow direction="down" className="rotate-180 transition-transform duration-500 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
