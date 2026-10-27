/**
 * CONCEPT: Intercepting routes (#22)
 * FILE:    app/(main)/courses/@modal/(.)[id]/page.tsx
 * OBSERVE: On /courses, clicking a course shows THIS modal while the list stays
 *          underneath. The URL is /courses/<id>. Press F5 → the full courses/[id] page.
 *
 *  - (.) means "same level". It counts ROUTE SEGMENTS, not folders: @modal (slot)
 *    and (main) (group) are not segments, so (.)[id] sits next to courses/[id].
 *    (..) would be one segment up, and (...) the app root.
 *  - Interception only happens on SOFT navigation (<Link>, router.push).
 *    A refresh or a pasted URL is a hard navigation and renders the real page.
 */
import { getCourse } from "@/lib/api";
import Modal from "../../../../_components/Modal";
import FileTag from "../../../../_components/FileTag";

export default async function CourseModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = await getCourse(id);

  return (
    <Modal>
      <FileTag file="app/(main)/courses/@modal/(.)[id]/page.tsx (intercepted)" />
      {course ? (
        <>
          <h2 className="h1">{course.name}</h2>
          <p className="text-sm">Course code: <span className="font-mono">{course.id}</span></p>
          <p className="muted mt-3">Refresh the page (F5) to see the full page instead.</p>
        </>
      ) : (
        <p>Course not found.</p>
      )}
    </Modal>
  );
}
