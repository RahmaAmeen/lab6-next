/**
 * CONCEPT: Catch-all segments (#13) — [...slug]
 * FILE:    app/(main)/help/[...slug]/page.tsx → /help/a, /help/a/b/c, …
 * OBSERVE: slug is an ARRAY of segments, here turned into a breadcrumb.
 *          /help on its own is a 404: [...slug] needs at least one segment
 *          (compare /archive, which uses [[...year]]).
 */
import Link from "next/link";
import FileTag from "../../../_components/FileTag";
import Observe from "../../../_components/Observe";

export default async function HelpPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;

  return (
    <>
      <FileTag file="app/(main)/help/[...slug]/page.tsx" />
      <nav className="mb-3 text-sm">
        <span className="muted">help</span>
        {slug.map((part, i) => (
          <span key={i}>
            {" › "}
            <Link href={`/help/${slug.slice(0, i + 1).join("/")}`} className="link">
              {decodeURIComponent(part)}
            </Link>
          </span>
        ))}
      </nav>
      <h1 className="h1">Help: {decodeURIComponent(slug.at(-1)!)}</h1>
      <p className="card mb-4 font-mono text-sm">params.slug = {JSON.stringify(slug)}</p>
      <Observe>
        Try <Link href="/help/routing" className="link">/help/routing</Link>,{" "}
        <Link href="/help/routing/dynamic-routes/catch-all" className="link">/help/routing/dynamic-routes/catch-all</Link>,
        or <Link href="/help" className="link">/help</Link> (404).
      </Observe>
    </>
  );
}
