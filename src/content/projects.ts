import type { B, BList } from "@/i18n";
import type { ServiceSlug } from "./services";
import surface from "@/assets/svc-surface.jpg";
import coating from "@/assets/svc-coating.jpg";
import fabrication from "@/assets/svc-fabrication.jpg";
import construction from "@/assets/svc-construction.jpg";
import tank from "@/assets/svc-tank.jpg";

/**
 * SAMPLE records for layout development only. `sample: true` renders a visible
 * "Sample content" label. Replace with verified, client-approved projects.
 */
export interface Project {
  slug: string;
  sample: boolean;
  title: B;
  category: ServiceSlug;
  industry: B;
  client?: string;
  location?: string;
  year?: string;
  description: B;
  scope: BList;
  cover: string;
  gallery: string[];
  beforeAfter?: { before: string; after: string };
}

export const projects: Project[] = [
  {
    slug: "sample-tank-recoating", sample: true, category: "tank-pipeline-maintenance", cover: tank, gallery: [tank, coating],
    title: { id: "Contoh: Recoating Tangki Penyimpanan", en: "Sample: Storage Tank Recoating" },
    industry: { id: "Minyak & Gas", en: "Oil & Gas" },
    description: { id: "Contoh tata letak untuk proyek pemeliharaan tangki. Bukan proyek nyata.", en: "Layout example for a tank maintenance project. Not an actual project." },
    scope: { id: ["Persiapan permukaan", "Aplikasi sistem coating", "Dokumentasi inspeksi"], en: ["Surface preparation", "Coating system application", "Inspection documentation"] },
    beforeAfter: { before: surface, after: coating },
  },
  {
    slug: "sample-structural-fabrication", sample: true, category: "steel-fabrication", cover: fabrication, gallery: [fabrication, construction],
    title: { id: "Contoh: Fabrikasi Platform Baja", en: "Sample: Steel Platform Fabrication" },
    industry: { id: "Manufaktur", en: "Manufacturing" },
    description: { id: "Contoh tata letak untuk proyek fabrikasi. Bukan proyek nyata.", en: "Layout example for a fabrication project. Not an actual project." },
    scope: { id: ["Fabrikasi platform", "Pemeriksaan dimensi"], en: ["Platform fabrication", "Dimensional checks"] },
  },
  {
    slug: "sample-blasting-structure", sample: true, category: "surface-preparation", cover: surface, gallery: [surface],
    title: { id: "Contoh: Abrasive Blasting Struktur", en: "Sample: Structural Abrasive Blasting" },
    industry: { id: "Infrastruktur", en: "Infrastructure" },
    description: { id: "Contoh tata letak untuk proyek persiapan permukaan. Bukan proyek nyata.", en: "Layout example for a surface preparation project. Not an actual project." },
    scope: { id: ["Abrasive blasting", "Pembersihan permukaan"], en: ["Abrasive blasting", "Surface cleaning"] },
  },
  {
    slug: "sample-steel-erection", sample: true, category: "industrial-construction", cover: construction, gallery: [construction, fabrication],
    title: { id: "Contoh: Ereksi Struktur Baja", en: "Sample: Steel Structure Erection" },
    industry: { id: "Pembangkit Listrik", en: "Power Generation" },
    description: { id: "Contoh tata letak untuk proyek konstruksi. Bukan proyek nyata.", en: "Layout example for a construction project. Not an actual project." },
    scope: { id: ["Instalasi struktur baja", "Dokumentasi konstruksi"], en: ["Steel structure installation", "Construction documentation"] },
  },
  {
    slug: "sample-pipe-rack-coating", sample: true, category: "protective-coating", cover: coating, gallery: [coating, tank],
    title: { id: "Contoh: Coating Pipe Rack", en: "Sample: Pipe Rack Coating" },
    industry: { id: "Petrokimia", en: "Petrochemical" },
    description: { id: "Contoh tata letak untuk proyek coating. Bukan proyek nyata.", en: "Layout example for a coating project. Not an actual project." },
    scope: { id: ["Maintenance painting", "Pengukuran DFT"], en: ["Maintenance painting", "DFT measurement"] },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
