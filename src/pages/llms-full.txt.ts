import {
	formatLlmsFullTxt,
	getSortedContent,
	plainTextResponse,
} from "@utils/llms";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
	const { writings, thoughts } = await getSortedContent();
	return plainTextResponse(formatLlmsFullTxt(writings, thoughts));
};
