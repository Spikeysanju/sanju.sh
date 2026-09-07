import * as stylex from "@stylexjs/stylex";
import { colors, font, space } from "../../styles/tokens.stylex";

export const styles = stylex.create({
	nav: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		maxWidth: "36rem",
		gap: space[4],
		paddingTop: space[10],
		borderTopWidth: "1px",
		borderTopStyle: "solid",
		borderTopColor: colors.border,
	},
	heading: {
		fontSize: font.sm,
		fontWeight: font.medium,
		textTransform: "uppercase",
		letterSpacing: font.trackingWide,
		color: colors.textSecondary,
	},
	list: {
		display: "flex",
		flexDirection: "column",
		gap: space[4],
		listStyle: "none",
	},
	item: {
		display: "flex",
		flexDirection: "column",
		gap: space[1],
		textDecorationLine: {
			default: "none",
			":hover": "underline",
		},
		textUnderlineOffset: "0.125rem",
	},
	label: {
		fontSize: font.xs,
		fontWeight: font.medium,
		textTransform: "uppercase",
		letterSpacing: font.trackingWide,
		color: colors.textSecondary,
	},
	title: {
		color: colors.text,
	},
	description: {
		fontSize: font.sm,
		fontWeight: font.medium,
		color: colors.textSecondary,
		display: "-webkit-box",
		overflow: "hidden",
		WebkitLineClamp: 2,
		WebkitBoxOrient: "vertical",
	},
});
