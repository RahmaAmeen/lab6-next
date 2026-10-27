/**
 * CONCEPT: not-found.tsx (#2) — segment-level 404
 * FILE:    app/(main)/courses/[id]/not-found.tsx
 * OBSERVE: /courses/999 → the page calls notFound() → THIS file (with the navbar),
 *          not the root app/not-found.tsx. The closest not-found.tsx wins.
 */
import Link from "next/link";
import FileTag from "../../../_components/FileTag";

export default function CourseNotFound() {
  return (
    <div className="card">
      <FileTag file="app/(main)/courses/[id]/not-found.tsx" />
      <h1 className="h1">Course not found</h1>
      <p className="muted mb-3">The backend returned 404 for this id.</p>
      <Link href="/courses" className="btn">Back to courses</Link>
    </div>
  );
}
