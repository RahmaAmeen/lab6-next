/**
 * CONCEPT: Nested layouts (#7) + Parallel routes (#21)
 * FILE:    app/(main)/dashboard/layout.tsx
 * OBSERVE: Layouts nest: RootLayout → (main)/layout (navbar) → DashboardLayout → Page.
 *          Besides `children`, this layout receives one prop per @slot folder
 *          in THIS folder: @profile → `profile`, @courses → `courses`.
 *          Each slot loads (and streams) on its own: watch the two loading.tsx.
 */
import Link from "next/link";
import FileTag from "../../_components/FileTag";

export default function DashboardLayout({
  children,
  profile,
  courses,
}: {
  children: React.ReactNode;
  profile: React.ReactNode;
  courses: React.ReactNode;
}) {
  return (
    <div>
      <FileTag file="app/(main)/dashboard/layout.tsx" />
      <nav className="mb-4 flex gap-4 text-sm">
        <Link href="/dashboard" className="link">/dashboard</Link>
        <Link href="/dashboard/settings" className="link">/dashboard/settings</Link>
      </nav>
      <div className="mb-4">{children}</div>
      <div className="grid gap-4 md:grid-cols-2">
        <section className="card">{profile}</section>
        <section className="card">{courses}</section>
      </div>
    </div>
  );
}
