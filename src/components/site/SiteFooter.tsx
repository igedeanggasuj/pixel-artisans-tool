import { Link } from "@tanstack/react-router";
import { ui, useLang } from "@/i18n";
import { services } from "@/content/services";
import { siteConfig, whatsappLink } from "@/config/site";
import { LanguageSwitcher } from "./SiteHeader";

export function SiteFooter() {
  const lang = useLang();
  const wa = whatsappLink(lang);
  const pending = lang === "id" ? "Belum dikonfigurasi" : "Not yet configured";
  return (
    <footer className="bg-navy text-on-dark">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="font-display text-xl font-extrabold">GANDUS<span className="text-accent">TECHNO</span></p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-on-dark-muted">{ui.positioning[lang]}</p>
          <div className="mt-6"><LanguageSwitcher dark /></div>
        </div>
        <div className="md:col-span-3">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">{ui.nav.services[lang]}</p>
          <ul className="mt-4 space-y-2.5 text-sm text-on-dark-muted">
            {services.map((s) => (
              <li key={s.slug}><Link to="/$lang/services/$slug" params={{ lang, slug: s.slug }} className="hover:text-on-dark">{s.title[lang]}</Link></li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">{lang === "id" ? "Perusahaan" : "Company"}</p>
          <ul className="mt-4 space-y-2.5 text-sm text-on-dark-muted">
            <li><Link to="/$lang/about" params={{ lang }} className="hover:text-on-dark">{ui.nav.about[lang]}</Link></li>
            <li><Link to="/$lang/projects" params={{ lang }} className="hover:text-on-dark">{ui.nav.projects[lang]}</Link></li>
            <li><Link to="/$lang/industries" params={{ lang }} className="hover:text-on-dark">{ui.nav.industries[lang]}</Link></li>
            <li><Link to="/$lang/hse-quality" params={{ lang }} className="hover:text-on-dark">{ui.nav.hse[lang]}</Link></li>
            <li><Link to="/$lang/company-profile" params={{ lang }} className="hover:text-on-dark">{ui.nav.profile[lang]}</Link></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">{ui.nav.contact[lang]}</p>
          <ul className="mt-4 space-y-2.5 text-sm text-on-dark-muted">
            <li>Email: {siteConfig.contactEmail ? <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-on-dark">{siteConfig.contactEmail}</a> : <em>{pending}</em>}</li>
            <li>WhatsApp: {wa ? <a href={wa} target="_blank" rel="noopener noreferrer" className="hover:text-on-dark">{lang === "id" ? "Chat sekarang" : "Chat now"}</a> : <em>{pending}</em>}</li>
            <li>{lang === "id" ? "Alamat" : "Address"}: {siteConfig.address ?? <em>{pending}</em>}</li>
          </ul>
          <Link to="/$lang/quote" params={{ lang }} className="btn btn-accent mt-6">{ui.cta.quote[lang]}</Link>
        </div>
      </div>
      <div className="border-t border-line-dark">
        <div className="container-x flex flex-col justify-between gap-2 py-6 text-xs text-on-dark-muted md:flex-row">
          <p>© {new Date().getFullYear()} GANDUSTECHNO</p>
          <Link to="/$lang/privacy-policy" params={{ lang }} className="hover:text-on-dark">{ui.nav.privacy[lang]}</Link>
        </div>
      </div>
    </footer>
  );
}
