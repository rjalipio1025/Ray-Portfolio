import type { ReactNode } from "react";
import { sectionIndex } from "@/content/navigation";
import type { SectionId } from "@/content/types";
import { cn } from "@/lib/cn";

type SectionProps = {
  id: SectionId;
  children: ReactNode;
  className?: string;
  /** Alternate band: graphite, translucent so the grid and grain show through. */
  raised?: boolean;
};

export function Section({ id, children, className, raised }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn(
        "relative scroll-mt-[-1rem] py-20 sm:py-24 lg:scroll-mt-[-2rem] lg:py-28",
        raised && "border-y border-line bg-bg-raised/70",
        className,
      )}
    >
      <div className="container-page relative">{children}</div>
    </section>
  );
}

type HeaderProps = {
  id: SectionId;
  title: ReactNode;
  intro?: ReactNode;
  /** Right side of the metadata rule, e.g. "7 tools · 5 domains". */
  meta?: ReactNode;
  className?: string;
};

/**
 * Section identifier rule (crosshairs, index, label, metadata), a display
 * headline that rises out of a mask, and an offset intro paragraph.
 */
export function SectionHeader({ id, title, intro, meta, className }: HeaderProps) {
  const entry = sectionIndex.find((s) => s.id === id);
  return (
    <header className={cn("mb-10 sm:mb-14", className)}>
      <div className="meta flex items-center gap-3 text-fg-subtle" data-reveal="wipe">
        <span className="crosshair" aria-hidden="true" />
        <span className="text-accent">{entry?.code}</span>
        <span aria-hidden="true">/</span>
        <span>{entry?.label}</span>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
        {meta ? <span className="hidden sm:inline">{meta}</span> : null}
        <span className="crosshair" aria-hidden="true" />
      </div>

      <div className="mt-7 grid gap-5 sm:mt-8 lg:grid-cols-12 lg:items-end lg:gap-10">
        <h2
          id={`${id}-title`}
          className="display text-[clamp(2.1rem,1.4rem+2.6vw,3.6rem)] text-fg outline-none lg:col-span-7"
        >
          <span className="block overflow-hidden pb-[0.1em]" data-reveal="rise">
            <span className="block">{title}</span>
          </span>
        </h2>
        {intro ? (
          <p
            className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-pretty text-fg-muted lg:col-span-5 lg:pb-3"
            data-reveal
            style={{ ["--reveal-delay" as string]: "120ms" }}
          >
            {intro}
          </p>
        ) : null}
      </div>
    </header>
  );
}
