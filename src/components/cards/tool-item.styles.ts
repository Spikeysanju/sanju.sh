import * as stylex from "@stylexjs/stylex";
import { colors, font, space } from "../../styles/tokens.stylex";

export const styles = stylex.create({
	card: {
		display: "flex",
		flexDirection: "column",
		gap: space[2],
		width: "100%",
	},
	name: {
		fontSize: font.base,
		fontWeight: font.medium,
	},
	description: {
		color: colors.textMuted,
		fontWeight: font.medium,
		fontSize: font.sm,
	},
});
