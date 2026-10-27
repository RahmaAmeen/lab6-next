/**
 * CONCEPT: Role-based page (#23)
 * FILE:    app/(main)/admin/page.tsx → /admin
 * OBSERVE: Layer 1: proxy.ts → no cookie → /login.
 *          Layer 2: this Server Component asks the backend who you are.
 *            role "student" → redirect("/dashboard?msg=admin-only").
 *          The check runs on the server, so a student never receives admin HTML.
 */
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser, getStudents } from "@/lib/api";
import FileTag from "../../_components/FileTag";

export const metadata = { title: "Admin" };

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?from=/admin");
  if (user.role !== "admin") redirect("/dashboard?msg=admin-only");

  const students = await getStudents(0);

  return (
    <>
      <FileTag file="app/(main)/admin/page.tsx" />
      <h1 className="h1">Admin area</h1>
      <p className="mb-4 text-sm">Welcome {user.name}. Only role &quot;admin&quot; sees this page.</p>
      <div className="card mb-4 text-sm">
        <h2 className="mb-2 font-semibold">All accounts ({students.length})</h2>
        <ul>
          {students.map((s) => (
            <li key={s._id}>{s.name} <span className="muted">{s.email} · {s.role}</span></li>
          ))}
        </ul>
      </div>
      <Link href="/courses/new" className="btn">+ Create a course</Link>
    </>
  );
}
