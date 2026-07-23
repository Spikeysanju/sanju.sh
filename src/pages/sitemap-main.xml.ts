import { SITE_URL } from "@data/index";
import type { APIRoute } from "astro";

const now = new Date().toISOString();

const pages = [
	{ path: "/", changefreq: "weekly", priority: "1.0" },
	{ path: "/writings", changefreq: "weekly", priority: "0.8" },
	{ path: "/thoughts", changefreq: "weekly", priority: "0.8" },
	{ path: "/me", changefreq: "monthly", priority: "0.7" },
];

export const GET: APIRoute = async () => {
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
		.map(
			(page) => `<url>
    <loc>${page.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${page.path}`}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
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
