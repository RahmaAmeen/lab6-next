/**
 * CONCEPT: Optional catch-all (#13) — [[...year]]
 * FILE:    app/(main)/archive/[[...year]]/page.tsx → /archive, /archive/2024, /archive/2024/10
 * OBSERVE: Double brackets make the segments optional, so /archive itself
 *          matches too, with year = undefined.
 */
import Link from "next/link";
import FileTag from "../../../_components/FileTag";
import Observe from "../../../_components/Observe";

export default async function ArchivePage({ params }: { params: Promise<{ year?: string[] }> }) {
  const { year } = await params;

  return (
    <>
      <FileTag file="app/(main)/archive/[[...year]]/page.tsx" />
      <h1 className="h1">{year ? `Archive: ${year.join(" / ")}` : "Archive: all years"}</h1>
      <p className="card mb-4 font-mono text-sm">params.year = {JSON.stringify(year) ?? "undefined"}</p>
      <Observe>
        <Link href="/archive" className="link">/archive</Link> ·{" "}
        <Link href="/archive/2025" className="link">/archive/2025</Link> ·{" "}
        <Link href="/archive/2025/10" className="link">/archive/2025/10</Link>
      </Observe>
    </>
  );
}
