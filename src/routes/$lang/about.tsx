import { createFileRoute, Link } from "@tanstack/react-router";
import { ui, useLang } from "@/i18n";
import { seo, langOf } from "@/lib/seo";
import { services } from "@/content/services";
import { siteConfig } from "@/config/site";
import { Breadcrumbs, CTASection, PageHero } from "@/components/site/blocks";
import { CompanyProfileDownload } from "@/components/site/CompanyProfileDownload";
import hero from "@/assets/svc-fabrication.jpg";

export const Route = createFileRoute("/$lang/about")({
  head: ({ params }) => {
    const l = langOf(params);
    return seo(l, "/about", ui.nav.about[l], l === "id" ? "Profil perusahaan PT. NAFAZ SANDBLASTING INDONESIA: lingkup bisnis, nilai, pendekatan operasional, serta komitmen K3 dan mutu." : "PT. NAFAZ SANDBLASTING INDONESIA company profile: business scope, values, operational approach, and HSE and quality commitment.");
  },
  component: About,
});

const values = [
  { id: "Integritas", en: "Integrity" }, { id: "Mutu", en: "Quality" }, { id: "Keselamatan", en: "Safety" },
  { id: "Akuntabilitas", en: "Accountability" }, { id: "Perbaikan Berkelanjutan", en: "Continuous Improvement" },
];

function About() {
  const lang = useLang();
  const id = lang === "id";
  const pending = id ? "Menunggu data terverifikasi" : "Awaiting verified data";
  const info: [string, string | null][] = [
    [id ? "Nama badan hukum" : "Legal company name", siteConfig.legalName],
    [id ? "Tahun berdiri" : "Year established", siteConfig.yearEstablished],
    [id ? "Alamat terdaftar" : "Registered address", siteConfig.address],
    [id ? "Kontak kantor" : "Office contact", siteConfig.contactEmail ?? siteConfig.phone],
    [id ? "Data registrasi perusahaan" : "Company registration", siteConfig.registration],
    [id ? "Manajemen" : "Management", null],
  ];
  return (
    <>
      <PageHero image={hero} eyebrow={ui.nav.about[lang]} title={id ? "Keahlian Industri. Solusi yang Tepat." : "Industrial Expertise. Practical Solutions."} intro={ui.positioning[lang]}>
        <Breadcrumbs items={[{ label: ui.nav.home[lang], to: "/$lang", params: { lang } }, { label: ui.nav.about[lang] }]} />
      </PageHero>
      <section className="section-y">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <h2 className="text-3xl font-extrabold text-primary md:col-span-4">{id ? "Ikhtisar Perusahaan" : "Company Overview"}</h2>
          <div className="space-y-5 text-lg leading-relaxed text-muted-foreground md:col-span-7 md:col-start-6">
            <p>{id ? "PT. NAFAZ SANDBLASTING INDONESIA menyediakan layanan industri yang mencakup persiapan permukaan, perlindungan korosi, fabrikasi baja, konstruksi, dan pemeliharaan." : "PT. NAFAZ SANDBLASTING INDONESIA provides industrial services covering surface preparation, corrosion protection, steel fabrication, construction, and maintenance."}</p>
            <p>{id ? "Pendekatan kami mengutamakan kejelasan lingkup, perencanaan kerja, pengendalian mutu, pelaksanaan yang aman, dan koordinasi proyek yang efektif." : "Our approach emphasizes scope clarity, work planning, quality control, safe execution, and effective project coordination."}</p>
          </div>
        </div>
      </section>
      <section className="bg-steel section-y">
        <div className="container-x grid gap-px bg-border md:grid-cols-2">
          <div className="bg-background p-10"><p className="eyebrow">{id ? "Visi" : "Vision"}</p><p className="mt-5 text-xl font-semibold text-primary">{id ? "Menjadi mitra layanan industri yang dipercaya untuk perlindungan dan kinerja aset jangka panjang." : "To be a trusted industrial services partner for long-term asset protection and performance."}</p></div>
          <div className="bg-background p-10"><p className="eyebrow">{id ? "Misi" : "Mission"}</p>
            <ul className="mt-5 space-y-2 text-muted-foreground">
              <li>— {id ? "Melaksanakan pekerjaan sesuai spesifikasi dan prosedur yang disetujui." : "Deliver work to approved specifications and procedures."}</li>
              <li>— {id ? "Mengutamakan keselamatan kerja dan perlindungan lingkungan." : "Prioritise work safety and environmental protection."}</li>
              <li>— {id ? "Membangun komunikasi proyek yang jelas dengan klien." : "Maintain clear project communication with clients."}</li>
            </ul></div>
        </div>
      </section>
      <section className="section-y">
        <div className="container-x">
          <p className="eyebrow">{id ? "Nilai Inti" : "Core Values"}</p>
          <ul className="mt-8 grid gap-px bg-border sm:grid-cols-5">
            {values.map((v, i) => <li key={i} className="bg-background p-6"><span className="font-display text-sm font-bold text-accent">0{i + 1}</span><p className="mt-2 font-display text-lg font-bold text-primary">{v[lang]}</p></li>)}
          </ul>
          <div className="mt-20 grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-extrabold text-primary">{id ? "Lingkup Bisnis & Kapabilitas" : "Business Scope & Capabilities"}</h2>
              <ul className="mt-6 divide-y divide-border border-y border-border">
                {services.map((s) => <li key={s.slug}><Link to="/$lang/services/$slug" params={{ lang, slug: s.slug }} className="flex gap-4 py-3 font-medium text-primary hover:text-accent"><span className="text-accent">{s.num}</span>{s.title[lang]}</Link></li>)}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-primary">{id ? "Informasi Perusahaan" : "Company Information"}</h2>
              <dl className="mt-6 divide-y divide-border border-y border-border">
                {info.map(([k, v]) => <div key={k} className="flex justify-between gap-4 py-3 text-sm"><dt className="text-muted-foreground">{k}</dt><dd className={v ? "text-right font-semibold text-primary" : "text-right italic text-muted-foreground"}>{v ?? pending}</dd></div>)}
              </dl>
              <p className="mt-6 text-sm text-muted-foreground">{id ? "Komitmen K3 dan mutu kami dijelaskan pada halaman " : "Our HSE and quality commitment is described on the "}<Link to="/$lang/hse-quality" params={{ lang }} className="font-semibold text-primary underline decoration-accent">{ui.nav.hse[lang]}</Link>.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-steel section-y"><div className="container-x"><CompanyProfileDownload /></div></section>
      <CTASection />
    </>
  );
}
