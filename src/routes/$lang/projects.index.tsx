import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ui, useLang } from "@/i18n";
import { seo, langOf } from "@/lib/seo";
import { projects } from "@/content/projects";
import { Breadcrumbs, CTASection, EmptyState, PageHero, ProjectCard } from "@/components/site/blocks";
import { CategoryFilter } from "@/components/site/CategoryFilter";
import hero from "@/assets/svc-construction.jpg";

const PAGE = 6;

export const Route = createFileRoute("/$lang/projects/")({
  head: ({ params }) => {
    const l = langOf(params);
    return seo(l, "/projects", l === "id" ? "Portofolio Proyek" : "Project Portfolio",
      l === "id" ? "Portofolio proyek surface preparation, coating, fabrikasi baja, dan konstruksi industri PT. NAFAZ SANDBLASTING INDONESIA." : "PT. NAFAZ SANDBLASTING INDONESIA project portfolio for surface preparation, coating, steel fabrication, and industrial construction.");
  },
  component: ProjectsPage,
});

function ProjectsPage() {
  const lang = useLang();
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const [count, setCount] = useState(PAGE);
  const filtered = useMemo(() => projects.filter((p) => (cat === "all" || p.category === cat) &&
    (!q || `${p.title[lang]} ${p.industry[lang]} ${p.location ?? ""}`.toLowerCase().includes(q.toLowerCase()))), [cat, q, lang]);
  const id = lang === "id";
  return (
    <>
      <PageHero image={hero} eyebrow={ui.nav.projects[lang]} title={id ? "Portofolio Proyek dan Kapabilitas" : "Selected Projects & Capabilities"}
        intro={id ? "Proyek ditampilkan hanya setelah disetujui untuk publikasi. Catatan berlabel “Contoh konten” bukan proyek nyata." : "Projects are shown only once approved for publication. Records labelled “Sample content” are not actual projects."}>
        <Breadcrumbs items={[{ label: ui.nav.home[lang], to: "/$lang", params: { lang } }, { label: ui.nav.projects[lang] }]} />
      </PageHero>
      <section className="section-y">
        <div className="container-x">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <label htmlFor="q" className="sr-only">{id ? "Cari proyek" : "Search projects"}</label>
            <input id="q" value={q} onChange={(e) => { setQ(e.target.value); setCount(PAGE); }} placeholder={id ? "Cari proyek…" : "Search projects…"} className="field pl-10" />
          </div>
          <CategoryFilter lang={lang} value={cat} onChange={(v) => { setCat(v); setCount(PAGE); }} />
          <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">{filtered.length} {id ? "proyek" : "projects"}</p>
          {filtered.length ? (
            <div className="mt-6 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">{filtered.slice(0, count).map((p) => <ProjectCard key={p.slug} p={p} />)}</div>
          ) : (
            <div className="mt-6"><EmptyState title={id ? "Tidak ada proyek yang cocok" : "No matching projects"} body={id ? "Coba ubah filter atau kata kunci pencarian." : "Try a different filter or search term."} /></div>
          )}
          {count < filtered.length && <button onClick={() => setCount(count + PAGE)} className="btn btn-outline mt-12">{id ? "Muat lebih banyak" : "Load more"}</button>}
        </div>
      </section>
      <CTASection />
    </>
  );
}
