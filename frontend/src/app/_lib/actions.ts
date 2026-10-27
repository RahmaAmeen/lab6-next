"use server";
/**
 * Server Actions for auth and course creation.
 * They run on the Next.js server, call the backend through src/lib/api.ts and
 * keep the JWT in an httpOnly cookie on the Next.js domain (port 3001).
 * The token is never stored in localStorage and never readable by browser JS.
 */
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ApiError, createCourse, login, register } from "@/lib/api";

export type FormState = { error?: string };

const message = (e: unknown) =>
  e instanceof Error ? e.message : "Something went wrong";

// Only allow redirects to local paths ("/admin"), never "//evil.com"
const safePath = (p: FormDataEntryValue | null) =>
  typeof p === "string" && p.startsWith("/") && !p.startsWith("//") ? p : "/dashboard";

export async function loginAction(_prev: FormState, formData: FormData): Promise<FormState> {
  let token: string;
  try {
    ({ token } = await login(String(formData.get("email")), String(formData.get("password"))));
  } catch (e) {
    return { error: e instanceof ApiError && e.status === 401 ? "Wrong email or password" : message(e) };
  }

  (await cookies()).set("token", token, {
    httpOnly: true, // browser JS cannot read it
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60, // same lifetime as the backend JWT (1h)
  });

  // redirect() throws a special error, so call it outside try/catch
  redirect(safePath(formData.get("from")));
}

export async function registerAction(_prev: FormState, formData: FormData): Promise<FormState> {
  try {
    await register({
      name: String(formData.get("name")),
      email: String(formData.get("email")),
      age: Number(formData.get("age")),
      password: String(formData.get("password")),
    });
  } catch (e) {
    return { error: message(e) };
  }
  redirect("/login?registered=1");
}

export async function logoutAction() {
  (await cookies()).delete("token");
  redirect("/");
}

export async function createCourseAction(formData: FormData): Promise<FormState> {
  try {
    await createCourse({
      id: String(formData.get("id")),
      name: String(formData.get("name")),
    });
    return {};
  } catch (e) {
    return { error: message(e) };
  }
}

/** Demo for global-error.tsx: makes the ROOT layout throw on the next render. */
export async function crashRootLayoutAction() {
  // Not httpOnly on purpose: global-error.tsx (client) deletes it to recover.
  (await cookies()).set("crash-root-layout", "1", { path: "/" });
}
