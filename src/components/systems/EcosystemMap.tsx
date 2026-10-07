"use client";

import { AnimatePresence, m } from "motion/react";
import { useEffect, useState, type KeyboardEvent } from "react";
import { techCategories } from "@/content/skills";
import type { TechCategoryId, TechItem } from "@/content/types";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { onSystemsTab } from "@/lib/scroll";
import { useRovingTabs } from "@/lib/useRovingTabs";
import { Frame } from "@/components/ui/Frame";

const ids = techCategories.map((c) => c.id);
const firstItem = (id: TechCategoryId) => techCategories.find((c) => c.id === id)!.items[0].name;

const contextLabel: Record<TechItem["context"], string> = {
  current: "Current role",
  earlier: "Earlier roles",
  both: "Current and earlier roles",
};

/** Satellites sit on an ellipse around the hub, starting at 12 o'clock. */
function orbit(i: number, n: number) {
  const angle = ((-90 + (360 / n) * i) * Math.PI) / 180;
  return { x: 50 + 37 * Math.cos(angle), y: 50 + 38 * Math.sin(angle) };
}

const spring = { type: "spring", stiffness: 160, damping: 24, mass: 0.9 } as const;

export function EcosystemMap() {
  const [active, setActive] = useState<TechCategoryId>("endpoint");
  const [focus, setFocus] = useState(firstItem("endpoint"));
  const reduced = usePrefersReducedMotion();

  const select = (id: TechCategoryId) => {
    setActive(id);
    setFocus(firstItem(id));
  };
  const { register, onKeyDown } = useRovingTabs(ids, active, select);

  // The command palette can open a specific domain.
  useEffect(
    () =>
      onSystemsTab((id) => {
        setActive(id);
        setFocus(firstItem(id));
      }),
    [],
  );

  const category = techCategories.find((c) => c.id === active)!;
  const items = category.items;
  const focused = items.find((i) => i.name === focus) ?? items[0];
  const focusIndex = items.indexOf(focused);

  function onNodeKey(e: KeyboardEvent<HTMLDivElement>) {
    const delta = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = items[(focusIndex + delta + items.length) % items.length];
    setFocus(next.name);
    document.getElementById(nodeId(next.name))?.focus();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[16.5rem_minmax(0,1fr)] lg:gap-10">
      {/* Domain selector: horizontal on small screens, a vertical index on large ones. */}
      <div data-reveal="left">
        <p className="meta mb-3 text-fg-subtle">Choose a domain</p>
        <div
          role="tablist"
          aria-label="Technology domains"
          aria-orientation="vertical"
          onKeyDown={onKeyDown}
          className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-1 lg:gap-1"
        >
          {techCategories.map((c, i) => {
            const selected = c.id === active;
            return (
              <button
                key={c.id}
                ref={register(c.id)}
                type="button"
                role="tab"
                id={`eco-tab-${c.id}`}
                aria-selected={selected}
                aria-controls="eco-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => select(c.id)}
                className={cn(
                  "group relative cursor-pointer rounded-[3px] border px-3.5 py-3 text-left transition-[background-color,border-color] duration-200 lg:px-4 lg:py-4",
                  selected
                    ? "border-accent/70 bg-accent-soft"
                    : "border-line bg-surface/40 hover:border-fg-subtle hover:bg-surface",
                )}
              >
                {selected ? (
                  <m.span
                    layoutId="eco-tab-marker"
                    aria-hidden="true"
                    className="absolute inset-y-2 left-0 w-0.5 bg-accent"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                ) : null}
                <span className="flex items-baseline gap-3">
                  <span className={cn("meta", selected ? "text-accent" : "text-fg-subtle")}>D{i + 1}</span>
                  <span
                    className={cn(
                      "font-medium tracking-[-0.01em] lg:text-lg",
                      selected ? "text-fg" : "text-fg-muted group-hover:text-fg",
                    )}
                  >
                    {c.label}
                  </span>
                  <span className={cn("meta ml-auto pl-3", selected ? "text-accent" : "text-fg-subtle")}>
                    {selected ? "● " : ""}
                    {String(c.items.length).padStart(2, "0")}
                  </span>
                </span>
                <span
                  className={cn(
                    "hidden overflow-hidden text-sm leading-relaxed text-fg-muted transition-[max-height,opacity,margin] duration-500 lg:block",
                    selected ? "mt-2 max-h-32 opacity-100" : "max-h-0 opacity-0",
                  )}
                >
                  {c.summary}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div id="eco-panel" role="tabpanel" aria-labelledby={`eco-tab-${active}`} className="min-w-0" data-reveal="scale">
        <Frame
          label={`FIG. 02 — System map · ${category.label}`}
          meta={`${items.length} systems · hub-and-spoke`}
          className="spotlight"
          footer={
            <>
              <span>Select a node to inspect it</span>
              <span className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span aria-hidden="true" className="size-1.5 bg-accent" /> Current
                </span>
                <span className="flex items-center gap-1.5">
                  <span aria-hidden="true" className="size-1.5 border border-fg-subtle" /> Earlier
                </span>
              </span>
            </>
          }
        >
          <p className="px-4 pt-4 text-sm text-fg-muted md:hidden">{category.summary}</p>

          {/* Map: md and up. */}
          <div className="relative hidden aspect-[16/10] min-h-[26rem] md:block" onKeyDown={onNodeKey}>
            <div aria-hidden="true" className="diagram-grid absolute inset-0 opacity-60" />
            <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <ellipse cx="50" cy="50" rx="37" ry="38" fill="none" stroke="var(--line-strong)" strokeDasharray="2 3" vectorEffect="non-scaling-stroke" />
              <ellipse cx="50" cy="50" rx="18" ry="19" fill="none" stroke="var(--line)" vectorEffect="non-scaling-stroke" />
              <line x1="50" y1="4" x2="50" y2="96" stroke="var(--line)" vectorEffect="non-scaling-stroke" />
              <line x1="4" y1="50" x2="96" y2="50" stroke="var(--line)" vectorEffect="non-scaling-stroke" />
              <AnimatePresence initial={false}>
                {items.map((item, i) => {
                  const p = orbit(i, items.length);
                  const on = item.name === focused.name;
                  return (
                    <m.line
                      key={item.name}
                      x1={50}
                      y1={50}
                      initial={{ x2: 50, y2: 50, opacity: 0 }}
                      animate={{ x2: p.x, y2: p.y, opacity: 1 }}
                      exit={{ x2: 50, y2: 50, opacity: 0 }}
                      transition={spring}
                      stroke={on ? "var(--accent)" : "var(--line-strong)"}
                      strokeWidth={on ? 1.5 : 1}
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}
              </AnimatePresence>
            </svg>

            <span aria-hidden="true" className="meta absolute top-3 left-1/2 -translate-x-1/2 text-fg-subtle">000°</span>
            <span aria-hidden="true" className="meta absolute right-3 top-1/2 -translate-y-1/2 text-fg-subtle">090°</span>
            <span aria-hidden="true" className="meta absolute bottom-3 left-1/2 -translate-x-1/2 text-fg-subtle">180°</span>
            <span aria-hidden="true" className="meta absolute left-3 top-1/2 -translate-y-1/2 text-fg-subtle">270°</span>

            {/* Data moving from the hub to the focused system. */}
            {!reduced ? (
              <m.span
                key={`${active}-${focused.name}`}
                aria-hidden="true"
                className="absolute z-10 size-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_10px_2px_var(--accent-soft)]"
                initial={{ left: "50%", top: "50%", opacity: 0 }}
                animate={{
                  left: ["50%", `${orbit(focusIndex, items.length).x}%`],
                  top: ["50%", `${orbit(focusIndex, items.length).y}%`],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5, ease: "easeInOut", delay: 0.6 }}
              />
            ) : null}

            {/* Hub */}
            <div className="absolute top-1/2 left-1/2 z-10 grid size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-surface text-center shadow-[0_0_0_8px_color-mix(in_oklab,var(--surface)_60%,transparent)]">
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="eyebrow text-fg">{category.label}</p>
                  <p className="meta mt-1 text-accent">{String(items.length).padStart(2, "0")} systems</p>
                </m.div>
              </AnimatePresence>
            </div>

            <AnimatePresence initial={false}>
              {items.map((item, i) => {
                const p = orbit(i, items.length);
                const on = item.name === focused.name;
                return (
                  <m.button
                    key={item.name}
                    id={nodeId(item.name)}
                    type="button"
                    aria-pressed={on}
                    tabIndex={on ? 0 : -1}
                    onClick={() => setFocus(item.name)}
                    onPointerEnter={() => setFocus(item.name)}
                    onFocus={() => setFocus(item.name)}
                    initial={{ left: "50%", top: "50%", opacity: 0, scale: 0.6 }}
                    animate={{ left: `${p.x}%`, top: `${p.y}%`, opacity: 1, scale: 1 }}
                    exit={{ left: "50%", top: "50%", opacity: 0, scale: 0.6 }}
                    transition={{ ...spring, delay: i * 0.025 }}
                    className={cn(
                      "absolute z-20 flex min-h-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center gap-2 rounded-[3px] border px-3 py-2 text-left whitespace-nowrap transition-[border-color,box-shadow,background-color] duration-200",
                      on
                        ? "border-accent bg-[color-mix(in_oklab,var(--accent)_14%,var(--surface))] shadow-[0_0_0_3px_var(--accent-soft),0_0_24px_-6px_var(--accent)]"
                        : "border-line-strong bg-surface hover:border-accent/60 hover:bg-surface-2",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "size-2 shrink-0",
                        item.context === "earlier" ? "border border-fg-subtle" : "bg-accent",
                        on && item.context === "earlier" && "border-accent",
                      )}
                    />
                    <span className="flex flex-col">
                      <span className="text-[0.8125rem] leading-none font-medium text-fg">{item.name}</span>
                      <span className="meta mt-1 text-[0.5625rem] leading-none text-fg-subtle">{item.role}</span>
                    </span>
                  </m.button>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Stacked, connected list: below md. */}
          <ol className="divide-y divide-line px-3 py-2 md:hidden">
            {items.map((item) => {
              const on = item.name === focused.name;
              return (
                <li key={`${active}-${item.name}`} className={cn("relative", on && "bg-accent-soft")}>
                  {on ? <span aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 bg-accent" /> : null}
                  <button
                    type="button"
                    aria-expanded={on}
                    onClick={() => setFocus(item.name)}
                    className="flex min-h-11 w-full items-center gap-3 px-3 py-2 text-left"
                  >
                    <span
                      aria-hidden="true"
                      className={cn("size-2 shrink-0", item.context === "earlier" ? "border border-fg-subtle" : "bg-accent")}
                    />
                    <span className={cn("flex-1 font-medium", on ? "text-fg" : "text-fg-muted")}>{item.name}</span>
                    <span className="meta text-right text-fg-subtle">{item.role}</span>
                  </button>
                  {on ? <p className="px-3 pb-3 pl-8 text-sm leading-relaxed text-fg-muted">{item.description}</p> : null}
                </li>
              );
            })}
          </ol>

          {/* Inspector */}
          <div className="hidden min-h-[7.5rem] border-t border-line px-5 py-4 md:block" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={`${active}-${focused.name}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4, transition: { duration: 0.1 } }}
                className="grid gap-x-8 gap-y-3 md:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] xl:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_auto]"
              >
                <div>
                  <p className="text-lg font-semibold tracking-[-0.02em] text-fg">{focused.name}</p>
                  <p className="meta mt-1 text-accent">{focused.role}</p>
                </div>
                <p className="leading-relaxed text-fg-muted">{focused.description}</p>
                <p className="meta self-start justify-self-start border border-line px-2 py-1 text-fg-subtle md:col-start-2 xl:col-start-auto">{contextLabel[focused.context]}</p>
              </m.div>
            </AnimatePresence>
          </div>
        </Frame>
      </div>
    </div>
  );
}

function nodeId(name: string) {
  return `eco-node-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}
