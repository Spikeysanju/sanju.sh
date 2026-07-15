import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { SITE_DESCRIPTION, SITE_TITLE } from "@data/index";

export async function GET(context) {
	const [posts, thoughts] = await Promise.all([
		getCollection("writing"),
		getCollection("thought"),
	]);

	const items = [
		...posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.updatedDate ?? post.data.pubDate,
			description: post.data.description.trim(),
			link: `/${post.id}/`,
		})),
		...thoughts.map((thought) => ({
			title: thought.data.title,
			pubDate: thought.data.updatedDate ?? thought.data.pubDate,
			description: thought.data.description.trim(),
			link: `/${thought.id}/`,
			categories: [thought.data.category],
		})),
	].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

	const selfUrl = new URL("rss.xml", context.site).href;

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items,
		xmlns: {
			atom: "http://www.w3.org/2005/Atom",
		},
		customData: [
			"<language>en-us</language>",
			`<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
			`<atom:link href="${selfUrl}" rel="self" type="application/rss+xml" />`,
		].join(""),
	});
}
