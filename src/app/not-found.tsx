import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[70dvh] flex-col justify-center pt-28 pb-20">
      <p className="eyebrow text-accent">404 · Not found</p>
      <h1 className="mt-5 max-w-xl text-[clamp(2rem,1.5rem+2vw,3rem)] leading-tight font-semibold tracking-[-0.03em] text-fg">
        This page didn&apos;t make it through provisioning.
      </h1>
      <p className="mt-4 max-w-md text-fg-muted">The link may be old, or the address has a typo.</p>
      <div className="mt-8">
        <ButtonLink href="/" route variant="primary">
          <ArrowLeft size={16} aria-hidden="true" /> Back to the portfolio
        </ButtonLink>
      </div>
    </section>
  );
}
