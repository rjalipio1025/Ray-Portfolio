"use client";

import { ChevronDown, ShieldCheck } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useState } from "react";
import { caseStudies } from "@/content/caseStudies";
import { cn } from "@/lib/cn";

/**
 * Problems I've solved, as an incident log. Each row expands into an
 * investigation report: problem, numbered steps, tools, outcome.
 */
export function IncidentLog() {
  const [open, setOpen] = useState<string | null>(caseStudies[0].id);

  return (
    <div className="frame">
      <div className="meta hidden grid-cols-[6rem_minmax(0,1.4fr)_minmax(0,1fr)_7.5rem_2.5rem] gap-4 border-b border-line px-5 py-3 text-fg-subtle md:grid">
        <span>ID</span>
        <span>Incident · outcome</span>
        <span>Environment</span>
        <span>Status</span>
        <span className="sr-only">Expand</span>
      </div>

      <ol>
        {caseStudies.map((c, i) => {
          const expanded = open === c.id;
          const id = `INC-${String(i + 1).padStart(3, "0")}`;
          const panelId = `incident-${c.id}`;
          return (
            <li
              key={c.id}
              className={cn("border-b border-line last:border-b-0", expanded && "bg-surface/60")}
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
            >
              <h3>
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => setOpen(expanded ? null : c.id)}
                  className="group grid w-full grid-cols-[minmax(0,1fr)_2.25rem] items-center gap-x-4 gap-y-1.5 px-5 py-4 text-left transition-colors hover:bg-surface/50 md:grid-cols-[6rem_minmax(0,1.4fr)_minmax(0,1fr)_7.5rem_2.5rem] md:py-5"
                >
                  <span className="meta text-fg-subtle md:order-none">{id}</span>
                  <span className="col-start-1 md:col-start-auto">
                    <span className="block font-medium tracking-[-0.01em] text-fg md:text-[1.0625rem]">{c.title}</span>
                    <span className="mt-1 block text-sm leading-snug text-fg-muted">
                      <span className="sr-only">Outcome: </span>
                      {c.outcome}
                    </span>
                  </span>
                  <span className="meta col-start-1 text-fg-subtle md:col-start-auto">{c.environment}</span>
                  <span className="meta col-start-1 flex items-center gap-2 text-ok md:col-start-auto">
                    <span aria-hidden="true" className="size-1.5 bg-ok" />
                    {c.status}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "col-start-2 row-span-4 row-start-1 grid size-8 place-items-center self-center justify-self-end border transition-[transform,border-color,color] duration-300 md:col-start-auto md:row-span-1 md:row-start-auto",
                      expanded ? "rotate-180 border-accent text-accent" : "border-line-strong text-fg-subtle group-hover:text-fg",
                    )}
                  >
                    <ChevronDown size={15} />
                  </span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {expanded ? (
                  <m.div
                    id={panelId}
                    key="report"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-px border-t border-line bg-line md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                      <section className="bg-surface p-5 sm:px-6" aria-label="Outcome">
                        <p className="meta text-ok">Outcome</p>
                        <p className="mt-2 text-lg leading-snug text-fg">{c.outcome}</p>
                      </section>
                      <section className="bg-surface p-5 sm:px-6" aria-label="Prevention">
                        <p className="meta flex items-center gap-1.5 text-fg-subtle">
                          <ShieldCheck size={12} aria-hidden="true" /> Prevention
                        </p>
                        <p className="mt-2 leading-relaxed text-fg-muted">{c.prevention}</p>
                      </section>
                    </div>
                    <div className="grid gap-px border-t border-line bg-line md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
                      <section className="bg-surface p-5 sm:p-6" aria-label="Problem and tools">
                        <p className="meta text-fg-subtle">Problem</p>
                        <p className="mt-2.5 leading-relaxed text-fg">{c.problem}</p>
                        <p className="meta mt-6 text-fg-subtle">Tools</p>
                        <ul className="mt-2.5 flex flex-wrap gap-1.5">
                          {c.tools.map((t) => (
                            <li key={t} className="border border-line-strong px-2 py-1 font-mono text-xs text-fg-muted">
                              {t}
                            </li>
                          ))}
                        </ul>
                      </section>

                      <section className="bg-surface p-5 sm:p-6" aria-label="Investigation">
                        <p className="meta text-fg-subtle">Investigation</p>
                        <ol className="relative mt-3.5">
                          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[0.6875rem] w-px bg-line-strong" />
                          {c.investigation.map((step, si) => (
                            <m.li
                              key={step}
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.12 + si * 0.07, duration: 0.3 }}
                              className="relative grid grid-cols-[1.375rem_minmax(0,1fr)] gap-3 pb-3 last:pb-0"
                            >
                              <span
                                aria-hidden="true"
                                className="relative z-10 grid size-[1.375rem] place-items-center border border-accent/60 bg-surface font-mono text-[0.625rem] text-accent"
                              >
                                {String(si + 1).padStart(2, "0")}
                              </span>
                              <span className="pt-0.5 text-[0.9375rem] leading-snug text-fg-muted">{step}</span>
                            </m.li>
                          ))}
                        </ol>
                      </section>
                    </div>
                  </m.div>
                ) : null}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
