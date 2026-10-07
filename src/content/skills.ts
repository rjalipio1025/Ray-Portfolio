import type { TechCategory } from "./types";

/**
 * Technology explorer data, grouped by the job each tool does.
 * `context` is shown as a small tag: "current" = today's role,
 * "earlier" = previous roles, "both" = used across roles.
 */
export const techCategories: TechCategory[] = [
  {
    id: "endpoint",
    label: "Endpoint",
    summary: "How devices are enrolled, configured, updated and kept compliant, from first boot to secure wipe.",
    items: [
      {
        name: "Microsoft Intune",
        role: "MDM · Windows & mobile",
        description:
          "Compliance and configuration policies, app deployment and remote actions for Windows laptops and mobile devices.",
        context: "both",
      },
      {
        name: "Windows Autopilot",
        role: "Zero-touch provisioning",
        description:
          "Device registration, deployment profiles and enrollment status pages, so a new laptop sets itself up for its user.",
        context: "current",
      },
      {
        name: "Jamf Pro",
        role: "macOS management",
        description:
          "Prestage enrollment, configuration profiles, policies, Self Service and inventory for the Mac fleet.",
        context: "current",
      },
      {
        name: "Jamf Trust",
        role: "Apple endpoint protection",
        description: "Deployment and troubleshooting of network threat protection on managed Apple devices.",
        context: "current",
      },
      {
        name: "SCCM",
        role: "On-prem Windows management",
        description: "Software deployment and remote troubleshooting across large enterprise Windows estates.",
        context: "earlier",
      },
      {
        name: "Apple ADE",
        role: "Automated enrollment",
        description:
          "Devices assigned through Apple Business Manager enroll into management straight out of the box.",
        context: "current",
      },
      {
        name: "Managed Google Play",
        role: "Android app delivery",
        description: "Approved apps pushed into work profiles and onto corporate-owned Android devices.",
        context: "current",
      },
    ],
  },
  {
    id: "identity",
    label: "Identity",
    summary: "Who someone is, how they prove it, and what that identity is allowed to reach.",
    items: [
      {
        name: "Microsoft Entra ID",
        role: "Cloud directory",
        description:
          "Users, groups, licensing and device join state, plus the policies that sit in front of Microsoft 365.",
        context: "current",
      },
      {
        name: "Okta",
        role: "SSO & lifecycle",
        description:
          "Application assignments, group rules, MFA enrollment and deprovisioning the day someone leaves.",
        context: "current",
      },
      {
        name: "Active Directory",
        role: "On-prem directory",
        description:
          "User and group administration, security groups and folder permissions across onsite enterprise roles.",
        context: "earlier",
      },
      {
        name: "Google Workspace",
        role: "Google identity",
        description: "Accounts, organizational units, groups and sign-in policy for Google-first teams.",
        context: "current",
      },
      {
        name: "SSO",
        role: "Single sign-on",
        description: "One identity across the SaaS stack, so access is granted and removed in one place.",
        context: "current",
      },
      {
        name: "MFA",
        role: "Strong authentication",
        description: "Factor enrollment, verified resets and enforcement policy for every account.",
        context: "both",
      },
      {
        name: "Conditional Access",
        role: "Access policy",
        description: "Sign-in rules that check device compliance and context before granting access.",
        context: "current",
      },
    ],
  },
  {
    id: "security",
    label: "Security",
    summary: "Controls that are part of setup on every device, not something added after an incident.",
    items: [
      {
        name: "CrowdStrike",
        role: "EDR",
        description:
          "Sensor deployment, health checks and inventory reconciliation across Mac and Windows endpoints.",
        context: "current",
      },
      {
        name: "BitLocker",
        role: "Windows encryption",
        description: "Encryption enforced through policy, with recovery keys escrowed for device recovery.",
        context: "current",
      },
      {
        name: "Windows LAPS",
        role: "Local admin passwords",
        description: "Unique, rotated local administrator passwords instead of one shared admin account.",
        context: "current",
      },
      {
        name: "Jamf Trust",
        role: "Apple network protection",
        description: "Threat protection and secure connectivity for managed Macs, iPhones and iPads.",
        context: "current",
      },
      {
        name: "Device Compliance",
        role: "Posture",
        description:
          "Encryption, OS version and security-agent checks that decide whether a device gets access.",
        context: "current",
      },
    ],
  },
  {
    id: "saas",
    label: "SaaS",
    summary: "The applications people work in all day, administered for licensing, access and hygiene.",
    items: [
      {
        name: "Microsoft 365",
        role: "Productivity suite",
        description: "Licensing, Exchange Online mailboxes, Teams and OneDrive administration.",
        context: "both",
      },
      {
        name: "Google Workspace",
        role: "Productivity suite",
        description: "Mail, Drive, shared drives, calendars and resources for teams that live in Google.",
        context: "current",
      },
      {
        name: "Slack Enterprise",
        role: "Messaging",
        description: "Workspace administration, SSO, channel governance and member lifecycle.",
        context: "current",
      },
      {
        name: "Zoom",
        role: "Meetings",
        description: "Licensing, SSO and user provisioning.",
        context: "current",
      },
      {
        name: "Jira",
        role: "Work tracking",
        description: "Service and HR lifecycle tickets, and the automation that turns them into IT work.",
        context: "current",
      },
      {
        name: "1Password",
        role: "Password management",
        description: "Vault access, shared credentials and team provisioning.",
        context: "current",
      },
    ],
  },
  {
    id: "operations",
    label: "IT Operations",
    summary: "The processes that hold it together: who gets what, when, and how it comes back.",
    items: [
      {
        name: "Onboarding",
        role: "Day one",
        description: "Accounts, access, licenses and a ready device waiting before the person's first day.",
        context: "current",
      },
      {
        name: "Offboarding",
        role: "Last day",
        description: "Same-day access revocation, data handoff, license reclaim and device recovery.",
        context: "current",
      },
      {
        name: "Asset Management",
        role: "Inventory",
        description: "Who has which device, where it is, and what state it is in.",
        context: "both",
      },
      {
        name: "Access Management",
        role: "Requests & approvals",
        description: "Group-based access with approvals, so every grant can be explained later.",
        context: "both",
      },
      {
        name: "BYOD",
        role: "Personal devices",
        description: "Work data in a separate, wipeable container on phones people already own.",
        context: "current",
      },
      {
        name: "Device Recovery",
        role: "Returns",
        description: "Getting hardware back from departing employees, including fully remote ones.",
        context: "current",
      },
      {
        name: "Secure Wipe",
        role: "Data sanitization",
        description: "Verified erasure before a device is reissued to someone else or retired.",
        context: "current",
      },
      {
        name: "ServiceNow",
        role: "ITSM",
        description: "Incidents, requests and SLA-driven queues for enterprise clients.",
        context: "earlier",
      },
      {
        name: "Vanta",
        role: "Compliance",
        description: "Device and access evidence mapped to audit controls, kept current instead of rebuilt each audit.",
        context: "current",
      },
    ],
  },
];
