import {
	AUTHOR_EMAIL,
	AUTHOR_IMAGE,
	AUTHOR_JOB_TITLE,
	AUTHOR_NAME,
	PERSON_ID,
	SITE_DESCRIPTION,
	SITE_TITLE,
	SITE_URL,
	WEBSITE_ID,
	sameAs,
} from "@data/index";

export type BreadcrumbItem = {
	name: string;
	url: string;
};

/** strip trailing slashes except for root */
export function normalizePath(pathname: string): string {
	if (!pathname || pathname === "/") return "/";
	return pathname.replace(/\/+$/, "");
}

/** absolute site url with normalized path */
export function absoluteUrl(path = "/"): string {
	const normalized = normalizePath(
		path.startsWith("http") ? new URL(path).pathname : path,
	);
	if (normalized === "/") return `${SITE_URL}/`;
	return `${SITE_URL}${
		normalized.startsWith("/") ? normalized : `/${normalized}`
	}`;
}

export function absoluteAssetUrl(path: string, base?: string | URL): string {
	if (path.startsWith("http://") || path.startsWith("https://")) return path;
	const origin = base ? new URL(base).origin : SITE_URL;
	return new URL(path.startsWith("/") ? path : `/${path}`, origin).toString();
}

export function personJsonLd(imageOrigin?: string | URL) {
	return {
		"@type": "Person",
		"@id": PERSON_ID,
		name: AUTHOR_NAME,
		url: `${SITE_URL}/`,
		image: absoluteAssetUrl(AUTHOR_IMAGE, imageOrigin),
		jobTitle: AUTHOR_JOB_TITLE,
		email: AUTHOR_EMAIL,
		sameAs,
		worksFor: {
			"@type": "Organization",
			name: "ThisUX",
			url: "https://thisux.com",
		},
	};
}

export function websiteJsonLd(description = SITE_DESCRIPTION) {
	return {
		"@type": "WebSite",
		"@id": WEBSITE_ID,
		name: SITE_TITLE,
		url: `${SITE_URL}/`,
		description,
		inLanguage: "en-US",
		publisher: { "@id": PERSON_ID },
		author: { "@id": PERSON_ID },
	};
}

export function profilePageJsonLd(options: {
	url: string;
	name: string;
	description: string;
	imageOrigin?: string | URL;
}) {
	return {
		"@context": "https://schema.org",
		"@graph": [
			personJsonLd(options.imageOrigin),
			websiteJsonLd(options.description),
			{
				"@type": "ProfilePage",
				"@id": `${options.url}#profile`,
				url: options.url,
				name: options.name,
				description: options.description,
				inLanguage: "en-US",
				isPartOf: { "@id": WEBSITE_ID },
				mainEntity: { "@id": PERSON_ID },
			},
		],
	};
}

export function websitePageJsonLd(options: {
	description?: string;
	imageOrigin?: string | URL;
}) {
	return {
		"@context": "https://schema.org",
		"@graph": [
			personJsonLd(options.imageOrigin),
			websiteJsonLd(options.description),
		],
	};
}

export function blogPostingJsonLd(options: {
	title: string;
	description: string;
	url: string;
	image: string;
	datePublished?: Date;
	dateModified?: Date;
	breadcrumbs?: BreadcrumbItem[];
	wordCount?: number;
}) {
	const graph: Record<string, unknown>[] = [
		personJsonLd(),
		websiteJsonLd(),
		{
			"@type": "BlogPosting",
			"@id": `${options.url}#article`,
			headline: options.title,
			description: options.description,
			image: {
				"@type": "ImageObject",
				url: options.image,
				width: 1200,
				height: 630,
			},
			url: options.url,
			mainEntityOfPage: {
				"@type": "WebPage",
				"@id": options.url,
			},
			datePublished: options.datePublished?.toISOString(),
			dateModified: (
				options.dateModified ?? options.datePublished
			)?.toISOString(),
			author: { "@id": PERSON_ID },
			publisher: { "@id": PERSON_ID },
			inLanguage: "en-US",
			isPartOf: { "@id": WEBSITE_ID },
			...(options.wordCount ? { wordCount: options.wordCount } : {}),
		},
	];

	if (options.breadcrumbs?.length) {
		graph.push({
			"@type": "BreadcrumbList",
			"@id": `${options.url}#breadcrumb`,
			itemListElement: options.breadcrumbs.map((item, index) => ({
				"@type": "ListItem",
				position: index + 1,
				name: item.name,
				item: absoluteUrl(item.url),
			})),
		});
	}

	return {
		"@context": "https://schema.org",
		"@graph": graph,
	};
}

export function getWordCount(text = ""): number {
	const words = text.trim().split(/\s+/).filter(Boolean);
	return words.length;
}
