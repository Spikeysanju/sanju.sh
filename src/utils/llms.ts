import { type CollectionEntry, getCollection } from "astro:content";
import {
	AUTHOR_EMAIL,
	AUTHOR_NAME,
	SITE_DESCRIPTION,
	SITE_TITLE,
	SITE_URL,
	products,
	socialLinks,
} from "@data/index";
import { absoluteUrl } from "./seo";

export type WritingEntry = CollectionEntry<"writing">;
export type ThoughtEntry = CollectionEntry<"thought">;
export type PostEntry = WritingEntry | ThoughtEntry;

const CAL_URL = "https://cal.com/imsanju/15min";

function formatIsoDate(date: Date): string {
	return date.toISOString().slice(0, 10);
}

function unescapeAttr(value: string): string {
	return value
		.replace(/<br\s*\/?>/gi, "\n")
		.replace(/&quot;/g, '"')
		.replace(/&apos;/g, "'")
		.replace(/&amp;/g, "&")
		.trim();
}

function extractAttr(tag: string, name: string): string | null {
	const doubleQuoted = new RegExp(`${name}\\s*=\\s*"([\\s\\S]*?)"`, "i").exec(
		tag,
	);
	if (doubleQuoted?.[1] !== undefined) return unescapeAttr(doubleQuoted[1]);

	const singleQuoted = new RegExp(`${name}\\s*=\\s*'([\\s\\S]*?)'`, "i").exec(
		tag,
	);
	if (singleQuoted?.[1] !== undefined) return unescapeAttr(singleQuoted[1]);

	return null;
}

/**
 * Clean MDX body into plain, token-efficient markdown for LLMs and agents.
 * Preserves fenced code blocks, unwraps text highlights, converts sidenotes
 * to GFM footnotes, turns RevealQuote into a blockquote, and strips JSX noise.
 */
export function cleanMdxForLlm(rawBody = ""): string {
	const codeBlocks: string[] = [];
	const placeholderPrefix = "___CODE_BLOCK_";

	// Protect fenced code blocks from JSX/import stripping
	let text = rawBody.replace(/```[\s\S]*?```/g, (block) => {
		const idx = codeBlocks.length;
		codeBlocks.push(block);
		return `${placeholderPrefix}${idx}___`;
	});

	// Remove ESM import statements
	text = text.replace(
		/^[ \t]*import\s+[\s\S]*?from\s+["'][^"']+["'];?[ \t]*$/gm,
		"",
	);

	// Unwrap <Highlight ...>text</Highlight>
	text = text.replace(/<Highlight\b[^>]*>([\s\S]*?)<\/Highlight>/g, "$1");

	// Convert <Sidenote id="N">note</Sidenote> into GFM footnotes
	const footnotes: Array<{ id: string; content: string }> = [];
	const usedIds = new Set<string>();
	let fallbackCounter = 1;

	text = text.replace(
		/<Sidenote\b([^>]*)>([\s\S]*?)<\/Sidenote>/g,
		(_match, attrs: string, content: string) => {
			let id = extractAttr(attrs, "id") ?? String(fallbackCounter++);
			while (usedIds.has(id)) {
				id = String(fallbackCounter++);
			}
			usedIds.add(id);
			footnotes.push({ id, content: content.trim() });
			return `[^${id}]`;
		},
	);

	// Convert <RevealQuote ... /> into a standard markdown blockquote
	text = text.replace(/<RevealQuote\b[\s\S]*?\/>/g, (tag) => {
		const quote = extractAttr(tag, "quote");
		const subtitle = extractAttr(tag, "subtitle");
		if (!quote) return "";

		const lines = quote
			.split("\n")
			.map((line) => `> ${line.trim()}`)
			.join("\n");

		return subtitle ? `${lines}\n>\n> — ${subtitle}` : lines;
	});

	// Strip <EndCTA ... /> and any other self-closing PascalCase JSX widgets
	text = text.replace(/<[A-Z][A-Za-z0-9]*\b[\s\S]*?\/>/g, "");

	// Restore fenced code blocks
	text = text.replace(
		new RegExp(`${placeholderPrefix}(\\d+)___`, "g"),
		(_match, idx: string) => codeBlocks[Number(idx)] ?? "",
	);

	// Normalize excessive blank lines
	text = text.replace(/\n{3,}/g, "\n\n").trim();

	if (footnotes.length > 0) {
		const notesBlock = footnotes
			.map((note) => `[^${note.id}]: ${note.content}`)
			.join("\n");
		text = `${text}\n\n${notesBlock}`;
	}

	return text;
}

export async function getSortedContent(): Promise<{
	writings: WritingEntry[];
	thoughts: ThoughtEntry[];
}> {
	const [writings, thoughts] = await Promise.all([
		getCollection("writing"),
		getCollection("thought"),
	]);

	writings.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
	thoughts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

	return { writings, thoughts };
}

