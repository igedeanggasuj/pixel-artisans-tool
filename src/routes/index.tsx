import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/$lang", params: { lang: "id" } });
  },
  head: () => ({
    meta: [
      { title: "GANDUSTECHNO — Industrial Services & Engineering" },
      { name: "description", content: "Surface preparation, protective coating, steel fabrication, and industrial construction services." },
      { property: "og:title", content: "GANDUSTECHNO — Industrial Services & Engineering" },
      { property: "og:description", content: "Surface preparation, protective coating, steel fabrication, and industrial construction services." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});
