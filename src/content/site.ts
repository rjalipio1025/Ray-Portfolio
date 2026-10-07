/**
 * Site-wide identity. The production URL comes from NEXT_PUBLIC_SITE_URL
 * (set it to the final domain), falling back to Vercel's production URL,
 * then to localhost for development.
 */
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const site = {
  url: resolveSiteUrl(),
  name: "Ray Joseph Alipio",
  shortName: "Ray Alipio",
  title: "IT Systems Administrator",
  headline: "I keep people, devices, and access moving.",
  intro:
    "12+ years across endpoint management, identity, SaaS administration, IT operations, and enterprise support.",
  seoTitle: "Ray Joseph Alipio | IT Systems Administrator & Endpoint Management",
  description:
    "IT Systems Administrator with 12+ years of experience across endpoint management, Microsoft Intune, Jamf, Entra ID, Okta, Microsoft 365, Google Workspace and enterprise IT operations.",
  location: "Laguna, Philippines",
  availability: "Remote with US teams",
  careerStart: "2014-05",
  education: {
    degree: "BS Information Technology",
    school: "AMA Computer College",
    place: "Calamba City, Laguna",
    years: "2010 – 2014",
  },
  resume: {
    pdf: "/Ray-Joseph-Alipio-Resume.pdf",
    filename: "Ray-Joseph-Alipio-Resume.pdf",
    html: "/resume",
  },
  /** Topics for structured data (schema.org knowsAbout). */
  knowsAbout: [
    "Endpoint management",
    "Microsoft Intune",
    "Windows Autopilot",
    "Jamf Pro",
    "Microsoft Entra ID",
    "Okta",
    "Identity and access management",
    "Microsoft 365 administration",
    "Google Workspace administration",
    "CrowdStrike",
    "IT asset management",
    "Employee onboarding and offboarding",
    "Enterprise IT support",
  ],
} as const;
