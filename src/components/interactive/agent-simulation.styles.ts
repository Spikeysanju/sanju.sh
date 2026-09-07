import * as stylex from "@stylexjs/stylex";
import { colors, font, radius, space } from "../../styles/tokens.stylex";

export const styles = stylex.create({
	card: {
		padding: space[6],
		overflow: "hidden",
	},
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: space[4],
	},
	status: {
		display: "flex",
		alignItems: "center",
		gap: space[2],
	},
	live: {
		width: "0.5rem",
		height: "0.5rem",
		borderRadius: radius.full,
		backgroundColor: colors.success,
	},
	label: {
		fontSize: font.xs,
		fontWeight: font.medium,
		color: colors.onTerminalMuted,
		textTransform: "uppercase",
		letterSpacing: font.trackingWide,
	},
	run: {
		fontSize: font.xs,
		backgroundColor: {
			default: colors.terminalMuted,
			":hover": colors.terminalBorder,
		},
		color: colors.onTerminal,
		paddingInline: space[3],
		paddingBlock: "0.375rem",
		borderRadius: radius.full,
	},
	task: {
		color: colors.onTerminal,
		fontWeight: font.medium,
		marginBottom: space[4],
		opacity: 0,
	},
	steps: {
		display: "flex",
		flexDirection: "column",
		gap: space[3],
	},
	stepRow: {
		display: "flex",
		alignItems: "flex-start",
		gap: space[3],
	},
	icon: {
		width: "1.25rem",
		height: "1.25rem",
		borderRadius: radius.full,
		backgroundColor: colors.terminalMuted,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexShrink: 0,
		marginTop: "0.125rem",
	},
	mark: {
		width: "0.75rem",
		height: "0.75rem",
		color: colors.onTerminalMuted,
	},
	copy: {
		flex: 1,
	},
	stepTitle: {
		fontSize: font.sm,
		color: colors.onTerminalMuted,
	},
	result: {
		fontSize: font.xs,
		color: colors.onTerminalMuted,
		marginTop: space[1],
	},
	done: {
		marginTop: space[5],
		paddingTop: space[4],
		borderTopWidth: "1px",
		borderTopStyle: "solid",
		borderTopColor: colors.terminalBorder,
	},
	doneTitle: {
		fontSize: font.xs,
		color: colors.success,
		fontWeight: font.medium,
	},
	doneNote: {
		fontSize: font.xs,
		color: colors.onTerminalMuted,
		marginTop: space[1],
	},
});
