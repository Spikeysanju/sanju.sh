import { getCollection } from "astro:content";
import { defineMiddleware } from "astro:middleware";
import { SITE_URL } from "@data/index";
import { resolveLegacyPath } from "@utils/legacy-redirects";
import { normalizePath } from "@utils/seo";

const HTML_CACHE = "public, s-maxage=3600, stale-while-revalidate=86400";
const FEED_CACHE = "public, s-maxage=1800, stale-while-revalidate=86400";
const NO_STORE = "no-store";

let liveSlugs: Set<string> | null = null;

async function getLiveSlugs(): Promise<Set<string>> {
	if (liveSlugs) return liveSlugs;

	const [writings, thoughts] = await Promise.all([
		getCollection("writing"),
		getCollection("thought"),
	]);

	liveSlugs = new Set([
		...writings.map((post) => post.id),
		...thoughts.map((post) => post.id),
	]);
	return liveSlugs;
}

function requestHost(request: Request, fallback: string): string {
	const header = request.headers.get("host");
	return (header ?? fallback).split(":")[0]?.toLowerCase() ?? fallback;
}

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
	const slugs = await getLiveSlugs();
	const pathRedirect = resolveLegacyPath(context.url.pathname, slugs);
	const isWww =
		requestHost(context.request, context.url.hostname) === "www.sanju.sh";

	if (isWww || pathRedirect) {
		const destPath = pathRedirect ?? normalizePath(context.url.pathname);
		const dest = new URL(
			destPath === "/" ? `${SITE_URL}/` : `${SITE_URL}${destPath}`,
		);
		dest.search = context.url.search;

		if (
			context.url.origin !== dest.origin ||
			context.url.pathname !== dest.pathname
		) {
			return context.redirect(dest.href, 301);
		}
	}

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
