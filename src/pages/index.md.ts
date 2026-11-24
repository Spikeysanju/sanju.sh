import {
	formatHomeMarkdown,
	getSortedContent,
	markdownResponse,
} from "@utils/llms";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
	const { writings, thoughts } = await getSortedContent();
	return markdownResponse(formatHomeMarkdown(writings, thoughts));
};
