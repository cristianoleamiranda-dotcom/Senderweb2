import React from "react";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/sections/About";
import { Process } from "@/sections/Process";
import { Products } from "@/sections/Products";
import { Work } from "@/sections/Work";
import { Quote } from "@/sections/Quote";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";

function Site() {
  return (
    <div className="relative min-h-screen bg-white text-[#494949] antialiased">
      {/* Sticky top navbar (only displays when scrolled past the hero) */}
      <Navbar />

      <main>
        {/* Section 1: Hero with scroll-driven video transport */}
        <Hero />

        {/* Section 2: Nosotros / About */}
        <About />

        {/* Section 3: Ingeniería / Process */}
        <Process />

        {/* Section 4: Productos / Products */}
        <Products />

        {/* Section 5: Proyectos / Work */}
        <Work />

        {/* Section 6: Desafío técnico / Quote */}
        <Quote />

        {/* Section 7: Contacto / Contact */}
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Site />
    </LanguageProvider>
  );
}
