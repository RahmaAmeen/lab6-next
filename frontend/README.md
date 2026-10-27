# Tutorial 6: Next.js App Router routing demo

A small Next.js 16 app that talks to the NestJS API in `../Backend`.
Every demo file starts with a comment: **concept**, **file convention**, and **what to observe**.
Every page also shows a yellow tag with the file that rendered it.

## Setup

```bash
cp .env.example .env.local   # API_URL=http://localhost:3000 (server-only, no NEXT_PUBLIC_)
npm install
npm run dev                  # http://localhost:3001
```

The backend must be running on port 3000 (see the root README).

Demo accounts (from `npm run seed` in Backend):

| Role    | Email             | Password     |
|---------|-------------------|--------------|
| student | student@uni.edu   | student123   |
| admin   | admin@uni.edu     | admin123     |

## How data and auth flow

```
Browser ──► Next.js (3001) ──► NestJS (3000) ──► MongoDB
            src/lib/api.ts       AuthGuard / authorizationGaurd
```

- All backend calls are in `src/lib/api.ts` (plain `fetch`, `cache: 'no-store'`).
- **Login** is a Server Action (`src/app/_lib/actions.ts`). It calls `POST /auth/login`, reads the
  JWT from the response's `Set-Cookie` header, and stores it as an **httpOnly** `token` cookie on
  the Next.js side. Protected calls send it as `Authorization: Bearer <token>`.
  The browser never sees the token, the backend URL, or anything in localStorage.
- `src/proxy.ts` only checks that the cookie **exists**. The real security is the NestJS guard.

> `next.config.ts` turns off `cacheComponents` (on by default in create-next-app 16), so
> pages that read cookies or uncached data are simply rendered per request. That keeps the
> focus on routing.

## Folder tree

```
src/
├── proxy.ts                          # 18 proxy (was middleware.ts)
├── lib/api.ts                        # every backend call
└── app/
    ├── layout.tsx                    # 7,8 root layout + static metadata
    ├── not-found.tsx                 # 2 root 404
    ├── global-error.tsx              # 6
    ├── _components/  _lib/           # 19 private folders (not routes)
    ├── _private/page.tsx             # 19 → 404
    ├── api/stats/route.ts            # 17 Route Handler
    ├── (auth)/                       # 20 route group: centered, no navbar
    │   ├── layout.tsx
    │   ├── login/page.tsx
    │   └── register/page.tsx
    └── (main)/                       # 20 route group: with navbar
        ├── layout.tsx
        ├── page.tsx                  # 1 home: demo index + /api/stats
        ├── students/
        │   ├── page.tsx  loading.tsx  error.tsx      # 3,5,15
        │   └── [id]/page.tsx                         # 12
        ├── courses/
        │   ├── layout.tsx                            # renders {children}{modal}
        │   ├── page.tsx                              # 15,16,22
        │   ├── new/page.tsx                          # 14,16 static segment, redirect()
        │   ├── [id]/page.tsx  [id]/not-found.tsx     # 2,8,12,14
        │   ├── [...slug]/page.tsx                    # 14 catch-all
        │   └── @modal/
        │       ├── default.tsx                       # 10 returns null
        │       └── (.)[id]/page.tsx                  # 22 intercepted modal
        ├── dashboard/
        │   ├── layout.tsx                            # 7,21 { children, profile, courses }
        │   ├── page.tsx
        │   ├── settings/page.tsx                     # 11 nested route
        │   ├── @profile/ page.tsx  settings/page.tsx  default.tsx  loading.tsx
        │   └── @courses/ page.tsx  default.tsx  loading.tsx
        ├── playground/ layout.tsx  template.tsx  a/  b/          # 9
        ├── help/[...slug]/page.tsx                   # 13 catch-all
        ├── archive/[[...year]]/page.tsx              # 13 optional catch-all
        ├── concepts/server-client/page.tsx           # 4
        ├── concepts/global-error/page.tsx            # 6 trigger
        └── admin/page.tsx                            # 23
```

## Demos in slide order

| #  | URL | Concept | What to do / observe |
|----|-----|---------|----------------------|
| 1  | `/` | `page.tsx` | Index of all demos. Stats come from `/api/stats` |
| 2  | `/courses/999`, `/nope` | `not-found.tsx` | Segment 404 (with navbar) vs root 404 (no navbar) |
| 3  | `/students` | `loading.tsx` | Refresh: skeleton for 1.5 s, then the list |
| 4  | `/concepts/server-client` | Server vs Client | Server fetches, a `'use client'` leaf filters while you type |
| 5  | `/students?fail=1` | `error.tsx` | Error box, Try again (`retry()`). Also stop the backend and open `/students` |
| 6  | `/concepts/global-error` | `global-error.tsx` | Click Crash, close the dev overlay (Esc), then Try again |
| 7  | `/dashboard` | Nested layouts | RootLayout → (main) layout → DashboardLayout → Page |
| 8  | `/courses/<id>` | Metadata | Tab title = course name (`generateMetadata`) |
| 9  | `/playground/a` ↔ `/playground/b` | `template` vs `layout` | Layout counter keeps its value, template counter resets |
| 10 | `/dashboard/settings` (refresh) | `default.tsx` | `@courses` shows its default.tsx |
| 11 | `/dashboard/settings` | Nested routes | root segment → `dashboard` → `settings` (leaf) |
| 12 | `/courses/<id>`, `/students/<id>` | Dynamic routes | `await params`. Students: logged out → 401, admin → 403 message |
| 13 | `/help/a/b/c`, `/archive`, `/archive/2025/10` | Catch-all / optional catch-all | `slug` is an array. `/help` is a 404, `/archive` is not |
| 14 | `/courses/new`, `/courses/999`, `/courses/5/students` | Route priority | static > dynamic > catch-all. Each page prints its file |
| 15 | `/students?search=sara`, `/courses?search=web` | Search params | Filtered on the server: "Showing X of Y" |
| 16 | `/courses/new` (as admin) | Navigation | `<Link>`, active NavLink, `router.push` + `router.refresh`, `redirect()` |
| 17 | `/api/stats` | Route Handlers | JSON `{ students, courses }` |
| 18 | `/dashboard` (logged out) | `proxy.ts` | Redirect to `/login?from=/dashboard` |
| 19 | `/_private` | Private folders | 404 even though `page.tsx` exists |
| 20 | `/login`, `/register` | Route groups | `(auth)` layout, no navbar, no `(auth)` in the URL |
| 21 | `/dashboard` | Parallel routes | `@profile` + `@courses`, each with its own loading.tsx |
| 22 | `/courses` → click a course | Intercepting routes | Modal over the list. Refresh → full page |
| 23 | `/admin` | Role-based page | Admin sees "Admin area". Student → `/dashboard?msg=admin-only` |

**Gotcha (#22):** interception is checked *before* route priority. A `<Link>` from `/courses` to
`/courses/new` would be caught by `@modal/(.)[id]`. That's why those links are plain `<a>` tags.

## Scripts

```bash
npm run dev     # dev server on 3001
npm run build   # production build
npm start       # serve the build on 3001
npm run lint
```
