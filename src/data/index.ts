export const SITE_TITLE = "Sanju's Space";
export const SITE_DESCRIPTION =
	"sanju sivalingam — designer and founder of thisux. writing on product, design, and building software that works.";
export const SITE_URL = "https://sanju.sh";
export const SITE_IMAGE = "/images/ogimage.png";
export const TWITTER_HANDLE = "@spikeysanju";
export const AUTHOR_NAME = "Sanju Sivalingam";
export const AUTHOR_JOB_TITLE = "designer, founder";
export const AUTHOR_IMAGE = "/images/sanju.png";
export const AUTHOR_EMAIL = "work@sanju.sh";

/** stable schema.org @id for the person entity */
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export interface MenuItem {
	label: string;
	url: string;
}

export const menuItems: MenuItem[] = [
	{
		label: "sanju",
		url: "/",
	},
	{
		label: "writings",
		url: "/writings",
	},
	{
		label: "thoughts",
		url: "/thoughts",
	},
];

export const products = [
	{
		name: "ThisUX",
		url: "https://thisux.com",
		image: "/products/thisux.png",
	},
	{
		name: "DunSocial",
		url: "https://dunsocial.com",
		image: "/products/dunsocial.png",
	},
	{
		name: "SticAI",
		url: "https://sticai.com",
		image: "/products/sticai.png",
	},
	{
		name: "unitedby.ai",
		url: "https://unitedby.ai",
		image: "/products/unitedbyai.png",
	},
	{
		name: "DroidClaw",
		url: "https://droidclaw.ai",
		image: "/products/droidclaw.png",
	},
	{
		name: "DunTasks",
		url: "https://duntasks.com",
		image: "/products/duntasks.png",
	},
	{
		name: "Fli.so",
		url: "https://github.com/thisuxhq/fli.so",
		image: "/products/fli.png",
	},
	{
		name: "Dun",
		url: "https://dunsuite.com",
		image: "/products/dun.png",
	},
	{
		name: "Uiino",
		url: "https://uiino.com",
		image: "/products/uiino.png",
	},
];

export const socialLinks = [
	{
		label: "@x",
		url: "https://x.com/spikeysanju",
		me: true,
	},
	{
		label: "email",
		url: `mailto:${AUTHOR_EMAIL}`,
		me: false,
	},
	{
		label: "github",
		url: "https://github.com/spikeysanju",
		me: true,
	},
	{
		label: "linkedin",
		url: "https://www.linkedin.com/in/imsanju",
		me: true,
	},
];

/** public profiles used in schema.org sameAs */
export const sameAs = socialLinks
	.filter((link) => link.me)
	.map((link) => link.url);
