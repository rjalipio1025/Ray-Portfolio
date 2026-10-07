"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Pulls its child a few pixels toward the cursor. Used on two CTAs only.
 * Inert on touch devices and with reduced motion.
 */
export function Magnetic({ children, strength = 6 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;

  function onMove(e: PointerEvent<HTMLSpanElement>) {
    const el = ref.current;
    if (!enabled || !el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transition = "transform 120ms linear";
    el.style.transform = `translate3d(${x * strength * 2}px, ${y * strength * 2}px, 0)`;
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)";
    el.style.transform = "";
  }

  return (
    <span ref={ref} className="inline-flex will-change-transform" onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </span>
  );
}
