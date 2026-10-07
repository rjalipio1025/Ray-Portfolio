import type { SocialLink } from "./types";

/**
 * Public contact points. A phone number is intentionally not listed.
 * To add LinkedIn, set `linkedinUrl` to the full profile URL; every
 * component (hero, contact, footer, résumé, palette, JSON-LD) picks it up.
 */
const email = "rjalipio1025@gmail.com";
const githubUser = "rayjoseph16";
const linkedinUrl: string | null = "https://www.linkedin.com/in/ray-joseph-alipio-43853b1b6";

function linkedinHandle(url: string) {
  const match = url.match(/linkedin\.com\/(in\/[^/?#]+)/i);
  return match ? match[1] : "LinkedIn";
}

const links: (SocialLink | null)[] = [
  linkedinUrl
    ? { id: "linkedin", label: "LinkedIn", handle: linkedinHandle(linkedinUrl), href: linkedinUrl }
    : null,
  {
    id: "github",
    label: "GitHub",
    handle: githubUser,
    href: `https://github.com/${githubUser}`,
  },
  { id: "email", label: "Email", handle: email, href: `mailto:${email}` },
];

export const socialLinks: SocialLink[] = links.filter((l): l is SocialLink => l !== null);

export const contactEmail = email;

export function getSocial(id: SocialLink["id"]) {
  return socialLinks.find((l) => l.id === id);
}
