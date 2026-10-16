import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ui, useLang } from "@/i18n";
import { seo, langOf } from "@/lib/seo";
import { getProject } from "@/content/projects";
import { getService } from "@/content/services";
import { Breadcrumbs, BulletList, CTASection, PageHero, SampleBadge } from "@/components/site/blocks";

export const Route = createFileRoute("/$lang/projects/$slug")({
  loader: ({ params }) => {
    const p = getProject(params.slug);
    if (!p) throw notFound();
    return { slug: p.slug };
  },
  head: ({ params }) => {
    const l = langOf(params);
    const p = getProject(params.slug);
    if (!p) return {};
    const h = seo(l, `/projects/${p.slug}`, p.title[l], p.description[l]);
    return p.sample ? { ...h, meta: [...h.meta, { name: "robots", content: "noindex" }] } : h;
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  const lang = useLang();
  const { slug } = Route.useLoaderData();
  const p = getProject(slug)!;
  const svc = getService(p.category)!;
  const id = lang === "id";
  const facts: [string, string | undefined][] = [
    [id ? "Kategori" : "Category", svc.title[lang]],
    [id ? "Industri" : "Industry", p.industry[lang]],
    [id ? "Klien" : "Client", p.client],
    [id ? "Lokasi" : "Location", p.location],
    [id ? "Tahun" : "Year", p.year],
  ];
  return (
    <>
      <PageHero image={p.cover} eyebrow={ui.nav.projects[lang]} title={p.title[lang]} intro={p.description[lang]}>
        <Breadcrumbs items={[{ label: ui.nav.home[lang], to: "/$lang", params: { lang } }, { label: ui.nav.projects[lang], to: "/$lang/projects", params: { lang } }, { label: p.title[lang] }]} />
        {p.sample && <div className="mb-4"><SampleBadge /></div>}
      </PageHero>
      <section className="section-y">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="space-y-14 lg:col-span-8">
            <div><h2 className="mb-5 text-2xl font-extrabold text-primary">{id ? "Ringkasan Lingkup Teknis" : "Technical Scope Summary"}</h2><BulletList items={p.scope[lang]} /></div>
            {p.beforeAfter && (
              <div>
                <h2 className="mb-5 text-2xl font-extrabold text-primary">{id ? "Sebelum & Sesudah" : "Before & After"}</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {(["before", "after"] as const).map((k) => (
                    <figure key={k}><img src={p.beforeAfter![k]} alt={k} loading="lazy" width={1280} height={896} className="aspect-[4/3] w-full object-cover" />
                      <figcaption className="mt-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">{k === "before" ? (id ? "Sebelum" : "Before") : (id ? "Sesudah" : "After")}</figcaption></figure>
                  ))}
                </div>
              </div>
            )}
            <div>
              <h2 className="mb-5 text-2xl font-extrabold text-primary">{id ? "Galeri" : "Gallery"}</h2>
              <div className="grid gap-4 sm:grid-cols-2">{p.gallery.map((g, i) => <img key={i} src={g} alt={`${p.title[lang]} ${i + 1}`} loading="lazy" width={1280} height={896} className="aspect-[4/3] w-full object-cover" />)}</div>
            </div>
          </div>
          <aside className="lg:col-span-4">
            <dl className="divide-y divide-border border-y border-border">
              {facts.filter(([, v]) => v).map(([k, v]) => <div key={k} className="flex justify-between gap-4 py-3 text-sm"><dt className="text-muted-foreground">{k}</dt><dd className="text-right font-semibold text-primary">{v}</dd></div>)}
            </dl>
            <Link to="/$lang/services/$slug" params={{ lang, slug: svc.slug }} className="btn btn-outline mt-6 w-full">{svc.title[lang]}</Link>
            <Link to="/$lang/quote" params={{ lang }} search={{ service: svc.slug }} className="btn btn-accent mt-3 w-full">{ui.cta.quote[lang]}</Link>
          </aside>
        </div>
      </section>
      <CTASection />
    </>
  );
}
