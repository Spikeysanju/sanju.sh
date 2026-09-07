import * as stylex from "@stylexjs/stylex";
import { space } from "../styles/tokens.stylex";

export const styles = stylex.create({
	copy: {
		display: "flex",
		flexDirection: "column",
		gap: space[4],
	},
	nav: {
		display: "flex",
		flexDirection: "column",
		gap: space[3],
	},
});
