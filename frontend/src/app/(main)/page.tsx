/**
 * CONCEPT: page.tsx (#1) — a file named page.tsx makes a folder a public URL
 * FILE:    app/(main)/page.tsx → "/"  (route group names are not in the URL)
 * OBSERVE: Every demo of Tutorial 6, in slide order. The stats box calls the
 *          Route Handler at /api/stats (#17).
 */
import Link from "next/link";
import FileTag from "../_components/FileTag";
import Stats from "../_components/Stats";

const sections: { title: string; demos: [string, string, string][] }[] = [
  {
    title: "File conventions",
    demos: [
      ["/", "page.tsx", "This page: page.tsx makes a route public"],
      ["/courses/999", "not-found.tsx", "notFound() → courses/[id]/not-found.tsx (try /nope for the root one)"],
      ["/students", "loading.tsx", "1.5 s delay → loading skeleton streams first"],
      ["/concepts/server-client", "Server vs Client", "Server fetches, a 'use client' leaf filters"],
      ["/students?fail=1", "error.tsx", "Thrown error → error boundary with Try again"],
      ["/concepts/global-error", "global-error.tsx", "Crash the root layout itself"],
      ["/dashboard", "layout.tsx (nested)", "RootLayout → (main) → DashboardLayout → Page"],
      ["/courses", "Metadata", "Open a course page and watch the tab title"],
      ["/playground/a", "template vs layout", "Layout counter survives, template counter resets"],
      ["/dashboard/settings", "default.tsx", "Refresh this URL → @courses shows default.tsx"],
    ],
  },
  {
    title: "Folders and routing",
    demos: [
      ["/dashboard/settings", "Nested routes", "Folder per segment: dashboard → settings"],
      ["/students", "Dynamic routes", "Click a student → /students/[id] (needs student login)"],
      ["/help/routing/dynamic-routes", "Catch-all", "[...slug] turns the path into a breadcrumb"],
      ["/archive", "Optional catch-all", "[[...year]] also matches /archive itself"],
      ["/courses/new", "Route priority", "static new > dynamic [id] > catch-all [...slug]"],
      ["/students?search=sara", "Search params", "Filtered on the server: Showing X of Y"],
      ["/courses", "Navigation", "<Link>, active NavLink, router.push, redirect()"],
      ["/api/stats", "Route Handlers", "JSON endpoint inside Next.js"],
      ["/dashboard", "proxy.ts", "Logged out → redirected to /login"],
    ],
  },
  {
    title: "Organizing and advanced routing",
    demos: [
      ["/_private", "Private folders", "_folder is ignored by the router → 404"],
      ["/login", "Route groups", "(auth) layout: centered, no navbar"],
      ["/dashboard", "Parallel routes", "@profile and @courses slots side by side"],
      ["/courses", "Intercepting routes", "Click a course → modal; refresh → full page"],
      ["/admin", "Role-based page", "Admins only; students get redirected"],
    ],
  },
];

// Number the demos 1..24 across all sections
const offsets = sections.map((_, i) =>
  sections.slice(0, i).reduce((sum, s) => sum + s.demos.length, 0),
);

export default function HomePage() {
  return (
    <>
      <FileTag file="app/(main)/page.tsx" />
      <h1 className="h1">Tutorial 6 – App Router routing</h1>
      <p className="muted mb-4">
        Log in as <code>student@uni.edu / student123</code> or <code>admin@uni.edu / admin123</code>.
      </p>
      <Stats />

      {sections.map((section, s) => (
        <section key={section.title} className="mb-6">
          <h2 className="mb-2 font-semibold">{section.title}</h2>
          <ol className="card divide-y divide-zinc-100 p-0">
            {section.demos.map(([href, concept, desc], i) => (
              <li key={concept} className="flex gap-3 px-4 py-2 text-sm">
                <span className="w-6 text-zinc-400">{offsets[s] + i + 1}</span>
                <Link href={href} className="link w-56 shrink-0 font-mono text-xs leading-5">{href}</Link>
                <span className="w-40 shrink-0 font-medium">{concept}</span>
                <span className="text-zinc-600">{desc}</span>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </>
  );
}
