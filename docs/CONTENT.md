# Editing content

All copy and data live in `src/content/`. Layout components only read from these files, so a change there
updates the home page, the HTML résumé, the PDF (after `npm run resume:pdf`), the command palette and the
structured data together.

| File | What it controls |
|---|---|
| `site.ts` | Name, title, headline, intro, location, education, résumé paths, SEO title and description |
| `socialLinks.ts` | Email, GitHub, LinkedIn. Set `linkedinUrl` to show LinkedIn everywhere |
| `statistics.ts` | The four impact numbers. Keep them to numbers you can defend in an interview |
| `topology.ts` | Hero "access path": layers, nodes (hover text) and the example traces it draws |
| `skills.ts` | Technology explorer tabs and cards. `context` marks current role, earlier roles, or both |
| `experience.ts` | Timeline roles (newest first) and the four-step career path in About |
| `projects.ts` | Project text plus the data behind each project diagram |
| `caseStudies.ts` | Problems I've solved: issue, investigation steps, tools, resolution, prevention |
| `process.ts` | Troubleshooting steps, the principle quote, and the "How I work" cards |
| `resume.ts` | Résumé summary and skill groups |
| `navigation.ts` | Header links and command palette entries |
| `types.ts` | Shapes for all of the above (TypeScript reports a mistake before the build does) |

## Common edits

**Add a role.** Add an entry to the top of `experience` in `experience.ts`, with `end: null` for the current role,
and set the previous role's `end`. Durations are calculated automatically. Update `careerPath` if the arc changes.

**Add a technology.** Add an item to the right category in `skills.ts`. If it belongs in the hero, add a node in
`topology.ts` too.

**Add a case study.** Append to `caseStudies.ts`. Describe systems, not companies. Leave out tenant names, device
names or serials, people, and internal URLs.

**Change a number.** Edit `statistics.ts`. The count-up animation reads `value`, and `prefix` or `suffix` add `~`, `+` or `%`.

## Privacy rules

Never commit tenant IDs, device IDs, serial numbers, employee names, credentials, internal URLs, private IP
addresses or confidential screenshots. Refer to client companies by industry. Screenshots go through
[REDACTION.md](REDACTION.md).