export function formatPostMarkdown(
	entry: PostEntry,
	kind: "writing" | "thought",
): string {
	const url = absoluteUrl(`/${entry.id}`);
	const mdUrl = `${url}.md`;
	const typeLine =
		kind === "thought" && "category" in entry.data
			? `thought (${entry.data.category})`
			: "writing";

	const metaLines = [
		`- url: ${url}`,
		`- markdown: ${mdUrl}`,
		`- author: ${AUTHOR_NAME}`,
		`- type: ${typeLine}`,
		`- published: ${formatIsoDate(entry.data.pubDate)}`,
	];

	if (entry.data.updatedDate) {
		metaLines.push(`- updated: ${formatIsoDate(entry.data.updatedDate)}`);
	}

	const cleanedBody = cleanMdxForLlm(entry.body ?? "");

	return [
		`# ${entry.data.title}`,
		"",
		`> ${entry.data.description}`,
		"",
		...metaLines,
		"",
		"---",
		"",
		cleanedBody,
		"",
	].join("\n");
}

export function formatMeMarkdown(): string {
	const currentProjects = products.filter((p) => p.name !== "ThisUX");
	const projectLines = products.map(
		(p) => `- [${p.name}](${p.url}): ${p.tagline}`,
	);
	const socialLines = socialLinks.map((s) => `- [${s.label}](${s.url})`);

	return [
		`# about ${AUTHOR_NAME.toLowerCase()}`,
		"",
		`> ${AUTHOR_NAME.toLowerCase()} — designer and founder of thisux. building products that work.`,
		"",
		`- url: ${absoluteUrl("/me")}`,
		`- email: ${AUTHOR_EMAIL}`,
		`- schedule a call: ${CAL_URL}`,
		"",
		"## bio",
		"",
		"Sanju Sivalingam is a designer and founder who runs [ThisUX](https://thisux.com), a design-led product studio. He builds products that actually work and helps other founders turn their ideas into reality. He's also big on open source and loves sharing what he learns along the way.",
		"",
		"## extended bio",
		"",
		"Sanju Sivalingam is the founder of ThisUX, a design-led product studio that helps startups and businesses build products that actually work. He's been in the game for a while, wearing many hats along the way, and now he's focused on building his own thing.",
		"",
		"He works with founders and business owners to build everything from MVPs to full products, or sometimes just fixes what's broken. The approach is simple: design to code, he handles it all. The secret? Creating systems that work, no matter what technology or problem you're dealing with.",
		"",
		"When he's not building products, he's contributing to [open source projects](https://github.com/spikeysanju) and speaking at conferences. He believes in sharing knowledge and helping others learn from his experiences.",
		"",
		`He's currently working on several projects including ${currentProjects
			.map((p) => `[${p.name}](${p.url})`)
			.join(", ")}. He's always tinkering with new ideas and building things.`,
		"",
		"## projects",
		"",
		...projectLines,
		"",
		"## contact & links",
		"",
		`- [schedule a call](${CAL_URL})`,
		...socialLines,
		"",
	].join("\n");
}

export function formatCollectionIndexMarkdown(
	kind: "writings" | "thoughts",
	entries: PostEntry[],
): string {
	const title = kind === "writings" ? "writings" : "thoughts";
	const description =
		kind === "writings"
			? "long-form essays on product, design, ai agents, and building software."
			: "short-form notes and observations on design, ai, engineering, and craft.";

	const lines = entries.map((entry) => {
		const date = formatIsoDate(entry.data.pubDate);
		const category =
			"category" in entry.data ? ` · ${entry.data.category}` : "";
		const mdUrl = `${absoluteUrl(`/${entry.id}`)}.md`;
		return `- [${entry.data.title}](${mdUrl}) (${date}${category}): ${entry.data.description}`;
	});

	return [
		`# ${title}`,
		"",
		`> ${description}`,
		"",
		`- url: ${absoluteUrl(`/${kind}`)}`,
		`- llms index: ${SITE_URL}/llms.txt`,
		"",
		...lines,
		"",
	].join("\n");
}

