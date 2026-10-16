import type { B } from "@/i18n";
import type { ServiceSlug } from "./services";
import hero from "@/assets/hero.jpg";
import geo from "@/assets/ind-geothermal.jpg";
import mining from "@/assets/ind-mining.jpg";
import construction from "@/assets/svc-construction.jpg";
import fabrication from "@/assets/svc-fabrication.jpg";
import tank from "@/assets/svc-tank.jpg";
import coating from "@/assets/svc-coating.jpg";
import surface from "@/assets/svc-surface.jpg";

export interface Industry { key: string; image: string; name: B; text: B; services: ServiceSlug[] }

export const industries: Industry[] = [
  { key: "oil-gas", image: tank, name: { id: "Minyak & Gas", en: "Oil & Gas" }, text: { id: "Perlindungan korosi dan pemeliharaan untuk tangki, perpipaan, dan struktur fasilitas.", en: "Corrosion protection and maintenance for tanks, piping, and facility structures." }, services: ["protective-coating", "tank-pipeline-maintenance"] },
  { key: "geothermal", image: geo, name: { id: "Panas Bumi", en: "Geothermal" }, text: { id: "Dukungan coating dan fabrikasi untuk aset di lingkungan suhu tinggi dan korosif.", en: "Coating and fabrication support for assets in high-temperature, corrosive environments." }, services: ["protective-coating", "steel-fabrication"] },
  { key: "mining", image: mining, name: { id: "Pertambangan & Mineral", en: "Mining & Minerals" }, text: { id: "Struktur baja, conveyor, dan perlindungan permukaan untuk peralatan tambang.", en: "Steel structures, conveyors, and surface protection for mining equipment." }, services: ["steel-fabrication", "surface-preparation"] },
  { key: "power", image: construction, name: { id: "Pembangkit Listrik", en: "Power Generation" }, text: { id: "Pemeliharaan struktur dan coating pada fasilitas pembangkit.", en: "Structural maintenance and coating at power facilities." }, services: ["industrial-construction", "protective-coating"] },
  { key: "petrochemical", image: hero, name: { id: "Petrokimia & Proses Kimia", en: "Petrochemical & Chemical Processing" }, text: { id: "Sistem perlindungan untuk aset di lingkungan proses kimia.", en: "Protective systems for assets in chemical process environments." }, services: ["protective-coating", "tank-pipeline-maintenance"] },
  { key: "manufacturing", image: fabrication, name: { id: "Manufaktur", en: "Manufacturing" }, text: { id: "Fabrikasi dan pengecatan industri untuk fasilitas produksi.", en: "Fabrication and industrial painting for production facilities." }, services: ["steel-fabrication", "protective-coating"] },
  { key: "infrastructure", image: surface, name: { id: "Infrastruktur", en: "Infrastructure" }, text: { id: "Persiapan permukaan dan coating untuk struktur baja infrastruktur.", en: "Surface preparation and coating for infrastructure steelwork." }, services: ["surface-preparation", "protective-coating"] },
  { key: "epc", image: coating, name: { id: "Fasilitas Industri & Proyek EPC", en: "Industrial Facilities & EPC Projects" }, text: { id: "Paket pekerjaan terintegrasi untuk mendukung kontraktor EPC.", en: "Integrated work packages supporting EPC contractors." }, services: ["industrial-construction", "steel-fabrication"] },
];
