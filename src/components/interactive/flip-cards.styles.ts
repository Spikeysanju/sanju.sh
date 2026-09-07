import * as stylex from "@stylexjs/stylex";
import { colors, font, space } from "../../styles/tokens.stylex";
const sm = "@media (min-width: 640px)";

export const styles = stylex.create({
	hint: {
		textAlign: "center",
		fontSize: font.sm,
		color: colors.textMuted,
		marginBottom: space[4],
	},
	grid: {
		display: "grid",
		gridTemplateColumns: {
			default: "1fr",
			[sm]: "1fr 1fr",
		},
		gap: space[4],
	},
});
