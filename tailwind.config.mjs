/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	darkMode: 'class',
	theme: {
		fontFamily: {
			uncut: ["UncutSans", "sans-serif"],
		},
		extend: {},
	},
	plugins: [require("@tailwindcss/typography")],
};
