"use client";
import { useActionState } from "react";
import { registerAction } from "../_lib/actions";

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerAction, {});

  // Field names match Backend/src/auth/dto/RegisterReqestDto.ts (age must be ≥ 20)
  return (
    <form action={formAction} className="flex flex-col gap-3">
      <input className="input" name="name" placeholder="Name" required />
      <input className="input" name="email" type="email" placeholder="Email" required />
      <input className="input" name="age" type="number" min={20} placeholder="Age (20+)" required />
      <input className="input" name="password" type="password" placeholder="Password" required />
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      <button className="btn" disabled={pending}>{pending ? "Creating…" : "Register"}</button>
    </form>
  );
}
