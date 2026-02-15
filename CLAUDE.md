# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Rules

- Always use `bun` as the package manager and script runner — never npm or node
- Never add `Co-Authored-By` lines to git commits
- Prefer lowercase text across the site

## Commands

```bash
# Development
bun dev              # Start dev server
bun run build        # Type-check and build for production
bun run preview      # Preview production build locally

# Code Quality
bun run check        # Run Biome checks on ./src
bun run lint         # Run Biome linter on ./src
bun run format       # Format all files with Biome
```

## Architecture

This is an Astro-based personal website deployed to Cloudflare Pages with server-side rendering.

### Content Collections

Content lives in `src/content/` with three collections defined in `src/content/config.ts`:
- **writing** - Blog posts with title, description, pubDate, heroImage, readingTime
- **thought** - Short-form content with category and optional showTldr flag
- **whoami** - About page content

### Path Aliases

Configured in `tsconfig.json`:
- `@components/*` → `./src/components/*`
- `@layouts/*` → `./src/layouts/*`
- `@pages/*` → `./src/pages/*`
- `@styles/*` → `./src/styles/*`
- `@utils/*` → `./src/utils/*`
- `@data/*` → `./src/data/*`

### Key Directories

- `src/pages/` - Astro pages and API routes (sitemap, RSS, robots.txt)
- `src/layouts/` - Layout components for different content types
- `src/components/` - Reusable UI components organized by concern (cards, cta, misc, seo, tools)
- `src/data/index.ts` - Site metadata, menu items, social links, and product listings

### Environment Variables

For analytics (optional):
- `UMAMI_WEBSITE_ID`, `UMAMI_TRACKING_URL` - Umami analytics
- `CLARITY_TRACKING_ID` - Microsoft Clarity
