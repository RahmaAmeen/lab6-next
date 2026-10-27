/**
 * CONCEPT: Route groups (#20) — layout for the (main) group
 * FILE:    app/(main)/layout.tsx
 * OBSERVE: Every page in (main) gets the navbar. The folder name "(main)" is
 *          NOT part of the URL: app/(main)/students/page.tsx → /students.
 *          Pages in (auth) use a different layout with no navbar.
 */
import Navbar from "../_components/Navbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-6">{children}</main>
    </>
  );
}
