# sanju.sh

personal website built with astro, deployed to cloudflare pages.

## features

- **writings** — long-form blog posts
- **thoughts** — short-form ideas and observations
- **dynamic og images** — auto-generated per post using svg + resvg-wasm on the edge
- **self-hosted fonts** — uncut sans, four weights, woff2 + woff

## tech stack

- astro (ssr on cloudflare workers)
- tailwindcss
- typescript
- biome (format + lint)
- cloudflare pages

## setup

```bash
bun install
bun dev          # start dev server
bun run build    # build for production
bun run preview  # preview production build
```

## environment variables

```plaintext
# umami analytics (optional)
UMAMI_WEBSITE_ID=your_umami_website_id
UMAMI_TRACKING_URL=your_umami_tracking_url

# clarity analytics (optional)
CLARITY_TRACKING_ID=your_clarity_tracking_id
```

## license

apache 2.0