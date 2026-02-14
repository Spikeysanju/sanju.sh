export const SITE_TITLE = "Sanju's Space";
export const SITE_DESCRIPTION = "An internet space for Sanju.";
export const SITE_URL = "https://sanju.sh";
export const SITE_IMAGE = "/images/ogimage.png";
export const TWITTER_HANDLE = "@spikeysanju";

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
		name: "Fli.so",
		url: "https://fli.so",
		image: "/products/fli.png",
	},
	{
		name: "Uiino",
		url: "https://uiino.com",
		image: "/products/uiino.png",
	},
	{
		name: "SticAI",
		url: "https://sticai.com",
		image: "/products/sticai.png",
	},
	{
		name: "Dun",
		url: "https://dunsuite.com",
		image: "/products/dun.png",
	},
	{
		name: "DunTasks",
		url: "https://duntasks.com",
		image: "/products/duntasks.png",
	},
];

export const socialLinks = [
	{
		label: "@x",
		url: "https://x.com/spikeysanju",
	},
	{
		label: "email",
		url: "mailto:work@sanju.sh",
	},
	{
		label: "github",
		url: "https://github.com/spikeysanju",
	},
	{
		label: "linkedin",
		url: "https://www.linkedin.com/in/imsanju",
	},
];
