---
title: Oops! I Forgot My Website Sitemap (But Now It's Fixed!)
description: So, guess what? I totally spaced on adding a sitemap to my website. A sitemap helps search engines find all my awesome content, which is kind of important!  This post will show you how I easily set it up with Astro, so you don't make the same mistake I did.
category: 'personal'
ship_count: 1
pubDate: 'June 1 2024'
updatedDate: 'June 1 2024'
---

Astro has a built-in sitemap generator, so I just had to add the following to my `astro.config.mjs`:

```ts
export default defineConfig({
	site: "https://www.sanju.sh",
	integrations: [
        mdx(), 
        sitemap({
            changefreq: 'daily',
            priority: 0.7,
            lastmod: new Date('2024-06-01'),
        }), 
        tailwind()
    ],
	output: "server",
	adapter: cloudflare(),
});
```

I also added a `robots.txt` file to my website. I created a new file `src/pages/robots.txt.ts` with the following content:

```ts
import type { APIRoute } from 'astro';

const robotsTxt = `
User-agent: *
Allow: /

Sitemap: ${new URL('sitemap-index.xml', import.meta.env.SITE).href}
`.trim();

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
```

I also added the following to my `package.json`:

```json
{
  "scripts": {
    "build": "astro build && astro sitemap"
  }
}
```

Now, whenever I run `npm run build`, Astro will generate a sitemap for me. I also submitted the sitemap to Google Search Console to help them index my content faster.

See you in the next ship!, 

Feel free to reach out to me via [email](mailto:work@sanju.sh?subject=Let's%20Build%20Something%20Remarkable&body=Hi%20Sanju%2C%0A%0AI%20came%20across%20your%20projects%20and%20was%20impressed%20by%20it.%20I%20would%20love%20to%20discuss%20the%20possibility%20of%20collaborating%20on%20a%20new%20project.%20Looking%20forward%20to%20hearing%20from%20you.%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D) if you want to build something remarkable together.

**P.S.** follow me on [Twitter](https://x.com/spikeysanju) i document my journey as a designer, developer and startup founder!