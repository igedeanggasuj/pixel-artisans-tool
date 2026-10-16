import { createFileRoute, Link } from "@tanstack/react-router";
import { ui, useLang } from "@/i18n";
import { seo, langOf } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { Breadcrumbs, PageHero, SetupNotice, WhatsAppButton } from "@/components/site/blocks";
import { QuoteRequestForm } from "@/components/site/QuoteRequestForm";
import hero from "@/assets/svc-construction.jpg";

export const Route = createFileRoute("/$lang/contact")({
  head: ({ params }) => {
    const l = langOf(params);
    return seo(l, "/contact", ui.nav.contact[l], l === "id" ? "Hubungi GANDUSTECHNO melalui email, WhatsApp, atau formulir permintaan." : "Contact GANDUSTECHNO by email, WhatsApp, or the inquiry form.");
  },
  component: Contact,
});

function Contact() {
  const lang = useLang();
  const id = lang === "id";
  const pending = id ? "Belum dikonfigurasi" : "Not yet configured";
  const missing = !siteConfig.contactEmail || !siteConfig.whatsappNumber || !siteConfig.address;
  const rows: [string, React.ReactNode][] = [
    ["Email", siteConfig.contactEmail ? <a href={`mailto:${siteConfig.contactEmail}`} className="text-primary underline decoration-accent">{siteConfig.contactEmail}</a> : <em className="text-muted-foreground">{pending}</em>],
    [id ? "Telepon" : "Phone", siteConfig.phone ?? <em className="text-muted-foreground">{pending}</em>],
    [id ? "Alamat kantor" : "Office address", siteConfig.address ?? <em className="text-muted-foreground">{pending}</em>],
    ...(siteConfig.operatingHours ? [[id ? "Jam operasional" : "Operating hours", siteConfig.operatingHours[lang]] as [string, React.ReactNode]] : []),
  ];
  return (
    <>
      <PageHero image={hero} eyebrow={ui.nav.contact[lang]} title={ui.finalCta.title[lang]} intro={ui.finalCta.body[lang]}>
        <Breadcrumbs items={[{ label: ui.nav.home[lang], to: "/$lang", params: { lang } }, { label: ui.nav.contact[lang] }]} />
      </PageHero>
      <section className="section-y">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-2xl font-extrabold text-primary">{id ? "Informasi Kontak" : "Contact Information"}</h2>
            <dl className="mt-6 divide-y divide-border border-y border-border">
              {rows.map(([k, v]) => <div key={k} className="py-4"><dt className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{k}</dt><dd className="mt-1">{v}</dd></div>)}
            </dl>
            <div className="mt-6 flex flex-col gap-3">
              <WhatsAppButton variant="btn-navy" />
              <Link to="/$lang/quote" params={{ lang }} className="btn btn-accent">{ui.cta.quote[lang]}</Link>
            </div>
            {missing && <div className="mt-6"><SetupNotice>{id ? "Email, nomor WhatsApp, dan alamat kantor resmi perlu ditambahkan oleh perusahaan. Peta akan ditampilkan setelah alamat terverifikasi tersedia." : "The official email, WhatsApp number, and office address need to be supplied by the company. A map will appear once a verified address is available."}</SetupNotice></div>}
            {siteConfig.address && <iframe title="Map" loading="lazy" className="mt-6 aspect-square w-full border border-border" src={`https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address)}&output=embed`} />}
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <h2 className="mb-8 text-2xl font-extrabold text-primary">{id ? "Formulir Permintaan" : "Inquiry Form"}</h2>
            <QuoteRequestForm />
          </div>
        </div>
      </section>
    </>
  );
}
