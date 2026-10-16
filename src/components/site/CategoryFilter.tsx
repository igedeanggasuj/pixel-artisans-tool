import { services } from "@/content/services";
import type { Lang } from "@/i18n";

export function CategoryFilter({ lang, value, onChange }: { lang: Lang; value: string; onChange: (v: string) => void }) {
  const opts = [{ v: "all", l: lang === "id" ? "Semua Proyek" : "All Projects" }, ...services.map((s) => ({ v: s.slug, l: s.title[lang].split(" & ")[0] }))];
  return (
    <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter">
      {opts.map((o) => (
        <button key={o.v} onClick={() => onChange(o.v)} aria-pressed={value === o.v}
          className={`border px-4 py-2 text-sm font-medium transition-colors ${value === o.v ? "border-primary bg-primary text-primary-foreground" : "border-input bg-background text-foreground hover:border-primary"}`}>{o.l}</button>
      ))}
    </div>
  );
}
