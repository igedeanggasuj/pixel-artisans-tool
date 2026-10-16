import { ClipboardCheck, HardHat, Layers, Workflow } from "lucide-react";

export const whyBlocks = [
  { icon: ClipboardCheck, t: { id: "Pelaksanaan Berorientasi Mutu", en: "Quality-Focused Execution" }, d: { id: "Pekerjaan direncanakan dan diperiksa terhadap spesifikasi proyek, dengan catatan inspeksi sebagai bagian dari serah terima.", en: "Work is planned and checked against the project specification, with inspection records forming part of handover." } },
  { icon: HardHat, t: { id: "Operasional dengan Kesadaran K3", en: "Safety-Conscious Operations" }, d: { id: "Identifikasi bahaya, APD, dan pengendalian area kerja diterapkan sesuai lingkup dan aturan lokasi.", en: "Hazard identification, PPE, and work-area controls are applied according to scope and site rules." } },
  { icon: Layers, t: { id: "Kapabilitas Layanan Terintegrasi", en: "Integrated Service Capabilities" }, d: { id: "Persiapan permukaan, coating, fabrikasi, dan instalasi dapat dikoordinasikan dalam satu paket pekerjaan.", en: "Surface preparation, coating, fabrication, and installation can be coordinated in a single work package." } },
  { icon: Workflow, t: { id: "Koordinasi Proyek yang Terarah", en: "Clear Project Coordination" }, d: { id: "Lingkup, jadwal, dan komunikasi dikelola secara terstruktur bersama tim klien.", en: "Scope, schedule, and communication are managed in a structured way with the client team." } },
];

export const processSteps = [
  { id: "Konsultasi Awal", en: "Initial Consultation" },
  { id: "Survei Lokasi dan Evaluasi Teknis", en: "Site Survey & Technical Assessment" },
  { id: "Penetapan Lingkup dan Penawaran", en: "Scope Definition & Quotation" },
  { id: "Pelaksanaan Pekerjaan dan Pengendalian Mutu", en: "Project Execution & Quality Control" },
  { id: "Serah Terima dan Dokumentasi", en: "Handover & Documentation" },
];

export const hseItems = {
  id: ["Identifikasi bahaya dan penilaian risiko pekerjaan", "Izin kerja bila berlaku", "APD dan pengendalian area kerja", "Keselamatan abrasive blasting", "Penanganan material coating", "Pengendalian bekerja di ketinggian dan ruang terbatas bila berlaku", "Perlindungan lingkungan dan pengelolaan limbah", "Dokumentasi mutu dan catatan inspeksi"],
  en: ["Job hazard identification and risk assessment", "Work permits where applicable", "PPE and work-area controls", "Abrasive blasting safety", "Coating material handling", "Working at height and confined-space controls where applicable", "Environmental protection and waste management", "Quality documentation and inspection records"],
};

