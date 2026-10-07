import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  /** Figure label, e.g. "FIG. 02 — SYSTEM MAP". */
  label?: ReactNode;
  /** Right-hand metadata in the caption bar. */
  meta?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
};

/** Schematic frame: hairline border, corner registration ticks, mono caption bar. */
export function Frame({ label, meta, footer, children, className, bodyClassName }: Props) {
  return (
    <figure className={cn("frame", className)}>
      {label || meta ? (
        <figcaption className="meta flex items-center justify-between gap-4 border-b border-line px-4 py-2.5 text-fg-subtle">
          <span className="truncate">{label}</span>
          {meta ? <span className="hidden shrink-0 sm:inline">{meta}</span> : null}
        </figcaption>
      ) : null}
      <div className={bodyClassName}>{children}</div>
      {footer ? <div className="meta flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-line px-4 py-2.5 text-fg-subtle">{footer}</div> : null}
    </figure>
  );
}
