/**
 * CONCEPT: global-error.tsx (#6)
 * FILE:    app/(main)/concepts/global-error/page.tsx
 * OBSERVE: The button sets a cookie that makes app/layout.tsx (the ROOT layout)
 *          throw. error.tsx files sit INSIDE layouts, so they can't catch it.
 *          Only app/global-error.tsx can, and it replaces the whole document.
 *          "Try again" removes the cookie and recovers.
 */
import { crashRootLayoutAction } from "../../../_lib/actions";
import FileTag from "../../../_components/FileTag";
import Observe from "../../../_components/Observe";

export const metadata = { title: "global-error" };

export default function GlobalErrorDemo() {
  return (
    <>
      <FileTag file="app/(main)/concepts/global-error/page.tsx" />
      <h1 className="h1">global-error.tsx</h1>
      <Observe>
        After clicking, the navbar and all styles disappear. The page is global-error.tsx
        with its own &lt;html&gt; and &lt;body&gt;. (In dev, the error overlay also pops up.
        Close it to see the page.)
      </Observe>
      <form action={crashRootLayoutAction}>
        <button className="btn bg-red-700 hover:bg-red-600">Crash the root layout</button>
      </form>
    </>
  );
}
