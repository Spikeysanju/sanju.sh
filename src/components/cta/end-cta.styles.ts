import * as stylex from "@stylexjs/stylex";
import { colors, font, radius, space } from "../../styles/tokens.stylex";
const md = "@media (min-width: 768px)";
const sm = "@media (min-width: 640px)";

export const styles = stylex.create({
	card: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		gap: space[3],
		padding: space[6],
		position: "relative",
		borderRadius: radius["2xl"],
	},
	copy: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		gap: space[3],
	},
	title: {
		width: "100%",
		color: "#030712",
		fontWeight: font.medium,
		fontSize: {
			default: font.base,
			[sm]: font.xl,
			[md]: font["2xl"],
		},
		lineHeight: font.leadingTight,
		textWrap: "pretty",
	},
	actions: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		gap: space[2],
	},
	primary: {
		backgroundColor: colors.terminal,
		color: colors.onTerminal,
		fontWeight: font.medium,
		paddingBlock: space[2],
		paddingInline: space[4],
		borderRadius: radius.full,
		width: "fit-content",
		cursor: "pointer",
	},
	secondary: {
		color: "#000000",
		fontWeight: font.medium,
		paddingBlock: space[2],
		paddingInline: space[4],
		borderRadius: radius.full,
		width: "fit-content",
		textDecorationLine: "underline",
		textUnderlineOffset: "0.125rem",
		cursor: "pointer",
	},
});
