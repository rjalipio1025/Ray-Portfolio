"use client";

import { Users } from "lucide-react";
import { useState } from "react";
import { topologyLayers, topologyNodes } from "@/content/topology";
import { cn } from "@/lib/cn";
import { Frame } from "@/components/ui/Frame";

/**
 * Phone layout of the access topology: one compact row per layer, linked by
 * a rail. Tap a system to read what it does, right under its layer.
 */
export function TopologyStack() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Frame label="FIG. 01 — Access topology" footer={<span>Tap a system to inspect it</span>}>
      <ol className="relative px-3 py-1.5">
        <span aria-hidden="true" className="absolute top-5 bottom-5 left-[1.05rem] w-px bg-line-strong" />
        {topologyLayers.map((layer, li) => {
          const nodes = topologyNodes.filter((n) => n.layer === layer.id).sort((a, b) => a.x - b.x);
          const open = nodes.find((n) => n.id === selected);
          const detailId = `topo-m-${layer.id}`;
          return (
            <li key={layer.id} className="relative grid grid-cols-[4.75rem_minmax(0,1fr)] gap-x-2 border-b border-line py-2 last:border-b-0">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-[0.95rem] left-[0.55rem] size-[0.4375rem] border",
                  open ? "border-accent bg-accent" : "border-fg-subtle bg-surface",
                )}
              />
              <p className="meta pt-1.5 pl-5 text-[0.625rem] text-fg-subtle">
                <span className="text-accent">L{li}</span> {layer.label === "Applications" ? "Apps" : layer.label}
              </p>
              <div className="flex flex-wrap gap-1">
                {nodes.map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    aria-pressed={selected === n.id}
                    aria-controls={detailId}
                    onClick={() => setSelected((s) => (s === n.id ? null : n.id))}
                    className={cn(
                      "inline-flex min-h-8 items-center gap-1.5 rounded-[3px] border px-2 text-[0.8125rem] font-medium transition-colors",
                      selected === n.id ? "border-accent bg-accent-soft text-fg" : "border-line-strong bg-surface text-fg-muted",
                    )}
                  >
                    {n.layer === "user" ? <Users size={13} aria-hidden="true" className="text-accent" /> : null}
                    {n.label}
                  </button>
                ))}
              </div>
              <div id={detailId} aria-live="polite" className="col-span-2">
                {open ? (
                  <p className="mt-2 pl-5 text-sm leading-relaxed text-fg-muted">
                    <span className="meta mr-2 text-accent">{open.role}</span>
                    {open.description}
                  </p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </Frame>
  );
}
