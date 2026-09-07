import * as stylex from "@stylexjs/stylex";
import { colors, font } from "../tokens.stylex";

export const link = stylex.create({
	base: {
		color: "inherit",
		textUnderlineOffset: "0.18em",
	},
	underline: {
		textDecorationLine: "underline",
		textUnderlineOffset: "0.125rem",
	},
	muted: {
		color: {
			default: colors.textSecondary,
			":hover": colors.text,
		},
		textDecorationLine: {
			default: "none",
			":hover": "underline",
		},
		fontWeight: font.medium,
	},
});
