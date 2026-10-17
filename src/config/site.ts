/**
 * Central business configuration. Replace null values with VERIFIED company data.
 * Components show setup notices while a value is null — never fake data.
 */
export const siteConfig = {
  brand: "PT. NAFAZ SANDBLASTING INDONESIA",
  siteUrl: "https://id-preview--987b7029-d0d3-448f-89c5-930a858a0721.lovable.app",
  legalName: null as string | null,
  yearEstablished: null as string | null,
  address: "Jalan Mutiara Raya No. 78, Suci, Gresik 61151" as string | null,
  /** International format, digits only, e.g. "6281234567890" */
  whatsappNumber: "6281556816780" as string | null,
  contactEmail: "nafazblastingindonesia@nafaz-bi.com" as string | null,
  phone: "+62 815 5681 6780" as string | null,
  operatingHours: null as { id: string; en: string } | null,
  registration: null as string | null,
  /** URL to the official company profile PDF */
  companyProfilePdf: null as string | null,
  companyProfileUpdated: null as string | null,
  social: [] as { label: string; href: string }[],
  /** Verified certifications only, with evidence on file */
  certifications: [] as { name: string; issuer: string; validUntil?: string }[],
};

export function whatsappLink(lang: "id" | "en", service?: string): string | null {
  if (!siteConfig.whatsappNumber) return null;
  const s = service ?? (lang === "id" ? "[nama layanan]" : "[service name]");
  const msg =
    lang === "id"
      ? `Halo PT. NAFAZ SANDBLASTING INDONESIA, saya ingin berkonsultasi mengenai kebutuhan proyek industri. Layanan yang saya butuhkan adalah ${s}. Mohon informasi lebih lanjut.`
      : `Hello PT. NAFAZ SANDBLASTING INDONESIA, I would like to discuss an industrial project. The service I am interested in is ${s}. Please provide further information.`;
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}
