import Image from "next/image";
import { ShieldCheck } from "lucide-react";

type Props = {
  /** Must live in /public/screenshots/redacted/ (see docs/REDACTION.md). */
  src: `/screenshots/redacted/${string}`;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

/**
 * The only way to put an admin-console screenshot on the site.
 *
 * Redaction is burned into the pixels by `npm run redact` before an image is
 * placed in /screenshots/redacted/. CSS overlays are deliberately not offered,
 * because the original pixels would still be downloadable.
 */
export function RedactedFigure({ src, alt, width, height, caption }: Props) {
  if (process.env.NODE_ENV !== "production" && !src.startsWith("/screenshots/redacted/")) {
    throw new Error(`RedactedFigure: ${src} is not in /screenshots/redacted/. Run npm run redact first.`);
  }
  return (
    <figure className="frame">
      <Image src={src} alt={alt} width={width} height={height} className="h-auto w-full" sizes="(min-width: 1024px) 50vw, 100vw" />
      <figcaption className="flex items-center justify-between gap-4 border-t border-line px-4 py-3 text-sm text-fg-subtle">
        <span>{caption}</span>
        <span className="eyebrow inline-flex shrink-0 items-center gap-1.5 text-[0.6875rem]">
          <ShieldCheck size={13} aria-hidden="true" /> Sensitive data removed
        </span>
      </figcaption>
    </figure>
  );
}
