import * as stylex from "@stylexjs/stylex";
import { font, space } from "../../styles/tokens.stylex";

export const styles = stylex.create({
	row: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		gap: space[3],
	},
	title: {
		minWidth: 0,
		flex: 1,
		fontSize: font.base,
		fontWeight: font.medium,
		textWrap: "pretty",
	},
	date: {
		flexShrink: 0,
	},
});
