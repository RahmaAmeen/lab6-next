// Artificial delay so loading.tsx / Suspense fallbacks are visible in class.
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
