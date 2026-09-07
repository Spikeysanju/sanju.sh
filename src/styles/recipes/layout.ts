import * as stylex from "@stylexjs/stylex";
import { space } from "../tokens.stylex";
const xl = "@media (min-width: 1280px)";

export const layout = stylex.create({
	page: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		maxWidth: "36rem",
		gap: space[6],
	},
	articlePage: {
		display: "flex",
		flexDirection: "column",
		alignItems: {
			default: "stretch",
			[xl]: "center",
		},
		width: "100%",
		maxWidth: {
			default: "36rem",
			[xl]: "56rem",
		},
		gap: space[6],
	},
	stack: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
	},
	cluster: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	row: {
		display: "flex",
		flexDirection: "row",
	},
});
