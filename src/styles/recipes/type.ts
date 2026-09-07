import * as stylex from "@stylexjs/stylex";
import { colors, font } from "../tokens.stylex";
const lg = "@media (min-width: 1024px)";
const md = "@media (min-width: 768px)";

export const type = stylex.create({
	pageTitle: {
		width: "100%",
		fontSize: {
			default: font["4xl"],
			[md]: font["5xl"],
			[lg]: font["7xl"],
		},
		lineHeight: font.leadingTight,
		letterSpacing: font.trackingTight,
		fontWeight: font.medium,
		textWrap: "balance",
		overflowWrap: "break-word",
	},
	section: {
		fontSize: {
			default: font["2xl"],
			[md]: font["4xl"],
		},
		lineHeight: font.leadingTight,
		letterSpacing: font.trackingTight,
		fontWeight: font.medium,
		textWrap: "balance",
	},
	lede: {
		fontSize: {
			default: font.base,
			[md]: font.lg,
		},
		lineHeight: font.leadingRelaxed,
		fontWeight: font.medium,
		color: colors.textBody,
		textWrap: "pretty",
	},
	body: {
		fontSize: {
			default: font.base,
			[md]: font.lg,
		},
		lineHeight: font.leadingRelaxed,
		fontWeight: font.medium,
		color: colors.textBody,
	},
	meta: {
		fontSize: font.sm,
		lineHeight: font.leadingNormal,
		fontWeight: font.medium,
		color: colors.textSecondary,
	},
	uppercase: {
		textTransform: "uppercase",
		letterSpacing: font.trackingWide,
	},
});
