import type { B, BList } from "@/i18n";
import surface from "@/assets/svc-surface.jpg";
import coating from "@/assets/svc-coating.jpg";
import fabrication from "@/assets/svc-fabrication.jpg";
import construction from "@/assets/svc-construction.jpg";
import tank from "@/assets/svc-tank.jpg";

export type ServiceSlug =
  | "surface-preparation"
  | "protective-coating"
  | "steel-fabrication"
  | "industrial-construction"
  | "tank-pipeline-maintenance";

export interface Service {
  slug: ServiceSlug;
  num: string;
  image: string;
  title: B;
  short: B;
  overview: B;
  scope: BList;
  applications: BList;
  methodology: BList;
  quality: BList;
  hse: BList;
  faq: { q: B; a: B }[];
  note?: B;
}

const commonFaq = (svc: B): { q: B; a: B }[] => [
  {
    q: { id: "Bagaimana cara meminta penawaran?", en: "How do I request a quotation?" },
    a: {
      id: `Kirimkan formulir permintaan penawaran dengan lingkup pekerjaan ${svc.id.toLowerCase()}, lokasi, dan jadwal. Tim kami akan meninjau dan menghubungi Anda untuk klarifikasi.`,
      en: `Submit the quotation form with your ${svc.en.toLowerCase()} scope, location, and schedule. Our team will review it and contact you for clarification.`,
    },
  },
  {
    q: { id: "Apakah survei lokasi diperlukan?", en: "Is a site survey required?" },
    a: {
      id: "Untuk sebagian besar pekerjaan, survei lokasi dan evaluasi teknis membantu menetapkan lingkup, metode, dan kebutuhan K3 secara akurat sebelum penawaran final.",
      en: "For most work, a site survey and technical assessment help define scope, method, and HSE requirements accurately before a final quotation.",
    },
  },
  {
    q: { id: "Standar apa yang digunakan?", en: "Which standards apply?" },
    a: {
      id: "Standar dan kriteria penerimaan mengikuti spesifikasi proyek, kontrak, dan prosedur klien yang disetujui.",
      en: "Standards and acceptance criteria follow the project specification, contract, and approved client procedures.",
    },
  },
];

