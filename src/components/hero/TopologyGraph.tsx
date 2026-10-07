"use client";

import { Users } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { topologyEdges, topologyLayers, topologyNodes } from "@/content/topology";
import type { TopologyNode } from "@/content/types";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { Frame } from "@/components/ui/Frame";

/* Geometry: x comes from the content (0–100), y from the layer. */
const HEIGHT = 492;
const TOP = 48;
const STEP = 80;
const PULSES = 3;
// One fixed duration: changing it mid-animation would make a pulse jump.
const DURATION = 6.4;

const layerIndex = new Map(topologyLayers.map((l, i) => [l.id, i]));
const nodeById = new Map(topologyNodes.map((n) => [n.id, n]));
const yOf = (n: TopologyNode) => TOP + (layerIndex.get(n.layer) ?? 0) * STEP;

const children = new Map<string, string[]>();
for (const [a, b] of topologyEdges) children.set(a, [...(children.get(a) ?? []), b]);

/** Keyboard order: layer by layer, left to right. */
const flatOrder = topologyLayers.flatMap((l) =>
  topologyNodes.filter((n) => n.layer === l.id).sort((a, b) => a.x - b.x),
);

/**
 * Orthogonal route between two nodes: down to the bus halfway between their
 * layers, across, and down again, with rounded elbows. `sx` maps 0–100 to
 * the drawing's x units.
 */
function route(a: TopologyNode, b: TopologyNode, sx: number, r: number) {
  const ax = a.x * sx;
  const bx = b.x * sx;
  const ay = yOf(a);
  const by = yOf(b);
  const bus = ay + (by - ay) / 2;
  if (Math.abs(ax - bx) < 0.5) return `M ${ax} ${ay} V ${by}`;
  const dir = bx > ax ? 1 : -1;
  const rr = Math.min(r, Math.abs(bx - ax) / 2);
  return `M ${ax} ${ay} V ${bus - rr} Q ${ax} ${bus} ${ax + dir * rr} ${bus} H ${bx - dir * rr} Q ${bx} ${bus} ${bx} ${bus + rr} V ${by}`;
}

/** A random top-to-bottom journey through the graph (only called from effects and events). */
function randomJourney() {
  const path = ["people"];
  let current = "people";
  while (children.get(current)?.length) {
    const next = children.get(current)!;
    current = next[Math.floor(Math.random() * next.length)];
    path.push(current);
  }
  return path;
}

/**
 * Hero visualization: six layers between a person and their work, linked by
 * orthogonal "bus" routes. Pulses travel illustrative sign-in journeys; hover,
 * focus or tap a node to brighten it, trace its links and read what it does.
 */
