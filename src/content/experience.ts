import type { ExperienceRole } from "./types";

/** Newest first. Client companies are described by industry, never by name. */
export const experience: ExperienceRole[] = [
  {
    id: "doxa",
    title: "IT Support / Systems Administrator",
    company: "DOXA Talent",
    start: "2025-01",
    end: null,
    location: "Remote · US clients",
    summary:
      "I run the identity, endpoint and SaaS platforms behind a ~600-person US organization, and own the employee and device lifecycle end to end.",
    highlights: [
      "Enterprise platforms for ~600 employees across identity, endpoint and SaaS",
      "Endpoint lifecycle from procurement and provisioning to secure wipe",
      "Onboarding, offboarding, SSO, MFA and application access",
    ],
    bullets: [
      "Administer enterprise IT platforms supporting approximately 600 employees.",
      "Manage Microsoft 365, Entra ID, Intune, Google Workspace, Okta, Jamf Pro, Jamf Trust, Slack Enterprise and Zoom.",
      "Run the endpoint lifecycle from procurement and provisioning through asset recovery and secure wipe.",
      "Configure and troubleshoot Windows Autopilot and Intune enrollment.",
      "Manage macOS endpoints through Jamf Pro.",
      "Deploy and troubleshoot CrowdStrike and Jamf Trust.",
      "Handle onboarding, offboarding, SSO, MFA, licensing and application access.",
      "Support Android and iOS in both BYOD and corporate-owned setups.",
      "Troubleshoot complex endpoint, identity, SaaS and compliance incidents.",
      "Improve IT operations through documentation, automation and internal tooling.",
    ],
    tags: [
      "Microsoft 365",
      "Entra ID",
      "Intune",
      "Autopilot",
      "Jamf Pro",
      "Jamf Trust",
      "Okta",
      "Google Workspace",
      "CrowdStrike",
      "Slack Enterprise",
      "Zoom",
    ],
  },
  {
    id: "wipro",
    title: "Level 2 IT Help Desk Support",
    company: "Wipro Solutions",
    start: "2021-08",
    end: "2024-12",
    location: "Managed services · US clients",
    summary:
      "The Level 2 escalation point for US enterprise clients. I took the issues Level 1 couldn't close and resolved them within SLA.",
    highlights: [
      "Level 2 escalations in ServiceNow, resolved within SLA",
      "Remote access over GlobalProtect and Pulse Secure",
      "SCCM software deployment and Intune mobile provisioning",
    ],
    bullets: [
      "Resolved escalated incidents and requests in ServiceNow while meeting SLA commitments.",
      "Troubleshot Microsoft 365, account, hardware, network and enterprise application issues over phone, chat and remote sessions.",
      "Configured and supported remote access over GlobalProtect and Pulse Secure.",
      "Deployed software and remediated machines remotely with SCCM; provisioned mobile devices in Intune.",
      "Supported Citrix Workspace virtual desktops for remote users.",
      "Improved support documentation and troubleshooting procedures with the wider team.",
    ],
    tags: [
      "ServiceNow",
      "Microsoft 365",
      "Intune",
      "SCCM",
      "Citrix",
      "GlobalProtect",
      "Pulse Secure",
      "L2 escalation",
      "SLA-driven support",
    ],
  },
  {
    id: "tcs",
    title: "Assistant Systems Engineer",
    company: "Tata Consultancy Services",
    start: "2018-09",
    end: "2021-08",
    location: "Onsite · semiconductor manufacturing",
    summary:
      "Onsite engineer for a manufacturing site of 300+ users, covering devices, directory, network and servers.",
    highlights: [
      "IT support for 300+ onsite users",
      "Switches, wireless access points and the site network",
      "Active Directory, Office 365, security groups and permissions",
    ],
    bullets: [
      "Delivered first- and second-line IT support for 300+ onsite users.",
      "Administered Active Directory, Office 365 accounts, security groups and folder permissions.",
      "Installed and maintained switches and wireless access points for the site network.",
      "Deployed and maintained laptops, desktops, printers and network devices.",
      "Monitored local and global servers and ran scheduled backups.",
      "Maintained the site's PABX telephony.",
    ],
    tags: [
      "Active Directory",
      "Office 365",
      "Switches",
      "Access points",
      "Servers",
      "Device deployment",
      "Manufacturing IT",
    ],
  },
  {
    id: "fujitsu",
    title: "IT Help Desk Analyst",
    company: "Fujitsu Philippines",
    start: "2014-05",
    end: "2018-08",
    location: "Onsite · semiconductor manufacturing",
    summary:
      "First-line support where I learned the fundamentals: accounts, Windows, Office, hardware, and the production systems the plant ran on.",
    highlights: [
      "First-line support for Windows, Office, hardware and enterprise apps",
      "Active Directory account administration",
      "MES troubleshooting alongside production teams",
    ],
    bullets: [
      "Provided first-line support for Windows, Microsoft Office, hardware and enterprise applications.",
      "Administered Active Directory accounts and access.",
      "Troubleshot Manufacturing Execution System (MES) issues alongside production teams.",
      "Ran scheduled server backups for business continuity.",
    ],
    tags: [
      "L1 support",
      "Active Directory",
      "Windows",
      "Microsoft Office",
      "MES",
      "Hardware",
      "Account administration",
    ],
  },
];

/** One line for the "Present" node that closes the timeline. */
export const presentNote =
  "Running identity, endpoint and SaaS administration for about 600 people, and building the tooling around it.";
