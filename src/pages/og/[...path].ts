import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { renderOgImage } from "@utils/og";

const COLLECTION_MAP: Record<string, string> = {
	writings: "writing",
	thoughts: "thought",
	ships: "ship",
};

export const GET: APIRoute = async ({ params, request }) => {
	const fallback = new URL("/images/ogimage.png", request.url).toString();

	try {
		const path = params.path || "";
		const [section, ...rest] = path.split("/");
		const slug = rest.join("/");

		const collectionName = COLLECTION_MAP[section];
		if (!collectionName || !slug) return Response.redirect(fallback, 302);

		const posts = await getCollection(collectionName as any);
		const post = posts.find((p: any) => p.slug === slug);
		if (!post) return Response.redirect(fallback, 302);

		const png = await renderOgImage(
			post.data.title,
			section,
			new URL(request.url).origin,
		);

		return new Response(png, {
			headers: {
				"Content-Type": "image/png",
				"Cache-Control": "public, max-age=86400, s-maxage=604800",
			},
		});
	} catch (e) {
		console.error("OG image generation failed:", e);
		return Response.redirect(fallback, 302);
	}
};
