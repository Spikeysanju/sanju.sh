export const SITE_TITLE = "Sanju";
export const SITE_DESCRIPTION = "A internet space for Sanju.";

export interface MenuItem {
	label: string;
	url: string;
}

export const menuItems: MenuItem[] = [
	{
		label: "home",
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
