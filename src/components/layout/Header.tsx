"use client";

import { Search } from "lucide-react";
import { m } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems, sectionIndex } from "@/content/navigation";
import type { SectionId } from "@/content/types";
import { cn } from "@/lib/cn";
import { openPalette } from "@/lib/palette";
import { useShortcutLabel } from "@/lib/platform";
import { LogoMark } from "@/components/ui/icons";
import { SmartLink } from "@/components/ui/SmartLink";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";

const SPY_SECTIONS = sectionIndex.map((s) => s.id).filter((id) => id !== "top");

/** The section whose top has crossed 40% of the viewport. */
function currentSection(): SectionId | null {
  const line = window.innerHeight * 0.4;
  let current: SectionId | null = null;
  for (const id of SPY_SECTIONS) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= line) current = id;
  }
  return current;
}

export function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [section, setSection] = useState<SectionId | null>(null);
  const shortcut = useShortcutLabel();

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
      setSection(onHome ? currentSection() : null);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [onHome]);

  const activeNav = onHome ? navItems.find((n) => n.section === section) : undefined;
  const hrefFor = (id: SectionId) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <header
      className={cn(
        "no-print fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-line bg-bg/80 backdrop-blur-md backdrop-saturate-150"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <SmartLink
          href={onHome ? "#top" : "/"}
          className="-ml-1 flex items-center gap-2.5 rounded-md px-1 py-1 text-[0.9375rem] font-semibold tracking-[-0.01em] text-fg"
          aria-label="Ray Alipio, home"
        >
          <LogoMark />
          <span>Ray Alipio</span>
        </SmartLink>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {navItems.map((item) => {
              const active = activeNav?.section === item.section;
              return (
                <li key={item.section}>
                  <SmartLink
                    href={hrefFor(item.section)}
                    aria-current={active ? "location" : undefined}
                    className={cn(
                      "nav-link relative block px-3 py-2 text-[0.8125rem] transition-colors duration-150",
                      active ? "text-fg" : "text-fg-muted hover:text-fg",
                    )}
                  >
                    {item.label}
                    {active ? (
                      <m.span
                        layoutId="nav-active"
                        aria-hidden="true"
                        className="absolute inset-x-3 bottom-[0.3rem] h-px bg-accent"
                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                      />
                    ) : null}
                  </SmartLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={openPalette}
            className="hidden h-9 items-center gap-2 rounded-lg border border-line bg-surface/50 pr-1.5 pl-3 text-sm text-fg-subtle transition-colors duration-150 hover:border-line-strong hover:text-fg-muted sm:inline-flex"
            aria-keyshortcuts="Meta+K Control+K"
          >
            <Search size={14} aria-hidden="true" />
            <span className="lg:pr-6">
              Search<span className="sr-only"> commands</span>
            </span>
            <kbd
              aria-hidden="true"
              className="rounded border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[0.6875rem] leading-none text-fg-subtle"
            >
              {shortcut}
            </kbd>
          </button>
          <ThemeToggle />
          <MobileMenu hrefFor={hrefFor} onHome={onHome} activeSection={activeNav?.section ?? null} />
        </div>
      </div>
    </header>
  );
}
