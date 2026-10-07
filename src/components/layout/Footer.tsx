import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { navItems } from "@/content/navigation";
import { site } from "@/content/site";
import { socialLinks } from "@/content/socialLinks";
import { LogoMark } from "@/components/ui/icons";
import { PaletteHint } from "./PaletteHint";

export function Footer() {
  return (
    <footer className="no-print relative border-t border-line">
      <div className="container-page py-12">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="flex items-center gap-2.5 font-semibold tracking-[-0.01em] text-fg">
              <LogoMark /> {site.name}
            </p>
            <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-fg-muted">
              {site.title}. Endpoint management, identity and access, SaaS administration and IT operations.
            </p>
          </div>
          <nav aria-label="Footer" className="md:col-span-3">
            <p className="meta text-fg-subtle">Sections</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
              {navItems.map((item) => (
                <li key={item.section}>
                  <Link href={`/#${item.section}`} className="text-fg-muted transition-colors hover:text-fg">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-4">
            <p className="meta text-fg-subtle">Elsewhere</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {socialLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    {...(link.id === "email" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                    className="text-fg-muted transition-colors hover:text-fg"
                  >
                    {link.label} <span className="meta text-fg-subtle">· {link.handle}</span>
                  </a>
                </li>
              ))}
              <li>
                <a href={site.resume.pdf} download={site.resume.filename} className="text-fg-muted transition-colors hover:text-fg">
                  Resume <span className="meta text-fg-subtle">· PDF</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="meta mt-12 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-line pt-6 text-fg-subtle">
          <span className="crosshair" aria-hidden="true" />
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span aria-hidden="true" className="hidden h-px flex-1 bg-line sm:block" />
          <span>Next.js · TypeScript · Motion</span>
          <PaletteHint />
          <Link href="/#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-fg">
            Top <ArrowUp size={12} aria-hidden="true" />
          </Link>
          <span className="crosshair" aria-hidden="true" />
        </div>
      </div>
    </footer>
  );
}
