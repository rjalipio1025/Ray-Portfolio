import { ArrowRight, Download, Mail } from "lucide-react";
import type { CSSProperties } from "react";
import { TopologyGraph } from "@/components/hero/TopologyGraph";
import { TopologyStack } from "@/components/hero/TopologyStack";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { Magnetic } from "@/components/ui/Magnetic";
import { site } from "@/content/site";
import { socialLinks } from "@/content/socialLinks";
import { statistics } from "@/content/statistics";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
const stat = (id: string) => statistics.find((s) => s.id === id)!;
const fmt = (id: string) => {
  const s = stat(id);
  return `${s.prefix ?? ""}${s.value}${s.suffix ?? ""}`;
};

const icons = {
  linkedin: <LinkedInIcon size={15} />,
  github: <GitHubIcon size={15} />,
  email: <Mail size={15} aria-hidden="true" />,
};

/** Proof points shown in the first screen. */
const proof = [
  { id: "years", value: fmt("years"), label: "Years in IT", note: "Since 2014" },
  { id: "roles", value: fmt("roles"), label: "Enterprise roles", note: "Help desk → sysadmin" },
  { id: "platforms", value: fmt("platforms"), label: "Admin platforms", note: "Identity · endpoint · SaaS" },
];

export function Hero() {
  return (
    <section id="top" aria-labelledby="top-title" className="relative overflow-hidden pt-20 pb-12 sm:pt-24 lg:pb-16">
      <div
        aria-hidden="true"
        className="hero-glow pointer-events-none absolute -top-56 right-[-14%] h-[52rem] w-[52rem] max-w-none"
      />

      <div className="container-page relative">
        <div className="meta animate-fade hidden items-center gap-3 text-fg-subtle sm:flex" style={delay(0)}>
          <span className="crosshair" aria-hidden="true" />
          <span className="text-accent">00</span>
          <span aria-hidden="true">/</span>
          <span>Introduction</span>
          <span aria-hidden="true" className="h-px flex-1 bg-line" />
          <span>Endpoint · Identity · SaaS · Operations</span>
          <span className="crosshair" aria-hidden="true" />
        </div>

        <div className="mt-6 grid items-start gap-10 sm:mt-8 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <div className="lg:col-span-5 lg:pt-4">
            <p className="eyebrow animate-rise flex items-center gap-2.5 text-accent" style={delay(60)}>
              <span aria-hidden="true" className="size-1.5 bg-accent shadow-[0_0_10px_var(--accent)]" />
              {site.title}
            </p>

            <h1
              id="top-title"
              className="display animate-settle mt-4 text-[clamp(2.6rem,1.6rem+3.6vw,4.4rem)] text-fg outline-none"
              style={delay(100)}
            >
              {site.name}
            </h1>

            <p
              className="animate-settle mt-4 max-w-[22ch] text-[clamp(1.35rem,1.1rem+0.9vw,1.85rem)] leading-[1.18] font-medium tracking-[-0.025em] text-balance text-fg-muted"
              style={delay(150)}
            >
              I keep people, devices, and access{" "}
              <span className="moving-line relative inline-block text-fg">moving.</span>
            </p>

            <p className="animate-settle mt-4 max-w-[34rem] leading-relaxed text-fg-muted" style={delay(200)}>
              {site.intro}
            </p>

            <div className="animate-rise mt-7 flex flex-wrap items-center gap-2.5" style={delay(260)}>
              <Magnetic>
                <ButtonLink href="#projects" variant="primary">
                  View projects
                  <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                </ButtonLink>
              </Magnetic>
              <ButtonLink href={site.resume.pdf} download={site.resume.filename}>
                <Download size={16} aria-hidden="true" />
                Resume
              </ButtonLink>
              <ul className="ml-1 flex items-center gap-1" aria-label="Profiles and email">
                {socialLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      {...(link.id === "email" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                      aria-label={link.id === "email" ? `Email ${link.handle}` : `${link.label} (opens in a new tab)`}
                      className="grid size-11 place-items-center rounded-[3px] text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
                    >
                      {icons[link.id]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <dl className="animate-rise mt-8 grid grid-cols-3 border-y border-line" style={delay(320)}>
              {proof.map((p, i) => (
                <div key={p.id} className={i > 0 ? "border-l border-line py-3.5 pl-3 sm:pl-4" : "py-3.5 pr-3"}>
                  <dt className="meta text-fg-subtle">{p.label}</dt>
                  <dd className="display tabular mt-1.5 text-[clamp(1.5rem,1.2rem+1vw,2.1rem)] leading-none text-fg">{p.value}</dd>
                  <dd className="meta mt-1.5 text-fg-subtle">{p.note}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="animate-fade lg:col-span-7" style={delay(180)}>
            <div className="hidden sm:block">
              <TopologyGraph />
            </div>
            <div className="sm:hidden">
              <TopologyStack />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
