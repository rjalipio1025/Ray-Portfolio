"use client";

import { Check, Lock } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useState } from "react";
import { mobileMatrix } from "@/content/projects";
import { cn } from "@/lib/cn";
import { DiagramFrame } from "./DiagramFrame";

type View = "manages" | "private";

const views: { id: View; label: string }[] = [
  { id: "manages", label: "What IT manages" },
  { id: "private", label: "What stays private" },
];

/** Ownership × platform: four management models, and the boundary each one keeps. */
export function MobileMatrix() {
  const [view, setView] = useState<View>("manages");
  const { rows, columns, cells } = mobileMatrix;

  return (
    <DiagramFrame label="FIG. 07 — Ownership × platform" hint="Toggle the boundary">
      <div role="group" aria-label="View" className="grid grid-cols-2 gap-1 rounded-[4px] border border-line bg-surface-2/50 p-1">
        {views.map((v) => (
          <button
            key={v.id}
            type="button"
            aria-pressed={view === v.id}
            onClick={() => setView(v.id)}
            className={cn(
              "relative h-10 rounded-[3px] text-sm font-medium transition-colors",
              view === v.id ? "text-fg" : "text-fg-muted hover:text-fg",
            )}
          >
            {view === v.id ? (
              <m.span
                layoutId="mm-view-bg"
                aria-hidden="true"
                className="absolute inset-0 rounded-[3px] border border-line-strong bg-surface"
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
              />
            ) : null}
            <span className="relative">{v.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-[4.5rem_minmax(0,1fr)_minmax(0,1fr)]">
        <span aria-hidden="true" className="hidden sm:block" />
        {columns.map((c) => (
          <p key={c} className="eyebrow hidden text-[0.6875rem] text-fg-subtle sm:block">
            {c}
          </p>
        ))}

        {rows.map((row) => (
          <div key={row} className="contents">
            <p className="hidden pt-3 text-sm font-medium text-fg sm:block">{row}</p>
            {columns.map((col) => {
              const cell = cells[`${row}|${col}` as keyof typeof cells];
              const items = cell[view];
              return (
                <div key={col} className="spotlight rounded-[4px] border border-line bg-surface-2/40 p-4">
                  <p className="eyebrow mb-1 text-[0.625rem] text-fg-subtle sm:hidden">
                    {row} · {col}
                  </p>
                  <p className="text-sm font-medium text-fg">{cell.model}</p>
                  <AnimatePresence mode="wait" initial={false}>
                    <m.ul
                      key={view}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, transition: { duration: 0.1 } }}
                      className="mt-2.5 space-y-1.5"
                    >
                      {items.map((item) => (
                        <li key={item} className="flex gap-2 text-[0.8125rem] leading-snug text-fg-muted">
                          {view === "manages" ? (
                            <Check size={13} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                          ) : (
                            <Lock size={12} aria-hidden="true" className="mt-0.5 shrink-0 text-violet" />
                          )}
                          {item}
                        </li>
                      ))}
                    </m.ul>
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}
