import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const whoami = defineCollection({
	loader: glob({ base: "./src/content/whoami", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		readingTime: z.number().optional(),
	}),
});

const writing = defineCollection({
	loader: glob({ base: "./src/content/writing", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		readingTime: z.number().optional(),
	}),
});

const thought = defineCollection({
	loader: glob({ base: "./src/content/thought", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		category: z.string(),
		showTldr: z.boolean().optional(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		readingTime: z.number().optional(),
	}),
});

export const collections = { writing, thought, whoami };
