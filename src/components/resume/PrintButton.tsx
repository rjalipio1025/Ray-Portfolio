"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex h-11 items-center gap-2 rounded-lg border border-line-strong bg-surface/60 px-4 text-[0.9375rem] font-medium text-fg transition-colors hover:bg-surface-2"
    >
      <Printer size={16} aria-hidden="true" /> Print
    </button>
  );
}
