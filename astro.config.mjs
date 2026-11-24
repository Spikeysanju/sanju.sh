import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { remarkOndine } from "ondine/remark";

// https://astro.build/config
export default defineConfig({
	site: "https://sanju.sh",
	trailingSlash: "never",
	vite: {
		plugins: [tailwindcss()],
		server: {
			allowedHosts: ["frederick-east-surfing-beam.trycloudflare.com"],
		},
	},
	integrations: [mdx()],
	markdown: {
		remarkPlugins: [
			[remarkOndine, { fontSize: 13, maxWidth: 528, padding: 12 }],
		],
		shikiConfig: {
			themes: {
				light: "github-light",
				dark: "github-dark",
			},
			defaultColor: false,
		},
	},
	output: "server",
	adapter: cloudflare({
		wasmModuleImports: true,
	}),
});
