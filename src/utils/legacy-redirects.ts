import { normalizePath } from "./seo";

const SLUG_ALIASES: Record<string, string> = {
	"building-side-projects": "side-projects",
	"stop-asking-for-design-feedback": "design-feedback",
	"sanju's-internet-space": "internet-space",
	"why-greatness-cannot-be-planned": "greatness",
	"the-next-thing": "next-thing",
	"unpopular-bond-in-opensource": "opensource",
	"screenshots-or-it-didnt-happen": "screenshots",
	"ai-never-sleeps": "sleepless-ai",
	"slow-software-is-rude": "slow-software",
	"ai-is-learning-taste": "taste",
	"design-lessons-chinese-tea-cups": "teacups",
	"chinese-tea-cup": "teacups",
	"dont-ask-what-to-learn": "what-to-learn",
	"selective-access-is-a-flex": "access",
	"capture-the-why": "capture-why",
	"claude-md": "agents-md",
};

const EXACT_PATH_REDIRECTS: Record<string, string> = {
	"/writing": "/writings",
	"/sitemap.xml": "/sitemap-index.xml",
};

const STATIC_DESTINATIONS = new Set([
	"/",
	"/writings",
	"/thoughts",
	"/me",
	"/sitemap-index.xml",
]);

function decodePathname(pathname: string): string {
	let decoded = pathname;
	try {
		decoded = decodeURIComponent(pathname);
	} catch {
		decoded = pathname;
	}
	return decoded.replace(/[\u2018\u2019\u201B]/g, "'");
}

function destinationExists(dest: string, liveSlugs: Set<string>): boolean {
	if (STATIC_DESTINATIONS.has(dest)) return true;
	return liveSlugs.has(dest.slice(1));
}

/** return a live destination path, or null if this URL should not redirect */
export function resolveLegacyPath(
	pathname: string,
	liveSlugs: Set<string>,
): string | null {
	const path = normalizePath(decodePathname(pathname));

	if (path === "/ships" || path.startsWith("/ships/")) {
		return "/";
	}

	const exact = EXACT_PATH_REDIRECTS[path];
	if (exact && destinationExists(exact, liveSlugs)) return exact;

	const slug = path.startsWith("/") ? path.slice(1) : path;
	const alias = SLUG_ALIASES[slug];
	if (alias) {
		const dest = `/${alias}`;
		return destinationExists(dest, liveSlugs) ? dest : null;
	}

	const prefixed = /^\/(?:writings|thoughts)\/(.+)$/.exec(path);
	if (!prefixed) return null;

	const mapped = SLUG_ALIASES[prefixed[1]] ?? prefixed[1];
	const dest = `/${mapped}`;
	return destinationExists(dest, liveSlugs) ? dest : null;
}
