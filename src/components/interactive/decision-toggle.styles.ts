import * as stylex from "@stylexjs/stylex";
import { colors, font, space } from "../../styles/tokens.stylex";

export const styles = stylex.create({
	surface: {
		padding: space[5],
		overflow: "hidden",
	},
	terminal: {
		padding: space[5],
	},
	log: {
		marginTop: space[3],
		display: "flex",
		flexDirection: "column",
		gap: "0.375rem",
		fontSize: font.sm,
	},
	row: {
		display: "flex",
		alignItems: "center",
		gap: space[2],
		color: colors.textMuted,
	},
	bullet: {
		color: colors.border,
	},
	time: {
		fontSize: font.xs,
		color: colors.textMuted,
	},
	last: {
		color: colors.textSecondary,
	},
	footnote: {
		fontSize: font.xs,
		color: colors.textMuted,
		marginTop: space[4],
	},
	trace: {
		marginTop: space[3],
		display: "flex",
		flexDirection: "column",
		gap: space[2],
	},
	traceRow: {
		display: "flex",
		alignItems: "flex-start",
		gap: space[2],
		color: colors.onTerminal,
	},
	traceBullet: {
		color: colors.success,
		marginTop: "0.125rem",
	},
	traceNote: {
		fontSize: font.xs,
		color: colors.onTerminalMuted,
		marginTop: space[4],
	},
});