export function TopologyGraph() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef(new Map<string, HTMLButtonElement>());
  const [width, setWidth] = useState(0);
  const [journeys, setJourneys] = useState<string[][]>([]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const [focusId, setFocusId] = useState(flatOrder[0].id);
  const [visible, setVisible] = useState(true);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
      setJourneys((j) => (j.length ? j : Array.from({ length: PULSES }, randomJourney)));
    });
    ro.observe(el);
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const activeId = hovered ?? pinned;
  const related = useMemo(() => {
    if (!activeId) return null;
    const set = new Set([activeId]);
    for (const [a, b] of topologyEdges) {
      if (a === activeId) set.add(b);
      if (b === activeId) set.add(a);
    }
    return set;
  }, [activeId]);

  const edgePaths = useMemo(
    () =>
      topologyEdges.map(([a, b]) => ({
        key: `${a}-${b}`,
        from: a,
        to: b,
        d: route(nodeById.get(a)!, nodeById.get(b)!, 10, 9),
      })),
    [],
  );

  const pulsePaths = useMemo(() => {
    if (!width) return [];
    return journeys.map((ids) => {
      const d = ids
        .slice(1)
        .map((id, i) => route(nodeById.get(ids[i])!, nodeById.get(id)!, width / 100, 8))
        .map((seg, i) => (i === 0 ? seg : seg.replace(/^M [\d.]+ [\d.]+ /, "")))
        .join(" ");
      return d;
    });
  }, [journeys, width]);

  function reroute(index: number) {
    setJourneys((j) => j.map((ids, i) => (i === index ? randomJourney() : ids)));
  }

  function moveFocus(id: string) {
    setFocusId(id);
    nodeRefs.current.get(id)?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const current = nodeById.get(focusId);
    if (!current) return;
    const i = flatOrder.findIndex((n) => n.id === focusId);
    let target: TopologyNode | undefined;
    if (e.key === "ArrowRight") target = flatOrder[(i + 1) % flatOrder.length];
    else if (e.key === "ArrowLeft") target = flatOrder[(i - 1 + flatOrder.length) % flatOrder.length];
    else if (e.key === "Home") target = flatOrder[0];
    else if (e.key === "End") target = flatOrder[flatOrder.length - 1];
    else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      const layer = topologyLayers[(layerIndex.get(current.layer) ?? 0) + (e.key === "ArrowDown" ? 1 : -1)];
      if (layer) {
        target = topologyNodes
          .filter((n) => n.layer === layer.id)
          .reduce((best, n) => (Math.abs(n.x - current.x) < Math.abs(best.x - current.x) ? n : best));
      }
    } else if (e.key === "Escape") {
      setPinned(null);
      return;
    }
    if (target) {
      e.preventDefault();
      moveFocus(target.id);
    }
  }

  const detail = activeId ? nodeById.get(activeId) : null;
  const detailLayer = detail ? (layerIndex.get(detail.layer) ?? 0) : 0;

  return (
    <Frame
      label="FIG. 01 — Access topology"
      meta={`${topologyLayers.length} layers · ${topologyNodes.length} nodes · ${topologyEdges.length} links`}
      footer={
        <>
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-cyan shadow-[0_0_8px_var(--cyan)]" />
            Pulses illustrate sign-in traffic
          </span>
          <span>Hover, tap or tab to inspect</span>
        </>
      }
    >
      <div
        ref={canvasRef}
        role="group"
        aria-label="Access topology: how a person reaches their work, layer by layer. Use arrow keys to move between systems."
        onKeyDown={onKeyDown}
        onClick={(e) => {
          if (e.target === e.currentTarget) setPinned(null);
        }}
        data-active={activeId ? "" : undefined}
        data-paused={visible ? undefined : ""}
        className="spotlight relative mx-4 my-2 overflow-hidden select-none sm:mx-6"
        style={{ height: HEIGHT }}
      >
        <div aria-hidden="true" className="diagram-grid depth-layer pointer-events-none absolute -inset-3 opacity-70" />

        {/* Links: drawn in a 1000-wide space so they render on the server too. */}
        <svg
          aria-hidden="true"
          className="animate-unclip pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          viewBox={`0 0 1000 ${HEIGHT}`}
          preserveAspectRatio="none"
          style={{ ["--d" as string]: "250ms" }}
        >
          {edgePaths.map((e) => (
            <path
              key={e.key}
              d={e.d}
              className="topo-edge"
              data-lit={activeId && (e.from === activeId || e.to === activeId) ? "" : undefined}
            />
          ))}
        </svg>

        {!reduced ? (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            {pulsePaths.map((d, i) => (
              <span
                key={i}
                className="pulse"
                style={{
                  offsetPath: `path("${d}")`,
                  ["--dur" as string]: `${DURATION}s`,
                  ["--delay" as string]: `${1.6 + (i * DURATION) / PULSES}s`,
                }}
                onAnimationIteration={() => reroute(i)}
              />
            ))}
          </div>
        ) : null}

        {topologyLayers.map((layer, li) => (
          <p
            key={layer.id}
            aria-hidden="true"
            className="meta pointer-events-none absolute left-0 z-10 bg-surface pr-1.5 text-[0.625rem] leading-3 text-fg-subtle"
            style={{ top: TOP + li * STEP - 39 }}
          >
            <span className="text-accent">L{li}</span> · {layer.label}
          </p>
        ))}

        {flatOrder.map((node) => {
          const state = !related ? "idle" : node.id === activeId ? "active" : related.has(node.id) ? "related" : "dim";
          const layerLabel = topologyLayers.find((l) => l.id === node.layer)?.label;
          return (
            <button
              key={node.id}
              ref={(el) => {
                if (el) nodeRefs.current.set(node.id, el);
                else nodeRefs.current.delete(node.id);
              }}
              type="button"
              tabIndex={focusId === node.id ? 0 : -1}
              aria-pressed={pinned === node.id}
              aria-describedby={`topo-d-${node.id}`}
              data-state={state}
              onPointerEnter={() => setHovered(node.id)}
              onPointerLeave={() => setHovered(null)}
              onFocus={() => {
                setFocusId(node.id);
                setHovered(node.id);
              }}
              onBlur={() => setHovered(null)}
              onClick={() => setPinned((p) => (p === node.id ? null : node.id))}
              className={cn(
                "group absolute z-20 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-[3px] border bg-surface px-2.5 py-1.5 text-left whitespace-nowrap transition-[opacity,border-color,box-shadow] duration-200",
                "border-line-strong hover:border-fg-subtle",
                "data-[state=active]:border-accent data-[state=active]:shadow-[0_0_0_3px_var(--accent-soft),0_0_24px_-6px_var(--accent)]",
                "data-[state=dim]:opacity-40",
              )}
              style={{ left: `${node.x}%`, top: yOf(node) }}
            >
              {node.layer === "user" ? (
                <Users size={14} aria-hidden="true" className="text-accent" />
              ) : (
                <span
                  aria-hidden="true"
                  className="grid size-2.5 shrink-0 place-items-center border border-fg-subtle text-fg-subtle transition-colors group-data-[state=active]:border-accent group-data-[state=related]:border-accent/70"
                >
                  <span className="size-1 bg-current group-data-[state=active]:bg-accent" />
                </span>
              )}
              <span className="flex flex-col">
                <span className="text-[0.78rem] leading-none font-medium text-fg">{node.label}</span>
                <span className="meta mt-1 text-[0.5625rem] leading-none text-fg-subtle">{node.role}</span>
              </span>
              <span id={`topo-d-${node.id}`} hidden>
                {layerLabel} layer. {node.description}
              </span>
            </button>
          );
        })}

        {/* Inspector: the empty corner beside the user node, so it never covers a link. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1 right-0 z-30 w-[min(15.5rem,40%)] border-l border-line pl-3"
        >
          {detail ? (
            <>
              <p className="meta text-accent">
                L{detailLayer} · {topologyLayers[detailLayer]?.label}
              </p>
              <p className="eyebrow mt-1.5 text-fg">
                {detail.label} <span className="text-fg-subtle">· {detail.role}</span>
              </p>
              <p className="mt-1.5 text-[0.8125rem] leading-snug text-fg-muted">{detail.description}</p>
            </>
          ) : (
            <>
              <p className="meta text-fg-subtle">Inspector</p>
              <p className="mt-1.5 text-[0.8125rem] leading-snug text-fg-subtle">Hover or select a node to trace its connections.</p>
            </>
          )}
        </div>
      </div>
    </Frame>
  );
}
