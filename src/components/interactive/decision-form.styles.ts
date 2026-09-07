import * as stylex from "@stylexjs/stylex";
import { colors, font, radius, space } from "../../styles/tokens.stylex";

export const styles = stylex.create({
	card: {
		padding: space[6],
	},
	title: {
		fontSize: font.lg,
		fontWeight: font.semibold,
		color: colors.text,
		marginBottom: space[4],
	},
	fields: {
		display: "flex",
		flexDirection: "column",
		gap: space[4],
	},
	label: {
		display: "block",
		fontSize: font.sm,
		fontWeight: font.medium,
		color: colors.textSecondary,
		marginBottom: space[1],
	},
	control: {
		width: "100%",
		paddingInline: space[4],
		paddingBlock: space[2],
		borderRadius: radius.lg,
		borderWidth: "1px",
		borderStyle: "solid",
		borderColor: colors.border,
		backgroundColor: colors.bg,
		color: colors.text,
		outline: {
			":focus": "none",
		},
		boxShadow: {
			":focus": `0 0 0 2px ${colors.text}`,
		},
	},
	textarea: {
		resize: "none",
	},
	submit: {
		width: "100%",
		backgroundColor: {
			default: colors.text,
			":hover": colors.textSecondary,
		},
		color: colors.bg,
		fontWeight: font.medium,
		paddingBlock: "0.625rem",
		paddingInline: space[4],
		borderRadius: radius.full,
		transitionProperty: "opacity",
		transitionDuration: "150ms",
	},
	output: {
		marginTop: space[6],
	},
	outputHead: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: space[2],
	},
	copy: {
		fontSize: font.xs,
		color: colors.textMuted,
		textDecorationLine: "underline",
	},
	trace: {
		backgroundColor: colors.bg,
		borderWidth: "1px",
		borderStyle: "solid",
		borderColor: colors.border,
		borderRadius: radius.lg,
		padding: space[4],
		fontSize: font.sm,
		color: colors.text,
	},
	hint: {
		fontSize: font.xs,
		color: colors.textMuted,
		marginTop: space[3],
		textAlign: "center",
	},
	tease: {
		color: colors.ctaPink,
		fontWeight: font.medium,
	},
	teaseMeta: {
		color: colors.textMuted,
		fontSize: font.xs,
		fontWeight: font.medium,
	},
});
