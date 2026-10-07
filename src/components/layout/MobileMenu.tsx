"use client";

import { ArrowUpRight, Download, Menu, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, type MouseEvent } from "react";
import { navItems } from "@/content/navigation";
import { site } from "@/content/site";
import { socialLinks } from "@/content/socialLinks";
import type { SectionId } from "@/content/types";
import { cn } from "@/lib/cn";
import { openPalette } from "@/lib/palette";
import { afterDialogClose, scrollToSection } from "@/lib/scroll";
import { ThemeToggle } from "./ThemeToggle";

type Props = {
  hrefFor: (id: SectionId) => string;
  onHome: boolean;
  activeSection: SectionId | null;
};

/** Full-screen mobile navigation built on <dialog>: focus trap, Esc and inert page for free. */
export function MobileMenu({ hrefFor, onHome, activeSection }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const close = () => dialogRef.current?.close();

  function onNavigate(e: MouseEvent<HTMLAnchorElement>, id: SectionId) {
    e.preventDefault();
    close();
    // The page is scroll-locked while the dialog is open; scroll once it has closed.
    if (onHome) afterDialogClose(() => scrollToSection(id));
    else router.push(`/#${id}`);
  }

  return (
    <>
      <button
        type="button"
        className="inline-flex size-9 items-center justify-center rounded-[3px] text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg lg:hidden"
        aria-label="Open menu"
        aria-haspopup="dialog"
        onClick={() => {
          dialogRef.current?.showModal();
          closeRef.current?.focus();
        }}
      >
        <Menu size={19} aria-hidden="true" />
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Site menu"
        className="ui-dialog ui-sheet m-0 h-dvh max-h-none w-full max-w-none bg-bg p-0 text-fg lg:hidden"
      >
        <div className="flex h-full flex-col">
          <div className="container-page flex h-16 shrink-0 items-center justify-between border-b border-line">
            <span className="text-[0.9375rem] font-semibold">Ray Alipio</span>
            <div className="flex items-center gap-1.5">
              <ThemeToggle />
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close menu"
                className="inline-flex size-9 items-center justify-center rounded-lg text-fg-muted hover:bg-surface-2 hover:text-fg"
              >
                <X size={19} aria-hidden="true" />
              </button>
            </div>
          </div>

          <nav aria-label="Mobile" className="container-page flex-1 overflow-y-auto py-6">
            <ol className="divide-y divide-line border-y border-line">
              {navItems.map((item, i) => (
                <li key={item.section} className="mobile-menu-item" style={{ ["--i" as string]: i }}>
                  <a
                    href={hrefFor(item.section)}
                    onClick={(e) => onNavigate(e, item.section)}
                    aria-current={activeSection === item.section ? "location" : undefined}
                    className={cn(
                      "flex items-baseline gap-4 py-4 text-[1.75rem] font-semibold tracking-[-0.03em]",
                      activeSection === item.section ? "text-fg" : "text-fg-muted",
                    )}
                  >
                    <span className="font-mono text-xs font-normal tracking-normal text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>

            <div className="mt-8 grid gap-3">
              <a
                href={site.resume.pdf}
                download={site.resume.filename}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-accent font-medium text-accent-fg"
              >
                <Download size={17} aria-hidden="true" /> Download Resume
              </a>
              <button
                type="button"
                onClick={() => {
                  close();
                  afterDialogClose(openPalette);
                }}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-line-strong text-fg-muted"
              >
                <Search size={16} aria-hidden="true" /> Search commands
              </button>
            </div>
          </nav>

          <div className="container-page flex shrink-0 flex-wrap gap-x-6 gap-y-2 border-t border-line py-5 text-sm">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                {...(link.id === "email" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                className="inline-flex items-center gap-1 text-fg-muted hover:text-fg"
              >
                {link.label}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
}
