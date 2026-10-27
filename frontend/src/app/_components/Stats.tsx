"use client";
// Calls our own Route Handler (/api/stats) from the browser.
import { useEffect, useState } from "react";

type Stats = { students: number; courses: number } | { error: string };

export default function Stats() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => setStats({ error: "Request failed" }));
  }, []);

  return (
    <div className="card mb-6 flex items-center gap-6 text-sm">
      <span className="font-mono text-xs text-zinc-500">GET /api/stats →</span>
      {!stats && <span className="muted">loading…</span>}
      {stats && "error" in stats && <span className="text-red-600">{stats.error}</span>}
      {stats && "students" in stats && (
        <>
          <span><strong className="text-xl">{stats.students}</strong> students</span>
          <span><strong className="text-xl">{stats.courses}</strong> courses</span>
        </>
      )}
    </div>
  );
}
