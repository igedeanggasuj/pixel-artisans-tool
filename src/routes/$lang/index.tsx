import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import hero from "@/assets/hero.jpg";
import fabrication from "@/assets/svc-fabrication.jpg";
import { ui, useLang, type Lang } from "@/i18n";
import { seo, langOf } from "@/lib/seo";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { projects } from "@/content/projects";
import { CTASection, EmptyState, IndustryCard, ProjectCard, SectionHead, ServiceCard } from "@/components/site/blocks";
import { CategoryFilter } from "@/components/site/CategoryFilter";
import { hseItems, processSteps, whyBlocks } from "@/content/home";
import { CompanyProfileDownload } from "@/components/site/CompanyProfileDownload";

export const Route = createFileRoute("/$lang/")({
  head: ({ params }) => {
    const l = langOf(params);
    return seo(l, "/",
      l === "id" ? "Jasa Surface Preparation, Protective Coating & Fabrikasi Baja" : "Surface Preparation, Protective Coating & Steel Fabrication",
      ui.positioning[l]);
  },
  component: Home,
});

function Home() {
  const lang = useLang();
  return (
    <>
      <Hero lang={lang} />
      <section className="section-y">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">PT. NAFAZ SANDBLASTING INDONESIA</p>
            <h2 className="mt-4 text-3xl font-extrabold text-primary md:text-5xl">{lang === "id" ? "Keahlian Industri. Solusi yang Tepat." : "Industrial Expertise. Practical Solutions."}</h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {lang === "id"
                ? "PT. NAFAZ SANDBLASTING INDONESIA menyediakan layanan industri yang mencakup persiapan permukaan, perlindungan korosi, fabrikasi baja, konstruksi, dan pemeliharaan. Pendekatan pekerjaan mengutamakan kejelasan lingkup, perencanaan, pengendalian mutu, keselamatan, dan koordinasi proyek."
                : "PT. NAFAZ SANDBLASTING INDONESIA provides industrial services covering surface preparation, corrosion protection, steel fabrication, construction, and maintenance. Our approach emphasizes scope clarity, work planning, quality control, safe execution, and effective project coordination."}
            </p>
            <Link to="/$lang/about" params={{ lang }} className="mt-8 inline-flex items-center gap-2 font-semibold text-primary hover:text-accent">{ui.cta.discover[lang]} <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="bg-steel section-y">
        <div className="container-x">
          <SectionHead align="split" eyebrow={ui.nav.services[lang]} title={lang === "id" ? "Layanan Inti" : "Core Services"} intro={ui.positioning[lang]} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {services.map((s) => <ServiceCard key={s.slug} s={s} />)}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <SectionHead align="split" eyebrow={ui.nav.industries[lang]} title={lang === "id" ? "Industri yang Kami Layani" : "Industries We Serve"} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((i) => <IndustryCard key={i.key} ind={i} />)}
          </div>
        </div>
      </section>

      <PortfolioPreview lang={lang} />

      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">{lang === "id" ? "Mengapa Kami" : "Why PT. NAFAZ SANDBLASTING INDONESIA"}</p>
            <h2 className="mt-4 text-3xl font-extrabold text-primary md:text-4xl">{lang === "id" ? "Mitra Andal untuk Proyek Industri" : "A Reliable Partner for Industrial Projects"}</h2>
            <img src={fabrication} alt={lang === "id" ? "Pengelasan struktur baja di workshop" : "Welding structural steel in the workshop"} loading="lazy" width={1280} height={896} className="mt-8 aspect-[4/3] w-full object-cover" />
          </div>
          <div className="grid gap-px bg-border sm:grid-cols-2 lg:col-span-8">
            {whyBlocks.map((b, i) => (
              <div key={i} className="bg-background p-8">
                <b.icon className="h-7 w-7 text-accent" aria-hidden />
                <p className="mt-6 font-display text-sm font-bold text-muted-foreground">0{i + 1}</p>
                <h3 className="mt-1 text-xl font-bold text-primary">{b.t[lang]}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.d[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy section-y text-on-dark">
        <div className="container-x">
          <p className="eyebrow">{lang === "id" ? "Alur Kerja" : "Work Process"}</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-extrabold md:text-5xl">{lang === "id" ? "Dari konsultasi hingga serah terima." : "From consultation to handover."}</h2>
          <ol className="mt-14 grid gap-0 border-l border-line-dark lg:grid-cols-5 lg:border-l-0 lg:border-t">
            {processSteps.map((s, i) => (
              <li key={i} className="relative pb-10 pl-8 lg:pb-0 lg:pl-0 lg:pr-6 lg:pt-8">
                <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 bg-accent lg:-top-[5px] lg:left-0" aria-hidden />
                <p className="font-display text-4xl font-extrabold text-accent">0{i + 1}</p>
                <p className="mt-3 font-semibold">{s[lang]}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">HSE & Quality</p>
            <h2 className="mt-4 text-3xl font-extrabold text-primary md:text-4xl">{lang === "id" ? "Keselamatan, Mutu, dan Tanggung Jawab Lingkungan" : "Safety, Quality & Environmental Responsibility"}</h2>
            <p className="mt-5 text-muted-foreground">{lang === "id" ? "Persyaratan setiap proyek bergantung pada regulasi yang berlaku, kontrak, lingkup pekerjaan, dan prosedur klien." : "Requirements for each project depend on applicable regulations, the contract, work scope, and client procedures."}</p>
            <Link to="/$lang/hse-quality" params={{ lang }} className="btn btn-outline mt-8">{ui.cta.learnMore[lang]}</Link>
          </div>
          <ul className="grid gap-px bg-border sm:grid-cols-2 md:col-span-7">
            {hseItems[lang].map((x, i) => <li key={i} className="flex gap-4 bg-background p-5 text-sm"><span className="font-display font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>{x}</li>)}
          </ul>
        </div>
      </section>

      <section className="bg-steel section-y"><div className="container-x"><CompanyProfileDownload /></div></section>
      <CTASection />
    </>
  );
}

function Hero({ lang }: { lang: Lang }) {
  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-navy text-on-dark">
      <img src={hero} alt={lang === "id" ? "Fasilitas industri dengan tangki dan struktur baja saat senja" : "Industrial facility with tanks and steel structures at dusk"} width={1920} height={1088} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="container-x relative flex min-h-[88vh] flex-col justify-end pb-16 pt-32 lg:pb-24">
        <p className="eyebrow">{lang === "id" ? "Layanan Industri & Engineering" : "Industrial Services & Engineering"}</p>
        <h1 className="mt-6 max-w-4xl text-5xl font-extrabold leading-[1.02] md:text-7xl">{ui.tagline[lang]}</h1>
        <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
          <p className="max-w-xl text-lg leading-relaxed text-on-dark-muted md:col-span-6">
            {lang === "id"
              ? "Layanan terintegrasi untuk surface preparation, protective coating, fabrikasi baja, dan konstruksi industri guna mendukung kebutuhan operasional berbagai sektor industri."
              : "Integrated surface preparation, protective coating, steel fabrication, and industrial construction services designed to support demanding industrial environments."}
          </p>
          <div className="flex flex-wrap gap-3 md:col-span-6 md:justify-end">
            <Link to="/$lang/quote" params={{ lang }} className="btn btn-accent">{ui.cta.quote[lang]} <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/$lang/services" params={{ lang }} className="btn btn-outline-light">{ui.cta.explore[lang]}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function PortfolioPreview({ lang }: { lang: Lang }) {
  const [cat, setCat] = useState<string>("all");
  const list = projects.filter((p) => cat === "all" || p.category === cat).slice(0, 3);
  return (
    <section className="bg-steel section-y">
      <div className="container-x">
        <SectionHead align="split" eyebrow={ui.nav.projects[lang]} title={lang === "id" ? "Portofolio Proyek dan Kapabilitas" : "Selected Projects & Capabilities"}
          intro={lang === "id" ? "Catatan berlabel “Contoh konten” hanya untuk ilustrasi tata letak dan bukan proyek yang telah diselesaikan." : "Records labelled “Sample content” illustrate the layout only and are not completed projects."} />
        <CategoryFilter lang={lang} value={cat} onChange={setCat} />
        <div className="mt-10 grid gap-8 md:grid-cols-3">{list.map((p) => <ProjectCard key={p.slug} p={p} />)}</div>
        {list.length === 0 && <div className="mt-10"><EmptyState title={lang === "id" ? "Belum ada proyek terverifikasi" : "No verified projects yet"} /></div>}
        <Link to="/$lang/projects" params={{ lang }} className="btn btn-navy mt-12">{ui.cta.viewProjects[lang]} <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </section>
  );
}

