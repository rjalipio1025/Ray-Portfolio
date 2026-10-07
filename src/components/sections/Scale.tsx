import type { CSSProperties, ReactNode } from "react";
import { CountUp } from "@/components/ui/CountUp";
import { Section, SectionHeader } from "@/components/ui/Section";
import { experience } from "@/content/experience";
import { site } from "@/content/site";
import { adminPlatforms, platformsSupported, statistics } from "@/content/statistics";

const stat = (id: string) => statistics.find((s) => s.id === id)!;
const d = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

/** The platforms supported, by how they're managed. No device counts: those describe one client, not a career. */
function PlatformCoverage() {
  return (
    <div className="mt-9" data-reveal="wipe" style={d(120)}>
      <p className="meta text-fg-subtle">
        <span className="text-accent">▸</span> Platforms supported
      </p>
      <ul className="mt-3 border-t border-line">
        {platformsSupported.map((p) => (
          <li key={p.os} className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-x-4 gap-y-1 border-b border-line py-3 sm:grid-cols-[8.5rem_minmax(0,1fr)_auto]">
            <span className="font-medium text-fg">{p.os}</span>
            <span className="text-sm text-fg-muted">{p.how}</span>
            <span className="meta col-start-2 text-fg-subtle sm:col-start-auto sm:text-right">{p.since}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatRow({ id, visual, delay = 0 }: { id: string; visual: ReactNode; delay?: number }) {
  const s = stat(id);
  return (
    <div className="py-7 lg:pl-10" data-reveal="right" style={d(delay)}>
      <p className="meta text-fg-subtle">
        <span className="text-accent">▸</span> {s.meta}
      </p>
      <div className="mt-3 flex items-end gap-5">
        <p className="display tabular text-[clamp(2.75rem,2.2rem+1.8vw,3.75rem)] leading-[0.85] text-fg">
          <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
        </p>
        <div className="pb-0.5">
          <p className="font-medium text-fg">{s.label}</p>
          <p className="mt-0.5 max-w-[32ch] text-sm leading-snug text-fg-muted">{s.detail}</p>
        </div>
      </div>
      {visual ? <div className="mt-5">{visual}</div> : null}
    </div>
  );
}

/** 2014 → today, with a mark where each role began. */
function CareerTicks() {
  const start = Number(site.careerStart.slice(0, 4));
  const now = new Date().getFullYear();
  const marks = new Set([2014, 2018, 2021, 2025]);
  const years = Array.from({ length: now - start + 1 }, (_, i) => start + i);
  return (
    <div aria-hidden="true">
      <div className="flex items-end justify-between">
        {years.map((y) => (
          <span key={y} className={marks.has(y) ? "h-4 w-px bg-accent" : "h-2 w-px bg-line-strong"} />
        ))}
      </div>
      <div className="meta mt-2 flex justify-between text-fg-subtle">
        <span>{start}</span>
        <span>Role changes ▴</span>
        <span>Now</span>
      </div>
    </div>
  );
}

function PlatformList() {
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5 sm:grid-cols-3 lg:grid-cols-2" aria-label="Platforms administered">
      {adminPlatforms.map((p, i) => (
        <li key={p} className="flex items-baseline gap-2.5 text-sm text-fg-muted">
          <span className="meta text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
          {p}
        </li>
      ))}
    </ul>
  );
}

/** The four roles, oldest first. */
function RolePath() {
  const path = [...experience].reverse();
  return (
    <ol className="grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-4 lg:grid-cols-2" aria-label="Roles">
      {path.map((r) => (
        <li key={r.id} className="text-sm leading-snug">
          <span className="meta block text-accent">{r.start.slice(0, 4)}</span>
          <span className="text-fg">{r.company}</span>
        </li>
      ))}
    </ol>
  );
}

export function Scale() {
  const years = stat("years");
  return (
    <Section id="scale">
      <SectionHeader
        id="scale"
        title="Twelve years, at a glance."
        intro="Four enterprise roles, the platforms I administer and the operating systems I support. Windows has been part of every role since 2014."
        meta="Since 2014"
      />

      <div className="grid border-t border-line lg:grid-cols-12">
        <div className="pt-8 pb-10 lg:col-span-7 lg:border-r lg:border-line lg:pr-12" data-reveal="fade">
          <p className="meta text-fg-subtle">
            <span className="text-accent">▸</span> {years.meta}
          </p>
          <div className="mt-4 flex flex-wrap items-end gap-x-6 gap-y-3">
            <p className="display tabular text-[clamp(4.25rem,2.8rem+5vw,7.5rem)] leading-[0.82] text-fg">
              <CountUp value={years.value} suffix={years.suffix} duration={1400} />
            </p>
            <div className="pb-1">
              <p className="text-xl font-medium tracking-[-0.01em] text-fg">{years.label}</p>
              <p className="mt-1 max-w-[36ch] text-fg-muted">{years.detail}</p>
            </div>
          </div>
          <div className="mt-7">
            <CareerTicks />
          </div>
          <PlatformCoverage />
        </div>

        <div className="divide-y divide-line border-t border-line lg:col-span-5 lg:border-t-0">
          <StatRow id="roles" visual={<RolePath />} />
          <StatRow id="platforms" visual={<PlatformList />} delay={100} />
        </div>
      </div>
    </Section>
  );
}
