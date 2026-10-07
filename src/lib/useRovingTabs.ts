"use client";

import { useRef, type KeyboardEvent } from "react";

/**
 * WAI-ARIA tabs keyboard model (automatic activation): arrow keys move and
 * select, Home/End jump to the ends. Works for horizontal and vertical lists.
 */
export function useRovingTabs<T extends string>(ids: readonly T[], active: T, onSelect: (id: T) => void) {
  const refs = useRef(new Map<T, HTMLElement>());

  const register = (id: T) => (el: HTMLElement | null) => {
    if (el) refs.current.set(id, el);
    else refs.current.delete(id);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const i = ids.indexOf(active);
    let next: T | undefined;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = ids[(i + 1) % ids.length];
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = ids[(i - 1 + ids.length) % ids.length];
    else if (e.key === "Home") next = ids[0];
    else if (e.key === "End") next = ids[ids.length - 1];
    if (next === undefined) return;
    e.preventDefault();
    onSelect(next);
    refs.current.get(next)?.focus();
  };

  return { register, onKeyDown };
}
