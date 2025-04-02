import { getCollection } from "astro:content";

export type Ship = {
  data: {
    title: string;
    description: string;
    category: string;
    ship_count: number;
    pubDate: Date;
    updatedDate: Date;
  };
  slug: string;
};

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
    case "learning":
      return "bg-blue-300";
    case "opensource":
      return "bg-orange-400";
    case "thoughts":
      return "bg-red-400";
    case "tools":
      return "bg-cyan-300";
    case "work":
      return "bg-teal-300";
    default:
      return "bg-gray-300";
  }
}

// Utility function to format year and month
export function formatYearMonth(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() returns 0-11
  return `${year}-${month.toString().padStart(2, "0")}`; // Format as "YYYY-MM"
}

// Utility function to group ships by year and month
export async function groupShipsByYearMonthSorted(): Promise<
  Record<string, Ship[]>
> {
  // Fetch ships collection
  const ships = await getCollection("ship");

  // Group ships by year and month
  const groupedShips = ships.reduce<Record<string, Ship[]>>(
    (accumulator, ship) => {
      const yearMonthKey = formatYearMonth(ship.data.pubDate);
      accumulator[yearMonthKey] = accumulator[yearMonthKey] || [];
      accumulator[yearMonthKey].push(ship as Ship);
      return accumulator;
    },
    {},
  );

  // Sort the yearMonth keys in descending order
  const sortedYearMonthKeys = Object.keys(groupedShips).sort((a, b) =>
    b.localeCompare(a),
  );

  // Reconstruct the groupedShips object with sorted keys
  const sortedGroupedShips = sortedYearMonthKeys.reduce<Record<string, Ship[]>>(
    (sortedAccumulator, key) => {
      sortedAccumulator[key] = groupedShips[key];
      return sortedAccumulator;
    },
    {},
  );

  return sortedGroupedShips;
}

export function getBackgroundColorClass(bg_colour: string): string {
  switch (bg_colour) {
    case "yellow":
      return "bg-yellow-400";
    case "red":
      return "bg-red-400";
    case "orange":
      return "bg-orange-400";
    case "pink":
      return "bg-pink-400";
    case "indigo":
      return "bg-indigo-400";
    case "teal":
      return "bg-teal-400";
    case "cyan":
      return "bg-cyan-400";
    case "lime":
      return "bg-lime-400";
    case "blue":
      return "bg-blue-400";
    case "green":
      return "bg-green-400";
    case "purple":
      return "bg-purple-400";
    case "gray":
      return "bg-gray-400";
    case "amber":
      return "bg-amber-300";
    default:
      return "bg-gray-100";
  }
}

export function getReadingTime(text: string) {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}
