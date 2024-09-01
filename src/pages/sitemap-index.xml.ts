import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
	// Generate the sitemap index
	const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${new URL("/sitemap-main.xml", import.meta.env.SITE).href}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${new URL("/sitemap-writings.xml", import.meta.env.SITE).href}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${new URL("/sitemap-thoughts.xml", import.meta.env.SITE).href}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${new URL("/sitemap-ships.xml", import.meta.env.SITE).href}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  </sitemapindex>`;

	return new Response(sitemapIndex, {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
		},
	});
};
