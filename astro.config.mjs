import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	site: "https://sanju.sh",
	vite: {
		plugins: [tailwindcss()],
		server: {
			allowedHosts: ["frederick-east-surfing-beam.trycloudflare.com"],
		},
	},
	integrations: [mdx()],
	output: "server",
	adapter: cloudflare({
		wasmModuleImports: true,
	}),
});
