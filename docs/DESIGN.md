# Ray Joseph Alipio — Portfolio design plan

The portfolio of an IT Systems Administrator, built so a recruiter can tell within ten seconds who Ray is,
what he manages, how long he has done it, which platforms he runs and what problems he has solved.

The concept is a calm **operations console**. Information is organized the way a well-run IT environment
is: layered, labelled, traceable. Motion is used to show how things connect (identity to device to app),
and never just for decoration.

---

## 1. Information architecture

| # | Section | Anchor | Job it does for a recruiter |
|---|---------|--------|-----------------------------|
| 01 | Hero | `#top` | Name, title, one-line positioning, 12+ yrs, CTAs. Access-path topology shows the stack at a glance. |
| 02 | Impact | `#impact` | Four verifiable numbers: years, users, fleet mix, platforms. |
| 03 | About | `#about` | Career arc (Help Desk → Systems Engineering → L2 → SysAdmin) and how he works. |
| 04 | Systems | `#systems` | Tech explorer by job-to-be-done: Endpoint, Identity, Security, SaaS, IT Ops. |
| 05 | Experience | `#experience` | Interactive timeline, current role expanded. |
| 06 | Projects | `#projects` | Four case panels, each with a working diagram. Filterable. |
| 07 | Problems solved | `#cases` | Incident-style case studies: Issue → Investigation → Tools → Resolution. |
| 08 | How I troubleshoot | `#process` | Seven-step method plus the principle behind it. |
| 09 | Résumé | `#resume` | PDF download and the HTML résumé. |
| 10 | Contact | `#contact` | Email, LinkedIn, GitHub, résumé, optional message form. |

Routes: `/` (portfolio), `/resume` (HTML résumé, print-optimized and the source of the PDF),
`/sitemap.xml`, `/robots.txt`, `/opengraph-image`, `/twitter-image`, `/icon.svg`, `/apple-icon`, `/manifest.webmanifest`.

Navigation follows page order: **About · Systems · Experience · Projects · Résumé · Contact**. The order
the brief listed was changed so the scroll-spy moves left to right as you read down. Cases and Process
highlight "Projects", because they are evidence for the same claim.

Command palette (⌘K / Ctrl K): About Ray, View Experience, Endpoint Management, Identity & Access,
View Projects, Problems I've Solved, View Résumé, Download Résumé PDF, Contact Ray, Copy email,
Toggle Theme, plus LinkedIn and GitHub.

## 2. Design system

**Tone.** Enterprise, precise, quiet confidence. Generous whitespace, one accent, strong type hierarchy.
No neon, no matrix, no glass stacks, no skill bars.

**Color tokens** (CSS variables on `:root`, swapped with `data-theme`).

| Token | Dark (default) | Light | Use |
|---|---|---|---|
| `bg` | `#070B12` | `#F5F6F8` | page |
| `bg-raised` | `#0A0F18` | `#EEF1F5` | alternating sections |
| `surface` | `#0E141F` | `#FFFFFF` | cards, panels |
| `surface-2` | `#141B28` | `#F2F4F8` | nested, hover |
| `line` / `line-strong` | `#1C2433` / `#2A3546` | `#E1E5EC` / `#C9D0DB` | borders |
| `fg` | `#ECEAE5` (warm white) | `#0B1220` | primary text |
| `fg-muted` | `#A3ACBA` | `#465061` | body |
| `fg-subtle` | `#7C8699` (5.3:1) | `#5E6878` (5:1) | metadata |
| `accent` | `#3BB9FF` electric azure | `#0B6BCB` | links, focus, live state |
| `violet` | `#8F87FF` | `#6253D8` | second series only |
| `ok` | `#3DD68C` | `#16794A` | "resolved" and "validated" states |

All text tokens meet WCAG AA (4.5:1) against `bg` and `surface` in both themes.

**Type.** Geist Sans for everything people read; Geist Mono only for labels, metadata, tool names and
key hints. Display: name `clamp(2.75rem → 5rem)`, weight 600, −0.04em tracking. Statement
`clamp(1.5rem → 2.4rem)`. H2 `clamp(1.9rem → 2.9rem)`. Body 16–18px at 1.65 line height,
measure ≤ 65ch. Mono labels 12px uppercase with 0.14em tracking.

**Space and shape.** 4px base grid. Sections use 96–144px vertical rhythm. Container 1200px with
16px mobile and 24–32px desktop gutters. Radii are 8px for chips and controls, 14px for cards and
20px for panels. Depth comes from 1px borders and a faint inner highlight, not from shadows.

**Recurring motifs.**
- Numbered mono eyebrow (`04 / Systems`) on every section.
- Node chips: the pill used for a technology everywhere (hero, explorer, timeline tags).
- Connection lines: the 1px path that links nodes, drawn on demand.

## 3. Motion and interaction strategy

Principle: **motion explains structure.** Every animation answers "what connects to what" or
"what just changed".

