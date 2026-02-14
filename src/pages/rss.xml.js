import rss from "@astrojs/rss";
import { SITE_DESCRIPTION, SITE_TITLE } from "@data/index";
import { getCollection } from "astro:content";

export async function GET(context) {
	const [posts, thoughts, ships] = await Promise.all([
		getCollection("writing"),
		getCollection("thought"),
		getCollection("ship"),
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
				link: `/writings/${post.slug}/`,
			})),
			...thoughts.map((thought) => ({
				title: thought.data.title,
				pubDate: thought.data.pubDate,
				description: thought.data.description,
				link: `/thoughts/${thought.slug}/`,
			})),
			...ships.map((ship) => ({
				title: ship.data.title,
				pubDate: ship.data.pubDate,
				description: ship.data.description,
				link: `/ships/${ship.slug}/`,
			})),
		],
		customData: `<language>en-us</language>`,
	});
}
