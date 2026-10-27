"use client"; // Error boundaries must be Client Components
/**
 * CONCEPT: error.tsx (#5)
 * FILE:    app/(main)/students/error.tsx
 * OBSERVE: Open /students?fail=1, or stop the backend and open /students.
 *          Only this segment is replaced. The navbar (layout above) still works.
 *          - retry(): re-fetches on the server and re-renders (Next 16.3+, use this one)
 *          - reset(): only clears the error state on the client (no re-fetch)
 *          In production, server error messages are hidden (only error.digest is sent).
 */
import Link from "next/link";

export default function StudentsError({
  error,
  retry,
  reset,
}: {
  error: unknown;
  retry: () => void;
  reset: () => void;
}) {
  return (
    <div className="card border-red-200 bg-red-50">
      <p className="mb-2 font-mono text-xs text-red-800">app/(main)/students/error.tsx</p>
      <h1 className="h1 text-red-800">Something went wrong</h1>
      <p className="mb-4 text-sm text-red-700">
        {error instanceof Error ? error.message : String(error)}
      </p>
      <div className="flex gap-2">
        <button className="btn" onClick={() => retry()}>Try again</button>
        <button className="btn-outline" onClick={() => reset()}>reset()</button>
        <Link href="/students" className="btn-outline">Go to /students</Link>
      </div>
    </div>
  );
}
