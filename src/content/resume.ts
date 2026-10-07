import { techCategories } from "./skills";

/** Résumé-specific copy. Experience, projects and education come from their own files. */
export const resumeSummary =
  "IT Systems Administrator with 12+ years in enterprise IT, covering endpoint management, identity and access, SaaS administration and enterprise support. Currently administers Microsoft 365, Entra ID, Intune, Okta, Jamf Pro and Google Workspace for a ~600-person US organization, and owns the employee and device lifecycle end to end, from provisioning through secure wipe. Brings methodical troubleshooting, clear documentation and internal tooling that removes repeat work.";

const unique = (list: string[]) => [...new Set(list)];

/** Skill groups for the résumé, derived from the technology explorer plus earlier-role tools. */
export const resumeSkills: { label: string; items: string[] }[] = [
  ...techCategories.map((c) => ({ label: c.label, items: unique(c.items.map((i) => i.name)) })),
  {
    label: "Support & infrastructure",
    items: ["Citrix Workspace", "GlobalProtect", "Pulse Secure", "Windows Server", "Switches & access points", "PowerShell"],
  },
];
