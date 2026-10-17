import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ui, useLang } from "@/i18n";
import { seo, langOf } from "@/lib/seo";
import { getService, services } from "@/content/services";
import { projects } from "@/content/projects";
import { siteConfig } from "@/config/site";
import { Breadcrumbs, BulletList, CTASection, EmptyState, PageHero, ProjectCard, WhatsAppButton } from "@/components/site/blocks";

export const Route = createFileRoute("/$lang/services/$slug")({
  loader: ({ params }) => {
    const s = getService(params.slug);
    if (!s) throw notFound();
    return { slug: s.slug };
  },
  head: ({ params }) => {
    const l = langOf(params);
    const s = getService(params.slug);
    if (!s) return {};
    const h = seo(l, `/services/${s.slug}`, s.title[l], s.overview[l]);
    return {
      ...h,
      scripts: [{ type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "Service", name: s.title[l], description: s.overview[l], provider: { "@type": "Organization", name: "PT. NAFAZ SANDBLASTING INDONESIA" }, areaServed: "Indonesia" },
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: ui.nav.home[l], item: `${siteConfig.siteUrl}/${l}` },
            { "@type": "ListItem", position: 2, name: ui.nav.services[l], item: `${siteConfig.siteUrl}/${l}/services` },
            { "@type": "ListItem", position: 3, name: s.title[l], item: `${siteConfig.siteUrl}/${l}/services/${s.slug}` },
          ] },
        ],
      }) }],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const lang = useLang();
  const { slug } = Route.useLoaderData();
  const s = getService(slug)!;
  const related = projects.filter((p) => p.category === s.slug);
  const others = services.filter((x) => x.slug !== s.slug);
  const id = lang === "id";
  const Block = ({ title, items }: { title: string; items: string[] }) => (
    <div><h2 className="mb-5 text-2xl font-extrabold text-primary">{title}</h2><BulletList items={items} /></div>
  );
  return (
    <>
      <PageHero image={s.image} eyebrow={`${ui.nav.services[lang]} · ${s.num}`} title={s.title[lang]} intro={s.overview[lang]}>
        <Breadcrumbs items={[{ label: ui.nav.home[lang], to: "/$lang", params: { lang } }, { label: ui.nav.services[lang], to: "/$lang/services", params: { lang } }, { label: s.title[lang] }]} />
      </PageHero>
      <section className="section-y">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="space-y-16 lg:col-span-8">
            <Block title={id ? "Lingkup Pekerjaan" : "Scope of Work"} items={s.scope[lang]} />
            <Block title={id ? "Aplikasi Umum" : "Typical Applications"} items={s.applications[lang]} />
            <div>
              <h2 className="mb-5 text-2xl font-extrabold text-primary">{id ? "Metodologi Pelaksanaan" : "Execution Methodology"}</h2>
              <ol className="grid gap-px bg-border sm:grid-cols-2">
                {s.methodology[lang].map((m, i) => <li key={m} className="bg-background p-5"><span className="font-display text-2xl font-extrabold text-accent">0{i + 1}</span><p className="mt-2 text-sm">{m}</p></li>)}
              </ol>
            </div>
            <div className="grid gap-10 md:grid-cols-2">
              <Block title={id ? "Pertimbangan Mutu" : "Quality Considerations"} items={s.quality[lang]} />
              <Block title={id ? "Pertimbangan K3" : "HSE Considerations"} items={s.hse[lang]} />
            </div>
            {s.note && <p className="border-l-4 border-accent bg-muted p-4 text-sm text-muted-foreground">{s.note[lang]}</p>}
            <div>
              <h2 className="mb-5 text-2xl font-extrabold text-primary">{id ? "Galeri Proyek Terkait" : "Related Project Gallery"}</h2>
              {related.length ? <div className="grid gap-8 sm:grid-cols-2">{related.map((p) => <ProjectCard key={p.slug} p={p} />)}</div>
                : <EmptyState title={id ? "Belum ada proyek terverifikasi" : "No verified projects yet"} />}
            </div>
            <div>
              <h2 className="mb-5 text-2xl font-extrabold text-primary">FAQ</h2>
              <div className="divide-y divide-border border-y border-border">
                {s.faq.map((f) => (
                  <details key={f.q.en} className="group py-4">
                    <summary className="cursor-pointer list-none font-semibold text-primary marker:hidden">{f.q[lang]}<span className="float-right text-accent group-open:rotate-45 transition-transform">+</span></summary>
                    <p className="mt-3 text-sm text-muted-foreground">{f.a[lang]}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="bg-navy p-8 text-on-dark">
                <p className="eyebrow">{ui.cta.quote[lang]}</p>
                <p className="mt-4 text-xl font-bold">{id ? "Diskusikan kebutuhan " : "Discuss your "}{s.title[lang]}{id ? " Anda." : " needs."}</p>
                <div className="mt-6 flex flex-col gap-3">
                  <Link to="/$lang/quote" params={{ lang }} search={{ service: s.slug }} className="btn btn-accent">{ui.cta.quote[lang]}</Link>
                  <WhatsAppButton service={s.title[lang]} variant="btn-outline-light" />
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{id ? "Layanan Terkait" : "Related Services"}</p>
                <ul className="mt-3 divide-y divide-border border-y border-border">
                  {others.map((o) => <li key={o.slug}><Link to="/$lang/services/$slug" params={{ lang, slug: o.slug }} className="flex items-center justify-between py-3 text-sm font-medium text-primary hover:text-accent">{o.title[lang]}<ArrowRight className="h-4 w-4" /></Link></li>)}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <CTASection />
    </>
  );
}
