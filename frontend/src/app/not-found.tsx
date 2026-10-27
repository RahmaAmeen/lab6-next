/**
 * CONCEPT: not-found.tsx (#2) — root 404 page
 * FILE:    app/not-found.tsx
 * OBSERVE: Shown for any unknown URL (try /does-not-exist or /_private) and when
 *          notFound() is called without a closer not-found.tsx.
 *          It renders inside the root layout only, so there is no navbar here.
 */
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-md p-10 text-center">
      <p className="text-6xl font-bold text-zinc-300">404</p>
      <h1 className="h1">Page not found</h1>
      <p className="muted mb-4">Rendered by app/not-found.tsx</p>
      <Link href="/" className="btn">Back home</Link>
    </main>
  );
}
