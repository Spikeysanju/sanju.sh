import * as stylex from "@stylexjs/stylex";
import { colors, font, motion } from "../../styles/tokens.stylex";

export const styles = stylex.create({
	link: {
		fontWeight: font.medium,
		cursor: {
			":hover": "pointer",
		},
		color: {
			":hover": colors.text,
		},
		transitionProperty: "color",
		transitionDuration: motion.fast,
		transitionTimingFunction: "ease-out",
	},
	active: {
		color: colors.text,
	},
	inactive: {
		color: colors.textSecondary,
	},
});
