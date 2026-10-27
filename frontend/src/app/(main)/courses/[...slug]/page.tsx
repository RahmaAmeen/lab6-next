/**
 * CONCEPT: Route priority (#14) — catch-all is the LAST choice
 * FILE:    app/(main)/courses/[...slug]/page.tsx → /courses/a/b/…
 * OBSERVE: Priority: static (new) > dynamic ([id], exactly one segment)
 *          > catch-all ([...slug], one or more segments).
 *          /courses/5/students has two segments, so only the catch-all matches.
 */
import FileTag from "../../../_components/FileTag";

export default async function CoursesCatchAll({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  return (
    <>
      <FileTag file="app/(main)/courses/[...slug]/page.tsx (catch-all)" />
      <h1 className="h1">Catch-all handled this URL</h1>
      <p className="card font-mono text-sm">params.slug = {JSON.stringify(slug)}</p>
    </>
  );
}
