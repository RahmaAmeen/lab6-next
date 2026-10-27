import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // create-next-app enables `cacheComponents` + `partialPrefetching` by default.
  // Tutorial 6 is about routing, so we turn them off: every page that reads
  // cookies() or fetches with cache: 'no-store' is simply rendered per request,
  // without the extra <Suspense> rules Cache Components requires.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
