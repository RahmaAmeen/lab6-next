/**
 * CONCEPT: Nested routes (#11)
 * FILE:    app/(main)/dashboard/settings/page.tsx → /dashboard/settings
 * OBSERVE: One folder per URL segment:
 *            app (root segment) → dashboard (segment) → settings (leaf segment, has page.tsx)
 *          It renders inside DashboardLayout, so the navbar and slots stay.
 */
import FileTag from "../../../_components/FileTag";

export const metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <>
      <FileTag file="app/(main)/dashboard/settings/page.tsx (children)" />
      <h1 className="h1">Dashboard › Settings</h1>
    </>
  );
}
