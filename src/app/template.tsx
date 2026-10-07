"use client";

import { useEffect, useState } from "react";

// Module scope survives route changes on the client, so only navigations after
// the first page animate. The first paint stays instant (better LCP).
let hasNavigated = false;

/** Re-mounts on every navigation, giving routes a short fade-in. */
export default function Template({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => hasNavigated);

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return <div className={animate ? "page-enter" : undefined}>{children}</div>;
}
