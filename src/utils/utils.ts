// merge class names with conditional rendering
export function clsx(...args: any[]): string {
	return args.filter(Boolean).join(" ");
}

// function that returns tailwindcss colors bg based on category for thoughts like, ai, design, product, engineering, productivity, etc
export function getCategoryColor(category: string): string {
	switch (category) {
		case "ai":
			return "bg-yellow-300";
		case "design":
			return "bg-lime-300";
		case "product":
			return "bg-green-300";
		case "engineering":
			return "bg-purple-300";
		case "productivity":
			return "bg-pink-300";
		case "opensource":
			return "bg-orange-400";
		default:
			return "bg-gray-300";
	}
}
