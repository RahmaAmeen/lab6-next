// CONCEPT: template vs layout (#9). FILE: app/(main)/playground/b/page.tsx → /playground/b
import FileTag from "../../../_components/FileTag";

export default function PageB() {
  return (
    <>
      <FileTag file="app/(main)/playground/b/page.tsx" />
      <h1 className="h1">Page B</h1>
    </>
  );
}
