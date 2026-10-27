/**
 * CONCEPT: Dynamic routes (#12) — [id] folder
 * FILE:    app/(main)/students/[id]/page.tsx → /students/<any id>
 * OBSERVE: params is a Promise in Next 15+ → `await params`.
 *          The backend route needs a token AND role "student":
 *            logged out → 401 message · logged in as admin → 403 message.
 */
import Link from "next/link";
import { notFound } from "next/navigation";
import { ApiError, getStudent, type Student } from "@/lib/api";
import FileTag from "../../../_components/FileTag";

export default async function StudentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let student: Student | null;
  try {
    student = await getStudent(id);
  } catch (e) {
    if (e instanceof ApiError && (e.status === 401 || e.status === 403)) {
      return <Denied status={e.status} id={id} />;
    }
    throw e; // anything else → students/error.tsx
  }
  if (!student) notFound();

  return (
    <>
      <FileTag file="app/(main)/students/[id]/page.tsx" />
      <h1 className="h1">{student.name}</h1>
      <div className="card text-sm">
        <p>Email: {student.email}</p>
        <p>Age: {student.age}</p>
        <p>Role: {student.role}</p>
        <p>Enrolled courses: {student.courses.length}</p>
        <p className="muted mt-2">params.id = {id}</p>
      </div>
      <Link href="/students" className="link mt-4 inline-block text-sm">← All students</Link>
    </>
  );
}

function Denied({ status, id }: { status: number; id: string }) {
  return (
    <div className="card border-amber-200 bg-amber-50 text-sm">
      <FileTag file="app/(main)/students/[id]/page.tsx" />
      <h1 className="h1">{status === 401 ? "Please log in" : "Students only"}</h1>
      {status === 401 ? (
        <p>
          The backend answered <strong>401 Unauthorized</strong>: no valid token.{" "}
          <Link href={`/login?from=/students/${id}`} className="link">Log in as a student</Link>.
        </p>
      ) : (
        <p>
          The backend answered <strong>403 Forbidden</strong>: you are logged in, but this
          route requires role <code>student</code>.
        </p>
      )}
    </div>
  );
}
