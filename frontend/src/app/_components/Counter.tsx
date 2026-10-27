"use client";
// A tiny piece of client state, used to see when a component keeps or loses state.
import { useState } from "react";

export default function Counter({ label }: { label: string }) {
  const [count, setCount] = useState(0);
  return (
    <button className="btn-outline" onClick={() => setCount((c) => c + 1)}>
      {label}: <strong>{count}</strong> (click me)
    </button>
  );
}
