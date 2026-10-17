import { createFileRoute } from "@tanstack/react-router";
import { ui, useLang } from "@/i18n";
import { seo, langOf } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { Breadcrumbs, CTASection, PageHero } from "@/components/site/blocks";
import { CompanyProfileDownload } from "@/components/site/CompanyProfileDownload";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/$lang/company-profile")({
  head: ({ params }) => {
    const l = langOf(params);
    return seo(l, "/company-profile", "Company Profile", l === "id" ? "Unduh company profile resmi PT. NAFAZ SANDBLASTING INDONESIA untuk evaluasi vendor dan prakualifikasi." : "Download the official PT. NAFAZ SANDBLASTING INDONESIA company profile for vendor evaluation and prequalification.");
  },
  component: () => {
    const lang = useLang();
    return (
      <>
        <PageHero image={hero} eyebrow="Company Profile" title={lang === "id" ? "Kenali PT. NAFAZ SANDBLASTING INDONESIA Lebih Dekat" : "Learn More About PT. NAFAZ SANDBLASTING INDONESIA"}>
          <Breadcrumbs items={[{ label: ui.nav.home[lang], to: "/$lang", params: { lang } }, { label: "Company Profile" }]} />
        </PageHero>
        <section className="section-y"><div className="container-x"><CompanyProfileDownload />
          {siteConfig.companyProfilePdf && <iframe src={siteConfig.companyProfilePdf} title="Company Profile PDF" className="mt-16 h-[80vh] w-full border border-border" />}
        </div></section>
        <CTASection />
      </>
    );
  },
});