export const services: Service[] = [
  {
    slug: "surface-preparation",
    num: "01",
    image: surface,
    title: { id: "Surface Preparation & Abrasive Blasting", en: "Surface Preparation & Abrasive Blasting" },
    short: { id: "Persiapan permukaan baja dan substrat industri sebelum coating.", en: "Preparing steel and industrial substrates for coating." },
    overview: {
      id: "Layanan persiapan permukaan untuk menyiapkan baja dan substrat industri sebelum aplikasi coating, pemeliharaan, dan perlindungan korosi.",
      en: "Surface preparation services designed to prepare steel and industrial substrates for coating application, maintenance, and corrosion protection.",
    },
    scope: {
      id: ["Abrasive blasting", "Persiapan permukaan mekanis", "Pembersihan permukaan", "Persiapan profil permukaan", "Dukungan inspeksi kebersihan permukaan", "Persiapan untuk sistem coating"],
      en: ["Abrasive blasting", "Mechanical surface preparation", "Surface cleaning", "Surface profile preparation", "Surface cleanliness inspection support", "Preparation for coating systems"],
    },
    applications: {
      id: ["Struktur baja", "Tangki penyimpanan", "Perpipaan", "Peralatan dan support industri"],
      en: ["Steel structures", "Storage tanks", "Piping", "Industrial equipment and supports"],
    },
    methodology: {
      id: ["Peninjauan spesifikasi dan kondisi permukaan", "Persiapan area kerja dan pengendalian debu", "Pelaksanaan blasting atau persiapan mekanis", "Pembersihan dan pemeriksaan sebelum coating"],
      en: ["Review of specification and surface condition", "Work-area preparation and dust control", "Blasting or mechanical preparation", "Cleaning and inspection before coating"],
    },
    quality: {
      id: ["Kriteria kebersihan dan profil sesuai spesifikasi proyek", "Pemantauan kondisi lingkungan", "Catatan inspeksi pekerjaan"],
      en: ["Cleanliness and profile criteria per project specification", "Environmental condition monitoring", "Work inspection records"],
    },
    hse: {
      id: ["Pengendalian bahaya abrasive blasting", "APD pernapasan dan pelindung diri", "Pengelolaan limbah abrasif"],
      en: ["Abrasive blasting hazard controls", "Respiratory and personal protective equipment", "Spent abrasive waste management"],
    },
    faq: [],
    note: {
      id: "Tingkat kebersihan dan profil permukaan yang dicapai mengikuti spesifikasi proyek dan diverifikasi melalui inspeksi.",
      en: "Achieved cleanliness grade and surface profile follow the project specification and are verified through inspection.",
    },
  },
  {
    slug: "protective-coating",
    num: "02",
    image: coating,
    title: { id: "Protective Coating & Industrial Painting", en: "Protective Coating & Industrial Painting" },
    short: { id: "Sistem coating dan pengecatan untuk aset baja industri.", en: "Coating and painting systems for industrial steel assets." },
    overview: {
      id: "Solusi protective coating dan pengecatan industri untuk struktur baja, tangki, perpipaan, dan aset industri.",
      en: "Protective coating and industrial painting solutions for steel structures, tanks, pipelines, and industrial assets.",
    },
    scope: {
      id: ["Aplikasi protective coating", "Pengecatan industri", "Coating struktur baja", "Coating tangki", "Coating perpipaan", "Maintenance painting", "Dukungan inspeksi coating", "Dukungan pengukuran DFT"],
      en: ["Protective coating application", "Industrial painting", "Steel structure coating", "Tank coating", "Pipeline coating", "Maintenance painting", "Coating inspection support", "Dry film thickness measurement support"],
    },
    applications: {
      id: ["Struktur baja dan platform", "Tangki dan bejana", "Perpipaan di atas tanah", "Fasilitas manufaktur"],
      en: ["Steel structures and platforms", "Tanks and vessels", "Above-ground piping", "Manufacturing facilities"],
    },
    methodology: {
      id: ["Peninjauan sistem coating dan lembar data produk", "Verifikasi persiapan permukaan", "Aplikasi lapis demi lapis sesuai prosedur", "Pengukuran dan pencatatan hasil"],
      en: ["Review of coating system and product data sheets", "Verification of surface preparation", "Coat-by-coat application per procedure", "Measurement and recording of results"],
    },
    quality: {
      id: ["Pengendalian kondisi aplikasi", "Pengukuran DFT sesuai rencana inspeksi", "Dokumentasi batch material"],
      en: ["Application condition control", "DFT measurement per inspection plan", "Material batch documentation"],
    },
    hse: {
      id: ["Penanganan dan penyimpanan material coating", "Ventilasi dan APD pernapasan", "Pengendalian sumber api"],
      en: ["Coating material handling and storage", "Ventilation and respiratory PPE", "Ignition source control"],
    },
    faq: [],
  },
  {
    slug: "steel-fabrication",
    num: "03",
    image: fabrication,
    title: { id: "Fabrikasi Baja", en: "Steel Fabrication" },
    short: { id: "Fabrikasi struktur, platform, support, dan komponen baja.", en: "Fabricated structures, platforms, supports, and components." },
    overview: {
      id: "Layanan fabrikasi baja untuk struktur industri, platform, support, rangka, dan komponen fabrikasi sesuai kebutuhan proyek.",
      en: "Steel fabrication services supporting industrial structures, platforms, supports, frames, and project-specific fabricated components.",
    },
    scope: {
      id: ["Fabrikasi struktur baja", "Platform dan walkway baja", "Support peralatan", "Pipe support", "Bracket dan rangka", "Fabrikasi baja lain-lain", "Koordinasi gambar fabrikasi", "Dukungan inspeksi dimensi"],
      en: ["Structural steel fabrication", "Steel platforms and walkways", "Equipment supports", "Pipe supports", "Brackets and frames", "Miscellaneous steel fabrication", "Fabrication drawing coordination", "Dimensional inspection support"],
    },
    applications: {
      id: ["Struktur pabrik", "Akses dan platform pemeliharaan", "Support perpipaan dan peralatan"],
      en: ["Plant structures", "Access and maintenance platforms", "Piping and equipment supports"],
    },
    methodology: {
      id: ["Peninjauan gambar dan material", "Pemotongan, perakitan, dan pengelasan", "Pemeriksaan dimensi", "Persiapan untuk coating dan pengiriman"],
      en: ["Drawing and material review", "Cutting, fit-up, and welding", "Dimensional checks", "Preparation for coating and delivery"],
    },
    quality: {
      id: ["Ketertelusuran material sesuai persyaratan", "Pemeriksaan dimensi", "Catatan inspeksi fabrikasi"],
      en: ["Material traceability as required", "Dimensional checks", "Fabrication inspection records"],
    },
    hse: {
      id: ["Pengendalian pekerjaan panas", "Pengangkatan dan penanganan material", "Housekeeping workshop"],
      en: ["Hot work controls", "Lifting and material handling", "Workshop housekeeping"],
    },
    faq: [],
  },
  {
    slug: "industrial-construction",
    num: "04",
    image: construction,
    title: { id: "Konstruksi Industri", en: "Industrial Construction" },
    short: { id: "Instalasi struktur baja dan dukungan konstruksi industri.", en: "Steel structure installation and construction support." },
    overview: {
      id: "Layanan konstruksi dan instalasi industri untuk struktur baja, fasilitas industri, support peralatan, dan infrastruktur terkait.",
      en: "Industrial construction and installation support for steel structures, industrial facilities, equipment supports, and associated infrastructure.",
    },
    scope: {
      id: ["Instalasi struktur baja", "Dukungan konstruksi industri", "Instalasi support peralatan", "Pemeliharaan struktur", "Koordinasi instalasi di lokasi", "Dokumentasi konstruksi"],
      en: ["Steel structure installation", "Industrial construction support", "Equipment support installation", "Structural maintenance", "Site installation coordination", "Construction documentation"],
    },
    applications: {
      id: ["Fasilitas industri baru dan perluasan", "Modifikasi struktur", "Pekerjaan pada shutdown"],
      en: ["New and expanding industrial facilities", "Structural modifications", "Shutdown work packages"],
    },
    methodology: {
      id: ["Perencanaan kerja dan izin lokasi", "Mobilisasi dan persiapan area", "Ereksi dan instalasi", "Pemeriksaan dan serah terima"],
      en: ["Work planning and site permits", "Mobilization and area preparation", "Erection and installation", "Inspection and handover"],
    },
    quality: {
      id: ["Pemeriksaan kelurusan dan elevasi", "Catatan instalasi", "Punch list dan penutupan"],
      en: ["Alignment and elevation checks", "Installation records", "Punch list and close-out"],
    },
    hse: {
      id: ["Pengendalian bekerja di ketinggian", "Rencana pengangkatan", "Koordinasi izin kerja lokasi"],
      en: ["Working-at-height controls", "Lifting plans", "Site permit-to-work coordination"],
    },
    faq: [],
    note: {
      id: "Pekerjaan yang diatur atau memerlukan kualifikasi khusus hanya dilaksanakan bila persyaratan kualifikasi dan perizinan yang berlaku telah terpenuhi.",
      en: "Regulated or specialist activities are only undertaken where the applicable qualifications and permits are in place.",
    },
  },
  {
    slug: "tank-pipeline-maintenance",
    num: "05",
    image: tank,
    title: { id: "Pemeliharaan Tangki & Pipeline", en: "Tank & Pipeline Maintenance" },
    short: { id: "Pemeliharaan dan perlindungan korosi tangki dan perpipaan.", en: "Maintenance and corrosion protection for tanks and pipelines." },
    overview: {
      id: "Solusi pemeliharaan dan perlindungan korosi untuk tangki, perpipaan, dan aset baja industri terkait.",
      en: "Maintenance and corrosion protection solutions for tanks, pipelines, and associated industrial steel assets.",
    },
    scope: {
      id: ["Persiapan permukaan tangki", "Pemeliharaan coating pipeline", "Perbaikan korosi baja", "Perbaikan coating lokal", "Recoating dan maintenance painting", "Koordinasi inspeksi dan perbaikan", "Dukungan shutdown dan turnaround bila berlaku"],
      en: ["Tank surface preparation", "Pipeline coating maintenance", "Steel corrosion repair", "Localized coating repair", "Recoating and maintenance painting", "Inspection and repair coordination", "Shutdown and turnaround support where applicable"],
    },
    applications: {
      id: ["Tangki penyimpanan", "Pipeline dan pipe rack", "Aset baja terkait"],
      en: ["Storage tanks", "Pipelines and pipe racks", "Associated steel assets"],
    },
    methodology: {
      id: ["Penilaian kondisi aset", "Penetapan lingkup perbaikan", "Pelaksanaan sesuai jendela operasi", "Dokumentasi dan rekomendasi"],
      en: ["Asset condition assessment", "Repair scope definition", "Execution within operating windows", "Documentation and recommendations"],
    },
    quality: {
      id: ["Pemetaan area perbaikan", "Inspeksi sebelum dan sesudah", "Laporan pekerjaan"],
      en: ["Repair area mapping", "Before-and-after inspection", "Work reports"],
    },
    hse: {
      id: ["Pengendalian ruang terbatas bila berlaku", "Isolasi dan izin kerja", "Perlindungan lingkungan sekitar"],
      en: ["Confined-space controls where applicable", "Isolation and permit-to-work", "Protection of surrounding environment"],
    },
    faq: [],
  },
];

services.forEach((s) => (s.faq = commonFaq(s.title)));

export const getService = (slug: string) => services.find((s) => s.slug === slug);
