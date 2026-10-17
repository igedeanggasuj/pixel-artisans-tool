import { createFileRoute } from "@tanstack/react-router";
import { ui, useLang } from "@/i18n";
import { seo, langOf } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { Breadcrumbs, CTASection, PageHero, SetupNotice } from "@/components/site/blocks";
import hero from "@/assets/svc-surface.jpg";

export const Route = createFileRoute("/$lang/hse-quality")({
  head: ({ params }) => {
    const l = langOf(params);
    return seo(l, "/hse-quality", ui.nav.hse[l], l === "id" ? "Pendekatan K3, lingkungan, dan pengendalian mutu PT. NAFAZ SANDBLASTING INDONESIA." : "PT. NAFAZ SANDBLASTING INDONESIA's approach to health, safety, environment, and quality control.");
  },
  component: Hse,
});

const sections = [
  { t: { id: "Pendekatan Manajemen K3", en: "HSE Management Approach" }, d: { id: "Pengendalian K3 direncanakan untuk setiap pekerjaan berdasarkan lingkup, aturan lokasi, regulasi yang berlaku, dan prosedur proyek yang disetujui.", en: "HSE controls are planned for each job based on scope, site rules, applicable regulations, and approved project procedures." } },
  { t: { id: "Identifikasi Bahaya & Penilaian Risiko", en: "Hazard Identification & Risk Assessment" }, d: { id: "Bahaya pekerjaan diidentifikasi dan dinilai sebelum pelaksanaan, dengan pengendalian yang dikomunikasikan kepada tim.", en: "Job hazards are identified and assessed before execution, with controls communicated to the crew." } },
  { t: { id: "Prosedur Kerja Aman", en: "Safe Work Procedures" }, d: { id: "Pekerjaan dilakukan mengikuti prosedur kerja yang telah ditinjau, termasuk untuk abrasive blasting dan aplikasi coating.", en: "Work follows reviewed procedures, including for abrasive blasting and coating application." } },
  { t: { id: "Izin Kerja", en: "Permit-to-Work" }, d: { id: "Kepatuhan terhadap sistem izin kerja klien bila berlaku, termasuk pekerjaan panas, ketinggian, dan ruang terbatas.", en: "Compliance with client permit-to-work systems where applicable, including hot work, height, and confined space." } },
  { t: { id: "APD & Pengendalian Lokasi", en: "PPE & Site Controls" }, d: { id: "APD sesuai bahaya, pembatasan area, dan housekeeping di lokasi kerja.", en: "Hazard-appropriate PPE, area barricading, and housekeeping at the worksite." } },
  { t: { id: "Pengelolaan Lingkungan & Limbah", en: "Environmental & Waste Management" }, d: { id: "Pengendalian debu dan tumpahan, serta penanganan limbah abrasif dan material coating sesuai ketentuan.", en: "Dust and spill control, with spent abrasive and coating waste handled as required." } },
  { t: { id: "Dokumentasi Inspeksi & Uji", en: "Inspection & Test Documentation" }, d: { id: "Catatan inspeksi disusun sesuai rencana inspeksi dan pengujian proyek.", en: "Inspection records are compiled according to the project inspection and test plan." } },
  { t: { id: "Pengendalian Mutu & Serah Terima", en: "Quality Control & Handover" }, d: { id: "Pemeriksaan selama pekerjaan dan dokumentasi serah terima untuk ditinjau klien.", en: "In-process checks and handover documentation for client review." } },
];

function Hse() {
  const lang = useLang();
  const id = lang === "id";
  return (
    <>
      <PageHero image={hero} eyebrow={ui.nav.hse[lang]} title={id ? "Keselamatan, Mutu, dan Tanggung Jawab Lingkungan" : "Safety, Quality & Environmental Responsibility"}
        intro={id ? "Pengendalian bergantung pada lingkup pekerjaan, aturan lokasi, regulasi yang berlaku, dan prosedur proyek yang disetujui." : "Controls depend on work scope, site rules, applicable regulations, and approved project procedures."}>
        <Breadcrumbs items={[{ label: ui.nav.home[lang], to: "/$lang", params: { lang } }, { label: ui.nav.hse[lang] }]} />
      </PageHero>
      <section className="section-y">
        <div className="container-x grid gap-px bg-border md:grid-cols-2">
          {sections.map((s, i) => (
            <article key={i} className="bg-background p-8 lg:p-10">
              <span className="font-display text-sm font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-2 text-xl font-bold text-primary">{s.t[lang]}</h2>
              <p className="mt-3 text-muted-foreground">{s.d[lang]}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-steel section-y">
        <div className="container-x max-w-4xl">
          <h2 className="text-3xl font-extrabold text-primary">{id ? "Sertifikasi & Kualifikasi" : "Certifications & Qualifications"}</h2>
          {siteConfig.certifications.length ? (
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {siteConfig.certifications.map((c) => <li key={c.name} className="flex justify-between py-3"><span className="font-semibold text-primary">{c.name}</span><span className="text-sm text-muted-foreground">{c.issuer}{c.validUntil ? ` · ${c.validUntil}` : ""}</span></li>)}
            </ul>
          ) : (
            <div className="mt-8"><SetupNotice>{id ? "Sertifikasi dan kualifikasi akan ditampilkan setelah perusahaan menyerahkan bukti yang terverifikasi." : "Certifications and qualifications will be displayed once the company supplies verified evidence."}</SetupNotice></div>
          )}
        </div>
      </section>
      <CTASection />
    </>
  );
}
