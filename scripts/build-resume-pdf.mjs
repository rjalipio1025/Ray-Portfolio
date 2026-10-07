/**
 * Prints the HTML résumé (/resume) to public/Ray-Joseph-Alipio-Resume.pdf with
 * headless Chrome, so the PDF and the web page can never drift apart.
 *
 *   npm run build && npm run start          # in one terminal
 *   npm run resume:pdf                      # in another
 *
 * RESUME_URL overrides the page (default http://localhost:3000/resume).
 * CHROME_PATH overrides the browser binary.
 * Build with NEXT_PUBLIC_SITE_URL set to the live domain so the PDF lists it.
 */
import { execFileSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";

const url = process.env.RESUME_URL ?? "http://localhost:3000/resume";
const out = fileURLToPath(new URL("../public/Ray-Joseph-Alipio-Resume.pdf", import.meta.url));

const candidates = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);

const chrome = candidates.find((p) => existsSync(p));
if (!chrome) {
  console.error("No Chrome/Chromium found. Set CHROME_PATH.");
  process.exit(1);
}

const res = await fetch(url).catch(() => null);
if (!res?.ok) {
  console.error(`Could not load ${url}. Start the site first (npm run start).`);
  process.exit(1);
}

execFileSync(
  chrome,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-pdf-header-footer",
    "--run-all-compositor-stages-before-draw",
    "--virtual-time-budget=8000",
    `--print-to-pdf=${out}`,
    url,
  ],
  { stdio: "ignore" },
);

console.log(`Wrote ${out} (${(statSync(out).size / 1024).toFixed(0)} KB)`);
