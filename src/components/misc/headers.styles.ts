import * as stylex from "@stylexjs/stylex";
import { colors, font, space } from "../../styles/tokens.stylex";

export const styles = stylex.create({
	bar: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		maxWidth: "36rem",
	},
	nav: {
		display: "flex",
		flexDirection: "row",
		alignItems: "flex-start",
		gap: space[3],
		fontWeight: font.medium,
		color: colors.text,
	},
});
