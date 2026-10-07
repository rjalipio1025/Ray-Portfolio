"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { sectionIndex } from "@/content/navigation";
import { cn } from "@/lib/cn";

/**
 * Scroll telemetry in the right margin on wide screens: section ticks, the
 * current section and a Y readout. Decorative; the header carries navigation.
 */
export function SideRail() {
  const pathname = usePathname();
  const [current, setCurrent] = useState(0);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (pathname !== "/") return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let idx = 0;
      sectionIndex.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) idx = i;
      });
      setCurrent(idx);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPercent(max > 0 ? Math.round((window.scrollY / max) * 100) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  if (pathname !== "/") return null;
  const entry = sectionIndex[current];

  return (
    <div
      aria-hidden="true"
      className="side-rail no-print pointer-events-none fixed top-1/2 right-6 z-30 -translate-y-1/2 flex-col items-center gap-5"
    >
      <span className="meta text-fg-subtle tabular">Y{String(percent).padStart(3, "0")}</span>
      <ol className="flex flex-col items-center gap-2.5">
        {sectionIndex.map((s, i) => (
          <li
            key={s.id}
            className={cn(
              "h-px transition-[width,background-color] duration-500",
              i === current ? "w-5 bg-accent" : i < current ? "w-3 bg-fg-subtle" : "w-2 bg-line-strong",
            )}
          />
        ))}
      </ol>
      <span className="meta text-fg-subtle [writing-mode:vertical-rl]">
        <span className="text-accent">{entry.code}</span> · {entry.label}
      </span>
    </div>
  );
}
