import { ArrowLeft, Download } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { PrintButton } from "@/components/resume/PrintButton";
import { ResumeDocument } from "@/components/resume/ResumeDocument";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Resume",
  description: `Résumé of ${site.name}, ${site.title}: endpoint management, identity and access, SaaS administration and enterprise IT operations.`,
  alternates: { canonical: "/resume" },
  openGraph: { url: "/resume", title: `Resume | ${site.name}` },
};

export default function ResumePage() {
  return (
    <div className="pt-24 pb-20 sm:pt-28 print:p-0">
      <div className="no-print container-page mb-8 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md text-sm text-fg-muted transition-colors hover:text-fg"
        >
          <ArrowLeft size={15} aria-hidden="true" /> Back to portfolio
        </Link>
        <div className="flex flex-wrap gap-2">
          <PrintButton />
          <ButtonLink href={site.resume.pdf} download={site.resume.filename} variant="primary">
            <Download size={16} aria-hidden="true" /> Download PDF
          </ButtonLink>
        </div>
      </div>
      <div className="px-3 sm:px-6 print:px-0">
        <ResumeDocument />
      </div>
    </div>
  );
}
