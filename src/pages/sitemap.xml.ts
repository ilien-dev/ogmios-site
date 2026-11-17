// The map of the site for search engines: every page with its other language, the day it
// was built and the captures on it.
import type { APIRoute } from "astro";
import { topics } from "../i18n/topics";

const site = "https://ogmios.ilien.dev";
const pages = [
  { en: "/", es: "/es/", shots: ["conversation", "feedback", "book", "practice"] },
  ...Object.values(topics.en).map((topic) => ({ en: topic.paths.en, es: topic.paths.es, shots: topic.shots.map((shot) => shot.src) })),
];

export const GET: APIRoute = () => {
  const day = new Date().toISOString().slice(0, 10);
  const urls = pages.flatMap((page) =>
    (["en", "es"] as const).map(
      (lang) => `  <url>
    <loc>${site}${page[lang]}</loc>
    <lastmod>${day}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${site}${page.en}" />
    <xhtml:link rel="alternate" hreflang="es" href="${site}${page.es}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${site}${page.en}" />
${page.shots.map((shot) => `    <image:image><image:loc>${site}/screens/${shot}.png</image:loc></image:image>`).join("\n")}
  </url>`,
    ),
  );
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join("\n")}
</urlset>
`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