| Pattern | Where | Spec |
|---|---|---|
| Entrance | hero copy | CSS keyframes, 600ms, 70ms stagger, no JS |
| Scroll reveal | sections, cards | one IntersectionObserver for the page, 14px rise and fade, plays once |
| Trace | hero topology | SVG path draws node to node (420ms per hop). Runs 3 traces while visible, then rests. Replay button. |
| Count-up | impact stats | 1.4s ease-out, once, numbers are DOM-written (no re-renders) |
| Shared-layout tabs | systems, cases, endpoint | Motion `layoutId` indicator, 30ms card stagger |
| Filter | projects | Motion `layout` and `AnimatePresence popLayout` |
| Scroll-linked | experience rail | `useScroll` fills the rail as you read |
| Checklist run | identity project | "Run offboarding" ticks steps in sequence |
| Spotlight | cards (fine pointers only) | radial highlight follows the cursor via CSS variables |
| Magnetic | 2 primary CTAs only | ≤6px pull with a spring back, fine pointers only |
| Page transition | `/` ↔ `/resume` | `template.tsx` fade and rise, 280ms |
| Dialogs | palette, mobile menu | native `<dialog>` and `@starting-style` (no JS animation) |

Easing: `cubic-bezier(.22,1,.36,1)` for entrances, `cubic-bezier(.4,0,.2,1)` for state changes.
Durations: 150ms micro, 240ms state, 600ms reveal.

**Reduced motion.** `MotionConfig reducedMotion="user"` plus a CSS kill-switch. Traces render their final
state statically, count-ups show final values, reveals and parallax are removed, and the rail is
static. Hover color, focus rings and pressed states stay.

**Performance budget.** Motion loads through `LazyMotion` with features imported asynchronously after
hydration. No GSAP and no WebGL (nothing here benefits from them). Sections are Server Components.
Only the interactive islands hydrate.

## 4. Component architecture

```
src/
  app/
    layout.tsx           fonts, metadata, theme bootstrap, providers, chrome
    page.tsx             composes sections + JSON-LD (ProfilePage → Person)
    template.tsx         route transition
    resume/page.tsx      HTML résumé (print CSS → PDF)
    sitemap.ts robots.ts manifest.ts opengraph-image.tsx twitter-image.tsx icon.svg apple-icon.tsx
  content/               ← all copy and data; edit these, not the components
    site.ts socialLinks.ts statistics.ts skills.ts topology.ts experience.ts
    projects.ts caseStudies.ts process.ts navigation.ts types.ts
  components/
    layout/    Header, MobileMenu, Footer, ThemeToggle, SkipLink
    command/   CommandPalette (+ provider)
    sections/  Hero, Impact, About, Systems, Experience, Projects, Cases, Process, ResumeCta, Contact
    hero/      AccessTopology
    systems/   TechExplorer
    experience/Timeline
    projects/  ProjectsBrowser, ProjectArticle, diagrams/{LifecycleLoop, EndpointPipeline, IdentityLifecycle, MobileMatrix}
    cases/     CaseExplorer
    contact/   ContactForm
    resume/    ResumeDocument
    ui/        Section, SectionHeader, ButtonLink, Magnetic, CountUp, Chip, RedactedFigure, icons
    providers/ MotionProvider, RevealObserver, SpotlightTracker
  lib/         cn, hooks (media query, reduced motion, in-view), theme, dates, scroll, seo
scripts/
  build-resume-pdf.mjs   prints /resume to public/Ray-Joseph-Alipio-Resume.pdf with headless Chrome
  redact-image.mjs       burns redaction boxes into screenshots (see docs/REDACTION.md)
```

## 5. Privacy rules baked into the build

- No phone number, tenant/device IDs, serials, employee names, internal URLs, private IPs or secrets.
- Client companies are described by industry, not by name. The lifecycle platform is presented without
  its owner's name.
- Screenshots may only be published from `public/screenshots/redacted/`. Redaction is burned into the
  pixels by `scripts/redact-image.mjs`. CSS overlays don't count, because the original pixels would still ship.

---

## Revision 2 — operations schematic (October 2026)

The visual layer was rebuilt; content, data files, SEO and the résumé pipeline are unchanged.

- **Art direction:** near-black/graphite/navy, one electric-blue accent, square "schematic" frames with corner
  registration ticks and `FIG. 0X` captions, a 48px grid with crosses, film grain, mono section identifiers.
- **Story order:** Intro → Scale → Systems → Experience → Projects → Cases → About → Contact. The navigation follows it.
- **Hero:** name, role, tagline, one sentence, a projects CTA and career proof points (12+ years, 4 enterprise
  roles, 10+ platforms). The access topology uses orthogonal "bus" routing and illustrative pulses, with hover/focus
  tracing and an inspector. It's sized to fit fully on 1280×800. On phones it becomes compact layer rows.
- **Systems:** a hub-and-spoke map per domain (Endpoint, Identity, Security, SaaS, IT Operations), with clear
  selected states. On phones it's a domain grid plus an expandable list.
- **Projects:** the featured case study leads with Problem → My contribution → Result, then an *illustrative*
  interface mockup (sample data, labeled) and the lifecycle workflow. Other projects sit in an expandable index.
- **Cases:** an incident log. Each row shows its outcome, and each report opens with outcome and prevention.

### Figures policy

Headline numbers are career-level only (12+ years, 4 roles, 10+ platforms). Client-specific figures are shown only
where they are clearly scoped to the current role: the ~600 employees appear in the DOXA entry and "Today…" copy, and
the ~243 macOS / ~93 Windows device split appears in the Endpoint case study. That split uses blue circles for macOS
and hatched amber squares for Windows, so it never relies on color alone.
