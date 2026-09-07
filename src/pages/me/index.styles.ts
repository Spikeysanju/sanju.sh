import * as stylex from "@stylexjs/stylex";
import {
	colors,
	font,
	motion,
	radius,
	space,
} from "../../styles/tokens.stylex";
const sm = "@media (min-width: 640px)";

export const styles = stylex.create({
	page: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		maxWidth: "36rem",
		gap: space[12],
	},
	section: {
		display: "flex",
		flexDirection: "column",
		gap: space[6],
	},
	heroRow: {
		display: "flex",
		flexDirection: {
			default: "column",
			[sm]: "row",
		},
		alignItems: {
			default: "flex-start",
			[sm]: "center",
		},
		gap: space[6],
	},
	headshot: {
		width: {
			default: "8rem",
			[sm]: "10rem",
		},
		height: {
			default: "8rem",
			[sm]: "10rem",
		},
		borderRadius: radius.full,
		objectFit: "cover",
		borderWidth: "2px",
		borderStyle: "solid",
		borderColor: colors.bg,
		flexShrink: 0,
		transitionProperty: "opacity",
		transitionDuration: motion.slow,
	},
	download: {
		position: "absolute",
		inset: 0,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: radius.full,
		backgroundColor: "rgb(0 0 0 / 0.6)",
		opacity: 0,
		cursor: "pointer",
		transitionProperty: "opacity",
		transitionDuration: motion.slow,
	},
	downloadLabel: {
		color: colors.onAccent,
		fontWeight: font.medium,
		fontSize: font.sm,
		paddingInline: space[4],
		paddingBlock: space[2],
		borderRadius: radius.full,
		backgroundColor: "rgb(255 255 255 / 0.2)",
		backdropFilter: "blur(4px)",
	},
	heroCopy: {
		display: "flex",
		flexDirection: "column",
		gap: space[2],
	},
	name: {
		fontSize: "min(10vw, 64px)",
		fontWeight: font.medium,
		lineHeight: 0.9,
		letterSpacing: {
			default: "-2px",
			[sm]: "-3px",
		},
	},
	role: {
		color: colors.textSecondary,
	},
	copy: {
		display: "flex",
		flexDirection: "column",
		gap: space[4],
	},
	social: {
		display: "flex",
		flexDirection: "column",
		gap: space[6],
		paddingTop: space[6],
		borderTopWidth: "1px",
		borderTopStyle: "solid",
		borderTopColor: colors.border,
	},
	socialRow: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		gap: space[6],
	},
});
