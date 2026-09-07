import * as stylex from "@stylexjs/stylex";
import { colors, font, radius, space } from "../tokens.stylex";
const md = "@media (min-width: 768px)";

export const widget = stylex.create({
	wrap: {
		marginBlock: space[8],
	},
	grid: {
		display: "grid",
		gridTemplateColumns: {
			default: "1fr",
			[md]: "1fr 1fr",
		},
		gap: space[4],
	},
	surface: {
		backgroundColor: colors.bgMuted,
		color: colors.text,
		borderRadius: radius.xl,
		overflow: "hidden",
	},
	terminal: {
		backgroundColor: colors.terminal,
		color: colors.onTerminal,
		borderRadius: radius.xl,
		overflow: "hidden",
	},
	kicker: {
		fontSize: font.xs,
		fontWeight: font.semibold,
		color: colors.textMuted,
		textTransform: "uppercase",
		letterSpacing: font.trackingWide,
	},
	kickerOnDark: {
		fontSize: font.xs,
		fontWeight: font.semibold,
		color: colors.success,
		textTransform: "uppercase",
		letterSpacing: font.trackingWide,
	},
	dotRow: {
		display: "flex",
		alignItems: "center",
		gap: space[2],
	},
	traffic: {
		display: "flex",
		gap: "0.375rem",
	},
	dot: {
		width: "0.75rem",
		height: "0.75rem",
		borderRadius: radius.full,
	},
	dotRed: { backgroundColor: colors.danger },
	dotYellow: { backgroundColor: colors.warning },
	dotGreen: { backgroundColor: colors.success },
	meta: {
		fontSize: font.xs,
		color: colors.textMuted,
	},
	metaOnDark: {
		fontSize: font.xs,
		color: colors.onTerminalMuted,
	},
});
