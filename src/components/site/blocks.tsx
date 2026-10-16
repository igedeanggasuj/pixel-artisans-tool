import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, Info } from "lucide-react";
import type { ReactNode } from "react";
import { ui, useLang } from "@/i18n";
import type { Service } from "@/content/services";
import type { Project } from "@/content/projects";
import type { Industry } from "@/content/industries";
import { services } from "@/content/services";
import { whatsappLink } from "@/config/site";

export function PageHero({ eyebrow, title, intro, image, children }: { eyebrow: string; title: string; intro?: string; image?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-navy text-on-dark">
      {image && <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" width={1280} height={896} />}
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="container-x relative py-20 lg:py-28">
        {children}
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.05] md:text-6xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-on-dark-muted">{intro}</p>}
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string; params?: Record<string, string> }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-on-dark-muted">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3 w-3" aria-hidden />}
            {it.to ? <Link to={it.to} params={it.params as never} className="hover:text-on-dark">{it.label}</Link> : <span aria-current="page" className="text-on-dark">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function SectionHead({ eyebrow, title, intro, align = "left" }: { eyebrow: string; title: string; intro?: string; align?: "left" | "split" }) {
  if (align === "split")
    return (
      <div className="grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7"><p className="eyebrow">{eyebrow}</p><h2 className="mt-4 text-3xl font-extrabold text-primary md:text-5xl">{title}</h2></div>
        {intro && <p className="text-muted-foreground md:col-span-5">{intro}</p>}
      </div>
    );
  return (
    <div className="max-w-3xl"><p className="eyebrow">{eyebrow}</p><h2 className="mt-4 text-3xl font-extrabold text-primary md:text-5xl">{title}</h2>{intro && <p className="mt-5 text-lg text-muted-foreground">{intro}</p>}</div>
  );
}

export function ServiceCard({ s }: { s: Service }) {
  const lang = useLang();
  return (
    <Link to="/$lang/services/$slug" params={{ lang, slug: s.slug }} className="group relative block aspect-[4/5] overflow-hidden bg-navy text-on-dark">
      <img src={s.image} alt={s.title[lang]} loading="lazy" width={1280} height={896} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-card-overlay" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="font-display text-sm font-bold text-accent">{s.num}</p>
        <h3 className="mt-2 text-xl font-bold leading-tight">{s.title[lang]}</h3>
        <p className="mt-2 text-sm text-on-dark-muted">{s.short[lang]}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">{ui.cta.learnMore[lang]} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
      </div>
    </Link>
  );
}

export function SampleBadge() {
  const lang = useLang();
  return <span className="inline-block bg-accent px-2 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-accent-foreground">{ui.sample[lang]}</span>;
}

export function ProjectCard({ p }: { p: Project }) {
  const lang = useLang();
  const svc = services.find((s) => s.slug === p.category);
  return (
    <Link to="/$lang/projects/$slug" params={{ lang, slug: p.slug }} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img src={p.cover} alt={p.title[lang]} loading="lazy" width={1280} height={896} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        {p.sample && <div className="absolute left-3 top-3"><SampleBadge /></div>}
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{svc?.title[lang]} · {p.industry[lang]}</p>
      <h3 className="mt-1.5 text-lg font-bold text-primary group-hover:text-accent">{p.title[lang]}</h3>
      {(p.location || p.year) && <p className="mt-1 text-sm text-muted-foreground">{[p.location, p.year].filter(Boolean).join(" · ")}</p>}
    </Link>
  );
}

export function IndustryCard({ ind }: { ind: Industry }) {
  const lang = useLang();
  return (
    <article className="group bg-background">
      <div className="aspect-[3/2] overflow-hidden bg-muted"><img src={ind.image} alt={ind.name[lang]} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
      <div className="border-x border-b border-border p-5">
        <h3 className="text-lg font-bold text-primary">{ind.name[lang]}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{ind.text[lang]}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {ind.services.map((sl) => {
            const s = services.find((x) => x.slug === sl)!;
            return <li key={sl}><Link to="/$lang/services/$slug" params={{ lang, slug: sl }} className="inline-block bg-muted px-2 py-1 text-xs font-medium text-primary hover:bg-accent hover:text-accent-foreground">{s.title[lang]}</Link></li>;
          })}
        </ul>
      </div>
    </article>
  );
}

export function EmptyState({ title, body }: { title: string; body?: string }) {
  return (
    <div className="border border-dashed border-input bg-muted/50 px-6 py-14 text-center" role="status">
      <p className="font-display text-lg font-bold text-primary">{title}</p>
      {body && <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{body}</p>}
    </div>
  );
}

export function SetupNotice({ children }: { children: ReactNode }) {
  const lang = useLang();
  return (
    <div className="flex gap-3 border-l-4 border-accent bg-muted p-4 text-sm text-foreground" role="note">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
      <div><p className="font-bold uppercase tracking-wider text-xs text-accent">{ui.setup[lang]}</p><div className="mt-1 text-muted-foreground">{children}</div></div>
    </div>
  );
}

export function WhatsAppButton({ service, variant = "btn-outline" }: { service?: string; variant?: string }) {
  const lang = useLang();
  const href = whatsappLink(lang, service);
  if (!href)
    return <span className="btn border border-dashed border-input text-muted-foreground" title="WhatsApp number not configured">WhatsApp · {ui.setup[lang]}</span>;
  return <a href={href} target="_blank" rel="noopener noreferrer" className={`btn ${variant}`}>{ui.cta.whatsapp[lang]}</a>;
}

export function CTASection() {
  const lang = useLang();
  return (
    <section className="bg-navy text-on-dark">
      <div className="container-x grid gap-10 py-20 md:grid-cols-12 md:items-center lg:py-28">
        <div className="md:col-span-8">
          <h2 className="text-3xl font-extrabold leading-tight md:text-5xl">{ui.finalCta.title[lang]}</h2>
          <p className="mt-5 max-w-2xl text-on-dark-muted">{ui.finalCta.body[lang]}</p>
        </div>
        <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
          <Link to="/$lang/quote" params={{ lang }} className="btn btn-accent">{ui.cta.quote[lang]} <ArrowRight className="h-4 w-4" /></Link>
          <Link to="/$lang/contact" params={{ lang }} className="btn btn-outline-light">{ui.cta.contactTeam[lang]}</Link>
        </div>
      </div>
    </section>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {items.map((x) => <li key={x} className="flex gap-3 py-3 text-foreground"><span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />{x}</li>)}
    </ul>
  );
}
