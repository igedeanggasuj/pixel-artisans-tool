import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ui, useLang } from "@/i18n";
import { seo, langOf } from "@/lib/seo";
import { services } from "@/content/services";
import { Breadcrumbs, CTASection, PageHero } from "@/components/site/blocks";
import hero from "@/assets/svc-coating.jpg";

export const Route = createFileRoute("/$lang/services/")({
  head: ({ params }) => {
    const l = langOf(params);
    return seo(l, "/services", l === "id" ? "Layanan Industri: Abrasive Blasting, Coating, Fabrikasi" : "Industrial Services: Blasting, Coating, Fabrication",
      l === "id" ? "Jasa surface preparation, abrasive blasting, protective coating, fabrikasi baja, konstruksi industri, dan pemeliharaan tangki & pipeline." : "Surface preparation, abrasive blasting, protective coating, steel fabrication, industrial construction, and tank & pipeline maintenance services.");
  },
  component: ServicesPage,
});

function ServicesPage() {
  const lang = useLang();
  return (
    <>
      <PageHero image={hero} eyebrow={ui.nav.services[lang]} title={lang === "id" ? "Layanan Industri Terintegrasi" : "Integrated Industrial Services"} intro={ui.positioning[lang]}>
        <Breadcrumbs items={[{ label: ui.nav.home[lang], to: "/$lang", params: { lang } }, { label: ui.nav.services[lang] }]} />
      </PageHero>
      <section className="section-y">
        <div className="container-x space-y-20">
          {services.map((s, i) => (
            <article key={s.slug} className="grid gap-10 md:grid-cols-12 md:items-center">
              <div className={`md:col-span-6 ${i % 2 ? "md:order-2" : ""}`}>
                <img src={s.image} alt={s.title[lang]} loading="lazy" width={1280} height={896} className="aspect-[4/3] w-full object-cover" />
              </div>
              <div className={`md:col-span-5 ${i % 2 ? "md:col-start-1" : "md:col-start-8"}`}>
                <p className="font-display text-5xl font-extrabold text-accent">{s.num}</p>
                <h2 className="mt-3 text-3xl font-extrabold text-primary">{s.title[lang]}</h2>
                <p className="mt-4 text-muted-foreground">{s.overview[lang]}</p>
                <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  {s.scope[lang].slice(0, 6).map((x) => <li key={x} className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" />{x}</li>)}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/$lang/services/$slug" params={{ lang, slug: s.slug }} className="btn btn-navy">{ui.cta.learnMore[lang]} <ArrowRight className="h-4 w-4" /></Link>
                  <Link to="/$lang/quote" params={{ lang }} search={{ service: s.slug }} className="btn btn-outline">{ui.cta.quote[lang]}</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
