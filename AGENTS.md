# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

<!-- context7 -->
Use Context7 MCP to fetch current documentation whenever the user asks about a library, framework, SDK, API, CLI tool, or cloud service -- even well-known ones like React, Next.js, Prisma, Express, Tailwind, Django, or Spring Boot. This includes API syntax, configuration, version migration, library-specific debugging, setup instructions, and CLI tool usage. Use even when you think you know the answer -- your training data may not reflect recent changes. Prefer this over web search for library docs.

Do not use for: refactoring, writing scripts from scratch, debugging business logic, code review, or general programming concepts.

## Context7 Steps

1. Always start with `resolve-library-id` using the library name and the user's question, unless the user provides an exact library ID in `/org/project` format.
2. Pick the best match (ID format: `/org/project`) by exact name match, description relevance, code snippet count, source reputation (High/Medium preferred), and benchmark score (higher is better). If results don't look right, try alternate names or queries (e.g., "next.js" not "nextjs", or rephrase the question). Use version-specific IDs when the user mentions a version.
3. `query-docs` with the selected library ID and the user's full question (not single words).
4. Answer using the fetched docs.
<!-- context7 -->

## Rules

- Always use `bun` as the package manager and script runner; never use npm or node commands for repo workflows.
- Never add `Co-Authored-By` lines to git commits.
- Prefer lowercase text across the site.
- Keep changes small and aligned with the existing Astro content-site structure.
- Style with StyleX only. Do not reintroduce Tailwind, `@apply`, or community StyleX forks.

## Design system

Tokens, recipes, and colocated StyleX modules are the styling contract. Agents must follow this pattern on every UI change.

```ts
// src/pages/example.styles.ts
import * as stylex from "@stylexjs/stylex";
import { colors, font, space } from "@styles/tokens.stylex";

export const styles = stylex.create({
	hero: {
		color: colors.text,
		fontWeight: font.medium,
		padding: space[6],
	},
});
```

```astro
---
import { layout, type, link } from "@styles/recipes";
import { sx } from "@utils/sx";
import { styles } from "./example.styles";
---
<section {...sx(layout.page)}>
	<h1 {...sx(type.pageTitle, styles.hero)}>title</h1>
	<a href="/" {...sx(link.underline)}>home</a>
</section>
```

Rules:

- Import tokens from a relative `tokens.stylex` path in StyleX modules (the compiler cannot resolve TS path aliases for `defineVars` files). Never hardcode hex, `gray-500`, or new CSS variables in components.
- Media query constants used as StyleX keys (`[md]`) must be declared in the same file as `stylex.create`. Do not import them.
- Use recipes in `@styles/recipes` for type, layout, links, category/cta surfaces, and widget chrome before writing a new `stylex.create`.
- Colocate unique styles in `*.styles.ts` next to the `.astro` file.
- Apply styles with `{...sx(...)}` (`stylex.attrs`). Never put `stylex.create` or `defineVars` in `.astro` files.
- MDX article chrome belongs in `src/styles/prose.css` (`.prose`, `.prose-writing`, `.prose-thoughts`), not per-component utilities.
- Dark mode is the `.dark` class on `<html>`. Tokens already remap via CSS variables. Do not switch to `prefers-color-scheme` media queries for theme colors.
- Keep scoped `<style>` only for keyframes, 3D transforms, or JS-toggled hooks. Point those rules at tokens (`var(--color-text)`), not hardcoded grays.
- For JS-toggled visibility, keep the `.hidden` utility and merge it with StyleX via `class:list={['hidden', sx(styles.x).class]}`. Do not let `{...sx()}` overwrite hook class names.

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

This is an Astro-based personal website deployed to Cloudflare Workers with server-side rendering. The active Worker script is `sanju`.

## Deployment

Use Workers, not Pages, for production deploys.

```bash
bun run build
bunx wrangler deploy --name sanju
```

The Astro Cloudflare adapter emits server output in `dist/server` and static assets in `dist/client`. `wrangler.jsonc` uses the Cloudflare adapter entrypoint, and deploys follow the generated `dist/server/wrangler.json`.

## Content Collections

Content lives in `src/content/` with three collections defined in `src/content.config.ts`:

- `writing`: Blog posts with title, description, pubDate, heroImage, and readingTime.
- `thought`: Short-form content with category and optional showTldr.
- `whoami`: About page content.

## Path Aliases

Configured in `tsconfig.json`:

- `@components/*` -> `./src/components/*`
- `@layouts/*` -> `./src/layouts/*`
- `@pages/*` -> `./src/pages/*`
- `@styles/*` -> `./src/styles/*`
- `@utils/*` -> `./src/utils/*`
- `@data/*` -> `./src/data/*`

## Key Directories

- `src/pages/`: Astro pages and API routes for sitemap, RSS, robots.txt, and OG images.
- `src/layouts/`: Layout components for different content types.
- `src/components/`: Reusable UI components organized by concern.
- `src/data/index.ts`: Site metadata, menu items, social links, and product listings.
