"use client";

import { Plus } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useState, type ReactNode } from "react";
import type { Project } from "@/content/types";
import { cn } from "@/lib/cn";

type Item = { project: Project; number: string; diagram: ReactNode };

/**
 * The supporting case studies as an editorial index. Each row expands into
 * the full case study with its interactive diagram.
 */
export function ProjectIndex({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.project.id ?? null);

  return (
    <ol className="border-t border-line">
      {items.map(({ project, number, diagram }, i) => {
        const expanded = open === project.id;
        const panelId = `case-${project.id}`;
        return (
          <li
            key={project.id}
            className="border-b border-line"
            data-reveal="left"
            style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
          >
            <h3>
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : project.id)}
                className="group grid w-full grid-cols-[2.75rem_minmax(0,1fr)_auto] items-center gap-4 py-7 text-left md:grid-cols-[4rem_minmax(0,1.1fr)_minmax(0,1fr)_auto] md:gap-8"
              >
                <span className="meta text-accent">{number}</span>
                <span
                  className={cn(
                    "text-[clamp(1.35rem,1rem+1.1vw,2.1rem)] leading-tight font-semibold tracking-[-0.03em] transition-[color,transform] duration-300 ease-out-soft group-hover:translate-x-1.5",
                    expanded ? "text-fg" : "text-fg-muted group-hover:text-fg",
                  )}
                >
                  {project.title}
                </span>
                <span className="hidden text-[0.9375rem] leading-snug font-normal text-fg-muted md:block">{project.summary}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-9 place-items-center border transition-[transform,border-color,color] duration-300",
                    expanded ? "rotate-45 border-accent text-accent" : "border-line-strong text-fg-subtle group-hover:border-fg-subtle",
                  )}
                >
                  <Plus size={15} />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {expanded ? (
                <m.div
                  id={panelId}
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-10 pb-14 md:pl-[6rem] lg:grid-cols-12 lg:gap-12">
                    <div className="lg:col-span-5">
                      <ul className="flex flex-wrap gap-1.5" aria-label="Categories">
                        {project.tags.map((t) => (
                          <li key={t} className="meta border border-accent/40 px-1.5 py-0.5 text-accent">
                            {t}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-5 text-lg leading-snug text-fg md:hidden">{project.summary}</p>
                      <dl className="mt-6 space-y-5">
                        <div>
                          <dt className="meta text-fg-subtle">
                            <span className="text-accent">01</span> Problem
                          </dt>
                          <dd className="mt-2 leading-relaxed text-fg-muted">{project.problem}</dd>
                        </div>
                        <div>
                          <dt className="meta text-fg-subtle">
                            <span className="text-accent">02</span> My contribution
                          </dt>
                          <dd className="mt-2 leading-relaxed text-fg-muted">{project.approach}</dd>
                        </div>
                        <div className="border-l border-ok/60 pl-4">
                          <dt className="meta text-ok">03 Result</dt>
                          <dd className="mt-2 leading-relaxed text-fg">{project.outcome}</dd>
                        </div>
                        <div>
                          <dt className="meta text-fg-subtle">Covers</dt>
                          <dd className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-fg-muted">
                            {project.highlights.map((h) => (
                              <span key={h} className="flex items-center gap-2">
                                <span aria-hidden="true" className="size-1 bg-accent" />
                                {h}
                              </span>
                            ))}
                          </dd>
                        </div>
                      </dl>
                    </div>
                    <div className="min-w-0 lg:col-span-7">{diagram}</div>
                  </div>
                </m.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ol>
  );
}
