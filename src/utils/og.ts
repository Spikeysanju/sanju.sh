import { initWasm, Resvg } from "@resvg/resvg-wasm";
// @ts-ignore — handled by @astrojs/cloudflare wasmModuleImports
import resvgWasm from "./resvg.wasm?module";

const ACCENT_COLORS: Record<string, string> = {
	writings: "#f97316",
	thoughts: "#ef4444",
};

const FONT_FAMILY = "Uncut Sans";

let wasmInitPromise: Promise<void> | null = null;
let fontBufferCache: Uint8Array | null = null;

async function ensureWasm() {
	if (!wasmInitPromise) {
		wasmInitPromise = initWasm(resvgWasm);
	}
	return wasmInitPromise;
}

async function getFontBuffer(baseUrl: string): Promise<Uint8Array> {
	if (fontBufferCache) return fontBufferCache;

	const ab = await fetch(
		new URL("/fonts/uncut/woff/UncutSans-Regular.woff", baseUrl),
	).then((r) => r.arrayBuffer());

	fontBufferCache = new Uint8Array(ab);
	return fontBufferCache;
}

function wrapText(text: string, fontSize: number, maxWidth: number): string[] {
	const avgCharWidth = fontSize * 0.52;
	const charsPerLine = Math.floor(maxWidth / avgCharWidth);
	const words = text.split(" ");
	const lines: string[] = [];
	let current = "";

	for (const word of words) {
		const test = current ? `${current} ${word}` : word;
		if (test.length > charsPerLine && current) {
			lines.push(current);
			current = word;
		} else {
			current = test;
		}
	}
	if (current) lines.push(current);
	return lines;
}

function escapeXml(s: string): string {
	return s
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

function buildSvg(title: string, section: string): string {
	const accent = ACCENT_COLORS[section] || "#f97316";
	const len = title.length;
	const fontSize = len > 40 ? 48 : len > 25 ? 56 : 64;
	const lineHeight = fontSize * 1.15;
	const lines = wrapText(title.toLowerCase(), fontSize, 900);
	const titleBlockHeight = lines.length * lineHeight;
	const titleY = (630 - titleBlockHeight) / 2 + fontSize * 0.8;

	const titleTspans = lines
		.map(
			(line, i) =>
				`<tspan x="60" dy="${i === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`,
		)
		.join("");

	return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0a0a0a"/>
  <circle cx="72" cy="60" r="6" fill="${accent}"/>
  <text x="90" y="68" fill="#a3a3a3" font-family="${FONT_FAMILY}" font-size="24">${escapeXml(section)}</text>
  <text x="60" y="${titleY}" fill="#ffffff" font-family="${FONT_FAMILY}" font-size="${fontSize}" font-weight="400" letter-spacing="-0.5">${titleTspans}</text>
  <text x="60" y="586" fill="#a3a3a3" font-family="${FONT_FAMILY}" font-size="24">sanju.sh</text>
  <rect x="1020" y="577" width="120" height="6" rx="3" fill="${accent}"/>
</svg>`;
}

export async function renderOgImage(
	title: string,
	section: string,
	baseUrl: string,
): Promise<Uint8Array> {
	const [fontBuffer] = await Promise.all([
		getFontBuffer(baseUrl),
		ensureWasm(),
	]);

	const svg = buildSvg(title, section);

	const resvg = new Resvg(svg, {
		fitTo: { mode: "width", value: 1200 },
		font: {
			fontBuffers: [fontBuffer],
			defaultFontFamily: FONT_FAMILY,
		},
	});
	return resvg.render().asPng();
}
