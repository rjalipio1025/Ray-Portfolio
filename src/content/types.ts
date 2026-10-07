/**
 * Shared content types. Every section of the site renders from these shapes,
 * so copy can change without touching layout components.
 */

export type SocialLink = {
  id: "email" | "linkedin" | "github";
  label: string;
  /** Visible handle, e.g. the email address or "in/username". */
  handle: string;
  href: string;
};

export type Statistic = {
  id: string;
  /** Numeric value the counter animates to. */
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  /** Mono metadata shown above the number, e.g. "ENDPOINT DISTRIBUTION". */
  meta: string;
  detail: string;
};

/** One cell of the telemetry strip under the hero. */
export type StatusItem = { value: string; label: string };

export type TechCategoryId = "endpoint" | "identity" | "security" | "saas" | "operations";

export type TechItem = {
  name: string;
  /** Short mono label describing the job the tool does. */
  role: string;
  /** What Ray does with it, in one or two sentences. */
  description: string;
  /** Where the experience comes from. */
  context: "current" | "earlier" | "both";
};

export type TechCategory = {
  id: TechCategoryId;
  label: string;
  summary: string;
  items: TechItem[];
};

export type TopologyLayerId = "user" | "identity" | "endpoint" | "platform" | "apps" | "security";

export type TopologyLayer = {
  id: TopologyLayerId;
  label: string;
};

export type TopologyNode = {
  id: string;
  label: string;
  /** Mono tag under the label, e.g. "MDM". */
  role: string;
  layer: TopologyLayerId;
  /** Horizontal position in the desktop diagram, 0–100. */
  x: number;
  description: string;
};

/** Directed link from an upper layer to the next one down. */
export type TopologyEdge = [from: string, to: string];

export type ExperienceRole = {
  id: string;
  title: string;
  company: string;
  /** ISO year-month, e.g. "2025-01". */
  start: string;
  /** ISO year-month or null for a current role. */
  end: string | null;
  location: string;
  summary: string;
  /** Two or three key accomplishments shown before the role is expanded. */
  highlights: string[];
  bullets: string[];
  tags: string[];
};

export type ProjectDiagram = "lifecycle" | "endpoint" | "identity" | "mobile";

export type Project = {
  id: string;
  title: string;
  tags: string[];
  summary: string;
  problem: string;
  approach: string;
  highlights: string[];
  /** Optional implementation notes. */
  notes?: string[];
  stack: string[];
  outcome: string;
  diagram: ProjectDiagram;
  /** Headline framing for the featured case study. */
  featured?: {
    problem: string;
    solution: string;
    capabilities: string[];
  };
};

export type LifecycleStage = {
  id: string;
  label: string;
  detail: string;
  /** What the platform records at this stage. */
  record: string;
  /** Systems involved at this stage. */
  systems: string[];
};

export type CaseStudy = {
  id: string;
  title: string;
  environment: string;
  status: "Resolved";
  problem: string;
  investigation: string[];
  tools: string[];
  outcome: string;
  prevention: string;
};

export type ProcessStep = {
  id: string;
  title: string;
  description: string;
};

export type SectionId = "top" | "scale" | "systems" | "experience" | "projects" | "cases" | "about" | "contact";

export type NavItem = {
  label: string;
  section: SectionId;
};

export type CommandAction =
  | { type: "section"; section: SectionId }
  | { type: "systems"; tab: TechCategoryId }
  | { type: "route"; href: string }
  | { type: "download"; href: string; filename: string }
  | { type: "external"; href: string }
  | { type: "copy"; value: string; label: string }
  | { type: "theme" };

export type Command = {
  id: string;
  label: string;
  group: "Navigate" | "Resume" | "Actions" | "Elsewhere";
  keywords: string;
  action: CommandAction;
};
