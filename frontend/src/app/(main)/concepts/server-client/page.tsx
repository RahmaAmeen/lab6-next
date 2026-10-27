/**
 * CONCEPT: Server vs Client Components (#4)
 * FILE:    app/(main)/concepts/server-client/page.tsx (Server Component, the default)
 * OBSERVE: This page fetches on the server (no "use client", can be async,
 *          can read secrets like API_URL). It passes plain data to a small
 *          'use client' child that handles typing.
 *          Keep 'use client' at the LEAF: only the interactive part ships JS.
 *          Props from Server → Client must be serializable (strings, numbers,
 *          plain objects/arrays). Functions, class instances and Dates are not allowed.
 */
import { getStudents } from "@/lib/api";
import FileTag from "../../../_components/FileTag";
import Observe from "../../../_components/Observe";
import StudentSearch from "../../../_components/StudentSearch";

export const metadata = { title: "Server vs Client" };

export default async function ServerClientPage() {
  const students = await getStudents(0); // runs on the server only

  // Map to plain, serializable objects (and pass only what the client needs)
  const rows = students.map((s) => ({ id: s._id, name: s.name, email: s.email }));

  return (
    <>
      <FileTag file="app/(main)/concepts/server-client/page.tsx (Server Component)" />
      <h1 className="h1">Server vs Client Components</h1>
      <Observe>
        View source / Network: the list arrives as HTML from the server. Typing in the box
        filters in the browser and sends no requests. Server code (and API_URL) never
        reaches the browser.
      </Observe>
      <StudentSearch students={rows} />
    </>
  );
}
