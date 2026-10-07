import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

/** In-page hashes use a plain anchor (native focus and scroll); routes use next/link. */
export function SmartLink({ href, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  if (href.startsWith("#")) return <a href={href} {...rest} />;
  return <Link href={href} {...rest} />;
}
