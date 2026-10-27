/**
 * CONCEPT: Parallel routes (#21) — a slot with its own sub-page
 * FILE:    app/(main)/dashboard/@profile/settings/page.tsx
 * OBSERVE: At /dashboard/settings the @profile slot renders THIS file.
 *          @courses has no settings/ folder, so:
 *            soft navigation → @courses keeps showing its last page
 *            refresh (hard)  → @courses renders its default.tsx
 */
import { getCurrentUser } from "@/lib/api";
import FileTag from "../../../../_components/FileTag";

export default async function ProfileSettingsSlot() {
  const user = await getCurrentUser();
  return (
    <>
      <FileTag file="@profile/settings/page.tsx" />
      <h2 className="mb-2 font-semibold">Profile settings</h2>
      <label className="muted">Display name</label>
      <input className="input mt-1" defaultValue={user?.name ?? ""} disabled />
      <p className="muted mt-2">(Read-only demo: this slot just has its own /settings page.)</p>
    </>
  );
}