export function formatHomeMarkdown(
	writings: WritingEntry[],
	thoughts: ThoughtEntry[],
): string {
	const projectLines = products.map(
		(p) => `- [${p.name}](${p.url}): ${p.tagline}`,
	);
	const recentWritings = writings
		.slice(0, 5)
		.map(
			(w) =>
				`- [${w.data.title}](${absoluteUrl(`/${w.id}`)}.md): ${
					w.data.description
				}`,
		);
	const recentThoughts = thoughts
		.slice(0, 5)
		.map(
			(t) =>
				`- [${t.data.title}](${absoluteUrl(`/${t.id}`)}.md): ${
					t.data.description
				}`,
		);

	return [
		`# ${SITE_TITLE.toLowerCase()}`,
		"",
		`> ${SITE_DESCRIPTION}`,
		"",
		"I run [ThisUX](https://thisux.com), a design-led product studio. We make things that work. I team up with founders and business owners to build MVPs, full products, or fix broken experiences — design to code.",
		"",
		`- website: ${SITE_URL}/`,
		`- about: ${absoluteUrl("/me")}.md`,
		`- llms.txt: ${SITE_URL}/llms.txt`,
		`- llms-full.txt: ${SITE_URL}/llms-full.txt`,
		`- schedule a call: ${CAL_URL}`,
		"",
		"## projects",
		"",
		...projectLines,
		"",
		"## recent writings",
		"",
		...recentWritings,
		"",
		`see all writings: ${absoluteUrl("/writings")}.md`,
		"",
		"## recent thoughts",
		"",
		...recentThoughts,
		"",
		`see all thoughts: ${absoluteUrl("/thoughts")}.md`,
		"",
	].join("\n");
}

export function formatLlmsTxt(
	writings: WritingEntry[],
	thoughts: ThoughtEntry[],
): string {
	const writingLines = writings.map(
		(w) =>
			`- [${w.data.title}](${absoluteUrl(`/${w.id}`)}.md): ${
				w.data.description
			}`,
	);
	const thoughtLines = thoughts.map(
		(t) =>
			`- [${t.data.title}](${absoluteUrl(`/${t.id}`)}.md): ${
				t.data.description
			}`,
	);
	const projectLines = products.map(
		(p) => `- [${p.name}](${p.url}): ${p.tagline}`,
	);
	const socialLines = socialLinks.map((s) => `- [${s.label}](${s.url})`);

	return [
		`# ${AUTHOR_NAME.toLowerCase()} (sanju.sh)`,
		"",
		`> ${SITE_DESCRIPTION}`,
		"",
		"every blog post, thought, and core page on this site is available as clean markdown by appending `.md` to its url (for example, `https://sanju.sh/agents-md.md`), or by requesting any page with `Accept: text/markdown`. for the complete site archive in one file, read [llms-full.txt](https://sanju.sh/llms-full.txt).",
		"",
		"## writings",
		"",
		...writingLines,
		"",
		"## thoughts",
		"",
		...thoughtLines,
		"",
		"## pages",
		"",
		`- [home](${SITE_URL}/index.md): intro, current projects, and recent posts`,
		`- [about sanju](${SITE_URL}/me.md): bio, extended bio, projects, and contact`,
		`- [writings index](${SITE_URL}/writings.md): all long-form essays`,
		`- [thoughts index](${SITE_URL}/thoughts.md): all short-form notes`,
		`- [full site markdown](${SITE_URL}/llms-full.txt): complete text of all writings, thoughts, and bio`,
		"",
		"## projects",
		"",
		...projectLines,
		"",
		"## optional",
		"",
		`- [rss feed](${SITE_URL}/rss.xml): rss feed of writings and thoughts`,
		`- [sitemap](${SITE_URL}/sitemap-index.xml): xml sitemap index`,
		`- [schedule a call](${CAL_URL}): 15-minute intro call`,
		...socialLines,
		"",
	].join("\n");
}

export function formatLlmsFullTxt(
	writings: WritingEntry[],
	thoughts: ThoughtEntry[],
): string {
	const writingSections = writings.map((w) => formatPostMarkdown(w, "writing"));
	const thoughtSections = thoughts.map((t) => formatPostMarkdown(t, "thought"));

	return [
		`# ${AUTHOR_NAME.toLowerCase()} (sanju.sh) — full text`,
		"",
		`> complete markdown archive of ${SITE_URL}: bio, projects, ${writings.length} writings, and ${thoughts.length} thoughts.`,
		"",
		"---",
		"",
		formatMeMarkdown().trim(),
		"",
		"---",
		"",
		"# writings",
		"",
		writingSections.join("\n---\n\n").trim(),
		"",
		"---",
		"",
		"# thoughts",
		"",
		thoughtSections.join("\n---\n\n").trim(),
		"",
	].join("\n");
}

export function markdownResponse(body: string, status = 200): Response {
	return new Response(body, {
		status,
		headers: {
			"Content-Type": "text/markdown; charset=utf-8",
		},
	});
}

export function plainTextResponse(body: string, status = 200): Response {
	return new Response(body, {
		status,
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
}

/**
 * Return the .md alternate path for routes that have a markdown representation,
 * or null if the route does not have one.
 */
export function markdownPathFor(
	pathname: string,
	liveSlugs: Set<string>,
): string | null {
	if (pathname === "/") return "/index.md";
	if (pathname === "/me") return "/me.md";
	if (pathname === "/writings") return "/writings.md";
	if (pathname === "/thoughts") return "/thoughts.md";

	const slug = pathname.startsWith("/") ? pathname.slice(1) : pathname;
	if (!slug.includes("/") && liveSlugs.has(slug)) {
		return `/${slug}.md`;
	}

	return null;
}
