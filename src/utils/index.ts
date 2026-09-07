import { category, ctaBg } from "@styles/recipes";

export function clsx(...args: unknown[]): string {
	return args.filter(Boolean).join(" ");
}

export function getCategoryStyle(name: string) {
	return category[name as keyof typeof category] ?? category.default;
}

export function getCtaBackground(color: string) {
	return ctaBg[color as keyof typeof ctaBg] ?? ctaBg.default;
}

export function getReadingTime(text: string) {
	const wordsPerMinute = 200;
	const words = text.trim().split(/\s+/).filter(Boolean).length;
	const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
	return minutes;
}

export * from "./seo";
export { sx } from "./sx";
