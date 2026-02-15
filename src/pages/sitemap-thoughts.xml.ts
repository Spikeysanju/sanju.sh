import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async () => {
	const thoughts = await getCollection("thought");

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${thoughts
		.map(
			(post) => `<url>
    <loc>${new URL("/" + post.slug, import.meta.env.SITE).href}</loc>
    <lastmod>${(post.data.updatedDate ?? post.data.pubDate).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`,
		)
		.join("\n  ")}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
		},
	});
};
