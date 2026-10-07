"use client";

import { useEffect } from "react";

/**
 * One delegated pointer listener for every .spotlight panel under a fine
 * pointer. It feeds --mx/--my (cursor position, for the glow) and --px/--py
 * (-1…1, for subtle parallax on .depth-layer backgrounds). No per-card state.
 */
export function SpotlightTracker() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    let last: PointerEvent | null = null;
    let current: HTMLElement | null = null;

    const reset = (el: HTMLElement) => {
      el.style.setProperty("--px", "0");
      el.style.setProperty("--py", "0");
    };

    const apply = () => {
      frame = 0;
      if (!last) return;
      const card = (last.target as Element | null)?.closest<HTMLElement>(".spotlight") ?? null;
      if (current && current !== card) reset(current);
      current = card;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = last.clientX - rect.left;
      const y = last.clientY - rect.top;
      card.style.setProperty("--mx", `${x}px`);
      card.style.setProperty("--my", `${y}px`);
      card.style.setProperty("--px", ((x / rect.width) * 2 - 1).toFixed(3));
      card.style.setProperty("--py", ((y / rect.height) * 2 - 1).toFixed(3));
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
