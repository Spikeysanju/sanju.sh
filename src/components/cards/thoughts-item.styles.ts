import * as stylex from "@stylexjs/stylex";
import { font, space } from "../../styles/tokens.stylex";
const md = "@media (min-width: 768px)";

export const styles = stylex.create({
	card: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		gap: space[3],
		padding: space[6],
		position: "relative",
		transitionProperty: "transform",
		transitionDuration: "75ms",
		transitionTimingFunction: "ease-in-out",
		color: "#171717",
	},
	tiltEven: {
		transform: {
			default: "rotate(1deg)",
			":hover": "rotate(0deg)",
		},
	},
	tiltOdd: {
		transform: {
			default: "rotate(-1deg)",
			":hover": "rotate(0deg)",
		},
	},
	quote: {
		position: "absolute",
		top: space[3],
		right: space[3],
		fontSize: {
			default: font["4xl"],
			[md]: font["5xl"],
		},
		color: "#404040",
	},
	kicker: {
		width: "100%",
		fontWeight: font.medium,
		fontSize: font.base,
		color: "#171717",
	},
	wavy: {
		textDecorationLine: "underline",
		textDecorationStyle: "wavy",
	},
	content: {
		width: "100%",
		fontWeight: font.medium,
		fontSize: {
			default: font.xl,
			[md]: font["2xl"],
		},
		textIndent: "2.25rem",
		textWrap: "pretty",
		color: "#000000",
	},
	date: {
		width: "100%",
		textAlign: "end",
		fontWeight: font.medium,
		fontSize: font.sm,
		color: "#000000",
	},
});
