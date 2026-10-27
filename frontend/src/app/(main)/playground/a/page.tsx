// CONCEPT: template vs layout (#9). FILE: app/(main)/playground/a/page.tsx → /playground/a
import FileTag from "../../../_components/FileTag";

export default function PageA() {
  return (
    <>
      <FileTag file="app/(main)/playground/a/page.tsx" />
      <h1 className="h1">Page A</h1>
    </>
  );
}
