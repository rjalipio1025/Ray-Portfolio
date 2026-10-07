"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { useRovingTabs } from "@/lib/useRovingTabs";

/*
 * Real screens of the IT Lifecycle platform, captured from its dev preview with
 * fictional sample data only: people, companies, emails, asset tags and serials
 * are placeholders, and the backend was disconnected during capture.
 */
const screens = [
  {
    id: "dashboard",
    label: "Dashboard",
    src: "/screenshots/redacted/itlc-dashboard-dark.png",
    alt: "IT Lifecycle dashboard: counts of active employees, onboardings, offboardings, assigned and available assets, pending recoveries, access requests and overdue items, with a list of today's overdue tasks. Fictional sample data.",
    note: "Everything pending, overdue or awaiting recovery, in one view.",
  },
  {
    id: "onboarding",
    label: "Onboarding",
    src: "/screenshots/redacted/itlc-onboarding-dark.png",
    alt: "Onboarding queue listing new hires with work email, company, employment type, department, title, manager, start date and computer. Fictional sample data.",
    note: "New hires with role, manager, start date and device needs on one row.",
  },
  {
    id: "assets",
    label: "Assets",
    src: "/screenshots/redacted/itlc-assets-dark.png",
    alt: "Asset inventory listing asset tag, serial number, computer type, year, assignee, company, status such as assigned, available or pending recovery, and notes. Fictional sample data.",
    note: "Every device, who holds it, and whether it's due back.",
  },
] as const;

type ScreenId = (typeof screens)[number]["id"];
const ids = screens.map((s) => s.id) as ScreenId[];

export function ProductScreens() {
  const [active, setActive] = useState<ScreenId>("dashboard");
  const { register, onKeyDown } = useRovingTabs(ids, active, setActive);
  const screen = screens.find((s) => s.id === active)!;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
        <div role="tablist" aria-label="Product screens" onKeyDown={onKeyDown} className="flex gap-1">
          {screens.map((s) => {
            const selected = s.id === active;
            return (
              <button
                key={s.id}
                ref={register(s.id)}
                type="button"
                role="tab"
                id={`screen-tab-${s.id}`}
                aria-selected={selected}
                aria-controls="screen-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(s.id)}
                className={cn(
                  "h-9 rounded-[3px] border px-3 text-sm font-medium transition-colors",
                  selected ? "border-accent/70 bg-accent-soft text-fg" : "border-line text-fg-muted hover:border-fg-subtle hover:text-fg",
                )}
              >
                {s.label}
              </button>
            );
          })}
        </div>
        <p className="text-sm text-fg-muted">{screen.note}</p>
      </div>

      <div id="screen-panel" role="tabpanel" aria-labelledby={`screen-tab-${active}`} className="relative bg-bg">
        {screens.map((s) => (
          <Image
            key={s.id}
            src={s.src}
            alt={s.alt}
            width={2880}
            height={1800}
            sizes="(min-width: 1280px) 860px, (min-width: 1024px) 70vw, 100vw"
            className={cn("block h-auto w-full", s.id === active ? "" : "hidden")}
          />
        ))}
      </div>

      <div className="meta flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-2.5 text-fg-subtle">
        <span>Real interface · fictional sample data · names, companies and serials are placeholders</span>
        <a
          href={screen.src}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-fg-muted transition-colors hover:text-fg"
        >
          Full size <ArrowUpRight size={12} aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </div>
  );
}
