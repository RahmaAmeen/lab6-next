/**
 * CONCEPT: Route groups (#20) + auth with Server Actions
 * FILE:    app/(auth)/login/page.tsx → URL /login (no "(auth)" in it)
 * OBSERVE: No navbar. After login, the Server Action stores the JWT as an
 *          httpOnly "token" cookie and redirects to ?from=… (set by proxy.ts).
 *          DevTools → Application → Cookies: "token" is HttpOnly, and localStorage is empty.
 */
import Link from "next/link";
import LoginForm from "../../_components/LoginForm";
import FileTag from "../../_components/FileTag";

export const metadata = { title: "Login" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; registered?: string }>;
}) {
  const { from, registered } = await searchParams;

  return (
    <>
      <FileTag file="app/(auth)/login/page.tsx" />
      <h1 className="h1">Login</h1>
      {registered && <p className="mb-3 text-sm text-green-700">Account created. Please log in.</p>}
      {from && <p className="muted mb-3">Please log in to open <code>{from}</code>.</p>}
      <LoginForm from={from} />
      <p className="muted mt-4">
        Demo: student@uni.edu / student123 · admin@uni.edu / admin123
        <br />
        No account? <Link href="/register" className="link">Register</Link>
      </p>
    </>
  );
}
