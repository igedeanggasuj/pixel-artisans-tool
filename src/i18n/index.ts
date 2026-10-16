import { useParams } from "@tanstack/react-router";

export const LANGS = ["id", "en"] as const;
export type Lang = (typeof LANGS)[number];
export type B = { id: string; en: string };
export type BList = { id: string[]; en: string[] };

export const isLang = (v: unknown): v is Lang => v === "id" || v === "en";

export function useLang(): Lang {
  const p = useParams({ strict: false }) as { lang?: string };
  return isLang(p.lang) ? p.lang : "id";
}

export const ui = {
  nav: {
    home: { id: "Beranda", en: "Home" },
    about: { id: "Tentang Kami", en: "About Us" },
    services: { id: "Layanan", en: "Services" },
    projects: { id: "Proyek", en: "Projects" },
    industries: { id: "Industri", en: "Industries" },
    hse: { id: "HSE & Mutu", en: "HSE & Quality" },
    contact: { id: "Kontak", en: "Contact" },
    profile: { id: "Company Profile", en: "Company Profile" },
    privacy: { id: "Kebijakan Privasi", en: "Privacy Policy" },
  },
  cta: {
    quote: { id: "Minta Penawaran", en: "Request a Quotation" },
    explore: { id: "Jelajahi Layanan", en: "Explore Our Services" },
    contactTeam: { id: "Hubungi Tim Kami", en: "Contact Our Team" },
    discover: { id: "Kenali GANDUSTECHNO", en: "Discover GANDUSTECHNO" },
    viewProjects: { id: "Lihat Semua Proyek", en: "View All Projects" },
    learnMore: { id: "Selengkapnya", en: "Learn more" },
    whatsapp: { id: "WhatsApp", en: "WhatsApp" },
    download: { id: "Unduh PDF", en: "Download PDF" },
  },
  tagline: { id: "Solusi Industri untuk Perlindungan dan Kinerja Jangka Panjang.", en: "Engineered for Protection. Built for Performance." },
  positioning: {
    id: "Solusi terintegrasi untuk persiapan permukaan, perlindungan korosi, fabrikasi baja, dan konstruksi industri.",
    en: "Integrated industrial solutions for surface preparation, corrosion protection, steel fabrication, and industrial construction.",
  },
  sample: { id: "Contoh konten", en: "Sample content" },
  setup: { id: "Perlu konfigurasi", en: "Setup required" },
  finalCta: {
    title: { id: "Mari Diskusikan Kebutuhan Proyek Industri Anda.", en: "Let's Discuss Your Next Industrial Project." },
    body: {
      id: "Sampaikan lingkup proyek, kebutuhan teknis, dan jadwal Anda. Tim kami akan meninjau permintaan Anda dan mengoordinasikan langkah selanjutnya.",
      en: "Tell us about your project scope, technical requirements, and timeline. Our team will review your inquiry and coordinate the next steps.",
    },
  },
};

export const tr = (b: B, lang: Lang) => b[lang];
