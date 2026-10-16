import { createFileRoute } from "@tanstack/react-router";
import { ui, useLang } from "@/i18n";
import { seo, langOf } from "@/lib/seo";
import { industries } from "@/content/industries";
import { Breadcrumbs, CTASection, IndustryCard, PageHero } from "@/components/site/blocks";
import hero from "@/assets/ind-geothermal.jpg";

export const Route = createFileRoute("/$lang/industries")({
  head: ({ params }) => {
    const l = langOf(params);
    return seo(l, "/industries", l === "id" ? "Industri yang Kami Layani" : "Industries We Serve",
      l === "id" ? "Layanan untuk minyak & gas, panas bumi, pertambangan, pembangkit listrik, petrokimia, manufaktur, infrastruktur, dan proyek EPC." : "Services for oil & gas, geothermal, mining, power generation, petrochemical, manufacturing, infrastructure, and EPC projects.");
  },
  component: () => {
    const lang = useLang();
    return (
      <>
        <PageHero image={hero} eyebrow={ui.nav.industries[lang]} title={lang === "id" ? "Industri yang Kami Layani" : "Industries We Serve"} intro={ui.positioning[lang]}>
          <Breadcrumbs items={[{ label: ui.nav.home[lang], to: "/$lang", params: { lang } }, { label: ui.nav.industries[lang] }]} />
        </PageHero>
        <section className="section-y"><div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{industries.map((i) => <IndustryCard key={i.key} ind={i} />)}</div></section>
        <CTASection />
      </>
    );
  },
});
