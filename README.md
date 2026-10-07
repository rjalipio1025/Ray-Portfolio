# Ray Joseph Alipio — portfolio

Personal site for an IT Systems Administrator (endpoint management, identity & access, IT operations).
Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Motion 14.

- Design plan (information architecture, design system, motion strategy, components): [docs/DESIGN.md](docs/DESIGN.md)
- Editing content: [docs/CONTENT.md](docs/CONTENT.md)
- Adding screenshots safely: [docs/REDACTION.md](docs/REDACTION.md)

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

Production build and preview:

```bash
npm run build
npm run start        # http://localhost:3000
```

Checks: `npm run lint` and `npm run typecheck`.

## Environment

Copy `.env.example` to `.env.local` and fill in what applies.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Live origin, e.g. `https://rayalipio.com`. Used for canonical URLs, Open Graph, sitemap, robots and JSON-LD. On Vercel it falls back to the production domain automatically. |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | Optional. A form endpoint that accepts JSON (for example Formspree). Without it, the contact form opens the visitor's email app with the message filled in. |

## Résumé PDF

The PDF is printed from the HTML résumé, so the two never drift apart. After changing content:

```bash
npm run build && npm run start
```

```bash
npm run resume:pdf
```

The PDF is written to `public/Ray-Joseph-Alipio-Resume.pdf`. Set `RESUME_URL` if the server runs on another
port. Build with `NEXT_PUBLIC_SITE_URL` set so the portfolio link appears in the PDF header.

## Deploy

Vercel is the simplest path: import the repo, keep the defaults, and set `NEXT_PUBLIC_SITE_URL` once a custom
domain is attached. Every route is statically prerendered, so any Node host also works with `npm run build && npm run start`.

## Before going live

- [ ] Add the LinkedIn URL in `src/content/socialLinks.ts` (`linkedinUrl`). It then appears everywhere automatically.
- [ ] Confirm the GitHub profile (`rayjoseph16`) is the one to show publicly.
- [ ] Read the three case studies in `src/content/caseStudies.ts`. Issue, investigation and tools come from the brief.
      Resolution and prevention were drafted from typical root causes, so make sure they match what actually happened.
- [ ] Set `NEXT_PUBLIC_SITE_URL`, rebuild, and run `npm run resume:pdf`.

## Quality bar (measured on the production build)

| | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Desktop `/` and `/resume` | 100 | 100 | 100 | 100 |
| Mobile `/` and `/resume` (simulated slow 4G) | 91–92 | 100 | 100 | 100 |

Cumulative layout shift is 0. An automated pass covers keyboard order and focus rings, the skip link, tab and
topology arrow keys, the command palette, the mobile menu (focus trap, Esc, focus return), reduced motion
(no running animations, static trace, final stat values), horizontal overflow, every link and anchor, metadata,
and a privacy scan for phone numbers and client names.
