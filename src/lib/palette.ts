"use client";

const OPEN_EVENT = "palette:open";

export function openPalette() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onPaletteOpen(handler: () => void) {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}
