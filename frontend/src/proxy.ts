/**
 * CONCEPT: proxy.ts (#18) — Next.js 16 replacement for middleware.ts
 * FILE:    src/proxy.ts (next to app/), exported function must be named `proxy`
 * OBSERVE: Open /dashboard or /admin while logged out → you land on
 *          /login?from=/dashboard before any page code runs.
 *
 * NOTE: proxy only checks that a "token" cookie EXISTS. It does not verify the
 * JWT. A fake cookie gets past it, but the NestJS AuthGuard rejects the token,
 * and that guard is the real security. Proxy just gives a nicer redirect.
 */
import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (!request.cookies.has("token")) {
    const login = new URL("/login", request.url);
    login.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(login);
  }
  return NextResponse.next();
}

// Run only for these paths (":path*" = the path itself and anything below it)
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
