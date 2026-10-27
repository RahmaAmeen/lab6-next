/**
 * CONCEPT: Route groups (#20)
 * FILE:    app/(auth)/register/page.tsx → URL /register
 * OBSERVE: Shares the centered (auth) layout with /login. The backend always
 *          gives new accounts role "student".
 */
import Link from "next/link";
import RegisterForm from "../../_components/RegisterForm";
import FileTag from "../../_components/FileTag";

export const metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <>
      <FileTag file="app/(auth)/register/page.tsx" />
      <h1 className="h1">Register</h1>
      <RegisterForm />
      <p className="muted mt-4">
        Already registered? <Link href="/login" className="link">Login</Link>
      </p>
    </>
  );
}
