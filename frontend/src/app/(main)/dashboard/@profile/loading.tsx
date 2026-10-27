// Loading UI for the @profile slot only. The other slot streams independently.
export default function ProfileLoading() {
  return <p className="muted animate-pulse">@profile/loading.tsx: loading profile…</p>;
}
