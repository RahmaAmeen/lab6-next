/**
 * CONCEPT: template.tsx vs layout.tsx (#9) — the LAYOUT side
 * FILE:    app/(main)/playground/layout.tsx
 * OBSERVE: Click the layout counter a few times, then switch between A and B.
 *          The layout counter KEEPS its value: layouts are not re-mounted on navigation.
 */
import Link from "next/link";
import Counter from "../../_components/Counter";
import FileTag from "../../_components/FileTag";
import Observe from "../../_components/Observe";

export const metadata = { title: "Playground" };

export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="card">
      <FileTag file="app/(main)/playground/layout.tsx" />
      <Observe>
        Click both counters, then switch pages. The layout counter keeps its value,
        and the template counter resets to 0.
      </Observe>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Counter label="layout counter" />
        <Link href="/playground/a" className="link">Page A</Link>
        <Link href="/playground/b" className="link">Page B</Link>
      </div>
      {children}
    </div>
  );
}
