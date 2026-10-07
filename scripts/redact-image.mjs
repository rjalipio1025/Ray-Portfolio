/**
 * Burns opaque redaction boxes into a screenshot and writes the result to
 * public/screenshots/redacted/. Only files in that folder can be shown with
 * <RedactedFigure>.
 *
 *   npm run redact -- <input.png> <x,y,w,h> [<x,y,w,h> ...]
 *
 * Boxes are in pixels of the source image. Metadata (EXIF, GPS, color
 * profiles with device names) is stripped. Always open the output and check it.
 */
import { basename, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const [input, ...boxes] = process.argv.slice(2);
if (!input || boxes.length === 0) {
  console.error("Usage: npm run redact -- <input.png> <x,y,w,h> [<x,y,w,h> ...]");
  process.exit(1);
}

const rects = boxes.map((b) => {
  const [x, y, w, h] = b.split(",").map(Number);
  if ([x, y, w, h].some((n) => !Number.isFinite(n))) throw new Error(`Bad box: ${b}`);
  return { x, y, w, h };
});

const outDir = fileURLToPath(new URL("../public/screenshots/redacted/", import.meta.url));
const out = join(outDir, `${basename(input, extname(input))}.png`);

const overlays = rects.map(({ x, y, w, h }) => ({
  input: { create: { width: w, height: h, channels: 3, background: "#0e141f" } },
  left: x,
  top: y,
}));

// Re-encoding from raw pixels drops all metadata; the boxes replace the pixels underneath.
await sharp(input).composite(overlays).png().toFile(out);
console.log(`Redacted ${rects.length} region(s) → ${out}`);
