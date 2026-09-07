import * as stylex from "@stylexjs/stylex";
import { radius, space } from "../../styles/tokens.stylex";

export const styles = stylex.create({
	mark: {
		paddingInline: space[1],
		paddingBlock: "0.125rem",
		borderRadius: radius.sm,
		color: "inherit",
	},
});
