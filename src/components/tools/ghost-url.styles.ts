import * as stylex from "@stylexjs/stylex";
import {
	colors,
	font,
	motion,
	radius,
	space,
} from "../../styles/tokens.stylex";

export const styles = stylex.create({
	root: {
		display: "flex",
		flexDirection: "column",
		gap: space[6],
		width: "100%",
	},
	field: {
		display: "flex",
		flexDirection: "column",
		gap: space[2],
	},
	label: {
		fontSize: font.sm,
		fontWeight: font.medium,
		color: colors.textSecondary,
	},
	input: {
		width: "100%",
		paddingInline: space[4],
		paddingBlock: space[3],
		borderRadius: radius.lg,
		borderWidth: "1px",
		borderStyle: "solid",
		borderColor: colors.border,
		backgroundColor: colors.bg,
		color: colors.text,
		fontWeight: font.medium,
		outline: {
			":focus": "none",
		},
		boxShadow: {
			":focus": `0 0 0 2px ${colors.accentWriting}`,
		},
	},
	button: {
		width: "100%",
		paddingInline: space[4],
		paddingBlock: space[3],
		borderRadius: radius.lg,
		backgroundColor: {
			default: colors.accentWriting,
			":hover": colors.accentWriting,
		},
		color: colors.onAccent,
		fontWeight: font.medium,
		transitionProperty: "opacity",
		transitionDuration: motion.fast,
		opacity: {
			":hover": 0.9,
		},
	},
	output: {
		display: "none",
		flexDirection: "column",
		gap: space[2],
	},
	outputHead: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	copied: {
		fontSize: font.sm,
		fontWeight: font.medium,
		color: colors.success,
	},
	ghost: {
		width: "100%",
		paddingInline: space[4],
		paddingBlock: space[3],
		borderRadius: radius.lg,
		borderWidth: "1px",
		borderStyle: "solid",
		borderColor: colors.border,
		backgroundColor: {
			default: colors.bgSubtle,
			":hover": colors.bgMuted,
		},
		color: colors.text,
		fontWeight: font.medium,
		cursor: "pointer",
		overflowWrap: "anywhere",
		transitionProperty: "background-color",
		transitionDuration: motion.fast,
	},
	hint: {
		fontSize: font.xs,
		color: colors.textMuted,
	},
});
