import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { isLang } from "@/i18n";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/$lang")({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang)) throw notFound();
  },
  head: () => ({
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Organization", name: "GANDUSTECHNO", url: siteConfig.siteUrl, ...(siteConfig.contactEmail ? { email: siteConfig.contactEmail } : {}) },
            { "@type": "WebSite", name: "GANDUSTECHNO", url: siteConfig.siteUrl, inLanguage: ["id", "en"] },
          ],
        }),
      },
    ],
  }),
  component: LangLayout,
});

function LangLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:bg-accent focus:p-3">Skip to content</a>
      <SiteHeader />
      <main id="main" className="flex-1"><Outlet /></main>
      <SiteFooter />
    </div>
  );
}
