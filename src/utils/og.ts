import satori from "satori";
import { initWasm, Resvg } from "@resvg/resvg-wasm";

const ACCENT_COLORS: Record<string, string> = {
	writings: "#f97316",
	thoughts: "#ef4444",
	ships: "#84cc16",
};

const GOOGLE_FONTS_CSS =
	"https://fonts.googleapis.com/css2?family=Google+Sans:wght@500&display=swap";

let wasmInitPromise: Promise<void> | null = null;
let fontData: ArrayBuffer | null = null;

async function ensureWasm(baseUrl: string) {
	if (!wasmInitPromise) {
		wasmInitPromise = (async () => {
			const res = await fetch(new URL("/resvg_bg.wasm", baseUrl));
			await initWasm(await res.arrayBuffer());
		})();
	}
	return wasmInitPromise;
}

async function fetchGoogleFont(): Promise<ArrayBuffer> {
	const css = await fetch(GOOGLE_FONTS_CSS, {
		headers: { "User-Agent": "satori" },
	}).then((r) => r.text());

	const match = css.match(/src:\s*url\(([^)]+)\)\s*format\(['"]truetype['"]\)/);
	if (!match?.[1]) throw new Error("could not parse font url from css");

	return fetch(match[1]).then((r) => r.arrayBuffer());
}

async function ensureFont(baseUrl: string) {
	if (!fontData) {
		try {
			fontData = await fetchGoogleFont();
		} catch {
			const res = await fetch(
				new URL("/fonts/uncut/woff/UncutSans-Medium.woff", baseUrl),
			);
			fontData = await res.arrayBuffer();
		}
	}
	return fontData;
}

function buildOgMarkup(title: string, section: string) {
	const accent = ACCENT_COLORS[section] || "#f97316";
	const len = title.length;
	const fontSize = len > 40 ? 48 : len > 25 ? 56 : 64;

	return {
		type: "div",
		props: {
			style: {
				width: "1200px",
				height: "630px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				padding: "60px",
				backgroundColor: "#0a0a0a",
				fontFamily: "Google Sans",
			},
			children: [
				{
					type: "div",
					props: {
						style: { display: "flex", alignItems: "center", gap: "10px" },
						children: [
							{
								type: "div",
								props: {
									style: {
										width: "12px",
										height: "12px",
										borderRadius: "50%",
										backgroundColor: accent,
									},
								},
							},
							{
								type: "span",
								props: {
									style: {
										fontSize: "24px",
										color: "#a3a3a3",
										textTransform: "lowercase",
									},
									children: section,
								},
							},
						],
					},
				},
				{
					type: "div",
					props: {
						style: {
							fontSize: `${fontSize}px`,
							color: "#ffffff",
							fontWeight: 500,
							lineHeight: 1.1,
							textTransform: "lowercase",
							letterSpacing: "-0.02em",
							maxWidth: "900px",
						},
						children: title,
					},
				},
				{
					type: "div",
					props: {
						style: {
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						},
						children: [
							{
								type: "span",
								props: {
									style: { fontSize: "24px", color: "#a3a3a3" },
									children: "sanju.sh",
								},
							},
							{
								type: "div",
								props: {
									style: {
										width: "120px",
										height: "6px",
										borderRadius: "3px",
										backgroundColor: accent,
									},
								},
							},
						],
					},
				},
			],
		},
	};
}

export async function renderOgImage(
	title: string,
	section: string,
	baseUrl: string,
): Promise<Uint8Array> {
	const [font] = await Promise.all([
		ensureFont(baseUrl),
		ensureWasm(baseUrl),
	]);

	const svg = await satori(buildOgMarkup(title, section) as any, {
		width: 1200,
		height: 630,
		fonts: [{ name: "Google Sans", data: font, weight: 500, style: "normal" }],
	});

	const resvg = new Resvg(svg, {
		fitTo: { mode: "width", value: 1200 },
	});
	return resvg.render().asPng();
}
