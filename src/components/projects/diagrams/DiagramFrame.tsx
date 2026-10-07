import type { ReactNode } from "react";
import { Frame } from "@/components/ui/Frame";

/** Consistent schematic frame for every project diagram. */
export function DiagramFrame({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <Frame label={label} meta={hint} className="spotlight">
      <div className="relative overflow-hidden">
        <div aria-hidden="true" className="diagram-grid depth-layer pointer-events-none absolute -inset-4 opacity-40" />
        <div className="relative p-4 sm:p-6">{children}</div>
      </div>
    </Frame>
  );
}
