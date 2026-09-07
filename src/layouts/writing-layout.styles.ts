import * as stylex from "@stylexjs/stylex";
import { colors, font, radius, space } from "../styles/tokens.stylex";

export const styles = stylex.create({
	article: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		gap: space[6],
	},
	measure: {
		width: "100%",
		maxWidth: "36rem",
	},
	metaRow: {
		display: "flex",
		flexDirection: "row",
		gap: space[2],
		width: "100%",
		maxWidth: "36rem",
	},
	tldrLead: {
		fontWeight: font.semibold,
		color: colors.text,
	},
	hero: {
		width: "100%",
		borderRadius: radius.lg,
	},
});
