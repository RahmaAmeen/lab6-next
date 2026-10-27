/**
 * CONCEPT: Search params (#15), Navigation (#16), Intercepting routes (#22)
 * FILE:    app/(main)/courses/page.tsx → /courses
 * OBSERVE: - ?search= filters on the server ("Showing X of Y").
 *          - Clicking a course is a SOFT navigation → @modal/(.)[id] intercepts it
 *            and shows a modal over this list. The URL still changes to /courses/<id>.
 *          - Refresh on that URL (HARD navigation) → the full courses/[id] page.
 */
import Form from "next/form";
import Link from "next/link";
import { getCourses } from "@/lib/api";
import FileTag from "../../_components/FileTag";
import Observe from "../../_components/Observe";

export const metadata = { title: "Courses" };

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; msg?: string }>;
}) {
  const { search = "", msg } = await searchParams;
  const courses = await getCourses();
  const q = search.trim().toLowerCase();
  // Backend courses have { id: "SE101", name: "Software Project I" } (no "title" field)
  const shown = q
    ? courses.filter((c) => c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q))
    : courses;

  return (
    <>
      <FileTag file="app/(main)/courses/page.tsx" />
      <h1 className="h1">Courses</h1>
      {msg === "admin-only" && (
        <p className="card mb-4 border-amber-200 bg-amber-50 text-sm">
          redirect(): only admins can create courses.
        </p>
      )}
      <Observe>
        Click a course → modal (intercepted). Then press F5 → full page. Route priority:{" "}
        <Link href="/courses/new" className="link">/courses/new</Link> (static) ·{" "}
        <Link href="/courses/999" className="link">/courses/999</Link> (dynamic, 404) ·{" "}
        <Link href="/courses/5/students" className="link">/courses/5/students</Link> (catch-all).
      </Observe>

      <Form action="/courses" className="mb-3 flex gap-2">
        <input name="search" defaultValue={search} placeholder="Search by course name…" className="input" />
        <button className="btn">Search</button>
      </Form>

      <p className="muted mb-2">
        Showing {shown.length} of {courses.length}
      </p>
      <ul className="card divide-y divide-zinc-100 p-0">
        {shown.map((c) => (
          <li key={c._id} className="px-4 py-2 text-sm">
            <Link href={`/courses/${c._id}`} className="link">
              <span className="font-mono">{c.id}</span> {c.name}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/courses/new" className="btn mt-4">+ New course (admin)</Link>
    </>
  );
}
