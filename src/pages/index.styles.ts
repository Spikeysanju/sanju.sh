import * as stylex from "@stylexjs/stylex";
import { colors, font, space } from "../styles/tokens.stylex";
const sm = "@media (min-width: 640px)";

export const styles = stylex.create({
	title: {
		width: "100%",
		textAlign: "start",
		fontSize: "min(12vw, 72px)",
		fontWeight: font.medium,
		lineHeight: 0.9,
		letterSpacing: {
			default: "-2px",
			[sm]: "-4px",
		},
	},
	titleMeta: {
		display: "block",
		color: colors.textSecondary,
	},
	about: {
		display: "flex",
		flexDirection: "column",
		gap: space[4],
	},
	minW0: {
		minWidth: 0,
	},
	social: {
		display: "flex",
		flexDirection: "row",
		gap: space[4],
	},
});
