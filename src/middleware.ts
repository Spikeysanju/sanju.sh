import { defineMiddleware } from "astro:middleware";

const HTML_CACHE = "public, s-maxage=3600, stale-while-revalidate=86400";
const FEED_CACHE = "public, s-maxage=1800, stale-while-revalidate=86400";
const NO_STORE = "no-store";

function cacheControlFor(
	pathname: string,
	contentType: string | null,
): string | null {
	if (pathname.startsWith("/og/")) return null;

	if (
		pathname === "/robots.txt" ||
		pathname === "/rss.xml" ||
		pathname.startsWith("/sitemap")
	) {
		return FEED_CACHE;
	}

	if (contentType?.includes("text/html")) {
		// never cache error responses aggressively later; caller checks status
		return HTML_CACHE;
	}

	return null;
}

export const onRequest = defineMiddleware(async (context, next) => {
	const response = await next();
	const contentType = response.headers.get("content-type");
	const cacheControl =
		response.status >= 400
			? NO_STORE
			: cacheControlFor(context.url.pathname, contentType);

	if (!cacheControl) return response;

	const headers = new Headers(response.headers);
	headers.set("Cache-Control", cacheControl);

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
});
