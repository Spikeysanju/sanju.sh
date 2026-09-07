import * as stylex from "@stylexjs/stylex";
import { colors, font, radius, space } from "../../styles/tokens.stylex";
const md = "@media (min-width: 768px)";

export const styles = stylex.create({
	wrap: {
		marginBlock: space[10],
	},
	card: {
		backgroundColor: colors.bgMuted,
		borderRadius: radius["2xl"],
		padding: {
			default: space[8],
			[md]: space[10],
		},
	},
	readout: {
		textAlign: "center",
		marginBottom: space[6],
	},
	percent: {
		fontSize: {
			default: "3.75rem",
			[md]: "4.5rem",
		},
		fontWeight: font.bold,
		color: colors.text,
		transitionProperty: "color",
		transitionDuration: "500ms",
	},
	status: {
		fontSize: font.sm,
		color: colors.textMuted,
		marginTop: space[1],
	},
	batteryRow: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		gap: space[1],
		marginBottom: space[8],
	},
	body: {
		position: "relative",
		width: {
			default: "12rem",
			[md]: "16rem",
		},
		height: "2rem",
		backgroundColor: colors.ds200,
		borderRadius: radius.lg,
		borderWidth: "2px",
		borderStyle: "solid",
		borderColor: colors.border,
		overflow: "hidden",
	},
	cap: {
		width: "0.5rem",
		height: "1rem",
		backgroundColor: colors.borderStrong,
		borderTopRightRadius: radius.sm,
		borderBottomRightRadius: radius.sm,
	},
	stage: {
		position: "relative",
		height: "6rem",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	cardLayer: {
		position: "absolute",
		inset: 0,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		opacity: 0,
		transitionProperty: "opacity",
		transitionDuration: "500ms",
	},
	visible: {
		opacity: 1,
	},
	line: {
		display: "flex",
		alignItems: "center",
		gap: space[2],
		fontSize: {
			default: font.lg,
			[md]: font.xl,
		},
		color: colors.text,
	},
	drain: {
		color: colors.danger,
		fontWeight: font.medium,
		marginTop: space[1],
	},
	center: {
		textAlign: "center",
	},
	whisper: {
		fontSize: font.sm,
		color: colors.textMuted,
	},
});
