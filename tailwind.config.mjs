/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				surface: {
					DEFAULT: 'var(--color-bg)',
					subtle: 'var(--color-bg-subtle)',
					muted: 'var(--color-bg-muted)',
				},
				content: {
					DEFAULT: 'var(--color-text)',
					secondary: 'var(--color-text-secondary)',
					muted: 'var(--color-text-muted)',
					body: 'var(--color-text-body)',
				},
				line: {
					DEFAULT: 'var(--color-border)',
					strong: 'var(--color-border-strong)',
				},
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
