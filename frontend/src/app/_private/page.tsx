/**
 * CONCEPT: Private folders (#19)
 * FILE:    app/_private/page.tsx
 * OBSERVE: Visit /_private → 404. A folder starting with "_" is excluded from
 *          routing, even when it contains a page.tsx. That's why _components and
 *          _lib can live safely inside app/.
 */
export default function PrivatePage() {
  return <p>You will never see this page.</p>;
}
