import { useState, type FormEvent } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { company } from "@/data/content";
import { cn } from "@/utils/cn";
import { Reveal, RevealLines } from "@/ui/Reveal";
import { Arrow, Button, ButtonLink, Kicker, Section } from "@/ui/Primitives";

const field =
  "peer w-full border-b border-line bg-transparent py-4 text-base text-paper placeholder-transparent outline-none transition-colors duration-500 focus:border-signal";
const lbl =
  "pointer-events-none absolute left-0 top-4 label transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-[0.6875rem] peer-focus:-top-3 peer-focus:text-[0.6rem] peer-focus:text-signal-soft peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[0.6rem]";

export function Contact() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);
  const [type, setType] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = [
      `${t.contact.form.name}: ${fd.get("name")}`,
      `${t.contact.form.company}: ${fd.get("company")}`,
      `${t.contact.form.email}: ${fd.get("email")}`,
      `${t.contact.form.type}: ${fd.get("type")}`,
      "",
      `${fd.get("message")}`,
    ].join("\n");
    // Opens the visitor's mail client addressed to Sender — no backend required.
    window.location.href = `mailto:${company.emails[0]}?subject=${encodeURIComponent(`[Sender] ${fd.get("type") || "Proyecto"} — ${fd.get("company") || fd.get("name")}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <Section id="contacto" labelledBy="contact-title" className="relative overflow-hidden bg-graphite pb-24 pt-32 sm:pt-40 lg:pb-32 lg:pt-56">
      {/* Signal beacon */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full border border-signal/10 lg:right-[-10%]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-[320px] w-[320px] rounded-full border border-signal/15 lg:right-[-2%]" />

      <div className="relative mx-auto max-w-[1600px]">
        <Kicker>{t.contact.kicker}</Kicker>
        <div className="mt-8 grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <RevealLines as="h2" lines={t.contact.title} className="display text-[clamp(3rem,10vw,10rem)] uppercase text-paper" />
            <span id="contact-title" className="sr-only">
              {t.contact.title.join(" ")}
            </span>
            <Reveal delay={0.2}>
              <p className="mono mt-8 text-lg tracking-[0.08em] text-signal-soft sm:text-xl">{t.contact.sub}</p>
            </Reveal>
            <Reveal delay={0.3} className="mt-12">
              <ButtonLink href={company.whatsapp} target="_blank" rel="noopener noreferrer">
                {t.contact.cta}
              </ButtonLink>
            </Reveal>

            {/* Direct channels */}
            <Reveal delay={0.35} className="mt-16 grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
              <div>
                <p className="label mb-4">{t.contact.direct}</p>
                <ul className="flex flex-col gap-2 text-paper/80">
                  <li>
                    <a href={company.phoneHref} className="link-line mono text-sm">
                      {company.phone}
                    </a>
                  </li>
                  {company.emails.map((m) => (
                    <li key={m}>
                      <a href={`mailto:${m}`} className="link-line mono text-sm">
                        {m}
                      </a>
                    </li>
                  ))}
                  <li className="pt-2">
                    <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 mono text-sm text-signal-soft">
                      {t.contact.whatsapp}
                      <Arrow direction="up-right" className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="label mb-4">HQ</p>
                <a href={company.mapsHref} target="_blank" rel="noopener noreferrer" className="mono text-sm leading-relaxed text-paper/80 hover:text-paper">
                  Blanco Viel 1108, 2º piso
                  <br />
                  San Miguel, Santiago
                  <br />
                  Chile
                </a>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.25} className="lg:col-span-5">
            <form onSubmit={onSubmit} className="flex flex-col gap-8" aria-label={t.contact.cta}>
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="relative">
                  <input id="f-name" name="name" type="text" required placeholder=" " autoComplete="name" className={field} />
                  <label htmlFor="f-name" className={lbl}>
                    {t.contact.form.name}
                  </label>
                </div>
                <div className="relative">
                  <input id="f-company" name="company" type="text" placeholder=" " autoComplete="organization" className={field} />
                  <label htmlFor="f-company" className={lbl}>
                    {t.contact.form.company}
                  </label>
                </div>
              </div>
              <div className="relative">
                <input id="f-email" name="email" type="email" required placeholder=" " autoComplete="email" className={field} />
                <label htmlFor="f-email" className={lbl}>
                  {t.contact.form.email}
                </label>
              </div>
              <div className="relative">
                <label htmlFor="f-type" className={cn("label absolute left-0 transition-all duration-300", type ? "-top-3 text-[0.6rem]" : "top-4")}>
                  {t.contact.form.type}
                </label>
                <select
                  id="f-type"
                  name="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                  className={cn(field, "appearance-none cursor-pointer", !type && "text-transparent")}
                >
                  <option value="" disabled hidden></option>
                  {t.contact.form.types.map((o) => (
                    <option key={o} value={o} className="bg-graphite text-paper">
                      {o}
                    </option>
                  ))}
                </select>
                <Arrow direction="down" className="pointer-events-none absolute right-0 top-5 text-paper/50" />
              </div>
              <div className="relative">
                <textarea id="f-message" name="message" rows={3} placeholder=" " className={cn(field, "resize-none")} />
                <label htmlFor="f-message" className={lbl}>
                  {t.contact.form.message}
                </label>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <Button type="submit" variant="ghost">
                  {t.contact.form.submit}
                </Button>
                <span className="label" aria-live="polite">
                  {sent ? t.contact.form.sent : ""}
                </span>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
