"use client";

import { openPalette } from "@/lib/palette";
import { useShortcutLabel } from "@/lib/platform";

export function PaletteHint() {
  const shortcut = useShortcutLabel();
  return (
    <button type="button" onClick={openPalette} className="underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg">
      Press <kbd className="font-mono">{shortcut}</kbd> to navigate
    </button>
  );
}
