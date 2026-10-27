"use client";
// Modal shell for the intercepted route. Closing = router.back(), which
// returns to /courses and restores the URL, as if the modal was never opened.
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50 p-4" onClick={() => router.back()}>
      <div className="card w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
        {children}
        <button className="btn mt-4" onClick={() => router.back()}>
          Close
        </button>
      </div>
    </div>
  );
}
