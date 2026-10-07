import { Check } from "lucide-react";
import type { CSSProperties } from "react";
import type { Project } from "@/content/types";
import { Frame } from "@/components/ui/Frame";
import { ProductScreens } from "./ProductScreens";
import { LifecycleWorkflow } from "./LifecycleWorkflow";

const d = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

/** The flagship case study: problem, contribution and result first, then the product and its workflow. */
export function FeaturedProject({ project }: { project: Project }) {
  const featured = project.featured!;
  return (
    <article aria-labelledby={`project-${project.id}-title`}>
      <div className="meta flex flex-wrap items-center gap-x-3 gap-y-2 text-fg-subtle" data-reveal="wipe">
        <span className="text-accent">Project 01</span>
        <span aria-hidden="true">·</span>
        <span>Featured case study</span>
        <span aria-hidden="true" className="hidden h-px flex-1 bg-line sm:block" />
        <span className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="border border-accent/40 px-1.5 py-0.5 text-accent">
              {t}
            </span>
          ))}
        </span>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-12 lg:items-end">
        <h3
          id={`project-${project.id}-title`}
          className="display text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] text-fg lg:col-span-7"
          data-reveal
        >
          {project.title}
        </h3>
        <p className="text-lg leading-relaxed text-pretty text-fg-muted lg:col-span-5 lg:pb-1" data-reveal style={d(80)}>
          {project.summary}
        </p>
      </div>

      {/* Problem → contribution → result, before anything else. */}
      <dl className="mt-8 grid border-y border-line md:grid-cols-3 md:divide-x md:divide-line">
        <div className="py-6 md:pr-7" data-reveal style={d(0)}>
          <dt className="meta text-fg-subtle">
            <span className="text-accent">01</span> Problem
          </dt>
          <dd className="mt-2.5">
            <p className="text-lg leading-snug font-medium tracking-[-0.015em] text-fg">{featured.problem}</p>
            <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-fg-muted">{project.problem}</p>
          </dd>
        </div>
        <div className="border-t border-line py-6 md:border-t-0 md:px-7" data-reveal style={d(90)}>
          <dt className="meta text-fg-subtle">
            <span className="text-accent">02</span> My contribution
          </dt>
          <dd className="mt-2.5">
            <p className="text-lg leading-snug font-medium tracking-[-0.015em] text-fg">Designed and built {featured.solution.replace(/^A /, "a ")}</p>
            <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-fg-muted">{project.approach}</p>
          </dd>
        </div>
        <div className="border-t border-line py-6 md:border-t-0 md:pl-7" data-reveal style={d(180)}>
          <dt className="meta text-ok">
            <span>03</span> Result
          </dt>
          <dd className="mt-2.5">
            <p className="text-lg leading-snug font-medium tracking-[-0.015em] text-fg">{project.outcome}</p>
          </dd>
        </div>
      </dl>

      {/* Product: real screens, fictional sample data. */}
      <div className="mt-10 grid gap-8 lg:grid-cols-12" data-reveal="scale">
        <div className="min-w-0 lg:col-span-9">
          <Frame label="FIG. 03 — The product" meta="Real interface · sample data">
            <ProductScreens />
          </Frame>
        </div>
        <div className="lg:col-span-3">
          <p className="meta text-fg-subtle">Capabilities</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 lg:grid-cols-1">
            {featured.capabilities.map((c) => (
              <li key={c} className="flex items-center gap-2.5 text-[0.9375rem] text-fg">
                <span aria-hidden="true" className="grid size-4 shrink-0 place-items-center border border-accent/50 text-accent">
                  <Check size={10} strokeWidth={3} />
                </span>
                {c}
              </li>
            ))}
          </ul>
          <p className="meta mt-8 text-fg-subtle">Stack</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <li key={s} className="border border-line-strong px-2 py-1 font-mono text-xs text-fg-muted">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10" data-reveal="scale">
        <Frame label="FIG. 04 — Employee lifecycle workflow" meta="8 stages · closed loop" className="spotlight">
          <div className="relative overflow-hidden">
            <div aria-hidden="true" className="diagram-grid depth-layer pointer-events-none absolute -inset-4 opacity-50" />
            <div className="relative">
              <LifecycleWorkflow />
            </div>
          </div>
        </Frame>
      </div>

      <div className="mt-10 border-t border-line pt-8" data-reveal>
        <p className="meta text-fg-subtle">How it works</p>
        <ol className="mt-4 grid gap-x-10 gap-y-4 md:grid-cols-2">
          {project.notes?.map((n, i) => (
            <li key={n} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-2 leading-relaxed text-fg-muted">
              <span className="meta pt-1 text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
              {n}
            </li>
          ))}
        </ol>
      </div>
    </article>
  );
}
