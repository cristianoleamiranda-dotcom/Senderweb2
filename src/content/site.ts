// Centralized bilingual content for SENDER (ES / EN)
// Strict adherence to brand identity and technical specifications

import projStl from "@/assets/proj-stl.jpg";
import projAm from "@/assets/proj-am.jpg";
import capTransmission from "@/assets/cap-transmission.jpg";
import capBroadcast from "@/assets/cap-broadcast.jpg";
import capCritical from "@/assets/cap-critical.jpg";
import capAntennas from "@/assets/cap-antennas.jpg";
import capRf from "@/assets/cap-rf.jpg";
import aboutImg from "@/assets/about.jpg";

export const siteImages = {
  about: aboutImg,
  projStl,
  projAm,
  capTransmission,
  capBroadcast,
  capCritical,
  capAntennas,
  capRf,
};

export const siteContent = {
  es: {
    nav: {
      home: "INICIO",
      about: "NOSOTROS",
      engineering: "INGENIERÍA",
      products: "PRODUCTOS",
      projects: "PROYECTOS",
      contact: "CONTACTO",
    },
    hero: {
      eyebrow: "ENGINEERING THE SIGNAL",
      title: "SENDER",
      description: "Ingeniería RF, radiodifusión y sistemas de transmisión.",
      location: "CHILE · LATAM",
      cta: "Solicitar asesoría",
      hint: "Scroll o teclas ↑ / ↓ para controlar el video",
    },
    about: {
      label: "NOSOTROS",
      title: "Ingeniería que entiende la señal.",
      body: "Somos una empresa chilena especializada en telecomunicaciones, radiodifusión e ingeniería RF, con más de 20 años de experiencia.",
      secondary: "Diseñamos, desarrollamos e implementamos soluciones para sistemas de transmisión y comunicaciones profesionales en Chile y Latinoamérica.",
      stats: [
        { value: "20+", label: "Años de experiencia" },
        { value: "100%", label: "Cobertura nacional" },
        { value: "24/7", label: "Operación crítica" },
        { value: "RF", label: "Precisión técnica" },
      ],
    },
    process: {
      title: "De la necesidad al sistema.",
      note: "Cuatro etapas, una solución integral.",
    },
    processCards: [
      { num: "01", label: "DIAGNÓSTICO", desc: "Entender la necesidad técnica y operacional." },
      { num: "02", label: "INGENIERÍA", desc: "Diseñar la solución y sus componentes." },
      { num: "03", label: "IMPLEMENTACIÓN", desc: "Integrar, instalar y poner en operación." },
      { num: "04", label: "SOPORTE", desc: "Acompañar el sistema durante su operación." },
    ],
    products: {
      title: "Tecnología para transmitir con precisión.",
      items: [
        { title: "TRANSMISORES AM", desc: "Equipos de estado sólido de alta eficiencia y confiabilidad continua." },
        { title: "TRANSMISORES FM", desc: "Sistemas de modulación de alta fidelidad para radiodifusión profesional." },
        { title: "STL / ENLACES", desc: "Enlaces estudio-planta punto a punto digitales y analógicos de baja latencia." },
        { title: "PROCESAMIENTO DE AUDIO", desc: "Control dinámico, ecualización y procesamiento de señal de broadcast." },
        { title: "ANTENAS", desc: "Sistemas radiantes calculados para máxima cobertura y rendimiento de patrón." },
        { title: "AUTOMATIZACIÓN", desc: "Monitoreo remoto, telemetría y conmutación redundante automatizada." },
        { title: "HF / VHF / UHF", desc: "Sistemas de radiocomunicación profesional en bandas reguladas." },
        { title: "NAVTEX", desc: "Sistemas de transmisión marítima para seguridad y avisos a la navegación." },
      ],
    },
    projects: {
      title: "Sistemas que llevan la señal más lejos.",
      items: [
        { title: "STL / ENLACES", subtitle: "Enlaces de transporte de alta estabilidad", image: projStl },
        { title: "TRANSMISIÓN", subtitle: "Plantas transmisoras integradas de alta potencia", image: capTransmission },
        { title: "RADIODIFUSIÓN", subtitle: "Modernización de sistemas de emisión comercial", image: capBroadcast },
        { title: "AUTOMATIZACIÓN", subtitle: "Telemetría y control remoto de estaciones", image: capCritical },
        { title: "COMUNICACIONES", subtitle: "Redes de misión crítica y seguridad marítima", image: capAntennas },
        { title: "RF", subtitle: "Laboratorio y calibración de sistemas radiantes", image: capRf },
      ],
    },
    quote: {
      title: "¿Tienes un desafío técnico?",
      body: "Cuéntanos qué necesitas implementar, mejorar o transmitir.",
      cta: "Solicitar asesoría",
    },
    contact: {
      title: "Hablemos de tu próximo sistema.",
      address: "Blanco Viel 1108, 2º piso, San Miguel, Santiago, Chile",
      phone: "+56 9 8386 4148",
      email: "sender@sender.cl",
      secondaryEmail: "bis.ltda@gmail.com",
      form: {
        name: "Nombre completo",
        company: "Empresa / Organización",
        email: "Correo electrónico",
        type: "Tipo de requerimiento",
        types: [
          "Transmisores AM / FM",
          "Enlaces STL",
          "Sistemas de Antenas",
          "Comunicaciones HF / VHF / UHF",
          "NAVTEX / Misión Crítica",
          "Servicio Técnico / Asesoría",
        ],
        message: "Describe tu proyecto o desafío técnico",
        submit: "Enviar mensaje",
        submitting: "Enviando...",
        success: "Mensaje listo para enviar. Redirigiendo a tu cliente de correo...",
      },
    },
    footer: {
      tagline: "Engineering the Signal",
      location: "Santiago · Chile · Latam",
      rights: "Todos los derechos reservados.",
    },
  },
  en: {
    nav: {
      home: "HOME",
      about: "ABOUT",
      engineering: "ENGINEERING",
      products: "PRODUCTS",
      projects: "PROJECTS",
      contact: "CONTACT",
    },
    hero: {
      eyebrow: "ENGINEERING THE SIGNAL",
      title: "SENDER",
      description: "RF engineering, broadcasting and transmission systems.",
      location: "CHILE · LATAM",
      cta: "Request consultation",
      hint: "Scroll or press ↑ / ↓ keys to scrub video",
    },
    about: {
      label: "ABOUT US",
      title: "Engineering that understands the signal.",
      body: "We are a Chilean company specialized in telecommunications, broadcasting and RF engineering, with more than 20 years of experience.",
      secondary: "We design, develop and implement solutions for professional transmission and communication systems across Chile and Latin America.",
      stats: [
        { value: "20+", label: "Years of experience" },
        { value: "100%", label: "National coverage" },
        { value: "24/7", label: "Critical operation" },
        { value: "RF", label: "Technical precision" },
      ],
    },
    process: {
      title: "From the need to the system.",
      note: "Four stages, one complete solution.",
    },
    processCards: [
      { num: "01", label: "DIAGNOSIS", desc: "Understand the technical and operational requirement." },
      { num: "02", label: "ENGINEERING", desc: "Design the solution and its components." },
      { num: "03", label: "IMPLEMENTATION", desc: "Integrate, install and commission the system." },
      { num: "04", label: "SUPPORT", desc: "Support the system throughout its operation." },
    ],
    products: {
      title: "Technology built to transmit with precision.",
      items: [
        { title: "AM TRANSMITTERS", desc: "High-efficiency solid-state equipment built for continuous reliability." },
        { title: "FM TRANSMITTERS", desc: "High-fidelity modulation systems for professional broadcasting." },
        { title: "STL / LINKS", desc: "Digital and analog point-to-point studio-to-transmitter links." },
        { title: "AUDIO PROCESSING", desc: "Dynamic control, equalization, and broadcast signal conditioning." },
        { title: "ANTENNAS", desc: "Radiating systems engineered for optimal pattern and coverage." },
        { title: "AUTOMATION", desc: "Remote monitoring, telemetry, and automated redundant switching." },
        { title: "HF / VHF / UHF", desc: "Professional radio communication systems in regulated bands." },
        { title: "NAVTEX", desc: "Maritime transmission systems for navigational safety and warnings." },
      ],
    },
    projects: {
      title: "Systems that carry the signal farther.",
      items: [
        { title: "STL / LINKS", subtitle: "High-stability transmission link networks", image: projStl },
        { title: "TRANSMISSION", subtitle: "Integrated high-power transmitter facilities", image: capTransmission },
        { title: "BROADCASTING", subtitle: "Commercial broadcast facility upgrades", image: capBroadcast },
        { title: "AUTOMATION", subtitle: "Station telemetry and remote operations", image: capCritical },
        { title: "COMMUNICATIONS", subtitle: "Mission-critical radio and maritime safety networks", image: capAntennas },
        { title: "RF", subtitle: "Laboratory measurements and antenna tuning", image: capRf },
      ],
    },
    quote: {
      title: "Have a technical challenge?",
      body: "Tell us what you need to implement, improve or transmit.",
      cta: "Request consultation",
    },
    contact: {
      title: "Let's talk about your next system.",
      address: "Blanco Viel 1108, 2º piso, San Miguel, Santiago, Chile",
      phone: "+56 9 8386 4148",
      email: "sender@sender.cl",
      secondaryEmail: "bis.ltda@gmail.com",
      form: {
        name: "Full name",
        company: "Company / Organization",
        email: "Email address",
        type: "Project requirement",
        types: [
          "AM / FM Transmitters",
          "STL Links",
          "Antenna Systems",
          "HF / VHF / UHF Communications",
          "NAVTEX / Mission Critical",
          "Technical Support / Consultation",
        ],
        message: "Describe your project or technical challenge",
        submit: "Send inquiry",
        submitting: "Sending...",
        success: "Message prepared. Opening your email client...",
      },
    },
    footer: {
      tagline: "Engineering the Signal",
      location: "Santiago · Chile · Latam",
      rights: "All rights reserved.",
    },
  },
} as const;

export type SiteLanguage = "es" | "en";
export type SiteContent = typeof siteContent.es;
