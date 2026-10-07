"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SELECTOR = "[data-reveal]:not([data-revealed])";

/**
 * One IntersectionObserver for every [data-reveal] element on the page.
 * Reveals are "armed" only after this runs, so nothing is hidden without JS,
 * and anything already on screen is marked revealed first to avoid a flash.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reveal = (el: Element) => el.setAttribute("data-revealed", "");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    const track = (scope: ParentNode) => {
      const viewport = window.innerHeight;
      scope.querySelectorAll(SELECTOR).forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (!root.hasAttribute("data-reveal-armed") && rect.top < viewport && rect.bottom > 0) reveal(el);
        else io.observe(el);
      });
    };

    track(document);
    root.setAttribute("data-reveal-armed", "");

    const mo = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches(SELECTOR)) io.observe(node);
          track(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
