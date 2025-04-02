export const SITE_TITLE = "Sanju's Space";
export const SITE_DESCRIPTION = "A internet space for Sanju.";

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
	{
		label: "ships",
		url: "/ships",
	},
];

export const title = "Sanju's Space";
export const description = "A internet space for Sanju.";
export const image = "/images/ogimage.png";
export const url = "https://sanju.sh";

export const ogImage = {
	src: "/images/ogimage.png",
	alt: "Sanju's Space",
};


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
