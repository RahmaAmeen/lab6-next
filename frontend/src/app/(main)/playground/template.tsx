/**
 * CONCEPT: template.tsx vs layout.tsx (#9) — the TEMPLATE side
 * FILE:    app/(main)/playground/template.tsx
 * OBSERVE: Same idea as a layout, but Next.js gives it a new key on every
 *          navigation, so it RE-MOUNTS. Its counter resets to 0 when you switch A ↔ B.
 *          Render order: layout → template → page.
 */
import Counter from "../../_components/Counter";
import FileTag from "../../_components/FileTag";

export default function PlaygroundTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded border border-dashed border-zinc-300 p-4">
      <FileTag file="app/(main)/playground/template.tsx" />
      <div className="mb-4">
        <Counter label="template counter" />
      </div>
      {children}
    </div>
  );
}
