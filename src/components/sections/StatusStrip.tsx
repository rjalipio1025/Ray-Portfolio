import { statusStrip } from "@/content/statistics";

/** Thin telemetry band under the hero: the operational profile at a glance. */
export function StatusStrip() {
  return (
    <section className="relative border-y border-line bg-bg-raised/70">
      <div className="container-page">
        <div tabIndex={0} role="region" aria-label="Operational profile" className="-mx-4 overflow-x-auto px-4 [mask-image:linear-gradient(to_right,#000_calc(100%-3rem),transparent)] [scrollbar-width:none] focus-visible:outline-offset-[-2px] sm:mx-0 sm:px-0 xl:overflow-visible xl:[mask-image:none]">
          <div className="flex min-w-max divide-x divide-line xl:min-w-0" data-reveal="wipe">
            <p className="meta flex shrink-0 items-center gap-2.5 py-4 pr-5 text-fg-subtle">
              <span aria-hidden="true" className="relative flex size-2">
                <span className="animate-ping-slow absolute inset-0 bg-ok" />
                <span className="relative size-2 bg-ok" />
              </span>
              Operational profile
            </p>
            <dl className="flex flex-1 divide-x divide-line">
              {statusStrip.map((item) => (
                <div key={item.label} className="px-4 py-3.5 xl:flex-1 xl:px-5">
                  <dt className="meta text-fg-subtle">{item.label}</dt>
                  <dd className="mt-1 font-mono text-xs tracking-tight whitespace-nowrap text-fg uppercase">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
