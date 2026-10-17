import { siteConfig } from "@/config/site";
import type { Lang } from "@/i18n";

/** Build per-page head: title, description, OG, canonical and hreflang. `path` excludes the lang prefix. */
export function seo(lang: Lang, path: string, title: string, description: string) {
  const base = siteConfig.siteUrl;
  const p = path === "/" ? "" : path;
  const full = `${title} | PT. NAFAZ SANDBLASTING INDONESIA`;
  return {
    meta: [
      { title: full },
      { name: "description", content: description },
      { property: "og:title", content: full },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: lang === "id" ? "id_ID" : "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: full },
      { name: "twitter:description", content: description },
    ],
    links: [
      { rel: "canonical", href: `${base}/${lang}${p}` },
      { rel: "alternate", hrefLang: "id", href: `${base}/id${p}` },
      { rel: "alternate", hrefLang: "en", href: `${base}/en${p}` },
      { rel: "alternate", hrefLang: "x-default", href: `${base}/id${p}` },
    ],
  };
}

export const langOf = (params: { lang?: string }): Lang => (params.lang === "en" ? "en" : "id");
