import * as stylex from "@stylexjs/stylex";
import { colors, font } from "../../styles/tokens.stylex";
const xl = "@media (min-width: 1280px)";

export const styles = stylex.create({
	toggle: {
		display: "inline",
		fontWeight: font.medium,
		color: colors.textMuted,
		cursor: {
			default: "pointer",
			[xl]: "default",
		},
		pointerEvents: {
			[xl]: "none",
		},
	},
	sup: {
		fontSize: font.xs,
	},
	body: {
		display: {
			default: "none",
			[xl]: "inline",
		},
		fontSize: font.sm,
		color: colors.textMuted,
		lineHeight: font.leadingRelaxed,
	},
	lead: {
		fontWeight: font.medium,
	},
});
