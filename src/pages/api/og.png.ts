import type { APIRoute } from "astro";
import satori from "satori";
import { Resvg, initWasm } from "@resvg/resvg-wasm";

let wasmInitialized = false;

async function initResvgWasm() {
	if (wasmInitialized) return;
	try {
		const wasmUrl =
			"https://unpkg.com/@resvg/resvg-wasm@2.6.2/index_bg.wasm";
		const wasmResponse = await fetch(wasmUrl);
		const wasmBuffer = await wasmResponse.arrayBuffer();
		await initWasm(wasmBuffer);
		wasmInitialized = true;
	} catch (e) {
		if (e instanceof Error && e.message.includes("Already initialized")) {
			wasmInitialized = true;
		} else {
			throw e;
		}
	}
}

export const GET: APIRoute = async ({ request }) => {
	const url = new URL(request.url);
	const title = url.searchParams.get("title") || "Sanju's Space";
	const description = url.searchParams.get("description") || "";

	await initResvgWasm();

	// Fetch Inter font from Google Fonts (works with satori)
	const fontResponse = await fetch(
		"https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYAZ9hjp-Ek-_EeA.woff",
	);
	const fontData = await fontResponse.arrayBuffer();

	const svg = await satori(
		{
			type: "div",
			props: {
				style: {
					height: "100%",
					width: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-end",
					backgroundColor: "#000",
					padding: "60px",
				},
				children: [
					{
						type: "div",
						props: {
							style: {
								display: "flex",
								flexDirection: "column",
								gap: "16px",
							},
							children: [
								{
									type: "div",
									props: {
										style: {
											fontSize: "64px",
											fontWeight: 600,
											color: "#fff",
											lineHeight: 1.2,
											maxWidth: "900px",
										},
										children: title,
									},
								},
								description
									? {
											type: "div",
											props: {
												style: {
													fontSize: "28px",
													color: "#888",
													maxWidth: "800px",
													lineHeight: 1.4,
												},
												children: description,
											},
										}
									: null,
								{
									type: "div",
									props: {
										style: {
											fontSize: "24px",
											color: "#666",
											marginTop: "24px",
										},
										children: "sanju.sh",
									},
								},
							].filter(Boolean),
						},
					},
				],
			},
		},
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: "Inter",
					data: fontData,
					weight: 600,
					style: "normal",
				},
			],
		},
	);

	const resvg = new Resvg(svg, {
		fitTo: {
			mode: "width",
			value: 1200,
		},
	});

	const pngData = resvg.render();
	const pngBuffer = pngData.asPng();

	return new Response(new Uint8Array(pngBuffer), {
		headers: {
			"Content-Type": "image/png",
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	});
};
