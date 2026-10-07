import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-[3px] text-[0.9375rem] font-medium leading-none whitespace-nowrap transition-[background-color,border-color,color,box-shadow] duration-150 ease-[var(--ease-state)] select-none";

const variants: Record<Variant, string> = {
  primary:
    "h-11 px-5 bg-accent text-accent-fg hover:bg-accent-strong shadow-[0_0_0_1px_color-mix(in_oklab,var(--accent)_60%,transparent),0_8px_24px_-12px_var(--accent)]",
  secondary: "h-11 px-5 border border-line-strong bg-surface/60 text-fg hover:border-fg-subtle hover:bg-surface-2",
  ghost: "h-11 px-3 text-fg-muted hover:text-fg",
};

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  variant?: Variant;
  /** Client-side route (next/link). Hash links, files and external URLs use <a>. */
  route?: boolean;
  children: ReactNode;
};

export function ButtonLink({ href, variant = "secondary", route = false, className, children, ...rest }: Props) {
  const classes = cn(base, variants[variant], className);
  if (route) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} {...rest}>
      {children}
    </a>
  );
}
