/**
 * CONCEPT: Route groups (#20) — layout for the (auth) group
 * FILE:    app/(auth)/layout.tsx
 * OBSERVE: /login and /register are centered and have NO navbar, because they
 *          don't live in (main). "(auth)" doesn't appear in the URL.
 */
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <div className="card w-full max-w-sm">{children}</div>
      <Link href="/" className="link text-sm">← Back home</Link>
    </main>
  );
}
