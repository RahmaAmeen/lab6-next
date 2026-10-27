// Server Component: reads the cookie on the server, renders client NavLinks.
import { cookies } from "next/headers";
import NavLink from "./NavLink";
import { logoutAction } from "../_lib/actions";

export default async function Navbar() {
  const loggedIn = (await cookies()).has("token");

  return (
    <header className="border-b border-zinc-200 bg-white">
      <nav className="mx-auto flex max-w-4xl flex-wrap items-center gap-4 px-4 py-3 text-sm">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/students">Students</NavLink>
        <NavLink href="/courses">Courses</NavLink>
        <NavLink href="/dashboard">Dashboard</NavLink>
        <NavLink href="/admin">Admin</NavLink>
        <NavLink href="/playground">Playground</NavLink>
        <span className="ml-auto">
          {loggedIn ? (
            <form action={logoutAction}>
              <button className="btn-outline">Logout</button>
            </form>
          ) : (
            <span className="flex gap-3">
              <NavLink href="/login">Login</NavLink>
              <NavLink href="/register">Register</NavLink>
            </span>
          )}
        </span>
      </nav>
    </header>
  );
}
