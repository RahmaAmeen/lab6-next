/**
 * All calls to the NestJS backend live here.
 *
 * - Runs on the server only (Server Components, Server Actions, Route Handlers).
 *   API_URL has no NEXT_PUBLIC_ prefix, so the browser never learns the backend URL.
 * - Plain fetch with cache: 'no-store' → always fresh data, no Next.js caching.
 * - Protected calls read the httpOnly "token" cookie with cookies() and forward
 *   it as "Authorization: Bearer <token>", which the NestJS AuthGuard accepts.
 */
import { cookies } from "next/headers";
import { sleep } from "@/app/_lib/sleep";

const API_URL = process.env.API_URL ?? "http://localhost:3000";

// Shapes returned by the backend (see Backend/src/**/models)
export type Course = { _id: string; id: string; name: string };
export type Student = {
  _id: string;
  email: string;
  name: string;
  age: number;
  role: "student" | "admin";
  courses: string[]; // ObjectIds of courses (not populated by the backend)
};

/** Error with the HTTP status, so pages can react to 401 / 403 / 404. */
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

async function getToken() {
  return (await cookies()).get("token")?.value;
}

async function send(path: string, init: RequestInit = {}, auth = false) {
  const headers = new Headers(init.headers);
  if (init.body) headers.set("Content-Type", "application/json");
  if (auth) {
    const token = await getToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, { ...init, headers, cache: "no-store" });
  } catch {
    // fetch() itself throws when nothing listens on the port (backend stopped)
    throw new Error("Cannot reach the backend API. Is NestJS running on port 3000?");
  }

  if (!res.ok) {
    let message = res.statusText;
    try {
      const body = await res.json();
      message = Array.isArray(body.message) ? body.message.join(", ") : (body.message ?? message);
    } catch {}
    throw new ApiError(res.status, message);
  }
  return res;
}

async function json<T>(res: Response): Promise<T> {
  const text = await res.text();
  return (text ? JSON.parse(text) : null) as T; // backend returns empty body for null
}

// ---------- Students ----------

/** GET /students (public). Delayed 1.5s by default so /students/loading.tsx is visible. */
export async function getStudents(delayMs = 1500): Promise<Student[]> {
  await sleep(delayMs);
  return json(await send("/students"));
}

/** GET /students/:id (AuthGuard + role "student"). Throws ApiError 401/403. */
export async function getStudent(id: string): Promise<Student | null> {
  return json(await send(`/students/${id}`, {}, true));
}

/** GET /students/currentUser (AuthGuard). Returns null when not logged in / token expired. */
export async function getCurrentUser(): Promise<Student | null> {
  if (!(await getToken())) return null;
  try {
    return await json<Student>(await send("/students/currentUser", {}, true));
  } catch (e) {
    if (e instanceof ApiError && e.status === 401) return null;
    throw e;
  }
}

// ---------- Courses ----------

/** GET /courses (public) */
export async function getCourses(): Promise<Course[]> {
  return json(await send("/courses"));
}

/** GET /courses/:id (public). Returns null on 404 so the page can call notFound(). */
export async function getCourse(id: string): Promise<Course | null> {
  try {
    return await json<Course>(await send(`/courses/${id}`));
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) return null;
    throw e;
  }
}

/** POST /courses (AuthGuard + role "admin") */
export async function createCourse(data: { id: string; name: string }): Promise<Course> {
  return json(await send("/courses", { method: "POST", body: JSON.stringify(data) }, true));
}

// ---------- Auth ----------

/**
 * POST /auth/login. The backend puts the JWT in a Set-Cookie header
 * ("token=<jwt>; Max-Age=3600; Path=/; HttpOnly"). We read it here on the
 * Next.js server so the Server Action can store it as OUR httpOnly cookie.
 */
export async function login(email: string, password: string) {
  const res = await send("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  const token = res.headers
    .getSetCookie()
    .map((c) => c.split(";")[0]) // "token=<jwt>"
    .find((c) => c.startsWith("token="))
    ?.slice("token=".length);
  if (!token) throw new Error("Login response had no token cookie");

  const body = await json<{ user: { userid: string; role: string } }>(res);
  return { token, user: body.user };
}

/** POST /auth/register (the backend always creates role "student") */
export async function register(data: {
  name: string;
  email: string;
  age: number;
  password: string;
}) {
  return json(await send("/auth/register", { method: "POST", body: JSON.stringify(data) }));
}
