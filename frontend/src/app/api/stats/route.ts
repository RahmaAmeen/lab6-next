/**
 * CONCEPT: Route Handlers (#17)
 * FILE:    app/api/stats/route.ts → GET http://localhost:3001/api/stats
 * OBSERVE: A plain HTTP endpoint inside Next.js (no UI). The home page calls it
 *          from the browser. It calls the backend on the server, so the
 *          browser only ever talks to Next.js.
 *          (route.ts and page.tsx can't share a folder: one URL, one handler.)
 */
import { getCourses, getStudents } from "@/lib/api";

export async function GET() {
  try {
    const [students, courses] = await Promise.all([getStudents(0), getCourses()]);
    return Response.json({ students: students.length, courses: courses.length });
  } catch {
    return Response.json({ error: "Backend unavailable" }, { status: 502 });
  }
}
