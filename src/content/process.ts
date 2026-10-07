import type { ProcessStep } from "./types";

export const troubleshootingPrinciple =
  "Fixing the immediate issue matters. Understanding why it happened keeps it from becoming tomorrow's ticket.";

export const processSteps: ProcessStep[] = [
  { id: "triage", title: "Triage", description: "Who's affected, how badly, and since when? Impact sets the priority." },
  { id: "reproduce", title: "Reproduce", description: "See it fail myself, on the device or account where it actually happens." },
  { id: "collect", title: "Collect data", description: "Logs, sign-in events, device state, recent changes. Evidence before theories." },
  { id: "isolate", title: "Isolate cause", description: "Change one variable at a time until only one explanation is left." },
  { id: "remediate", title: "Remediate", description: "Fix the cause with the smallest safe change, and say what's changing before it does." },
  { id: "validate", title: "Validate", description: "Confirm with the user and in the console that it works, not just that the error stopped." },
  { id: "document", title: "Document / Prevent", description: "Write it up and fix the process or policy, so the next one is faster or doesn't happen." },
];

/** Working principles shown in About. */
export const principles = [
  { title: "Start with the person", body: "The ticket is about someone who can't work. I fix that first, then the system behind it." },
  { title: "Reliable process", body: "Onboarding, offboarding and access changes should run the same way every time, whoever does them." },
  { title: "Endpoint & identity depth", body: "Jamf, Intune, Entra ID and Okta, from enrollment to retirement." },
  { title: "Automate the repeats", body: "If I fix the same thing twice, I script it, template it, or write it down." },
  { title: "Secure by default", body: "Encryption, EDR, LAPS and MFA are part of setup, not afterthoughts." },
  { title: "Enterprise discipline", body: "SLAs, documentation and audit trails, learned in large managed-service environments." },
];
