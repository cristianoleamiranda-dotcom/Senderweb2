import React, { useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export function Contact() {
  const { t } = useLang();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    type: t.contact.form.types[0],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const subject = encodeURIComponent(`[SENDER WEB] Consulta: ${formData.type} - ${formData.company}`);
    const body = encodeURIComponent(
      `Nombre: ${formData.name}\n` +
      `Empresa: ${formData.company}\n` +
      `Email: ${formData.email}\n` +
      `Requerimiento: ${formData.type}\n\n` +
      `Mensaje:\n${formData.message}`
    );

    window.location.href = `mailto:${t.contact.email}?cc=${t.contact.secondaryEmail}&subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-white text-[#494949] border-t border-[#494949]/10">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          <span className="text-[0.68rem] tracking-[0.24em] uppercase font-bold text-[#1e73be]">
            {t.nav.contact}
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-light tracking-[-0.03em] leading-tight text-[#494949]">
            {t.contact.title}
          </h2>
        </div>

        {/* Contact Grid: Details Column + Interactive Form Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-[#1e73be]/10 text-[#1e73be] shrink-0 mt-1">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="text-[0.68rem] tracking-[0.18em] uppercase font-semibold text-[#494949]/60 block mb-1">
                    Dirección / Office
                  </span>
                  <p className="text-base font-medium text-[#494949]">
                    {t.contact.address}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-[#1e73be]/10 text-[#1e73be] shrink-0 mt-1">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="text-[0.68rem] tracking-[0.18em] uppercase font-semibold text-[#494949]/60 block mb-1">
                    Teléfono / Phone
                  </span>
                  <a
                    href="tel:+56983864148"
                    className="text-base font-medium text-[#1e73be] hover:underline"
                  >
                    {t.contact.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-[#1e73be]/10 text-[#1e73be] shrink-0 mt-1">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="text-[0.68rem] tracking-[0.18em] uppercase font-semibold text-[#494949]/60 block mb-1">
                    Email
                  </span>
                  <div className="flex flex-col gap-1">
                    <a
                      href={`mailto:${t.contact.email}`}
                      className="text-base font-medium text-[#1e73be] hover:underline"
                    >
                      {t.contact.email}
                    </a>
                    <a
                      href={`mailto:${t.contact.secondaryEmail}`}
                      className="text-sm text-[#494949]/70 hover:underline"
                    >
                      {t.contact.secondaryEmail}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-[#494949]/15">
              <span className="text-[0.68rem] font-mono tracking-[0.2em] uppercase text-[#0085b2] block mb-2 font-semibold">
                SENDER CHILE · TELECOMUNICACIONES
              </span>
              <p className="text-xs leading-relaxed text-[#494949]/70">
                Respuesta técnica garantizada para proyectos de radiodifusión, enlaces e ingeniería de misión crítica.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-8 sm:p-10 rounded-sm border border-[#494949]/15 bg-white shadow-sm space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[0.72rem] tracking-[0.16em] uppercase font-semibold text-[#494949] mb-2">
                    {t.contact.form.name} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-sm border border-[#494949]/25 focus:border-[#1e73be] focus:outline-none text-sm text-[#494949] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[0.72rem] tracking-[0.16em] uppercase font-semibold text-[#494949] mb-2">
                    {t.contact.form.company}
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-sm border border-[#494949]/25 focus:border-[#1e73be] focus:outline-none text-sm text-[#494949] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[0.72rem] tracking-[0.16em] uppercase font-semibold text-[#494949] mb-2">
                    {t.contact.form.email} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-sm border border-[#494949]/25 focus:border-[#1e73be] focus:outline-none text-sm text-[#494949] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[0.72rem] tracking-[0.16em] uppercase font-semibold text-[#494949] mb-2">
                    {t.contact.form.type}
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-sm border border-[#494949]/25 focus:border-[#1e73be] focus:outline-none text-sm text-[#494949] bg-white transition-colors cursor-pointer"
                  >
                    {t.contact.form.types.map((type, i) => (
                      <option key={i} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[0.72rem] tracking-[0.16em] uppercase font-semibold text-[#494949] mb-2">
                  {t.contact.form.message} *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-sm border border-[#494949]/25 focus:border-[#1e73be] focus:outline-none text-sm text-[#494949] transition-colors resize-y"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full text-xs font-semibold tracking-[0.2em] uppercase bg-[#1e73be] hover:bg-[#1e73be]/90 text-white transition-all shadow-sm cursor-pointer"
                >
                  <Send size={15} />
                  {t.contact.form.submit}
                </button>
              </div>

              {submitted && (
                <div className="p-3 bg-[#1e73be]/10 border border-[#1e73be]/20 rounded-sm text-xs text-[#1e73be] font-medium">
                  {t.contact.form.success}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
