/**
 * CONCEPT: Root layout (#7) + static metadata (#8)
 * FILE:    app/layout.tsx — required, must render <html> and <body>
 * OBSERVE: Every page is wrapped by this file. Nesting for /dashboard is:
 *            RootLayout → (main)/layout (navbar) → DashboardLayout → Page
 *          The tab title comes from `metadata` below; /courses/[id] overrides
 *          it with generateMetadata() and the "%s | Tutorial 6" template.
 */
import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";

// Static metadata: a plain object, known at build time
export const metadata: Metadata = {
  title: { default: "Tutorial 6 – Next.js Routing", template: "%s | Tutorial 6" },
  description: "Software Project I – App Router routing demos",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Only for the global-error.tsx demo (/concepts/global-error):
  // an error thrown HERE can't be caught by any error.tsx, only by global-error.tsx.
  if ((await cookies()).get("crash-root-layout")) {
    throw new Error("Demo: the root layout crashed");
  }

  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
