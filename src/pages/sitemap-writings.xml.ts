import { getCollection } from "astro:content";
import { SITE_URL } from "@data/index";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
	const posts = await getCollection("writing");

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${posts
		.map(
			(post) => `<url>
    <loc>${SITE_URL}/${post.id}</loc>
    <lastmod>${(post.data.updatedDate ?? post.data.pubDate).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
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
