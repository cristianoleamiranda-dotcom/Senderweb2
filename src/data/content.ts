import heroWide from "../assets/hero-wide.jpg";
import heroTall from "../assets/hero.jpg";
import capRf from "../assets/cap-rf.jpg";
import capBroadcast from "../assets/cap-broadcast.jpg";
import capAntennas from "../assets/cap-antennas.jpg";
import capTransmission from "../assets/cap-transmission.jpg";
import capCritical from "../assets/cap-critical.jpg";
import projAm from "../assets/proj-am.jpg";
import projStl from "../assets/proj-stl.jpg";
import aboutImg from "../assets/about.jpg";

export type Lang = "es" | "en";

export const company = {
  name: "Sender",
  tagline: "Engineering the Signal",
  phone: "+56 9 8386 4148",
  phoneHref: "tel:+56983864148",
  whatsapp: "https://wa.me/56983864148?text=Hola%2C%20quiero%20iniciar%20un%20proyecto%20con%20Sender",
  emails: ["sender@sender.cl", "bis.ltda@gmail.com"],
  address: "Blanco Viel 1108, 2º piso, San Miguel, Santiago, Chile",
  mapsHref: "https://maps.google.com/?q=Blanco+Viel+1108,+San+Miguel,+Santiago,+Chile",
  youtube: "https://www.youtube.com/watch?v=cyZuM043i74",
};

export const images = {
  heroWide,
  heroTall,
  capRf,
  capBroadcast,
  capAntennas,
  capTransmission,
  capCritical,
  projAm,
  projStl,
  aboutImg,
};

export interface Capability {
  id: string;
  index: string;
  title: string;
  description: string;
  specs: string[];
  image: string;
  alt: string;
}

export interface Project {
  id: string;
  index: string;
  category: string;
  name: string;
  location: string;
  technology: string;
  year: string;
  summary: string;
  image: string;
  alt: string;
}

export interface Band {
  code: string;
  range: string;
  use: string;
}

export interface ProcessStep {
  index: string;
  title: string;
  text: string;
}

export interface Stat {
  value: string;
  label: string;
  verified: boolean;
}

export interface SiteContent {
  nav: { solutions: string; projects: string; technology: string; about: string; contact: string; cta: string };
  hero: { kicker: string; title: [string, string]; subtitle: string; primary: string; secondary: string; scroll: string; meta: string[] };
  manifesto: { title: [string, string]; body: [string, string] };
  capabilities: { kicker: string; title: string; intro: string; items: Capability[]; hover: string };
  projects: { kicker: string; title: string; subtitle: string; view: string; labels: { location: string; technology: string; year: string }; items: Project[] };
  technology: { kicker: string; title: [string, string]; intro: string; bands: Band[]; note: string };
  process: { kicker: string; title: [string, string]; intro: string; steps: ProcessStep[] };
  experience: { kicker: string; title: [string, string]; intro: string; stats: Stat[]; footnote: string; reach: [string, string] };
  about: { kicker: string; title: [string, string]; lead: string; paragraphs: string[]; pillars: { k: string; v: string }[]; mission: string };
  contact: { kicker: string; title: [string, string]; sub: string; cta: string; form: { name: string; company: string; email: string; type: string; message: string; submit: string; sent: string; types: string[] }; direct: string; whatsapp: string };
  footer: { tagline: string; nav: string; reach: string; channels: string; legal: string; back: string };
}

