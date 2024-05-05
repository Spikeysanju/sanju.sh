import rss from "@astrojs/rss";
import { SITE_DESCRIPTION, SITE_TITLE } from '@data/index';
import { getCollection } from "astro:content";

export async function GET(context) {
	const posts = await getCollection("writing");
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/writings/${post.slug}/`,
		})),
	});
}
