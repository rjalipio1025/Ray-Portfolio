import type { Statistic, StatusItem } from "./types";

/** Only numbers Ray can stand behind in an interview. */
export const statistics: Statistic[] = [
  {
    id: "years",
    value: 12,
    suffix: "+",
    label: "Years in IT",
    meta: "Career span",
    detail: "Since 2014, with Windows support in every role along the way.",
  },
  {
    id: "roles",
    value: 4,
    label: "Enterprise roles",
    meta: "Career path",
    detail: "Help desk, systems engineering, Level 2 escalation, then systems administration.",
  },
  {
    id: "platforms",
    value: 10,
    suffix: "+",
    label: "Enterprise platforms",
    meta: "Administration scope",
    detail: "Identity, endpoint, security and SaaS consoles administered.",
  },
];

/** Platforms supported, described by how they're managed rather than by counts. */
export const platformsSupported = [
  { os: "macOS", how: "Jamf Pro · Apple ADE · Jamf Trust", since: "Current role" },
  { os: "Windows", how: "Intune · Autopilot · SCCM · Active Directory", since: "Every role since 2014" },
  { os: "iOS / iPadOS", how: "Automated enrollment · app protection", since: "Current role" },
  { os: "Android", how: "Work Profile · fully managed · Managed Google Play", since: "Current role" },
];

/** Platforms behind the "10+" figure. */
export const adminPlatforms = [
  "Microsoft 365",
  "Entra ID",
  "Active Directory",
  "Intune",
  "Google Workspace",
  "Okta",
  "Jamf Pro",
  "Jamf Trust",
  "CrowdStrike",
  "Slack Enterprise",
  "Zoom",
];

/** Telemetry strip under the hero. Context only; the proof points sit in the hero. */
export const statusStrip: StatusItem[] = [
  { value: "Laguna, PH", label: "Based in" },
  { value: "Remote · US teams", label: "Works with" },
  { value: "macOS · Windows · iOS · Android", label: "Platforms" },
  { value: "Identity / Endpoint / Security / SaaS", label: "Domains" },
  { value: "Since 2014", label: "In IT" },
];
