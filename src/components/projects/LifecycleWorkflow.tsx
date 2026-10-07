"use client";

import { ArrowLeft, ArrowRight, Check, Pause, Play } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { lifecycleStages } from "@/content/projects";
import { cn } from "@/lib/cn";
import { useRovingTabs } from "@/lib/useRovingTabs";

const ids = lifecycleStages.map((s) => s.id);
const COLS = lifecycleStages.length;
/** Centre of the first and last columns, as a percentage of the track. */
const EDGE = 100 / COLS / 2;

/**
 * The employee lifecycle as an operational workflow: eight connected stations,
 * a return loop back to inventory, and a "run" mode that walks the path.
 * Scrolls horizontally on small screens.
 */
export function LifecycleWorkflow() {
  const [active, setActive] = useState(ids[0]);
  const [playing, setPlaying] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stationRefs = useRef(new Map<string, HTMLButtonElement>());
  const { register, onKeyDown } = useRovingTabs(ids, active, setActive);

  const index = ids.indexOf(active);
  const stage = lifecycleStages[index];
  const atEnd = index === COLS - 1;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (atEnd) setPlaying(false);
      else setActive(ids[index + 1]);
    }, 1500);
    return () => window.clearTimeout(timer);
  }, [playing, index, atEnd]);

  // Keep the selected station visible when the track scrolls (phones).
  useEffect(() => {
    const scroller = scrollerRef.current;
    const el = stationRefs.current.get(active);
    if (!scroller || !el || scroller.scrollWidth <= scroller.clientWidth) return;
    const left = el.offsetLeft - scroller.clientWidth / 2 + el.offsetWidth / 2;
    scroller.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  function run() {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (atEnd) setActive(ids[0]);
    setPlaying(true);
  }

  const progress = (index / (COLS - 1)) * (100 - EDGE * 2);

  return (
    <div>
      <p className="meta px-4 pt-3 text-fg-subtle md:hidden">Swipe the track · tap a stage →</p>
      <div ref={scrollerRef} className="-mx-px overflow-x-auto overscroll-x-contain [scrollbar-width:none]">
        <div className="relative min-w-[52rem] pt-8 pb-28 md:min-w-0">
          {/* Track, progress and token */}
          <span aria-hidden="true" className="absolute top-[3.375rem] h-px bg-line-strong" style={{ left: `${EDGE}%`, right: `${EDGE}%` }} />
          <span
            aria-hidden="true"
            className="absolute top-[3.375rem] h-px bg-accent transition-[width] duration-700 ease-out-soft"
            style={{ left: `${EDGE}%`, width: `${progress}%` }}
          />
          <span
            aria-hidden="true"
            className="absolute top-[3.375rem] z-[5] size-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_12px_3px_var(--accent-soft)] transition-[left] duration-700 ease-out-soft"
            style={{ left: `${EDGE + progress}%` }}
          />
          {/* Return loop: asset recovery back to inventory for the next hire */}
          <span
            aria-hidden="true"
            className="absolute top-[3.375rem] h-[8.4rem] rounded-b-[14px] border border-t-0 border-dashed border-line-strong"
            style={{ left: `${EDGE}%`, right: `${EDGE}%` }}
          />
          <span
            aria-hidden="true"
            className="meta absolute top-[11.775rem] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface px-3 whitespace-nowrap text-fg-subtle"
          >
            ← Device returns to inventory · next hire
          </span>

          <div role="tablist" aria-label="Lifecycle stages" onKeyDown={onKeyDown} className="relative grid" style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}>
            {lifecycleStages.map((s, i) => {
              const selected = s.id === active;
              const done = i < index;
              return (
                <button
                  key={s.id}
                  ref={(el) => {
                    register(s.id)(el);
                    if (el) stationRefs.current.set(s.id, el);
                    else stationRefs.current.delete(s.id);
                  }}
                  type="button"
                  role="tab"
                  id={`lc-tab-${s.id}`}
                  aria-selected={selected}
                  aria-controls="lc-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => {
                    setPlaying(false);
                    setActive(s.id);
                  }}
                  className="group flex flex-col items-center px-1 text-center"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "relative z-10 grid size-11 place-items-center border font-mono text-xs transition-[background-color,border-color,color,box-shadow] duration-300",
                      selected
                        ? "border-accent bg-accent text-accent-fg shadow-[0_0_0_6px_var(--accent-soft),0_0_32px_-6px_var(--accent)]"
                        : done
                          ? "border-accent/70 bg-surface text-accent"
                          : "border-line-strong bg-surface text-fg-subtle group-hover:border-fg-subtle group-hover:text-fg",
                    )}
                  >
                    {done ? <Check size={14} strokeWidth={2.4} /> : String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={cn("mt-3 text-sm leading-tight font-medium transition-colors", selected ? "text-fg" : "text-fg-muted group-hover:text-fg")}>
                    {s.label}
                  </span>
                  <span className="meta mt-1.5 text-fg-subtle">
                    {s.systems.length} {s.systems.length === 1 ? "system" : "systems"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div id="lc-panel" role="tabpanel" aria-labelledby={`lc-tab-${active}`} aria-live="polite" className="border-t border-line">
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={stage.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4, transition: { duration: 0.12 } }}
            className="grid gap-px bg-line md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]"
          >
            <div className="bg-surface p-5 sm:p-6">
              <p className="meta text-accent">
                Stage {String(index + 1).padStart(2, "0")} / {String(COLS).padStart(2, "0")} · What happens
              </p>
              <p className="mt-2 text-xl font-semibold tracking-[-0.02em] text-fg">{stage.label}</p>
              <p className="mt-2 leading-relaxed text-fg-muted">{stage.detail}</p>
            </div>
            <div className="bg-surface p-5 sm:p-6">
              <p className="meta text-fg-subtle">Record written</p>
              <p className="mt-3 flex items-start gap-2 font-mono text-[0.8125rem] leading-snug text-ok">
                <Check size={14} aria-hidden="true" className="mt-0.5 shrink-0" />
                {stage.record}
              </p>
              <p className="meta mt-4 text-fg-subtle">Audit log · timestamped</p>
            </div>
            <div className="bg-surface p-5 sm:p-6">
              <p className="meta text-fg-subtle">Systems</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {stage.systems.map((sys) => (
                  <li key={sys} className="border border-line-strong px-2 py-1 text-[0.8125rem] text-fg">
                    {sys}
                  </li>
                ))}
              </ul>
            </div>
          </m.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3">
        <button
          type="button"
          onClick={run}
          className="meta inline-flex h-9 items-center gap-2 border border-line-strong px-3 text-fg transition-colors hover:border-accent"
        >
          {playing ? <Pause size={13} aria-hidden="true" /> : <Play size={13} aria-hidden="true" />}
          {playing ? "Pause" : "Run workflow"}
        </button>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setActive(ids[(index - 1 + COLS) % COLS]);
            }}
            aria-label="Previous stage"
            className="grid size-9 place-items-center border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
          >
            <ArrowLeft size={15} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setActive(ids[(index + 1) % COLS]);
            }}
            aria-label="Next stage"
            className="grid size-9 place-items-center border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
          >
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
