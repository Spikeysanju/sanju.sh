import {
	AUTHOR_EMAIL,
	AUTHOR_JOB_TITLE,
	AUTHOR_NAME,
	SITE_URL,
	socialLinks,
} from "@data/index";
import type { APIRoute } from "astro";

const [firstName, ...rest] = AUTHOR_NAME.split(" ");
const lastName = rest.join(" ");

const profile = (label: string) =>
	socialLinks.find((link) => link.label === label)?.url;

const lines = [
	"BEGIN:VCARD",
	"VERSION:3.0",
	`N:${lastName};${firstName};;;`,
	`FN:${AUTHOR_NAME}`,
	"ORG:ThisUX",
	`TITLE:${AUTHOR_JOB_TITLE}`,
	`EMAIL;TYPE=INTERNET,WORK:${AUTHOR_EMAIL}`,
	`URL:${SITE_URL}`,
	`X-SOCIALPROFILE;TYPE=twitter:${profile("@x")}`,
	`X-SOCIALPROFILE;TYPE=linkedin:${profile("linkedin")}`,
	`X-SOCIALPROFILE;TYPE=github:${profile("github")}`,
	"END:VCARD",
];

const vcard = `${lines.join("\r\n")}\r\n`;

export const GET: APIRoute = () =>
	new Response(vcard, {
		headers: {
			"Content-Type": "text/vcard; charset=utf-8",
			"Content-Disposition": 'attachment; filename="sanju-sivalingam.vcf"',
			"Cache-Control": "public, max-age=3600",
		},
	});
