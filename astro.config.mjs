import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
	site: "https://sanju.sh",
	vite: {
		server: {
			allowedHosts: ["frederick-east-surfing-beam.trycloudflare.com"],
		},
	},
	integrations: [
		mdx(),
		tailwind(),
	],
	output: "server",
	adapter: cloudflare({
		wasmModuleImports: true,
	}),
});
