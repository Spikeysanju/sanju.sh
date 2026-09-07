import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";

export const category = stylex.create({
	ai: { backgroundColor: colors.catAi },
	design: { backgroundColor: colors.catDesign },
	product: { backgroundColor: colors.catProduct },
	engineering: { backgroundColor: colors.catEngineering },
	productivity: { backgroundColor: colors.catProductivity },
	learning: { backgroundColor: colors.catLearning },
	opensource: { backgroundColor: colors.catOpensource },
	thoughts: { backgroundColor: colors.catThoughts },
	tools: { backgroundColor: colors.catTools },
	work: { backgroundColor: colors.catWork },
	default: { backgroundColor: colors.catDefault },
});

export const ctaBg = stylex.create({
	yellow: { backgroundColor: colors.ctaYellow },
	red: { backgroundColor: colors.ctaRed },
	orange: { backgroundColor: colors.ctaOrange },
	pink: { backgroundColor: colors.ctaPink },
	indigo: { backgroundColor: colors.ctaIndigo },
	teal: { backgroundColor: colors.ctaTeal },
	cyan: { backgroundColor: colors.ctaCyan },
	lime: { backgroundColor: colors.ctaLime },
	blue: { backgroundColor: colors.ctaBlue },
	green: { backgroundColor: colors.ctaGreen },
	purple: { backgroundColor: colors.ctaPurple },
	gray: { backgroundColor: colors.ctaGray },
	amber: { backgroundColor: colors.ctaAmber },
	default: { backgroundColor: colors.ctaDefault },
});

export const highlight = stylex.create({
	yellow: { backgroundColor: colors.highlightYellow },
	green: { backgroundColor: colors.highlightGreen },
	pink: { backgroundColor: colors.highlightPink },
	blue: { backgroundColor: colors.highlightBlue },
});

export const ship = stylex.create({
	empty: { backgroundColor: colors.shipEmpty },
	low: { backgroundColor: colors.shipLow },
	mid: { backgroundColor: colors.shipMid },
	high: { backgroundColor: colors.shipHigh },
});
