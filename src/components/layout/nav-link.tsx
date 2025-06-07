"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Styled navigation link that highlights the active route.
 *
 * @param href - Target path.
 * @param children - Link label or content.
 */
export function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
        isActive
          ? "underline bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-accent"
      }`}
    >
      {children}
    </Link>
  );
}
