"use client";

import type { SectionId, TechCategoryId } from "@/content/types";

const SYSTEMS_EVENT = "systems:select";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Scroll to an in-page section, update the URL hash, and move focus to the
 * section heading so keyboard and screen-reader users land in the right place.
 */
export function scrollToSection(id: SectionId) {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", id === "top" ? location.pathname : `#${id}`);
  const heading = el.querySelector<HTMLElement>("h1, h2");
  if (heading) {
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  }
  return true;
}

/**
 * Run after a <dialog> has finished closing. Scrolling while the dialog is
 * still leaving the top layer gets cancelled in Chromium, so wait out the
 * 180ms exit transition.
 */
export function afterDialogClose(fn: () => void) {
  window.setTimeout(fn, 200);
}

/** Ask the technology explorer to open a category (used by the command palette). */
export function selectSystemsTab(tab: TechCategoryId) {
  window.dispatchEvent(new CustomEvent<TechCategoryId>(SYSTEMS_EVENT, { detail: tab }));
}

export function onSystemsTab(handler: (tab: TechCategoryId) => void) {
  const listener = (e: Event) => handler((e as CustomEvent<TechCategoryId>).detail);
  window.addEventListener(SYSTEMS_EVENT, listener);
  return () => window.removeEventListener(SYSTEMS_EVENT, listener);
}
