"use client";

import {
  ArrowRight,
  Copy,
  CornerDownLeft,
  Download,
  ExternalLink,
  FileText,
  Hash,
  Search,
  SunMoon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { commands } from "@/content/navigation";
import type { Command, SectionId } from "@/content/types";
import { cn } from "@/lib/cn";
import { onPaletteOpen } from "@/lib/palette";
import { afterDialogClose, scrollToSection, selectSystemsTab } from "@/lib/scroll";
import { toggleTheme } from "@/lib/theme";

const GROUP_ORDER: Command["group"][] = ["Navigate", "Resume", "Actions", "Elsewhere"];

function matches(cmd: Command, tokens: string[]) {
  const haystack = `${cmd.label} ${cmd.keywords} ${cmd.group}`.toLowerCase();
  return tokens.every((t) => haystack.includes(t));
}

function iconFor(cmd: Command) {
  switch (cmd.action.type) {
    case "route":
      return FileText;
    case "download":
      return Download;
    case "external":
      return ExternalLink;
    case "copy":
      return Copy;
    case "theme":
      return SunMoon;
    default:
      return Hash;
  }
}

export function CommandPalette() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toastTimer = useRef<number | undefined>(undefined);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [toast, setToast] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const baseId = useId();

  const results = useMemo(() => {
    const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const found = commands.filter((c) => matches(c, tokens));
    return GROUP_ORDER.flatMap((g) => found.filter((c) => c.group === g));
  }, [query]);

  const groups = useMemo(
    () =>
      GROUP_ORDER.map((g) => ({ group: g, items: results.filter((c) => c.group === g) })).filter((g) => g.items.length),
    [results],
  );

  const open = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    setQuery("");
    setActiveIndex(0);
    dialog.showModal();
    inputRef.current?.focus();
  }, []);

  const close = () => dialogRef.current?.close();

  useEffect(() => onPaletteOpen(open), [open]);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (dialogRef.current?.open) close();
        else open();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    document.getElementById(`${baseId}-opt-${activeIndex}`)?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, baseId]);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  function announce(message: string) {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 2400);
  }

  function goToSection(section: SectionId, after?: () => void) {
    if (pathname === "/") {
      afterDialogClose(() => {
        scrollToSection(section);
        after?.();
      });
    } else {
      router.push(`/#${section}`);
      if (after) window.setTimeout(after, 400);
    }
  }

  function run(cmd: Command) {
    close();
    const action = cmd.action;
    switch (action.type) {
      case "section":
        goToSection(action.section);
        break;
      case "systems":
        goToSection("systems", () => selectSystemsTab(action.tab));
        break;
      case "route":
        router.push(action.href);
        break;
      case "download": {
        const link = document.createElement("a");
        link.href = action.href;
        link.download = action.filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        announce("Downloading résumé PDF");
        break;
      }
      case "external":
        window.open(action.href, "_blank", "noopener,noreferrer");
        break;
      case "copy":
        navigator.clipboard
          .writeText(action.value)
          .then(() => announce(action.label))
          .catch(() => announce(`Copy failed. Email: ${action.value}`));
        break;
      case "theme":
        toggleTheme();
        announce("Theme changed");
        break;
    }
  }

  function onInputKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = results[activeIndex];
      if (cmd) run(cmd);
    }
  }

  const listId = `${baseId}-list`;
  const activeId = results.length ? `${baseId}-opt-${activeIndex}` : undefined;

  return (
    <>
      <dialog
        ref={dialogRef}
        aria-label="Command menu"
        className="ui-dialog no-print mx-auto mt-[10vh] mb-auto w-[min(40rem,calc(100vw-2rem))] overflow-hidden rounded-[4px] border border-line-strong bg-surface p-0 text-fg shadow-[0_24px_80px_-20px_rgb(0_0_0/0.7)]"
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search size={18} aria-hidden="true" className="shrink-0 text-fg-subtle" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={activeId}
            aria-autocomplete="list"
            aria-label="Search commands"
            placeholder="Type a command or search…"
            className="h-14 w-full bg-transparent text-base text-fg outline-none placeholder:text-fg-muted"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onInputKeyDown}
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="hidden shrink-0 rounded border border-line px-1.5 py-0.5 font-mono text-[0.6875rem] text-fg-subtle sm:block">
            esc
          </kbd>
        </div>

        <div id={listId} role="listbox" aria-label="Commands" className="max-h-[min(24rem,55vh)] overflow-y-auto overscroll-contain p-2">
          {groups.length === 0 ? (
            <p className="px-3 py-10 text-center text-sm text-fg-muted">
              No matches. Try <span className="font-mono text-fg">intune</span> or{" "}
              <span className="font-mono text-fg">resume</span>.
            </p>
          ) : (
            groups.map(({ group, items }) => (
              <div key={group} role="group" aria-labelledby={`${baseId}-${group}`} className="mb-1 last:mb-0">
                <div id={`${baseId}-${group}`} className="meta px-3 pt-3 pb-1.5 text-fg-muted">
                  {group}
                </div>
                {items.map((cmd) => {
                  const index = results.indexOf(cmd);
                  const active = index === activeIndex;
                  const Icon = iconFor(cmd);
                  return (
                    <div
                      key={cmd.id}
                      id={`${baseId}-opt-${index}`}
                      role="option"
                      aria-selected={active}
                      onPointerMove={() => !active && setActiveIndex(index)}
                      onClick={() => run(cmd)}
                      className={cn(
                        "relative flex min-h-11 cursor-pointer items-center gap-3 rounded-[3px] px-3 py-2.5 text-[0.9375rem] transition-colors duration-100",
                        active ? "bg-accent-soft text-fg shadow-[inset_2px_0_0_var(--accent)]" : "text-fg",
                      )}
                    >
                      <Icon size={16} aria-hidden="true" className={active ? "text-accent" : "text-fg-muted"} />
                      <span className="flex-1">{cmd.label}</span>
                      {active ? <ArrowRight size={15} aria-hidden="true" className="text-fg-subtle" /> : null}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[0.6875rem] text-fg-muted">
          <span className="flex items-center gap-1.5">
            <kbd className="rounded border border-line px-1">↑</kbd>
            <kbd className="rounded border border-line px-1">↓</kbd> navigate
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="rounded border border-line px-1">
              <CornerDownLeft size={10} aria-hidden="true" className="inline" />
            </kbd>{" "}
            select
          </span>
          <span className="ml-auto hidden sm:inline">Ray Alipio · command menu</span>
        </div>
      </dialog>

      <div
        role="status"
        aria-live="polite"
        className={cn(
          "no-print pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 transition-opacity duration-200",
          toast ? "opacity-100" : "opacity-0",
        )}
      >
        {toast ? (
          <span className="rounded-lg border border-line-strong bg-surface px-4 py-2.5 text-sm text-fg shadow-lg">{toast}</span>
        ) : null}
      </div>
    </>
  );
}
