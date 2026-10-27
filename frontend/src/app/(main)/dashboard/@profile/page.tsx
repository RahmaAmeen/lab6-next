/**
 * CONCEPT: Parallel routes (#21) — @profile slot for /dashboard
 * FILE:    app/(main)/dashboard/@profile/page.tsx → `profile` prop of DashboardLayout
 * OBSERVE: Fetches GET /students/currentUser with the Bearer token.
 *          Its own loading.tsx shows while it loads.
 */
import { getCurrentUser } from "@/lib/api";
import { sleep } from "../../../_lib/sleep";
import FileTag from "../../../_components/FileTag";

export default async function ProfileSlot() {
  await sleep(700); // so @profile/loading.tsx is visible
  const user = await getCurrentUser();

  return (
    <>
      <FileTag file="@profile/page.tsx" />
      <h2 className="mb-2 font-semibold">My profile</h2>
      {user ? (
        <div className="text-sm">
          <p>{user.name}</p>
          <p className="muted">{user.email}</p>
          <p>Role: <strong>{user.role}</strong></p>
        </div>
      ) : (
        <p className="text-sm text-red-600">Session expired. Please log in again.</p>
      )}
    </>
  );
}
