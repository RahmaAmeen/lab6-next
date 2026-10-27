/**
 * CONCEPT: default.tsx (#10)
 * FILE:    app/(main)/dashboard/@courses/default.tsx
 * OBSERVE: Refresh /dashboard/settings. @courses has no settings/page.tsx and
 *          Next.js can't remember what it showed before a full reload, so it
 *          renders this file. Usually default.tsx returns null; here it shows a note
 *          so you can see it happen. Without this file: 404.
 */
import FileTag from "../../../_components/FileTag";

export default function CoursesDefault() {
  return (
    <>
      <FileTag file="@courses/default.tsx" />
      <p className="muted">
        default.tsx: @courses has no page for this URL (shown after a refresh).
      </p>
    </>
  );
}
