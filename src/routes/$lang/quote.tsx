import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { ui, useLang } from "@/i18n";
import { seo, langOf } from "@/lib/seo";
import { Breadcrumbs, PageHero } from "@/components/site/blocks";
import { QuoteRequestForm } from "@/components/site/QuoteRequestForm";
import { processSteps } from "@/content/home";
import hero from "@/assets/svc-tank.jpg";

export const Route = createFileRoute("/$lang/quote")({
  validateSearch: z.object({ service: z.string().optional() }),
  head: ({ params }) => {
    const l = langOf(params);
    return seo(l, "/quote", ui.cta.quote[l], l === "id" ? "Kirim permintaan penawaran untuk layanan surface preparation, coating, fabrikasi, dan konstruksi industri." : "Request a quotation for surface preparation, coating, fabrication, and industrial construction services.");
  },
  component: QuotePage,
});

function QuotePage() {
  const lang = useLang();
  const { service } = Route.useSearch();
  return (
    <>
      <PageHero image={hero} eyebrow={ui.cta.quote[lang]} title={ui.finalCta.title[lang]} intro={ui.finalCta.body[lang]}>
        <Breadcrumbs items={[{ label: ui.nav.home[lang], to: "/$lang", params: { lang } }, { label: ui.cta.quote[lang] }]} />
      </PageHero>
      <section className="section-y">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-8"><QuoteRequestForm defaultService={service} /></div>
          <aside className="lg:col-span-4">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{lang === "id" ? "Langkah selanjutnya" : "What happens next"}</p>
            <ol className="mt-4 space-y-4">
              {processSteps.map((s, i) => <li key={i} className="flex gap-4"><span className="font-display font-extrabold text-accent">0{i + 1}</span><span className="text-sm">{s[lang]}</span></li>)}
            </ol>
          </aside>
        </div>
      </section>
    </>
  );
}
