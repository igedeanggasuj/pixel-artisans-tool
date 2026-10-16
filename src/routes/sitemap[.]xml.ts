import { createFileRoute } from "@tanstack/react-router";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { projects } from "@/content/projects";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const paths = ["", "/about", "/services", "/projects", "/industries", "/hse-quality", "/company-profile", "/contact", "/quote", "/privacy-policy",
          ...services.map((s) => `/services/${s.slug}`), ...projects.filter((p) => !p.sample).map((p) => `/projects/${p.slug}`)];
        const b = siteConfig.siteUrl;
        const urls = paths.flatMap((p) => ["id", "en"].map((l) => `<url><loc>${b}/${l}${p}</loc><xhtml:link rel="alternate" hreflang="id" href="${b}/id${p}"/><xhtml:link rel="alternate" hreflang="en" href="${b}/en${p}"/></url>`)).join("");
        return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
