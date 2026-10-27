/**
 * CONCEPT: default.tsx (#10) for the @modal slot
 * FILE:    app/(main)/courses/@modal/default.tsx
 * OBSERVE: When nothing is intercepted (normal visit, refresh, /courses/new…),
 *          the slot falls back to this file. null = no modal.
 *          Without it, a hard navigation to e.g. /courses/<id> would 404.
 */
export default function ModalDefault() {
  return null;
}
