"use client";
/**
 * CONCEPT: Navigation (#16) — usePathname() for the active link
 * OBSERVE: The current section is bold. Hooks come from "next/navigation"
 *          (App Router), NOT "next/router" (the old Pages Router).
 *
 * <Link> does a SOFT navigation: the browser stays on the page, React swaps
 * only the segments that changed, and layouts keep their state.
 * A HARD navigation (typing the URL, refreshing, a plain <a>) reloads
 * the whole document.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link href={href} className={active ? "font-bold text-zinc-900" : "text-zinc-600 hover:text-zinc-900"}>
      {children}
    </Link>
  );
}
