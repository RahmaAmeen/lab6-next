"use client";
// Client form → Server Action. useActionState gives us the returned error + pending flag.
import { useActionState } from "react";
import { loginAction } from "../_lib/actions";

export default function LoginForm({ from }: { from?: string }) {
  const [state, formAction, pending] = useActionState(loginAction, {});

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <input type="hidden" name="from" value={from ?? "/dashboard"} />
      <input className="input" name="email" type="email" placeholder="Email" defaultValue="student@uni.edu" required />
      <input className="input" name="password" type="password" placeholder="Password" defaultValue="student123" required />
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      <button className="btn" disabled={pending}>{pending ? "Logging in…" : "Login"}</button>
    </form>
  );
}
