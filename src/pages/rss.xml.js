import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { SITE_DESCRIPTION, SITE_TITLE } from "@data/index";

export async function GET(context) {
	const [posts, thoughts] = await Promise.all([
		getCollection("writing"),
		getCollection("thought"),
	]);

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: [
			...posts.map((post) => ({
				title: post.data.title,
				pubDate: post.data.pubDate,
				description: post.data.description,
				link: `/${post.id}/`,
			})),
			...thoughts.map((thought) => ({
				title: thought.data.title,
				pubDate: thought.data.pubDate,
				description: thought.data.description,
				link: `/${thought.id}/`,
			})),
		],
		customData: "<language>en-us</language>",
	});
}
