/**
 * CONCEPT: Parallel routes (#21) — @courses slot for /dashboard
 * FILE:    app/(main)/dashboard/@courses/page.tsx → `courses` prop of DashboardLayout
 * OBSERVE: The backend returns only course ObjectIds in currentUser.courses,
 *          so we fetch all courses and keep the user's ones.
 *          Slower on purpose (1.5 s) → @courses/loading.tsx stays longer than @profile's.
 */
import Link from "next/link";
import { getCourses, getCurrentUser } from "@/lib/api";
import { sleep } from "../../../_lib/sleep";
import FileTag from "../../../_components/FileTag";

export default async function CoursesSlot() {
  await sleep(1500);
  const [user, courses] = await Promise.all([getCurrentUser(), getCourses()]);
  const mine = courses.filter((c) => user?.courses.includes(c._id));

  return (
    <>
      <FileTag file="@courses/page.tsx" />
      <h2 className="mb-2 font-semibold">My courses</h2>
      {mine.length === 0 && <p className="muted">Not enrolled in any course.</p>}
      <ul className="text-sm">
        {mine.map((c) => (
          <li key={c._id}>
            <Link href={`/courses/${c._id}`} className="link">{c.id} {c.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
