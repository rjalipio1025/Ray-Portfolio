import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { resumeSkills, resumeSummary } from "@/content/resume";
import { site } from "@/content/site";
import { socialLinks } from "@/content/socialLinks";
import { formatRange } from "@/lib/dates";

/**
 * The résumé as a printable document. Always light "paper", in both themes,
 * so the screen view matches the PDF that is generated from it.
 */
export function ResumeDocument() {
  const host = site.url.replace(/^https?:\/\//, "");
  return (
    <article
      aria-labelledby="resume-name"
      className="resume-paper mx-auto w-full max-w-[8.5in] bg-white px-6 py-8 text-[13px] leading-[1.5] text-[#1d2433] shadow-[0_1px_0_rgb(0_0_0/0.04),0_30px_80px_-30px_rgb(0_0_0/0.5)] sm:px-[0.6in] sm:py-[0.55in] print:max-w-none print:p-0 print:shadow-none"
    >
      <header className="border-b border-[#d9dee7] pb-4">
        <h1 id="resume-name" className="text-[26px] leading-tight font-semibold tracking-[-0.02em] text-[#0b1220]">
          {site.name}
        </h1>
        <p className="mt-0.5 text-[14px] font-medium text-[#0b5cad]">
          {site.title} · Endpoint Management · Identity & Access · IT Operations
        </p>
        <p className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5 text-[12px] text-[#4a5465]">
          <span>{site.location}</span>
          <span aria-hidden="true">·</span>
          <span>{site.availability}</span>
          {socialLinks.map((l) => (
            <span key={l.id} className="contents">
              <span aria-hidden="true">·</span>
              <a href={l.href} className="text-[#1d2433] underline decoration-[#c9d0db] underline-offset-2">
                {l.id === "github" ? `github.com/${l.handle}` : l.id === "linkedin" ? `linkedin.com/${l.handle}` : l.handle}
              </a>
            </span>
          ))}
          {site.url.startsWith("https") ? (
            <>
              <span aria-hidden="true">·</span>
              <a href={site.url} className="text-[#1d2433] underline decoration-[#c9d0db] underline-offset-2">
                {host}
              </a>
            </>
          ) : null}
        </p>
      </header>

      <section className="mt-4" aria-labelledby="r-summary">
        <h2 id="r-summary" className="resume-h2">
          Summary
        </h2>
        <p className="mt-1.5 text-[#2a3344]">{resumeSummary}</p>
      </section>

      <section className="mt-4" aria-labelledby="r-skills">
        <h2 id="r-skills" className="resume-h2">
          Core platforms
        </h2>
        <dl className="mt-1.5 grid gap-y-1 sm:grid-cols-[9.5rem_1fr] print:grid-cols-[9.5rem_1fr]">
          {resumeSkills.map((g) => (
            <div key={g.label} className="contents">
              <dt className="font-semibold text-[#0b1220]">{g.label}</dt>
              <dd className="text-[#2a3344]">{g.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-4" aria-labelledby="r-experience">
        <h2 id="r-experience" className="resume-h2">
          Experience
        </h2>
        <div className="mt-1.5 space-y-3.5">
          {experience.map((role) => (
            <div key={role.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 break-after-avoid">
                <h3 className="text-[14px] font-semibold text-[#0b1220]">
                  {role.title} <span className="font-normal text-[#4a5465]">· {role.company}</span>
                </h3>
                <p className="text-[12px] whitespace-nowrap text-[#4a5465]">{formatRange(role.start, role.end)}</p>
              </div>
              <p className="break-after-avoid text-[12px] text-[#5e6878]">{role.location}</p>
              <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[#2a3344] marker:text-[#9aa3b2]">
                {role.bullets.map((b) => (
                  <li key={b} className="break-inside-avoid">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 break-inside-avoid-page" aria-labelledby="r-projects">
        <h2 id="r-projects" className="resume-h2">
          Selected projects
        </h2>
        <ul className="mt-1.5 space-y-1 text-[#2a3344]">
          {projects.map((p) => (
            <li key={p.id}>
              <span className="font-semibold text-[#0b1220]">{p.title}.</span> {p.summary} {p.outcome}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4 break-inside-avoid-page" aria-labelledby="r-education">
        <h2 id="r-education" className="resume-h2">
          Education
        </h2>
        <p className="mt-1.5 flex flex-wrap justify-between gap-x-4 text-[#2a3344]">
          <span>
            <span className="font-semibold text-[#0b1220]">{site.education.degree}</span> · {site.education.school},{" "}
            {site.education.place}
          </span>
          <span className="text-[12px] text-[#4a5465]">{site.education.years}</span>
        </p>
      </section>
    </article>
  );
}
