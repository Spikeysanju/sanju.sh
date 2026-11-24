import {
	formatCollectionIndexMarkdown,
	getSortedContent,
	markdownResponse,
} from "@utils/llms";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
	const { writings } = await getSortedContent();
	return markdownResponse(formatCollectionIndexMarkdown("writings", writings));
};
