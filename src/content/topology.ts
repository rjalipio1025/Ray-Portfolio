import type { TopologyEdge, TopologyLayer, TopologyNode } from "./types";

/** Hero "access topology": the layers between a person and their work. */
export const topologyLayers: TopologyLayer[] = [
  { id: "user", label: "User" },
  { id: "identity", label: "Identity" },
  { id: "endpoint", label: "Endpoint" },
  { id: "platform", label: "Platform" },
  { id: "apps", label: "Applications" },
  { id: "security", label: "Security" },
];

export const topologyNodes: TopologyNode[] = [
  {
    id: "people",
    label: "People",
    role: "Employees",
    layer: "user",
    x: 50,
    description: "Employees on Macs, Windows laptops and phones. Every layer below exists so they can sign in and work.",
  },
  {
    id: "entra",
    label: "Entra ID",
    role: "IdP",
    layer: "identity",
    x: 32,
    description: "Cloud identity for Microsoft 365 and Intune: users, groups, licensing, device join and Conditional Access.",
  },
  {
    id: "okta",
    label: "Okta",
    role: "SSO",
    layer: "identity",
    x: 68,
    description: "Single sign-on for the SaaS stack: app assignments, MFA policy and same-day deprovisioning.",
  },
  {
    id: "intune",
    label: "Intune",
    role: "MDM",
    layer: "endpoint",
    x: 32,
    description: "Endpoint enrollment, policy, compliance and application deployment.",
  },
  {
    id: "jamf",
    label: "Jamf Pro",
    role: "Apple MDM",
    layer: "endpoint",
    x: 68,
    description: "Mac enrollment, configuration profiles, policies, patching and Self Service.",
  },
  {
    id: "windows",
    label: "Windows",
    role: "Intune · Autopilot",
    layer: "platform",
    x: 20,
    description: "Provisioned with Autopilot, managed in Intune, encrypted with BitLocker. Windows has been part of every role since 2014.",
  },
  {
    id: "macos",
    label: "macOS",
    role: "Jamf · Apple ADE",
    layer: "platform",
    x: 50,
    description: "Enrolled zero-touch through Apple ADE into Jamf Pro, with profiles, policies and Self Service.",
  },
  {
    id: "mobile",
    label: "Mobile",
    role: "iOS · Android",
    layer: "platform",
    x: 80,
    description: "Corporate and personal phones: Android Work Profile, iOS app protection and managed apps.",
  },
  {
    id: "slack",
    label: "Slack",
    role: "Messaging",
    layer: "apps",
    x: 12,
    description: "Enterprise workspace administration, SSO and member lifecycle.",
  },
  {
    id: "m365",
    label: "Microsoft 365",
    role: "Productivity",
    layer: "apps",
    x: 37,
    description: "Mail, Teams, OneDrive and licensing.",
  },
  {
    id: "gws",
    label: "Google Workspace",
    role: "Productivity",
    layer: "apps",
    x: 65,
    description: "Accounts, Gmail, Drive, shared drives and calendars.",
  },
  {
    id: "zoom",
    label: "Zoom",
    role: "Meetings",
    layer: "apps",
    x: 90,
    description: "Licensing, SSO and user provisioning.",
  },
  {
    id: "crowdstrike",
    label: "CrowdStrike",
    role: "EDR",
    layer: "security",
    x: 34,
    description: "EDR sensor on every managed Mac and Windows machine, checked for health and reporting.",
  },
  {
    id: "jamftrust",
    label: "Jamf Trust",
    role: "Threat defense",
    layer: "security",
    x: 66,
    description: "Network threat protection and secure access on Apple devices.",
  },
];

const platforms = ["windows", "macos", "mobile"];
const apps = ["slack", "m365", "gws", "zoom"];
const security = ["crowdstrike", "jamftrust"];

export const topologyEdges: TopologyEdge[] = [
  ["people", "entra"],
  ["people", "okta"],
  ["entra", "intune"],
  ["okta", "jamf"],
  ["intune", "windows"],
  ["intune", "mobile"],
  ["jamf", "macos"],
  ["jamf", "mobile"],
  ...platforms.flatMap((p) => apps.map((a) => [p, a] as TopologyEdge)),
  ...apps.flatMap((a) => security.map((s) => [a, s] as TopologyEdge)),
];
