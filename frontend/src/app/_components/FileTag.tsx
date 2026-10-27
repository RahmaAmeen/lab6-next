// Shows which file rendered the current UI, so students can map URL → file.
export default function FileTag({ file }: { file: string }) {
  return (
    <p className="mb-3 inline-block rounded border border-amber-200 bg-amber-50 px-2 py-0.5 font-mono text-xs text-amber-800">
      {file}
    </p>
  );
}
