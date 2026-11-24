import { getCollection } from "astro:content";
import { defineMiddleware } from "astro:middleware";
import { SITE_URL } from "@data/index";
import { resolveLegacyPath } from "@utils/legacy-redirects";
import { markdownPathFor } from "@utils/llms";
import { absoluteUrl, normalizePath } from "@utils/seo";

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

function wantsMarkdown(request: Request): boolean {
	if (request.method !== "GET" && request.method !== "HEAD") return false;
	const accept = request.headers.get("accept")?.toLowerCase() ?? "";
	return accept.includes("text/markdown");
}

function cacheControlFor(
	pathname: string,
	contentType: string | null,
): string | null {
	if (pathname.startsWith("/og/")) return null;

	if (
		pathname === "/robots.txt" ||
		pathname === "/llms.txt" ||
		pathname === "/llms-full.txt" ||
		pathname === "/rss.xml" ||
		pathname.startsWith("/sitemap")
	) {
		return FEED_CACHE;
	}

	if (
		contentType?.includes("text/html") ||
		contentType?.includes("text/markdown")
	) {
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

	const normalizedPath = normalizePath(context.url.pathname);
	const mdAlternate = markdownPathFor(normalizedPath, slugs);

	const response =
		mdAlternate && wantsMarkdown(context.request)
			? await context.rewrite(mdAlternate)
			: await next();

	const contentType = response.headers.get("content-type");
	const cacheControl =
		response.status >= 400
			? NO_STORE
			: cacheControlFor(context.url.pathname, contentType);

	const isHtml = contentType?.includes("text/html") ?? false;
	const needsHeaders =
		Boolean(cacheControl) ||
		Boolean(mdAlternate) ||
		(isHtml && response.status < 400);

	if (!needsHeaders) return response;

	const headers = new Headers(response.headers);

	if (cacheControl) {
		headers.set("Cache-Control", cacheControl);
	}

	if (mdAlternate) {
		const existingVary = headers.get("Vary");
		if (!existingVary?.toLowerCase().includes("accept")) {
			headers.set("Vary", existingVary ? `${existingVary}, Accept` : "Accept");
		}
	}

	if (isHtml && response.status < 400) {
		const links = [
			`<${SITE_URL}/llms.txt>; rel="describedby"; type="text/plain"`,
		];
		if (mdAlternate) {
			links.push(
				`<${absoluteUrl(mdAlternate)}>; rel="alternate"; type="text/markdown"`,
			);
		}
		headers.append("Link", links.join(", "));
	}

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
});
