import { getCollection } from "astro:content";
import { formatPostMarkdown, markdownResponse } from "@utils/llms";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params }) => {
	const slug = params.slug;
	if (!slug) {
		return markdownResponse("# 404 — not found\n", 404);
	}

	const [writings, thoughts] = await Promise.all([
		getCollection("writing"),
		getCollection("thought"),
	]);

	const writing = writings.find((entry) => entry.id === slug);
	if (writing) {
		return markdownResponse(formatPostMarkdown(writing, "writing"));
	}

	const thought = thoughts.find((entry) => entry.id === slug);
	if (thought) {
		return markdownResponse(formatPostMarkdown(thought, "thought"));
	}

	return markdownResponse("# 404 — not found\n", 404);
};
