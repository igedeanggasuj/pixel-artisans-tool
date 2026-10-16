import { createFileRoute } from "@tanstack/react-router";
import { ui, useLang } from "@/i18n";
import { seo, langOf } from "@/lib/seo";
import { Breadcrumbs, PageHero } from "@/components/site/blocks";

export const Route = createFileRoute("/$lang/privacy-policy")({
  head: ({ params }) => {
    const l = langOf(params);
    return seo(l, "/privacy-policy", ui.nav.privacy[l], l === "id" ? "Bagaimana GANDUSTECHNO mengumpulkan dan menggunakan data dari formulir situs web." : "How GANDUSTECHNO collects and uses data submitted through website forms.");
  },
  component: () => {
    const lang = useLang();
    const id = lang === "id";
    const items = id
      ? [["Data yang dikumpulkan", "Nama, perusahaan, email, telepon, dan detail proyek yang Anda kirimkan melalui formulir."], ["Penggunaan data", "Data digunakan hanya untuk menanggapi permintaan Anda dan mengoordinasikan penawaran."], ["Penyimpanan & akses", "Data permintaan tidak dapat diakses publik dan hanya dapat dilihat oleh personel yang berwenang."], ["Hak Anda", "Anda dapat meminta akses, koreksi, atau penghapusan data dengan menghubungi kami."]]
      : [["Data collected", "Name, company, email, phone, and project details you submit through our forms."], ["Use of data", "Data is used only to respond to your inquiry and coordinate quotations."], ["Storage & access", "Inquiry data is not publicly accessible and is only visible to authorised personnel."], ["Your rights", "You may request access, correction, or deletion of your data by contacting us."]];
    return (
      <>
        <PageHero eyebrow={ui.nav.privacy[lang]} title={ui.nav.privacy[lang]}>
          <Breadcrumbs items={[{ label: ui.nav.home[lang], to: "/$lang", params: { lang } }, { label: ui.nav.privacy[lang] }]} />
        </PageHero>
        <section className="section-y"><div className="container-x max-w-3xl space-y-10">
          {items.map(([h, p]) => <div key={h}><h2 className="text-xl font-bold text-primary">{h}</h2><p className="mt-2 text-muted-foreground">{p}</p></div>)}
          <p className="text-sm italic text-muted-foreground">{id ? "Draf kebijakan ini perlu ditinjau oleh perusahaan sebelum publikasi." : "This draft policy must be reviewed by the company before publication."}</p>
        </div></section>
      </>
    );
  },
});
