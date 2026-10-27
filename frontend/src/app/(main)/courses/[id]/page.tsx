/**
 * CONCEPT: Dynamic routes (#12), notFound() (#2), generateMetadata (#8), route priority (#14)
 * FILE:    app/(main)/courses/[id]/page.tsx → /courses/<one segment>
 * OBSERVE: - The tab title is the course name (generateMetadata runs on the server).
 *          - /courses/999 → backend 404 → notFound() → courses/[id]/not-found.tsx.
 *          - /courses/new does NOT come here: static folders win over [id].
 *          - Reached by refresh or a direct URL. Clicking from /courses shows the modal instead.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourse } from "@/lib/api";
import FileTag from "../../../_components/FileTag";

type Props = { params: Promise<{ id: string }> };

// Dynamic metadata: computed per request from the course data
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const course = await getCourse(id);
  return { title: course ? course.name : "Course not found" };
}

export default async function CoursePage({ params }: Props) {
  const { id } = await params;
  const course = await getCourse(id);
  if (!course) notFound(); // renders the closest not-found.tsx (this folder's)

  return (
    <>
      <FileTag file="app/(main)/courses/[id]/page.tsx (full page, not the modal)" />
      <h1 className="h1">{course.name}</h1>
      <div className="card text-sm">
        <p>Course code: <span className="font-mono">{course.id}</span></p>
        <p className="muted mt-2">params.id = {id}</p>
      </div>
      <Link href="/courses" className="link mt-4 inline-block text-sm">← All courses</Link>
    </>
  );
}
