import { ArrowUpRight, Download, FileText } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import { CopyEmail } from "@/components/contact/CopyEmail";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { Magnetic } from "@/components/ui/Magnetic";
import { sectionIndex } from "@/content/navigation";
import { site } from "@/content/site";
import { contactEmail, getSocial } from "@/content/socialLinks";

const headline = ["Let's", "keep", "your", "systems", "moving."];

export function Contact() {
  const linkedin = getSocial("linkedin");
  const github = getSocial("github");
  const entry = sectionIndex.find((s) => s.id === "contact")!;

  const profiles: { label: string; detail: string; href: string; icon: ReactNode }[] = [
    ...(linkedin ? [{ label: "LinkedIn", detail: linkedin.handle, href: linkedin.href, icon: <LinkedInIcon size={16} /> }] : []),
    ...(github ? [{ label: "GitHub", detail: github.handle, href: github.href, icon: <GitHubIcon size={16} /> }] : []),
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative scroll-mt-[-1rem] overflow-hidden pt-20 pb-20 sm:pt-24 lg:scroll-mt-[-2rem] lg:pt-28 lg:pb-28">
      <div aria-hidden="true" className="hero-glow pointer-events-none absolute -bottom-72 left-1/2 h-[46rem] w-[60rem] max-w-none -translate-x-1/2" />
      <div className="container-page relative">
        <div className="meta flex items-center gap-3 text-fg-subtle" data-reveal="wipe">
          <span className="crosshair" aria-hidden="true" />
          <span className="text-accent">{entry.code}</span>
          <span aria-hidden="true">/</span>
          <span>{entry.label}</span>
          <span aria-hidden="true" className="h-px flex-1 bg-line" />
          <span className="hidden sm:inline">Open to IT operations, endpoint and identity roles</span>
          <span className="crosshair" aria-hidden="true" />
        </div>

        <h2 id="contact-title" className="display mt-8 max-w-[14ch] text-[clamp(2.6rem,1.6rem+4vw,5.5rem)] leading-[0.95] text-fg outline-none">
          {headline.map((word, i) => (
            <span key={word}>
              <span
                className="inline-block overflow-hidden pb-[0.08em] align-bottom"
                data-reveal="rise"
                style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
              >
                <span className={i === headline.length - 1 ? "inline-block text-accent" : "inline-block"}>{word}</span>
              </span>
              {i < headline.length - 1 ? " " : null}
            </span>
          ))}
        </h2>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5" data-reveal="left">
            <p className="meta text-fg-subtle">Email · fastest way to reach me</p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a
                  href={`mailto:${contactEmail}`}
                  className="group/mail inline-flex items-center gap-2 text-[clamp(1.2rem,1rem+0.9vw,1.6rem)] font-medium tracking-[-0.02em] break-all text-fg decoration-accent underline-offset-[6px] hover:underline"
                >
                  {contactEmail}
                  <ArrowUpRight
                    size={20}
                    aria-hidden="true"
                    className="shrink-0 text-accent transition-transform duration-200 group-hover/mail:translate-x-0.5 group-hover/mail:-translate-y-0.5"
                  />
                </a>
              </Magnetic>
              <CopyEmail />
            </div>

            <ul className="mt-10 border-t border-line">
              {profiles.map((p) => (
                <li key={p.label} className="border-b border-line">
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="group/row flex items-center gap-4 py-4">
                    <span className="grid size-9 place-items-center border border-line-strong text-fg-muted transition-colors group-hover/row:border-accent group-hover/row:text-accent">
                      {p.icon}
                    </span>
                    <span className="flex-1">
                      <span className="block font-medium text-fg">{p.label}</span>
                      <span className="meta block text-fg-subtle">{p.detail}</span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      aria-hidden="true"
                      className="text-fg-subtle transition-[color,transform] duration-200 group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 group-hover/row:text-fg"
                    />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Résumé */}
            <div id="resume" className="frame mt-10 p-5">
              <p className="meta text-fg-subtle">Resume · 2 pages</p>
              <p className="mt-2 text-lg font-medium tracking-[-0.01em] text-fg">The short version, ready for an ATS or a printer.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={site.resume.pdf}
                  download={site.resume.filename}
                  className="inline-flex h-10 items-center gap-2 bg-accent px-4 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-strong"
                >
                  <Download size={15} aria-hidden="true" /> Download PDF
                </a>
                <Link
                  href={site.resume.html}
                  className="inline-flex h-10 items-center gap-2 border border-line-strong px-4 text-sm font-medium text-fg transition-colors hover:border-fg-subtle"
                >
                  <FileText size={15} aria-hidden="true" /> View as web page
                </Link>
              </div>
            </div>

            <p className="meta mt-8 text-fg-subtle">
              {site.location} · {site.availability}
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7" data-reveal="right">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
