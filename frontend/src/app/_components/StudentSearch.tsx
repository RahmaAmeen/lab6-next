"use client";
/**
 * Client Component (leaf). It needs state + onChange, so it must run in the
 * browser. Its data arrives as props from the Server Component parent.
 */
import { useState } from "react";

type Row = { id: string; name: string; email: string };

export default function StudentSearch({ students }: { students: Row[] }) {
  const [query, setQuery] = useState("");
  const shown = students.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="card">
      <p className="mb-2 font-mono text-xs text-amber-800">{"_components/StudentSearch.tsx ('use client')"}</p>
      <input
        className="input mb-2"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type to filter instantly (no server request)…"
      />
      <ul className="text-sm">
        {shown.map((s) => (
          <li key={s.id}>
            {s.name} <span className="muted">{s.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