const es: SiteContent = {
  nav: { solutions: "Soluciones", projects: "Proyectos", technology: "Tecnología", about: "Nosotros", contact: "Contacto", cta: "Contactar" },
  hero: {
    kicker: "Ingeniería RF · Radiodifusión · Comunicaciones críticas",
    title: ["ENGINEERING", "THE SIGNAL"],
    subtitle: "Ingeniería, transmisión y tecnología para radiodifusión, telecomunicaciones y comunicaciones críticas.",
    primary: "Explorar Sender",
    secondary: "Iniciar un proyecto",
    scroll: "Scroll to explore",
    meta: ["Santiago, Chile", "20+ años", "AM · FM · HF · VHF · UHF · NAVTEX"],
  },
  manifesto: {
    title: ["THE SIGNAL", "MUST GO THROUGH."],
    body: [
      "Cuando la comunicación es crítica, la confiabilidad no es opcional.",
      "Diseñamos e implementamos tecnología desarrollada para funcionar donde realmente importa.",
    ],
  },
  capabilities: {
    kicker: "03 — Capacidades",
    title: "WHAT WE ENGINEER",
    intro: "Cinco áreas de ingeniería. Una sola disciplina: que la señal llegue donde tiene que llegar.",
    hover: "Ver área",
    items: [
      {
        id: "rf-engineering", index: "01", title: "RF ENGINEERING",
        description: "Ingeniería y desarrollo de soluciones RF.",
        specs: ["Amplificación clase D", "Modulación PWM", "Módulos y circuitos RF", "Condensadores de alta potencia", "Unidades de sintonía ATU"],
        image: capRf, alt: "Módulo amplificador RF de estado sólido con transistores y bobinas de cobre",
      },
      {
        id: "broadcast", index: "02", title: "BROADCAST",
        description: "Soluciones para radiodifusión profesional.",
        specs: ["Transmisores AM 1 – 10 kW", "Transmisores FM 50 W – 1 kW", "Enlaces estudio–planta", "Procesadores de audio", "Operación continua 24/7"],
        image: capBroadcast, alt: "Sala de transmisión con racks de transmisores de radiodifusión",
      },
      {
        id: "antennas", index: "03", title: "ANTENNAS",
        description: "Diseño, fabricación e implementación de antenas.",
        specs: ["Monopolo AM 510 – 1700 kHz", "HF 2 – 30 MHz · 1 kW", "Yagi VHF 134 – 174 MHz", "Antenas MF NAVTEX", "Torres contraventadas galvanizadas"],
        image: capAntennas, alt: "Torre de telecomunicaciones con arreglo de antenas FM y Yagi VHF",
      },
      {
        id: "transmission-systems", index: "04", title: "TRANSMISSION SYSTEMS",
        description: "Sistemas de transmisión y distribución.",
        specs: ["Sistemas radiantes completos", "Líneas coaxiales 1/2″ Super Flex · LMR-400", "Acoplamiento y sintonía", "Monitoreo y control remoto", "Integración de planta"],
        image: capTransmission, alt: "Base aislada de torre AM con línea de alimentación y unidad de sintonía",
      },
      {
        id: "critical-communications", index: "05", title: "CRITICAL COMMUNICATIONS",
        description: "Infraestructura para comunicaciones críticas.",
        specs: ["Sistemas NAVTEX 490 / 518 kHz", "Software de automatización propio", "Seguridad marítima y defensa", "Alarmas y telemetría en tiempo real", "Protecciones integradas"],
        image: capCritical, alt: "Estación costera de radio con mástil monopolo entre la niebla marina",
      },
    ],
  },
  projects: {
    kicker: "04 — Proyectos",
    title: "ENGINEERED PROJECTS",
    subtitle: "Technology in the field.",
    view: "Ver proyecto",
    labels: { location: "Ubicación", technology: "Tecnología", year: "Año" },
    items: [
      {
        id: "navtex-mf", index: "01", category: "CRITICAL COMMUNICATIONS",
        name: "Sistema NAVTEX 490 / 518 kHz",
        location: "[UBICACIÓN]",
        technology: "Transmisión MF · Sistema radiante · Automatización",
        year: "[AÑO]",
        summary: "Antena MF y transmisión NAVTEX diseñadas para operación confiable en entornos marítimos y de defensa. Unidad de potencia y control, software de automatización y monitoreo remoto.",
        image: capCritical, alt: "Estación de transmisión NAVTEX en la costa",
      },
      {
        id: "am-solid-state", index: "02", category: "BROADCAST INFRASTRUCTURE",
        name: "Transmisores AM Serie SENDER SS",
        location: "[UBICACIÓN]",
        technology: "Estado sólido · Clase D · PWM · 1 – 10 kW",
        year: "[AÑO]",
        summary: "Serie de transmisores AM de estado sólido con arquitectura modular, 490 – 1700 kHz, estabilidad ±5 Hz y operación continua 24/7 para banda media.",
        image: projAm, alt: "Gabinete de transmisor AM de estado sólido",
      },
      {
        id: "stl-links", index: "03", category: "RF SYSTEM",
        name: "Enlaces Estudio–Planta AM / FM",
        location: "[UBICACIÓN]",
        technology: "STL VHF/UHF · Yagi 134 – 174 MHz · Hasta 10 W",
        year: "[AÑO]",
        summary: "Enlaces STAL-200 y AL-100 con encendido remoto, operación Mono/MPX y antenas Yagi en aluminio 6162 para operación continua en ambientes exigentes.",
        image: projStl, alt: "Antena Yagi de enlace sobre azotea con vista a Santiago",
      },
      {
        id: "antenna-systems", index: "04", category: "ANTENNA SYSTEM",
        name: "Sistemas de Antena AM / HF",
        location: "[UBICACIÓN]",
        technology: "Monopolo AM · HF 2 – 30 MHz · Torres contraventadas",
        year: "[AÑO]",
        summary: "Sistemas monopolo de mayor ancho de banda y eficiencia, con torre aterrizada y protección contra descargas. Antenas HF profesionales de 1 kW.",
        image: capAntennas, alt: "Torre galvanizada con sistema de antenas",
      },
    ],
  },
  technology: {
    kicker: "05 — Tecnología",
    title: ["THE TECHNOLOGY", "BEHIND THE SIGNAL"],
    intro: "Del espectro de onda media a la banda UHF. Cada frecuencia exige una física distinta, una antena distinta y una ingeniería distinta.",
    bands: [
      { code: "AM", range: "490 – 1700 kHz", use: "Radiodifusión en banda media · Transmisores SS · Monopolos" },
      { code: "FM", range: "87.5 – 108 MHz", use: "Radiodifusión FM · 50 W a 1 kW · PLL digital" },
      { code: "HF", range: "2 – 30 MHz", use: "Antenas HF profesionales · 1 kW · Largo alcance" },
      { code: "VHF", range: "134 – 174 MHz", use: "Enlaces estudio–planta · Yagi 3 a 7 elementos" },
      { code: "UHF", range: "Enlaces UHF", use: "Enlaces de radiodifusión · Antenas direccionales" },
      { code: "NAVTEX", range: "490 / 518 kHz", use: "Seguridad marítima · Automatización · Telemetría" },
    ],
    note: "Rangos según líneas de producto publicadas por Sender.",
  },
  process: {
    kicker: "06 — Proceso",
    title: ["FROM IDEA", "TO SIGNAL"],
    intro: "Sender no comercializa productos. Participa en cada etapa del sistema.",
    steps: [
      { index: "01", title: "DESIGN", text: "Análisis del requerimiento, frecuencia, cobertura y entorno. Definición de arquitectura de sistema." },
      { index: "02", title: "ENGINEERING", text: "Ingeniería RF, cálculo de sistemas radiantes, acoplamiento, protecciones y automatización." },
      { index: "03", title: "MANUFACTURING", text: "Fabricación de transmisores, antenas y módulos RF con arquitectura modular de alta eficiencia." },
      { index: "04", title: "INSTALLATION", text: "Implementación en terreno: torres, sistemas radiantes, líneas de transmisión y puesta en marcha." },
      { index: "05", title: "SUPPORT", text: "Soporte técnico, monitoreo remoto, mantenimiento preventivo y continuidad operacional." },
    ],
  },
  experience: {
    kicker: "07 — Experiencia",
    title: ["PROVEN", "IN THE FIELD"],
    intro: "Dos décadas diseñando, fabricando e implementando sistemas de transmisión.",
    stats: [
      { value: "20+", label: "Años de experiencia", verified: true },
      { value: "[XX]+", label: "Proyectos", verified: false },
      { value: "[XX]+", label: "Sistemas implementados", verified: false },
      { value: "6", label: "Bandas de operación", verified: true },
    ],
    footnote: "Los valores entre corchetes son campos editables pendientes de verificación.",
    reach: ["CHILE", "INTERNATIONAL"],
  },
  about: {
    kicker: "08 — Nosotros",
    title: ["ENGINEERING", "WITH PURPOSE"],
    lead: "Sender es una empresa chilena de ingeniería en telecomunicaciones y radiodifusión. Más de 20 años desarrollando equipamiento RF, antenas y sistemas de transmisión para proyectos en Chile y el extranjero.",
    paragraphs: [
      "Desarrollamos y suministramos tecnología propia: transmisores AM de estado sólido, transmisores FM, sistemas NAVTEX con software de automatización, antenas AM/FM/HF/MF y torres de telecomunicaciones.",
      "Cada sistema se diseña para operar de forma continua en entornos exigentes: plantas transmisoras, estaciones costeras, infraestructura de seguridad marítima y defensa.",
    ],
    pillars: [
      { k: "Especialización", v: "Ingeniería RF, broadcasting y sistemas de transmisión" },
      { k: "Fabricación", v: "Transmisores, antenas y módulos RF de desarrollo propio" },
      { k: "Implementación", v: "Instalación y soporte técnico en terreno" },
      { k: "Alcance", v: "Chile y proyectos internacionales" },
    ],
    mission: "Desarrollar tecnología y soluciones en telecomunicaciones adaptadas a las necesidades de cada cliente, aportando innovación y soporte técnico en radiodifusión y sistemas de comunicación.",
  },
  contact: {
    kicker: "09 — Contacto",
    title: ["HAVE A SIGNAL", "TO SOLVE?"],
    sub: "Let's engineer it.",
    cta: "Start a project",
    form: {
      name: "Nombre", company: "Empresa", email: "Email", type: "Tipo de proyecto", message: "Mensaje",
      submit: "Enviar solicitud",
      sent: "Solicitud registrada. Te contactaremos en horario laboral.",
      types: ["Radiodifusión AM", "Radiodifusión FM", "Sistema NAVTEX", "Antenas / Torres", "Enlaces STL", "Comunicaciones críticas", "Otro"],
    },
    direct: "Contacto directo",
    whatsapp: "Cotizar por WhatsApp",
  },
  footer: {
    tagline: "Engineering the Signal",
    nav: "Navegación",
    reach: "Alcance",
    channels: "Canales",
    legal: "Sender · Telecomunicaciones y radiodifusión · Santiago, Chile",
    back: "Volver arriba",
  },
};

