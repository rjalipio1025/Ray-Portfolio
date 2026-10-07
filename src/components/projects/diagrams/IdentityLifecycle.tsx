"use client";

import { ArrowRight, Check, Play, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { identityLifecycle } from "@/content/projects";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { DiagramFrame } from "./DiagramFrame";

type PhaseId = (typeof identityLifecycle)[number]["id"];

const flow = ["HR ticket", "Okta · Entra ID", "Role groups", "Apps · licenses"];
const leaver = identityLifecycle.find((p) => p.id === "leaver")!;

/** Joiner / mover / leaver, with a runnable offboarding checklist. */
export function IdentityLifecycle() {
  const [phase, setPhase] = useState<PhaseId>("joiner");
  const [started, setStarted] = useState(false);
  const [ticked, setTicked] = useState(0);
  const reduced = usePrefersReducedMotion();
  const total = leaver.steps.length;
  const running = started && ticked < total;
  const complete = started && ticked >= total;

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setTicked((t) => t + 1), ticked === 0 ? 250 : 420);
    return () => window.clearTimeout(timer);
  }, [running, ticked]);

  function run() {
    setPhase("leaver");
    setStarted(true);
    setTicked(reduced ? total : 0);
  }

  function reset() {
    setStarted(false);
    setTicked(0);
  }

  return (
    <DiagramFrame label="FIG. 06 — Joiner · Mover · Leaver" hint="Access follows groups">
      <ol className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-[0.75rem]" aria-label="How access is granted">
        {flow.map((f, i) => (
          <li key={f} className="flex items-center gap-2">
            <span className="rounded-[3px] border border-line bg-surface-2/60 px-2 py-1 text-fg-muted">{f}</span>
            {i < flow.length - 1 ? <ArrowRight size={13} aria-hidden="true" className="text-fg-subtle" /> : null}
          </li>
        ))}
      </ol>

      <div className="mb-4 grid grid-cols-3 gap-1 rounded-[4px] border border-line bg-surface-2/50 p-1 sm:hidden">
        {identityLifecycle.map((p) => (
          <button
            key={p.id}
            type="button"
            aria-pressed={phase === p.id}
            onClick={() => setPhase(p.id)}
            className={cn(
              "h-9 rounded-[3px] text-sm font-medium transition-colors",
              phase === p.id ? "bg-surface text-fg shadow-[0_0_0_1px_var(--line-strong)]" : "text-fg-muted",
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {identityLifecycle.map((p) => {
          const isLeaver = p.id === "leaver";
          return (
            <section
              key={p.id}
              aria-label={`${p.label}: ${p.caption}`}
              className={cn(
                "rounded-[4px] border p-4 transition-colors duration-300",
                phase === p.id ? "block" : "hidden sm:block",
                isLeaver && started ? "border-accent/50 bg-accent-soft" : "border-line bg-surface-2/40",
              )}
            >
              <header className="mb-3">
                <p className="font-medium text-fg">{p.label}</p>
                <p className="eyebrow mt-0.5 text-[0.6875rem] text-fg-subtle">{p.caption}</p>
              </header>
              <ul className="space-y-2">
                {p.steps.map((step, i) => {
                  const done = isLeaver && i < ticked;
                  return (
                    <li key={step} className="flex gap-2.5 text-[0.8125rem] leading-snug">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "mt-px grid size-4 shrink-0 place-items-center rounded border font-mono text-[0.5625rem] transition-colors duration-200",
                          done ? "border-ok bg-ok text-bg" : "border-line-strong text-fg-subtle",
                        )}
                      >
                        {done ? <Check size={10} strokeWidth={3} /> : isLeaver ? null : i + 1}
                      </span>
                      <span className={done ? "text-fg" : "text-fg-muted"}>
                        {step}
                        {isLeaver && started ? <span className="sr-only">{done ? " (done)" : " (pending)"}</span> : null}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
        <p className="text-sm text-fg-muted" role="status" aria-live="polite">
          {complete ? (
            <span className="inline-flex items-center gap-2 text-ok">
              <Check size={15} aria-hidden="true" /> Access fully revoked. Audit entry written.
            </span>
          ) : running ? (
            `Offboarding: step ${Math.min(ticked + 1, total)} of ${total}`
          ) : (
            "Offboarding always runs in the same order."
          )}
        </p>
        {started ? (
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-9 items-center gap-2 rounded-[3px] border border-line-strong px-3 text-sm text-fg-muted transition-colors hover:text-fg"
          >
            <RotateCcw size={14} aria-hidden="true" /> Reset
          </button>
        ) : (
          <button
            type="button"
            onClick={run}
            className="inline-flex h-9 items-center gap-2 rounded-[3px] bg-surface-2 px-3 text-sm font-medium text-fg shadow-[0_0_0_1px_var(--line-strong)] transition-colors hover:bg-surface"
          >
            <Play size={13} aria-hidden="true" /> Run offboarding
          </button>
        )}
      </div>
    </DiagramFrame>
  );
}
