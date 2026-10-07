"use client";

import { useEffect, useRef } from "react";

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
};

const format = (n: number, prefix = "", suffix = "") => `${prefix}${Math.round(n).toLocaleString("en-US")}${suffix}`;

/**
 * Counts up once when scrolled into view. The server renders the final value
 * (correct without JavaScript and for crawlers); the animation writes to the
 * DOM directly so it never re-renders React. Screen readers get the final value.
 */
export function CountUp({ value, prefix, suffix, duration = 1400 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    // Already on screen at load: leave the final value alone rather than flashing to zero.
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    el.textContent = format(0, prefix, suffix);
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = format(value * eased, prefix, suffix);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = format(value, prefix, suffix);
    };
  }, [value, prefix, suffix, duration]);

  const final = format(value, prefix, suffix);
  return (
    <>
      {/* The invisible copy reserves the final width, so counting never shifts neighbours. */}
      <span aria-hidden="true" className="inline-grid">
        <span className="invisible col-start-1 row-start-1">{final}</span>
        <span ref={ref} className="tabular col-start-1 row-start-1">
          {final}
        </span>
      </span>
      <span className="sr-only">{final}</span>
    </>
  );
}
