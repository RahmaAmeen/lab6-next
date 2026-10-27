/**
 * CONCEPT: loading.tsx (#3)
 * FILE:    app/(main)/students/loading.tsx
 * OBSERVE: Next.js wraps page.tsx in <Suspense fallback={<Loading />}>.
 *          This skeleton streams right away. The navbar (layout) is already
 *          interactive, and the list replaces it after ~1.5 s.
 */
export default function Loading() {
  return (
    <div className="animate-pulse">
      <p className="mb-3 font-mono text-xs text-amber-800">app/(main)/students/loading.tsx</p>
      <div className="mb-4 h-7 w-40 rounded bg-zinc-200" />
      <div className="mb-3 h-9 rounded bg-zinc-200" />
      {[1, 2, 3].map((i) => (
        <div key={i} className="mb-2 h-10 rounded bg-zinc-200" />
      ))}
      <p className="muted">Loading students…</p>
    </div>
  );
}
