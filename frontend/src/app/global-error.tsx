"use client"; // Error boundaries must be Client Components
/**
 * CONCEPT: global-error.tsx (#6)
 * FILE:    app/global-error.tsx
 * OBSERVE: Catches errors in the ROOT layout, which no error.tsx can catch.
 *          It REPLACES the root layout, so it must render its own <html> and
 *          <body>, and globals.css is not applied (hence the inline styles).
 *          Trigger it from /concepts/global-error.
 */
export default function GlobalError({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  function recover() {
    // Remove the demo cookie that makes the root layout throw, then re-render
    document.cookie = "crash-root-layout=; Max-Age=0; path=/";
    retry();
  }

  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui", padding: 40, textAlign: "center" }}>
        <h1>💥 global-error.tsx</h1>
        <p>{error instanceof Error ? error.message : "Unknown error"}</p>
        <button onClick={recover} style={{ padding: "6px 14px", cursor: "pointer" }}>
          Try again
        </button>
      </body>
    </html>
  );
}
