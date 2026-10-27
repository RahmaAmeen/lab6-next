/**
 * CONCEPT: Route priority (#14) + Navigation: redirect() (#16)
 * FILE:    app/(main)/courses/new/page.tsx → /courses/new
 * OBSERVE: - A static folder beats [id], so "new" is never treated as a course id.
 *          - redirect() in a Server Component: logged out → /login,
 *            student → /courses?msg=admin-only. Nothing of this page is sent.
 *          - The backend ALSO checks (POST /courses has AuthGuard + role admin).
 */
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/api";
import FileTag from "../../../_components/FileTag";
import NewCourseForm from "../../../_components/NewCourseForm";

export const metadata = { title: "New course" };

export default async function NewCoursePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?from=/courses/new");
  if (user.role !== "admin") redirect("/courses?msg=admin-only");

  return (
    <>
      <FileTag file="app/(main)/courses/new/page.tsx (static segment)" />
      <h1 className="h1">New course</h1>
      <NewCourseForm />
    </>
  );
}
