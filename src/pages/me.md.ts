import { formatMeMarkdown, markdownResponse } from "@utils/llms";
import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
	return markdownResponse(formatMeMarkdown());
};
