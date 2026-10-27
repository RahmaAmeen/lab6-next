/**
 * CONCEPT: Intercepting routes (#22) — the layout that renders the @modal slot
 * FILE:    app/(main)/courses/layout.tsx
 * OBSERVE: `modal` comes from the @modal folder. It's null (@modal/default.tsx)
 *          until you click a course on /courses. Then @modal/(.)[id] fills it.
 */
export default function CoursesLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
