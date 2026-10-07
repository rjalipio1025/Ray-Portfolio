import { site } from "./site";
import { contactEmail, getSocial } from "./socialLinks";
import type { Command, NavItem, SectionId } from "./types";

/**
 * Primary navigation, in the order the page tells its story:
 * scale → what I manage → where I've worked → what I've built → how I solve problems → about → contact.
 */
export const navItems: NavItem[] = [
  { label: "Systems", section: "systems" },
  { label: "Experience", section: "experience" },
  { label: "Projects", section: "projects" },
  { label: "Cases", section: "cases" },
  { label: "About", section: "about" },
  { label: "Contact", section: "contact" },
];

/** Every section in page order, with the index shown in section headers and the side rail. */
export const sectionIndex: { id: SectionId; code: string; label: string }[] = [
  { id: "top", code: "00", label: "Introduction" },
  { id: "scale", code: "01", label: "Scale" },
  { id: "systems", code: "02", label: "Systems" },
  { id: "experience", code: "03", label: "Experience" },
  { id: "projects", code: "04", label: "Projects" },
  { id: "cases", code: "05", label: "Cases" },
  { id: "about", code: "06", label: "About" },
  { id: "contact", code: "07", label: "Contact" },
];

const linkedin = getSocial("linkedin");
const github = getSocial("github");

/** Command palette entries (⌘K / Ctrl K). */
export const commands: Command[] = [
  { id: "about", label: "Go to About", group: "Navigate", keywords: "bio story background career ray", action: { type: "section", section: "about" } },
  { id: "systems", label: "View Systems", group: "Navigate", keywords: "technology ecosystem stack tools platforms", action: { type: "section", section: "systems" } },
  { id: "experience", label: "View Experience", group: "Navigate", keywords: "work history jobs timeline roles doxa wipro tcs fujitsu", action: { type: "section", section: "experience" } },
  { id: "projects", label: "View Projects", group: "Navigate", keywords: "work case studies lifecycle platform byod endpoint", action: { type: "section", section: "projects" } },
  { id: "cases", label: "View Troubleshooting Cases", group: "Navigate", keywords: "problems incidents autopilot crowdstrike jamf sso bitlocker", action: { type: "section", section: "cases" } },
  { id: "contact", label: "Contact Ray", group: "Navigate", keywords: "email hire message reach", action: { type: "section", section: "contact" } },
  { id: "endpoint", label: "Endpoint Management", group: "Navigate", keywords: "intune jamf autopilot sccm mdm devices mac windows", action: { type: "systems", tab: "endpoint" } },
  { id: "identity", label: "Identity & Access", group: "Navigate", keywords: "okta entra azure ad active directory sso mfa iam conditional access", action: { type: "systems", tab: "identity" } },
  { id: "resume-pdf", label: "Download Resume", group: "Resume", keywords: "cv pdf download", action: { type: "download", href: site.resume.pdf, filename: site.resume.filename } },
  { id: "resume", label: "View Resume as a web page", group: "Resume", keywords: "cv resume html print", action: { type: "route", href: site.resume.html } },
  { id: "theme", label: "Toggle Theme", group: "Actions", keywords: "dark light mode appearance", action: { type: "theme" } },
  { id: "copy-email", label: "Copy Email Address", group: "Actions", keywords: "email clipboard", action: { type: "copy", value: contactEmail, label: "Email address copied" } },
  ...(linkedin
    ? [{ id: "linkedin", label: "Open LinkedIn", group: "Elsewhere", keywords: "linkedin profile social", action: { type: "external", href: linkedin.href } } as Command]
    : []),
  ...(github
    ? [{ id: "github", label: "Open GitHub", group: "Elsewhere", keywords: "github code repositories", action: { type: "external", href: github.href } } as Command]
    : []),
];
