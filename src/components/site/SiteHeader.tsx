import { Link, useLocation } from "@tanstack/react-router";
import { Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { ui, useLang, type Lang } from "@/i18n";
import { whatsappLink } from "@/config/site";

const items = [
  { to: "/$lang", key: "home" },
  { to: "/$lang/about", key: "about" },
  { to: "/$lang/services", key: "services" },
  { to: "/$lang/projects", key: "projects" },
  { to: "/$lang/hse-quality", key: "hse" },
  { to: "/$lang/contact", key: "contact" },
] as const;

export function LanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const lang = useLang();
  const { pathname } = useLocation();
  const swap = (l: Lang) => pathname.replace(/^\/(id|en)(?=\/|$)/, `/${l}`) || `/${l}`;
  return (
    <div className={`flex items-center gap-1 text-xs font-semibold tracking-wider ${dark ? "text-on-dark-muted" : "text-muted-foreground"}`} aria-label="Language">
      {(["id", "en"] as const).map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span aria-hidden>|</span>}
          <a href={swap(l)} hrefLang={l} aria-current={lang === l ? "true" : undefined}
            className={`px-1 py-1 uppercase ${lang === l ? "text-accent" : "hover:text-foreground"}`}>{l}</a>
        </span>
      ))}
    </div>
  );
}

export function SiteHeader() {
  const lang = useLang();
  const [open, setOpen] = useState(false);
  const wa = whatsappLink(lang);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="container-x flex h-18 items-center justify-between gap-6 py-4">
        <Link to="/$lang" params={{ lang }} className="flex items-center gap-2.5" aria-label="GANDUSTECHNO">
          <span className="grid h-8 w-8 place-items-center bg-primary font-display text-sm font-extrabold text-primary-foreground">G</span>
          <span className="font-display text-lg font-extrabold tracking-tight text-primary">GANDUS<span className="text-accent">TECHNO</span></span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {items.map((it) => (
            <Link key={it.key} to={it.to} params={{ lang }} activeOptions={{ exact: it.key === "home" }}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary data-[status=active]:text-primary data-[status=active]:underline data-[status=active]:decoration-accent data-[status=active]:decoration-2 data-[status=active]:underline-offset-8">
              {ui.nav[it.key][lang]}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher />
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-primary hover:text-accent"><MessageCircle className="h-5 w-5" /></a>
          )}
          <Link to="/$lang/quote" params={{ lang }} className="btn btn-accent">{ui.cta.quote[lang]}</Link>
        </div>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container-x flex flex-col py-4" aria-label="Mobile">
            {items.map((it) => (
              <Link key={it.key} to={it.to} params={{ lang }} onClick={() => setOpen(false)} className="border-b border-border py-3 font-medium">
                {ui.nav[it.key][lang]}
              </Link>
            ))}
            <div className="flex items-center justify-between py-4"><LanguageSwitcher />
              {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary">WhatsApp</a>}
            </div>
            <Link to="/$lang/quote" params={{ lang }} onClick={() => setOpen(false)} className="btn btn-accent">{ui.cta.quote[lang]}</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
