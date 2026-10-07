# Adding admin-console screenshots safely

Console screenshots (Intune, Jamf, Entra, Okta and so on) almost always contain something that must not be
published: tenant names, device names, serials, user names, email addresses, IPs or internal URLs.

**Rule:** redaction is burned into the pixels before an image reaches `public/`. CSS overlays and blur filters
are not redaction, because the original image would still be downloadable.

## Process

1. Take the screenshot and keep the original **outside** this repository.
2. Note the pixel boxes to hide (`x,y,width,height`), for example from Preview's selection inspector.
3. Run:

   ```bash
   npm run redact -- ~/Desktop/intune-compliance.png 120,88,340,24 120,140,340,24
   ```

   This writes `public/screenshots/redacted/intune-compliance.png` with solid boxes painted over those regions.
   Re-encoding also strips EXIF and other metadata.
4. **Open the output and check it.** Look for anything in window titles, breadcrumbs, avatars, tooltips and URL bars.
5. Show it with the only component allowed to render screenshots:

   ```tsx
   import { RedactedFigure } from "@/components/ui/RedactedFigure";

   <RedactedFigure
     src="/screenshots/redacted/intune-compliance.png"
     alt="Intune compliance policy assignments, with tenant and device names removed"
     width={1600}
     height={900}
     caption="Compliance policy scoped by device group"
   />
   ```

   `RedactedFigure` only accepts paths under `/screenshots/redacted/` and refuses anything else in development.

## Checklist before committing an image

- [ ] No tenant, company or domain names
- [ ] No device names, serial numbers, asset tags or device IDs
- [ ] No people: names, emails, avatars, initials
- [ ] No IP addresses, hostnames or internal URLs (including the browser address bar)
- [ ] No tokens, keys or secrets visible anywhere, even partially
- [ ] Output opened and checked at 100% zoom
