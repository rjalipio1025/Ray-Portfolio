import type { CSSProperties } from "react";
import { IncidentLog } from "@/components/cases/IncidentLog";
import { Section, SectionHeader } from "@/components/ui/Section";
import { caseStudies } from "@/content/caseStudies";
import { processSteps, troubleshootingPrinciple } from "@/content/process";

export function Cases() {
  return (
    <Section id="cases" raised>
      <SectionHeader
        id="cases"
        title="How I solve problems"
        intro="Incident write-ups, from symptom to root cause. Company names, devices and people are left out on purpose."
        meta={`${caseStudies.length} incidents · all resolved`}
      />

      <IncidentLog />

      {/* Method */}
      <div className="mt-16 sm:mt-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <p className="meta flex items-center gap-3 text-fg-subtle" data-reveal="wipe">
              <span className="crosshair" aria-hidden="true" />
              Method · same order, every incident
            </p>
            <h3 className="display mt-6 text-[clamp(1.85rem,1.3rem+1.8vw,2.75rem)] text-fg" data-reveal>
              Seven steps from triage to prevention.
            </h3>
          </div>
          <blockquote
            className="border-l border-accent pl-6 text-[clamp(1.15rem,1rem+0.5vw,1.4rem)] leading-snug font-medium tracking-[-0.015em] text-balance text-fg-muted lg:col-span-6 lg:col-start-7"
            data-reveal="right"
          >
            “{troubleshootingPrinciple}”
          </blockquote>
        </div>

        <ol className="relative mt-14 grid gap-0 lg:grid-cols-7 lg:gap-0">
          <span
            aria-hidden="true"
            className="absolute top-3 bottom-3 left-[0.6875rem] w-px bg-line-strong lg:top-[0.6875rem] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto"
          />
          {processSteps.map((step, i) => (
            <li
              key={step.id}
              className="group relative grid content-start grid-cols-[1.375rem_minmax(0,1fr)] gap-4 pb-7 last:pb-0 lg:grid-cols-1 lg:gap-5 lg:pr-5 lg:pb-0"
              data-reveal="left"
              style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties}
            >
              <span
                aria-hidden="true"
                className={
                  i === processSteps.length - 1
                    ? "relative z-10 grid size-[1.375rem] place-items-center border border-ok bg-bg font-mono text-[0.625rem] text-ok"
                    : "relative z-10 grid size-[1.375rem] place-items-center border border-line-strong bg-bg font-mono text-[0.625rem] text-fg-subtle transition-colors duration-200 group-hover:border-accent group-hover:text-accent"
                }
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h4 className="font-medium text-fg">{step.title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
