import * as stylex from "@stylexjs/stylex";
import { space } from "../styles/tokens.stylex";
const xl = "@media (min-width: 1280px)";

export const styles = stylex.create({
	root: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start",
		width: "100%",
		marginBlock: space[6],
		marginInline: "auto",
		padding: space[4],
		WebkitFontSmoothing: "antialiased",
	},
	xl: {
		maxWidth: "36rem",
	},
	article: {
		maxWidth: {
			default: "36rem",
			[xl]: "56rem",
		},
	},
});
