import * as stylex from "@stylexjs/stylex";
import { colors, motion, radius, space } from "../../styles/tokens.stylex";

export const styles = stylex.create({
	button: {
		borderRadius: radius.full,
		padding: space[2],
		backgroundColor: {
			":hover": colors.bgMuted,
		},
		transitionProperty: "background-color",
		transitionDuration: motion.normal,
	},
	icon: {
		width: "1.25rem",
		height: "1.25rem",
	},
});
