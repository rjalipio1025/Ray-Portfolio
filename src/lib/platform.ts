"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** "⌘K" on Apple platforms, "Ctrl K" elsewhere. Renders "⌘K" on the server. */
export function useShortcutLabel() {
  const isApple = useSyncExternalStore(
    noop,
    () => /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent),
    () => true,
  );
  return isApple ? "⌘K" : "Ctrl K";
}
