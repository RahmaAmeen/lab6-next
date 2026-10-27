/**
 * CONCEPT: page.tsx inside a nested layout (#7), the `children` slot
 * FILE:    app/(main)/dashboard/page.tsx → /dashboard
 * OBSERVE: Protected by proxy.ts (logged out → /login). This page is the
 *          `children` prop of DashboardLayout. The two cards below are slots.
 */
import FileTag from "../../_components/FileTag";
import Observe from "../../_components/Observe";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ msg?: string }>;
}) {
  const { msg } = await searchParams;

  return (
    <>
      {msg === "admin-only" && (
        <p className="card mb-4 border-amber-200 bg-amber-50 text-sm">
          You were redirected from <code>/admin</code>: that area is for admins only.
        </p>
      )}
      <FileTag file="app/(main)/dashboard/page.tsx (children)" />
      <h1 className="h1">Dashboard</h1>
      <Observe>
        Click <code>/dashboard/settings</code>: @profile changes, @courses keeps its content
        (soft navigation). Then press F5 on /dashboard/settings: @courses has no settings
        page, so it shows its default.tsx.
      </Observe>
    </>
  );
}