const en: SiteContent = {
  nav: { solutions: "Solutions", projects: "Projects", technology: "Technology", about: "About", contact: "Contact", cta: "Contact" },
  hero: {
    kicker: "RF Engineering · Broadcast · Critical Communications",
    title: ["ENGINEERING", "THE SIGNAL"],
    subtitle: "Engineering, transmission and technology for broadcasting, telecommunications and critical communications.",
    primary: "Explore Sender",
    secondary: "Start a project",
    scroll: "Scroll to explore",
    meta: ["Santiago, Chile", "20+ years", "AM · FM · HF · VHF · UHF · NAVTEX"],
  },
  manifesto: {
    title: ["THE SIGNAL", "MUST GO THROUGH."],
    body: [
      "When communication is critical, reliability is not optional.",
      "We design and deploy technology built to work where it truly matters.",
    ],
  },
  capabilities: {
    kicker: "03 — Capabilities",
    title: "WHAT WE ENGINEER",
    intro: "Five engineering areas. One discipline: the signal reaches where it has to.",
    hover: "View area",
    items: [
      {
        id: "rf-engineering", index: "01", title: "RF ENGINEERING",
        description: "Engineering and development of RF solutions.",
        specs: ["Class D amplification", "PWM modulation", "RF modules & circuits", "High-power capacitors", "Antenna tuning units (ATU)"],
        image: capRf, alt: "Solid-state RF amplifier module with transistors and copper coils",
      },
      {
        id: "broadcast", index: "02", title: "BROADCAST",
        description: "Solutions for professional broadcasting.",
        specs: ["AM transmitters 1 – 10 kW", "FM transmitters 50 W – 1 kW", "Studio–transmitter links", "Audio processors", "24/7 continuous operation"],
        image: capBroadcast, alt: "Transmitter hall with broadcast equipment racks",
      },
      {
        id: "antennas", index: "03", title: "ANTENNAS",
        description: "Design, manufacturing and deployment of antennas.",
        specs: ["AM monopole 510 – 1700 kHz", "HF 2 – 30 MHz · 1 kW", "VHF Yagi 134 – 174 MHz", "MF NAVTEX antennas", "Galvanized guyed towers"],
        image: capAntennas, alt: "Telecommunications tower with FM array and VHF Yagi antennas",
      },
      {
        id: "transmission-systems", index: "04", title: "TRANSMISSION SYSTEMS",
        description: "Transmission and distribution systems.",
        specs: ["Complete radiating systems", "Coax 1/2″ Super Flex · LMR-400", "Matching & tuning", "Remote monitoring & control", "Plant integration"],
        image: capTransmission, alt: "Insulated AM tower base with feed line and tuning unit",
      },
      {
        id: "critical-communications", index: "05", title: "CRITICAL COMMUNICATIONS",
        description: "Infrastructure for critical communications.",
        specs: ["NAVTEX systems 490 / 518 kHz", "In-house automation software", "Maritime safety & defense", "Real-time alarms & telemetry", "Integrated protections"],
        image: capCritical, alt: "Coastal radio station with monopole mast in sea fog",
      },
    ],
  },
  projects: {
    kicker: "04 — Projects",
    title: "ENGINEERED PROJECTS",
    subtitle: "Technology in the field.",
    view: "View project",
    labels: { location: "Location", technology: "Technology", year: "Year" },
    items: [
      {
        id: "navtex-mf", index: "01", category: "CRITICAL COMMUNICATIONS",
        name: "NAVTEX System 490 / 518 kHz",
        location: "[LOCATION]",
        technology: "MF transmission · Radiating system · Automation",
        year: "[YEAR]",
        summary: "MF antenna and NAVTEX transmission designed for reliable operation in maritime and defense environments. Power & control unit, automation software and remote monitoring.",
        image: capCritical, alt: "NAVTEX transmission station on the coast",
      },
      {
        id: "am-solid-state", index: "02", category: "BROADCAST INFRASTRUCTURE",
        name: "AM Transmitters SENDER SS Series",
        location: "[LOCATION]",
        technology: "Solid state · Class D · PWM · 1 – 10 kW",
        year: "[YEAR]",
        summary: "Solid-state AM transmitter series with modular architecture, 490 – 1700 kHz, ±5 Hz stability and 24/7 continuous operation for the medium-wave band.",
        image: projAm, alt: "Solid-state AM transmitter cabinet",
      },
      {
        id: "stl-links", index: "03", category: "RF SYSTEM",
        name: "Studio–Transmitter Links AM / FM",
        location: "[LOCATION]",
        technology: "VHF/UHF STL · Yagi 134 – 174 MHz · Up to 10 W",
        year: "[YEAR]",
        summary: "STAL-200 and AL-100 links with remote transmitter start, Mono/MPX operation and 6162 aluminum Yagi antennas for continuous operation in demanding environments.",
        image: projStl, alt: "Yagi link antenna on a rooftop overlooking Santiago",
      },
      {
        id: "antenna-systems", index: "04", category: "ANTENNA SYSTEM",
        name: "AM / HF Antenna Systems",
        location: "[LOCATION]",
        technology: "AM monopole · HF 2 – 30 MHz · Guyed towers",
        year: "[YEAR]",
        summary: "Monopole systems with wider bandwidth and higher efficiency, grounded tower and lightning protection. Professional 1 kW HF antennas.",
        image: capAntennas, alt: "Galvanized tower with antenna system",
      },
    ],
  },
  technology: {
    kicker: "05 — Technology",
    title: ["THE TECHNOLOGY", "BEHIND THE SIGNAL"],
    intro: "From the medium-wave spectrum to UHF. Every frequency demands a different physics, a different antenna and a different engineering.",
    bands: [
      { code: "AM", range: "490 – 1700 kHz", use: "Medium-wave broadcasting · SS transmitters · Monopoles" },
      { code: "FM", range: "87.5 – 108 MHz", use: "FM broadcasting · 50 W to 1 kW · Digital PLL" },
      { code: "HF", range: "2 – 30 MHz", use: "Professional HF antennas · 1 kW · Long range" },
      { code: "VHF", range: "134 – 174 MHz", use: "Studio–transmitter links · 3 to 7-element Yagi" },
      { code: "UHF", range: "UHF links", use: "Broadcast links · Directional antennas" },
      { code: "NAVTEX", range: "490 / 518 kHz", use: "Maritime safety · Automation · Telemetry" },
    ],
    note: "Ranges according to product lines published by Sender.",
  },
  process: {
    kicker: "06 — Process",
    title: ["FROM IDEA", "TO SIGNAL"],
    intro: "Sender does not sell products. It takes part in every stage of the system.",
    steps: [
      { index: "01", title: "DESIGN", text: "Requirement analysis, frequency, coverage and environment. System architecture definition." },
      { index: "02", title: "ENGINEERING", text: "RF engineering, radiating system calculation, matching, protections and automation." },
      { index: "03", title: "MANUFACTURING", text: "Manufacturing of transmitters, antennas and RF modules with high-efficiency modular architecture." },
      { index: "04", title: "INSTALLATION", text: "Field deployment: towers, radiating systems, transmission lines and commissioning." },
      { index: "05", title: "SUPPORT", text: "Technical support, remote monitoring, preventive maintenance and operational continuity." },
    ],
  },
  experience: {
    kicker: "07 — Experience",
    title: ["PROVEN", "IN THE FIELD"],
    intro: "Two decades designing, manufacturing and deploying transmission systems.",
    stats: [
      { value: "20+", label: "Years of experience", verified: true },
      { value: "[XX]+", label: "Projects", verified: false },
      { value: "[XX]+", label: "Systems deployed", verified: false },
      { value: "6", label: "Operating bands", verified: true },
    ],
    footnote: "Bracketed values are editable fields pending verification.",
    reach: ["CHILE", "INTERNATIONAL"],
  },
  about: {
    kicker: "08 — About",
    title: ["ENGINEERING", "WITH PURPOSE"],
    lead: "Sender is a Chilean telecommunications and broadcast engineering company. Over 20 years developing RF equipment, antennas and transmission systems for projects in Chile and abroad.",
    paragraphs: [
      "We develop and supply our own technology: solid-state AM transmitters, FM transmitters, NAVTEX systems with automation software, AM/FM/HF/MF antennas and telecommunications towers.",
      "Every system is designed for continuous operation in demanding environments: transmitter plants, coastal stations, maritime safety and defense infrastructure.",
    ],
    pillars: [
      { k: "Specialization", v: "RF engineering, broadcasting and transmission systems" },
      { k: "Manufacturing", v: "In-house transmitters, antennas and RF modules" },
      { k: "Deployment", v: "Field installation and technical support" },
      { k: "Reach", v: "Chile and international projects" },
    ],
    mission: "To develop telecommunications technology and solutions tailored to each client, bringing innovation and technical support to broadcasting and communication systems.",
  },
  contact: {
    kicker: "09 — Contact",
    title: ["HAVE A SIGNAL", "TO SOLVE?"],
    sub: "Let's engineer it.",
    cta: "Start a project",
    form: {
      name: "Name", company: "Company", email: "Email", type: "Project type", message: "Message",
      submit: "Send request",
      sent: "Request received. We will contact you during business hours.",
      types: ["AM Broadcasting", "FM Broadcasting", "NAVTEX System", "Antennas / Towers", "STL Links", "Critical Communications", "Other"],
    },
    direct: "Direct contact",
    whatsapp: "Quote via WhatsApp",
  },
  footer: {
    tagline: "Engineering the Signal",
    nav: "Navigation",
    reach: "Reach",
    channels: "Channels",
    legal: "Sender · Telecommunications & broadcasting · Santiago, Chile",
    back: "Back to top",
  },
};

export const content: Record<Lang, SiteContent> = { es, en };
