"use client";

import { AnimatePresence, m } from "motion/react";
import { useState } from "react";
import { endpointPipelines } from "@/content/projects";
import { cn } from "@/lib/cn";
import { useRovingTabs } from "@/lib/useRovingTabs";
import { DiagramFrame } from "./DiagramFrame";

type Platform = keyof typeof endpointPipelines;
const platforms = Object.keys(endpointPipelines) as Platform[];

const ongoing = [
  { title: "App deployment", body: "Required apps by policy; optional ones in Self Service or Company Portal." },
  { title: "Device compliance", body: "Encryption, OS version and EDR health, evaluated continuously." },
  { title: "Remote remediation", body: "Scripts, policies and remote actions fix drift without a desk visit." },
];

/** First boot to compliant, per platform. */
export function EndpointPipeline() {
  const [platform, setPlatform] = useState<Platform>("macos");
  const { register, onKeyDown } = useRovingTabs(platforms, platform, setPlatform);
  const pipeline = endpointPipelines[platform];

  return (
    <DiagramFrame label="FIG. 05 — Provisioning pipeline" hint="First boot → compliant">
      <div
        role="tablist"
        aria-label="Platform"
        onKeyDown={onKeyDown}
        className="grid grid-cols-2 gap-1 rounded-[4px] border border-line bg-surface-2/50 p-1"
      >
        {platforms.map((p) => {
          const selected = p === platform;
          return (
            <button
              key={p}
              ref={register(p)}
              type="button"
              role="tab"
              id={`ep-tab-${p}`}
              aria-selected={selected}
              aria-controls="ep-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setPlatform(p)}
              className={cn(
                "relative inline-flex h-10 items-center justify-center gap-2 rounded-[3px] text-sm font-medium transition-colors",
                selected ? "text-fg" : "text-fg-muted hover:text-fg",
              )}
            >
              {selected ? (
                <m.span
                  layoutId="ep-tab-bg"
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[3px] border border-line-strong bg-surface"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
              ) : null}
              <span className="relative">{endpointPipelines[p].label}</span>
              <span className="relative font-mono text-[0.6875rem] font-normal text-fg-subtle">
                {endpointPipelines[p].share}
              </span>
            </button>
          );
        })}
      </div>

      <div id="ep-panel" role="tabpanel" aria-labelledby={`ep-tab-${platform}`} className="mt-5">
        <AnimatePresence mode="wait" initial={false}>
          <m.ol
            key={platform}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            className="relative"
          >
            <span aria-hidden="true" className="absolute top-3 bottom-3 left-[0.6875rem] w-px bg-line-strong" />
            {pipeline.steps.map((step, i) => (
              <m.li
                key={step.stage}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.045, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative grid grid-cols-[1.375rem_minmax(0,1fr)] gap-3.5 pb-4 last:pb-0"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative z-10 grid size-[1.375rem] place-items-center rounded-full border font-mono text-[0.625rem]",
                    i === pipeline.steps.length - 1
                      ? "border-ok/60 bg-surface text-ok"
                      : "border-line-strong bg-surface text-fg-subtle",
                  )}
                >
                  {i + 1}
                </span>
                <div className="min-w-0 pt-px">
                  <p className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                    <span className="text-sm font-medium text-fg">{step.stage}</span>
                    <span className="font-mono text-[0.75rem] text-accent">{step.tool}</span>
                  </p>
                  <p className="mt-0.5 text-sm leading-relaxed text-fg-muted">{step.note}</p>
                </div>
              </m.li>
            ))}
          </m.ol>
        </AnimatePresence>
      </div>

      <div className="mt-6 border-t border-line pt-5">
        <p className="eyebrow mb-3 text-[0.6875rem] text-fg-subtle">Every day after</p>
        <ul className="grid gap-2 sm:grid-cols-3">
          {ongoing.map((o) => (
            <li key={o.title} className="rounded-[3px] border border-line bg-surface-2/50 p-3">
              <p className="text-sm font-medium text-fg">{o.title}</p>
              <p className="mt-1 text-[0.8125rem] leading-snug text-fg-muted">{o.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </DiagramFrame>
  );
}
