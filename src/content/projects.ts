import type { LifecycleStage, Project } from "./types";

export const projects: Project[] = [
  {
    id: "lifecycle-platform",
    title: "IT Lifecycle Management Platform",
    tags: ["IT Operations", "Automation", "Asset Management"],
    summary:
      "One operational view of every employee's IT lifecycle, from the HR request to the returned laptop.",
    problem:
      "Onboarding, offboarding, app access and hardware were tracked across tickets, spreadsheets and inboxes. No single place could answer \"what does this person have, and what still needs to happen?\"",
    approach:
      "I designed and built an internal platform that treats every hire and departure as a record moving through stages, with its access requests, devices and audit trail attached.",
    highlights: [
      "Employee onboarding",
      "Employee offboarding",
      "Application access",
      "Device assignment",
      "Asset tracking",
      "Asset recovery",
      "Audit logs",
    ],
    notes: [
      "HR tickets trigger a sync that creates or updates the lifecycle record. Updates match the existing record, so editing a ticket never creates a duplicate.",
      "A new hire automatically gets a pending device assignment and access request. A departure opens an asset-recovery record.",
      "Every change writes an audit entry recording who did what, and when.",
      "All deadlines are stored in a single business time zone, so a team spread across time zones sees the same due date.",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Google Apps Script", "Google Sheets", "Jira Automation"],
    outcome:
      "Replaced fragmented, manual lifecycle tracking with one view of what's pending, what's overdue, who has which device, and what changed.",
    diagram: "lifecycle",
    featured: {
      problem: "Fragmented onboarding, offboarding, asset and access tracking.",
      solution: "A centralized IT operations system.",
      capabilities: [
        "Employee lifecycle",
        "Asset assignment",
        "Access management",
        "Recovery tracking",
        "Audit logs",
        "Automation",
      ],
    },
  },
  {
    id: "endpoint-management",
    title: "Enterprise Endpoint Management",
    tags: ["Intune", "Jamf", "Endpoint Security"],
    summary: "A mixed macOS and Windows fleet, managed to a single standard.",
    problem:
      "Macs and Windows laptops sit side by side, each with its own tooling, yet users and auditors expect the same result: encrypted, patched, protected and ready to work.",
    approach:
      "Both platforms enroll automatically from first boot. Configuration, apps and security agents arrive through policy, compliance is evaluated continuously, and fixes happen remotely when something drifts.",
    highlights: [
      "Windows Autopilot",
      "Microsoft Intune",
      "Jamf Pro",
      "Application deployment",
      "Device compliance",
      "Remote remediation",
    ],
    stack: ["Jamf Pro", "Apple ADE", "Intune", "Autopilot", "CrowdStrike", "Jamf Trust", "BitLocker", "Windows LAPS"],
    outcome:
      "New devices arrive configured without hands-on imaging. Compliance is reported by the platform, not assumed.",
    diagram: "endpoint",
  },
  {
    id: "identity-lifecycle",
    title: "Identity & Access Lifecycle",
    tags: ["IAM", "Okta", "Entra ID"],
    summary: "Joiner, mover, leaver: access that follows the person and goes away when they do.",
    problem:
      "Access granted one app at a time is hard to review and easy to miss when someone leaves. The risk is concentrated in the last day, not the first.",
    approach:
      "Identity is created once and access comes from group membership and licensing rules. Role changes are group changes. Offboarding follows a fixed order: sign-in disabled, sessions revoked, access and licenses removed, data handed over.",
    highlights: [
      "Onboarding",
      "SSO",
      "MFA",
      "Group membership",
      "Licensing",
      "Role changes",
      "Offboarding",
      "Access revocation",
    ],
    stack: ["Okta", "Microsoft Entra ID", "Google Workspace", "Microsoft 365", "Slack", "Zoom"],
    outcome:
      "Because access comes from groups rather than one-off grants, it can be reviewed, and revoking it is complete.",
    diagram: "identity",
  },
  {
    id: "mobile-byod",
    title: "Mobile & BYOD Management",
    tags: ["Android Enterprise", "iOS", "Intune"],
    summary: "Work data on phones, without taking over people's personal devices.",
    problem:
      "Staff need email and chat on their phones, whether the phone belongs to the company or to them. Company devices need full control; personal ones need a clear boundary.",
    approach:
      "Ownership decides the model. Corporate-owned devices are fully managed. Personal devices keep work apps in a work profile or in protected apps, and only company data can be wiped.",
    highlights: [
      "Android Work Profile",
      "Corporate-owned Android",
      "Managed Google Play",
      "iOS BYOD",
      "Secure applications",
      "VPN",
      "Mobile policies",
    ],
    stack: ["Intune", "Android Enterprise", "Managed Google Play", "Apple Business Manager"],
    outcome:
      "People can use the phone they already carry, and the company can remove its data without touching anything personal.",
    diagram: "mobile",
  },
];

/* ─── Diagram data ──────────────────────────────────────────────────────── */

export const lifecycleStages: LifecycleStage[] = [
  {
    id: "new-hire",
    label: "New Hire",
    detail: "A hire is raised as an HR ticket. The ticket starts everything, not an email thread.",
    record: "Ticket linked, lifecycle record opened",
    systems: ["Jira"],
  },
  {
    id: "onboarding",
    label: "Onboarding",
    detail: "The record captures start date, role, location and device needs, and every task gets an owner.",
    record: "Onboarding record · Pending",
    systems: ["IT Lifecycle platform"],
  },
  {
    id: "identity",
    label: "Identity",
    detail: "Accounts are created in the identity provider, and MFA enrollment is required at first sign-in.",
    record: "Accounts created · MFA required",
    systems: ["Okta", "Entra ID", "Google Workspace"],
  },
  {
    id: "access",
    label: "Application Access",
    detail: "Role-based groups grant apps and licenses. Anything extra goes through an approved access request.",
    record: "Access request · Approved",
    systems: ["Okta", "Microsoft 365", "Slack", "Zoom"],
  },
  {
    id: "device",
    label: "Device",
    detail: "A laptop is assigned from inventory and enrolls into management the first time it boots.",
    record: "Asset assigned · Enrolled",
    systems: ["Jamf Pro", "Apple ADE", "Intune", "Autopilot"],
  },
  {
    id: "active",
    label: "Active Employee",
    detail: "Access changes and device swaps update the same record, so the history stays in one place.",
    record: "Changes audited on the record",
    systems: ["IT Lifecycle platform"],
  },
  {
    id: "offboarding",
    label: "Offboarding",
    detail: "Sign-in is disabled, sessions are revoked, licenses are reclaimed and data is handed over, from a checklist with owners.",
    record: "Offboarding checklist · Complete",
    systems: ["Okta", "Entra ID", "Google Workspace"],
  },
  {
    id: "recovery",
    label: "Asset Recovery",
    detail: "The device is tracked until it's returned, wiped and back in inventory for the next hire.",
    record: "Recovered · Wiped · In stock",
    systems: ["Jamf Pro", "Intune"],
  },
];

export const endpointPipelines = {
  macos: {
    label: "macOS",
    share: "Jamf Pro",
    steps: [
      { stage: "Enroll", tool: "Apple ADE", note: "Assigned in Apple Business Manager. The Mac enrolls on first boot." },
      { stage: "Prestage", tool: "Jamf Pro", note: "Prestage enrollment applies the baseline before the user reaches the desktop." },
      { stage: "Configure", tool: "Profiles", note: "Configuration profiles cover FileVault, Wi-Fi, restrictions and privacy permissions." },
      { stage: "Deploy", tool: "Policies · Self Service", note: "Required apps arrive by policy; optional ones wait in Self Service." },
      { stage: "Protect", tool: "CrowdStrike · Jamf Trust", note: "Security agents install as part of setup, not as a follow-up ticket." },
      { stage: "Verify", tool: "Inventory · Smart groups", note: "Smart groups flag drift, and remediation policies re-run on schedule." },
    ],
  },
  windows: {
    label: "Windows",
    share: "Intune",
    steps: [
      { stage: "Register", tool: "Autopilot", note: "The device is registered to a deployment profile before it ships." },
      { stage: "Join", tool: "Entra ID", note: "The user signs in with their work identity and the device joins Entra ID." },
      { stage: "Enroll", tool: "Intune · ESP", note: "The Enrollment Status Page holds the desktop until required apps and policies land." },
      { stage: "Configure", tool: "Intune policies", note: "Configuration and app assignments are scoped by group." },
      { stage: "Protect", tool: "BitLocker · LAPS · CrowdStrike", note: "Encryption, local admin rotation and EDR come with the baseline." },
      { stage: "Verify", tool: "Compliance · Remote actions", note: "Compliance gates access, and remote actions fix drift without a desk visit." },
    ],
  },
} as const;

export const identityLifecycle = [
  {
    id: "joiner",
    label: "Joiner",
    caption: "Onboarding",
    steps: [
      "Create the identity once, in the source directory",
      "Require MFA enrollment at first sign-in",
      "Add to role-based groups",
      "Assign licenses from group rules",
      "Make SSO apps available through group assignment",
    ],
  },
  {
    id: "mover",
    label: "Mover",
    caption: "Role change",
    steps: [
      "Swap groups to match the new role",
      "Adjust licenses up or down",
      "Remove access the new role doesn't need",
      "Record the change against the person",
    ],
  },
  {
    id: "leaver",
    label: "Leaver",
    caption: "Offboarding",
    steps: [
      "Disable sign-in",
      "Revoke active sessions",
      "Remove group memberships and app access",
      "Reclaim licenses",
      "Hand over mailbox and files",
      "Open device recovery",
    ],
  },
] as const;

export const mobileMatrix = {
  rows: ["Android", "iOS"] as const,
  columns: ["Corporate-owned", "Personal (BYOD)"] as const,
  cells: {
    "Android|Corporate-owned": {
      model: "Fully managed device",
      manages: ["Whole-device policies", "Apps from Managed Google Play", "VPN and Wi-Fi profiles", "Full device wipe"],
      private: ["Nothing by design: the device belongs to the company"],
    },
    "Android|Personal (BYOD)": {
      model: "Work Profile",
      manages: ["Work apps and data inside the profile", "Managed Google Play in the profile", "Per-app VPN for work apps", "Wipe the work profile only"],
      private: ["Personal apps and their data", "Photos, messages, call history", "Anything outside the work profile"],
    },
    "iOS|Corporate-owned": {
      model: "Automated enrollment",
      manages: ["Supervised restrictions", "Managed apps and configuration", "VPN and Wi-Fi profiles", "Full device wipe"],
      private: ["Nothing by design: the device belongs to the company"],
    },
    "iOS|Personal (BYOD)": {
      model: "Protected apps",
      manages: ["Secure, managed work apps", "Copy, paste and save-as restrictions", "Access only from compliant apps", "Selective wipe of company data"],
      private: ["Personal apps and accounts", "Photos, messages, browsing", "Device-wide settings and location"],
    },
  },
} as const;
