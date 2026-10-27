"use client";
/**
 * CONCEPT: Navigation (#16) — programmatic navigation with useRouter()
 * useRouter comes from "next/navigation" (App Router), NOT "next/router".
 *   router.push('/courses') → soft navigation to the list
 *   router.refresh()        → re-runs Server Components so the new course shows up
 */
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createCourseAction } from "../_lib/actions";

export default function NewCourseForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function onSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await createCourseAction(formData); // Server Action → POST /courses
      if (result.error) return setError(result.error);
      router.push("/courses");
      router.refresh();
    });
  }

  return (
    <form action={onSubmit} className="card flex max-w-sm flex-col gap-3">
      <input className="input" name="id" placeholder="Course code, e.g. DB301" required />
      <input className="input" name="name" placeholder="Course name" required />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button className="btn" disabled={pending}>{pending ? "Saving…" : "Create course"}</button>
    </form>
  );
}
