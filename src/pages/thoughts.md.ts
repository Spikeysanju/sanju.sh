import {
	formatCollectionIndexMarkdown,
	getSortedContent,
	markdownResponse,
} from "@utils/llms";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
	const { thoughts } = await getSortedContent();
	return markdownResponse(formatCollectionIndexMarkdown("thoughts", thoughts));
};
