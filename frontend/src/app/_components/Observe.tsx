// "What to observe" box shown on every demo page.
export default function Observe({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 rounded border-l-4 border-blue-400 bg-blue-50 px-3 py-2 text-sm text-blue-900">
      <strong>Observe: </strong>
      {children}
    </div>
  );
}
