import { LanguageProvider } from "@/i18n/LanguageContext";
import { useLenis } from "@/hooks/useLenis";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { Capabilities } from "@/components/Capabilities";
import { Projects } from "@/components/Projects";
import { Technology } from "@/components/Technology";
import { Process } from "@/components/Process";
import { Experience } from "@/components/Experience";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

/**
 * Narrative order:
 * SIGNAL → ENGINEERING → TECHNOLOGY → PROJECTS → EXPERIENCE → SENDER → CONTACT
 */
function Site() {
  useLenis();
  return (
    <div className="relative grain min-h-screen bg-ink text-paper">
      <a
        href="#manifiesto"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
      >
        Saltar al contenido
      </a>
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <Capabilities />
        <Projects />
        <Technology />
        <Process />
        <Experience />
        <About />
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
