import type { CSSProperties } from "react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { principles } from "@/content/process";

const d = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

export function About() {
  return (
    <Section id="about">
      <SectionHeader id="about" title="From the help desk to the systems behind it." meta="Since 2014" />

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <figure className="lg:col-span-5">
          <blockquote className="display text-[clamp(1.45rem,1.05rem+2vw,2.75rem)] leading-[1.08] text-fg" data-reveal="fade">
            When IT works, nobody notices it. When it breaks, nobody can do anything else.
          </blockquote>
          <figcaption className="meta mt-6 text-fg-subtle" data-reveal style={d(120)}>
            What a manufacturing help desk taught me in 2014
          </figcaption>
        </figure>

        <div className="space-y-5 text-[1.0625rem] leading-[1.75] text-pretty text-fg-muted lg:col-span-6 lg:col-start-7">
          <p data-reveal>
            I started on a manufacturing help desk, working on accounts, Windows, Office, and the production systems the
            plant ran on.
          </p>
          <p data-reveal style={d(60)}>
            From there I moved into systems engineering, installing switches and access points and looking after the
            servers, directory and devices for a site of 300+ people. Then I spent more than three years as a Level 2
            escalation engineer for US enterprise clients, where SLAs, ServiceNow queues and complex escalations made me
            methodical about diagnosis.
          </p>
          <p data-reveal style={d(120)}>
            Today I administer the platforms about 600 people depend on: identity in Entra ID and Okta, Macs in Jamf Pro,
            Windows in Intune and Autopilot, and the SaaS stack on top. I still take the hard tickets. I also build the
            processes, documentation and internal tooling that keep them from coming back.
          </p>
        </div>
      </div>

      <div className="mt-24 grid gap-10 border-t border-line pt-10 sm:mt-28 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="meta flex items-center gap-3 text-fg-subtle" data-reveal="wipe">
            <span className="crosshair" aria-hidden="true" />
            How I work
          </p>
          <h3 className="display mt-6 text-[clamp(1.75rem,1.3rem+1.4vw,2.4rem)] text-fg lg:sticky lg:top-28" data-reveal>
            Operating principles
          </h3>
        </div>
        <ol className="lg:col-span-8">
          {principles.map((p, i) => (
            <li
              key={p.title}
              className="group grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 border-b border-line py-6 first:pt-0 sm:grid-cols-[3rem_minmax(0,14rem)_minmax(0,1fr)] sm:gap-x-8"
              data-reveal="left"
              style={d(i * 60)}
            >
              <span className="meta pt-1.5 text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h4 className="text-lg font-semibold tracking-[-0.015em] text-fg transition-transform duration-300 ease-out-soft group-hover:translate-x-1">
                {p.title}
              </h4>
              <p className="col-start-2 mt-1.5 leading-relaxed text-fg-muted sm:col-start-auto sm:mt-0">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
