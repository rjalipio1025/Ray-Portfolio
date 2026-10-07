import type { CaseStudy } from "./types";

/**
 * Incident write-ups. Keep them free of tenant names, device IDs, serials,
 * people's names and internal URLs. Describe the system, not the company.
 *
 * Review: outcome and prevention lines were drafted from typical root causes.
 * Confirm each one matches what actually happened before publishing.
 */
export const caseStudies: CaseStudy[] = [
  {
    id: "autopilot",
    title: "Autopilot enrollment failure",
    environment: "Windows / Intune / Entra ID",
    status: "Resolved",
    problem: "Automated endpoint provisioning failed during enrollment, and the laptop never reached a usable desktop.",
    investigation: [
      "Verify device registration",
      "Validate Entra join state",
      "Inspect the Autopilot profile",
      "Review enrollment status",
      "Analyze device logs",
    ],
    tools: ["Intune", "Autopilot", "Entra ID", "PowerShell", "Windows Diagnostics"],
    outcome: "Provisioning path restored and device successfully enrolled.",
    prevention: "Registration and profile checks added to the pre-shipment checklist.",
  },
  {
    id: "edr-inventory",
    title: "Endpoint security detection",
    environment: "Windows / CrowdStrike / Intune",
    status: "Resolved",
    problem:
      "CrowdStrike was installed and running, but device and application inventory didn't show it correctly, so a protected machine looked unprotected.",
    investigation: [
      "Validate the local installation and sensor service",
      "Check the Windows uninstall registry entries",
      "Compare Intune discovered apps with what's on disk",
      "Review endpoint reporting in the security console",
      "Confirm the device's compliance state",
    ],
    tools: ["CrowdStrike", "Intune", "PowerShell", "Windows Registry"],
    outcome: "Protection confirmed from the sensor itself, and inventory and compliance reporting brought back in line with the device.",
    prevention: "Detection now checks the sensor, not only an app-inventory entry.",
  },
  {
    id: "macos-deploy",
    title: "macOS application deployment",
    environment: "macOS / Jamf Pro",
    status: "Resolved",
    problem: "A Jamf Pro policy that installs and configures an application worked on most Macs but failed on a subset.",
    investigation: [
      "Compare policy logs from failing and healthy Macs",
      "Check scope, trigger and execution frequency",
      "Re-run the policy from Terminal with verbose output",
      "Read the installer and application logs",
      "Verify the profiles and privacy permissions the app needs",
    ],
    tools: ["Jamf Pro", "macOS", "Terminal", "Application logs", "Policy execution"],
    outcome: "A missing prerequisite was split into its own ordered policy; installs completed and the app launched with the right permissions.",
    prevention: "Dependencies are packaged explicitly instead of assuming a machine's existing state.",
  },
  {
    id: "sso-access",
    title: "SSO / identity access failure",
    environment: "Okta / Entra ID / SaaS",
    status: "Resolved",
    problem: "A user could sign in to the identity provider but was denied access to a SaaS application their team relies on.",
    investigation: [
      "Confirm account status and MFA enrollment",
      "Check the app assignment and group membership",
      "Review sign-in and system logs for the failed request",
      "Compare the user's profile attributes with a working user",
      "Test the SSO flow end to end",
    ],
    tools: ["Okta", "Entra ID", "System Log", "Sign-in logs"],
    outcome: "Access restored through the correct role group, without a one-off manual exception.",
    prevention: "App access is granted by role groups, so new team members inherit it automatically.",
  },
  {
    id: "byod-access",
    title: "BYOD application access",
    environment: "Android / iOS / Intune",
    status: "Resolved",
    problem: "A personal phone set up for work couldn't open company email in the managed app; access was blocked by policy.",
    investigation: [
      "Confirm the enrollment type: work profile or app protection",
      "Check OS version against policy minimums",
      "Review app protection and access policy assignment",
      "Verify the app came from the managed store",
      "Re-test sign-in after each change",
    ],
    tools: ["Intune", "Managed Google Play", "Entra ID", "Conditional Access"],
    outcome: "The phone met policy after an OS update and a reinstall from the managed store; email worked without loosening the policy.",
    prevention: "Minimum OS and setup steps are now in the BYOD onboarding guide.",
  },
  {
    id: "bitlocker",
    title: "BitLocker / compliance",
    environment: "Windows / Intune / Entra ID",
    status: "Resolved",
    problem: "A Windows laptop reported non-compliant because encryption wasn't detected, which blocked access to company apps.",
    investigation: [
      "Check encryption status on the device",
      "Review the BitLocker policy assignment and reporting",
      "Confirm TPM and Secure Boot state",
      "Verify recovery key escrow",
      "Force a compliance re-evaluation",
    ],
    tools: ["Intune", "BitLocker", "Entra ID", "PowerShell"],
    outcome: "Encryption completed with the recovery key escrowed; the device re-evaluated as compliant and access returned.",
    prevention: "Encryption state is verified during provisioning, before a device ships.",
  },
];
