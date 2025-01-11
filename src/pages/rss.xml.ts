import rss from "@astrojs/rss";
import { SITE_DESCRIPTION, SITE_TITLE } from "@data/index";
import { getCollection } from "astro:content";
import sanitizeHtml from 'sanitize-html';
import { marked } from 'marked';

export async function GET(context: any) {
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
        content: sanitizeHtml(marked.parse(post.body)),
        link: `/writings/${post.slug}/`,
      })),
      ...thoughts.map((thought) => ({
        title: thought.data.title,
        pubDate: thought.data.pubDate,
        description: thought.data.description,
        content: sanitizeHtml(marked.parse(thought.body)),
        link: `/thoughts/${thought.slug}/`,
      })),
      ...ships.map((ship) => ({
        title: ship.data.title,
        pubDate: ship.data.pubDate,
        description: ship.data.description,
        content: sanitizeHtml(marked.parse(ship.body)),
        link: `/ships/${ship.slug}/`,
      })),
    ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf()),
  });
} 