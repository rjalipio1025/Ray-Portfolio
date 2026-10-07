"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, m, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { presentNote } from "@/content/experience";
import type { ExperienceRole } from "@/content/types";
import { cn } from "@/lib/cn";
import { formatDuration, formatMonth } from "@/lib/dates";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Career as a vertical system log, oldest first. Each node activates as it
 * crosses the middle of the viewport; the rail fills as you read.
 */
export function Timeline({ roles }: { roles: ExperienceRole[] }) {
  const ordered = [...roles].reverse();
  const listRef = useRef<HTMLOListElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 55%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [reached, setReached] = useState<Set<string>>(new Set());

  // A node is "reached" once it crosses the middle of the viewport.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const io = new IntersectionObserver(
      (entries) => {
        const hits = entries.filter((e) => e.isIntersecting).map((e) => (e.target as HTMLElement).dataset.node!);
        if (hits.length) setReached((prev) => new Set([...prev, ...hits]));
      },
      { rootMargin: "0px 0px -50% 0px" },
    );
    list.querySelectorAll("[data-node]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const isOn = (id: string) => reduced || reached.has(id);

  return (
    <div className="relative">
      <span aria-hidden="true" className="absolute top-2 bottom-2 left-[0.3125rem] w-px bg-line md:left-[calc(10.5rem+1.5rem)]" />
      <m.span
        aria-hidden="true"
        style={{ scaleY: reduced ? 1 : progress }}
        className="absolute top-2 bottom-2 left-[0.3125rem] w-px origin-top bg-gradient-to-b from-accent via-accent to-cyan md:left-[calc(10.5rem+1.5rem)]"
      />

      <ol ref={listRef} className="space-y-16 sm:space-y-20">
        {ordered.map((role) => {
          const on = isOn(role.id);
          const expanded = !!open[role.id];
          const panelId = `role-${role.id}-more`;
          const duration = formatDuration(role.start, role.end);
          return (
            <li
              key={role.id}
              data-node={role.id}
              className="relative grid gap-4 pl-8 md:grid-cols-[10.5rem_3rem_minmax(0,1fr)] md:gap-0 md:pl-0"
            >
              {/* Year */}
              <div className="md:pt-0.5 md:pr-2 md:text-right">
                <p
                  className={cn(
                    "display tabular text-[clamp(2.4rem,1.8rem+2vw,3.5rem)] leading-none transition-colors duration-700",
                    on ? "text-fg" : "text-fg-subtle",
                  )}
                >
                  {role.start.slice(0, 4)}
                </p>
                <p className="meta mt-2 text-fg-subtle">
                  <time dateTime={role.start}>{formatMonth(role.start)}</time> –{" "}
                  {role.end ? <time dateTime={role.end}>{formatMonth(role.end)}</time> : "Present"}
                </p>
                <p className="meta mt-0.5 text-fg-subtle">{duration ?? "Current role"}</p>
              </div>

              {/* Node */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-3 left-0 size-[0.6875rem] border transition-[background-color,border-color,box-shadow] duration-500 md:relative md:top-auto md:left-auto md:mt-3 md:justify-self-center",
                  on ? "border-accent bg-accent shadow-[0_0_0_5px_var(--accent-soft)]" : "border-line-strong bg-bg",
                )}
              />

              {/* Role */}
              <div data-reveal="right" className="min-w-0 md:pl-4">
                <p className="text-[clamp(1.5rem,1.25rem+0.9vw,2rem)] leading-tight font-semibold tracking-[-0.03em] text-fg">
                  {role.company}
                </p>
                <h3 className="mt-1 text-lg font-normal text-fg-muted">{role.title}</h3>
                <p className="meta mt-2 text-fg-subtle">{role.location}</p>

                <ol className="mt-6 grid gap-x-8 gap-y-4 border-t border-line pt-5 sm:grid-cols-3" aria-label="Key accomplishments">
                  {role.highlights.map((h, i) => (
                    <li key={h} className="text-[0.9375rem] leading-snug text-fg-muted">
                      <span aria-hidden="true" className="meta mb-1.5 block text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {h}
                    </li>
                  ))}
                </ol>

                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => setOpen((o) => ({ ...o, [role.id]: !o[role.id] }))}
                  className="meta mt-6 inline-flex items-center gap-1.5 text-fg-subtle transition-colors hover:text-fg"
                >
                  {expanded ? "Hide" : "Expand"} full role · {role.bullets.length} items
                  <ChevronDown size={13} aria-hidden="true" className={cn("transition-transform duration-200", expanded && "rotate-180")} />
                </button>

                <AnimatePresence initial={false}>
                  {expanded ? (
                    <m.div
                      id={panelId}
                      key="more"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="mt-5 max-w-[64ch] leading-relaxed text-fg">{role.summary}</p>
                      <ul className="mt-4 space-y-2">
                        {role.bullets.map((b) => (
                          <li key={b} className="relative pl-5 text-[0.9375rem] leading-relaxed text-fg-muted">
                            <span aria-hidden="true" className="absolute top-[0.72em] left-0 h-px w-2.5 bg-accent" />
                            {b}
                          </li>
                        ))}
                      </ul>
                      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
                        {role.tags.map((t) => (
                          <li key={t} className="meta border border-line px-2 py-1 text-fg-subtle">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </m.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </li>
          );
        })}

        {/* Present */}
        <li data-node="present" className="relative grid gap-4 pl-8 md:grid-cols-[10.5rem_3rem_minmax(0,1fr)] md:gap-0 md:pl-0">
          <p className={cn("eyebrow md:pt-1 md:pr-2 md:text-right", isOn("present") ? "text-accent" : "text-fg-subtle")}>Present</p>
          <span
            aria-hidden="true"
            className="absolute top-1 left-0 grid size-[0.6875rem] place-items-center md:relative md:top-auto md:left-auto md:mt-1.5 md:justify-self-center"
          >
            <span className="animate-ping-slow absolute inset-0 bg-accent" />
            <span className="relative size-[0.6875rem] bg-accent" />
          </span>
          <p className="max-w-[52ch] text-lg leading-snug text-fg md:pl-4" data-reveal="right">
            {presentNote}
          </p>
        </li>
      </ol>
    </div>
  );
}
