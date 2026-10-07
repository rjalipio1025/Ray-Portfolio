const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function parse(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return { y, m };
}

/** "2025-01" → "Jan 2025" (or "January 2025" with `long`). */
export function formatMonth(ym: string, long = false) {
  const { y, m } = parse(ym);
  return `${(long ? MONTHS_LONG : MONTHS)[m - 1]} ${y}`;
}

export function formatRange(start: string, end: string | null, long = false) {
  return `${formatMonth(start, long)} – ${end ? formatMonth(end, long) : "Present"}`;
}

/** Inclusive month count, LinkedIn-style: "3 yrs 5 mos". Null for open-ended roles. */
export function formatDuration(start: string, end: string | null) {
  if (!end) return null;
  const a = parse(start);
  const b = parse(end);
  const months = (b.y - a.y) * 12 + (b.m - a.m) + 1;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (rest) parts.push(`${rest} mo${rest > 1 ? "s" : ""}`);
  return parts.join(" ");
}

/** ISO date for schema.org (first of the month). */
export function isoMonth(ym: string) {
  return `${ym}-01`;
}
