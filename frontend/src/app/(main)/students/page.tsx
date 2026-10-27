/**
 * CONCEPT: loading.tsx (#3), error.tsx (#5), search params (#15)
 * FILE:    app/(main)/students/page.tsx → /students
 * OBSERVE: - getStudents() waits 1.5 s, so loading.tsx shows first.
 *          - /students?search=sara is filtered ON THE SERVER: "Showing X of Y".
 *          - /students?fail=1 throws → error.tsx. Stop the backend → error.tsx too.
 */
import Form from "next/form";
import Link from "next/link";
import { getStudents } from "@/lib/api";
import FileTag from "../../_components/FileTag";
import Observe from "../../_components/Observe";

export const metadata = { title: "Students" };

export default async function StudentsPage({
  searchParams,
}: {
  // searchParams is a Promise in Next 15+ → await it
  searchParams: Promise<{ search?: string; fail?: string }>;
}) {
  const { search = "", fail } = await searchParams;

  if (fail === "1") {
    throw new Error("Demo error: you opened /students?fail=1");
  }

  const students = await getStudents();
  const q = search.trim().toLowerCase();
  const shown = q ? students.filter((s) => s.name.toLowerCase().includes(q)) : students;

  return (
    <>
      <FileTag file="app/(main)/students/page.tsx" />
      <h1 className="h1">Students</h1>
      <Observe>
        A refresh shows loading.tsx for 1.5 s. Search changes the URL (?search=…) and the
        server re-renders the filtered list. Try <Link href="/students?fail=1" className="link">?fail=1</Link>.
      </Observe>

      {/* next/form: a GET form that updates ?search= with a soft navigation */}
      <Form action="/students" className="mb-3 flex gap-2">
        <input name="search" defaultValue={search} placeholder="Search by name…" className="input" />
        <button className="btn">Search</button>
      </Form>

      <p className="muted mb-2">
        Showing {shown.length} of {students.length}
      </p>
      <ul className="card divide-y divide-zinc-100 p-0">
        {shown.map((s) => (
          <li key={s._id} className="flex justify-between px-4 py-2 text-sm">
            <Link href={`/students/${s._id}`} className="link">{s.name}</Link>
            <span className="muted">{s.email} · {s.role}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
