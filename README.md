# Software Project I: Lab 6 / Tutorial 6

A student and course management app used to teach **Next.js App Router routing**.
A NestJS + MongoDB API handles students, courses and JWT auth. A Next.js 16
frontend demonstrates every routing concept from Tutorial 6, including layouts,
dynamic and catch-all routes, parallel and intercepting routes, `proxy.ts`,
Server Actions and role-based pages. Each concept has its own small demo page.

| Folder      | What                                               | Port |
|-------------|----------------------------------------------------|------|
| `Backend/`  | NestJS + MongoDB API (students, courses, JWT auth) | 3000 |
| `frontend/` | Next.js 16 App Router routing demo                 | 3001 |

## Prerequisites

- Node.js 20+
- MongoDB running on `mongodb://localhost:27017` (on Windows, usually the "MongoDB" service; otherwise run `mongod`)

## First-time setup

```bash
# Backend
cd Backend
npm install
cp .env.example .env        # set JWT_SECRET
npm run seed                # 2 courses + 1 student + 1 admin (safe to re-run)

# Frontend
cd ../frontend
npm install
cp .env.example .env.local  # API_URL=http://localhost:3000
```

## Run (two terminals)

```bash
# Terminal 1: backend → http://localhost:3000
cd Backend
npm run start:dev

# Terminal 2: frontend → http://localhost:3001
cd frontend
npm run dev
```

Open **http://localhost:3001**. The home page lists every demo in slide order.

**Ports already in use?** (e.g. an old server is still running)
- The backend tries **3000**, then falls back to **5000**.
- The frontend tries **3001**, then falls back to **5001**. If a backend is running on 5000,
  it uses that one automatically. Start the backend first.
- Each terminal prints the port it actually uses. To free the ports instead, find the old
  process with `netstat -ano | findstr :3000` and stop it with `taskkill /PID <pid> /F`.

## Useful commands

| Where       | Command              | What it does                          |
|-------------|----------------------|---------------------------------------|
| `Backend/`  | `npm run start:dev`  | Start the API with auto-reload on 3000 (or 5000) |
| `Backend/`  | `npm run build`      | Compile to `dist/`                     |
| `Backend/`  | `npm run start:prod` | Run the compiled API (`node dist/main`) |
| `Backend/`  | `npm run seed`       | Reset the demo courses and users       |
| `frontend/` | `npm run dev`        | Start the dev server on 3001 (or 5001) |
| `frontend/` | `npm run build`      | Production build                       |
| `frontend/` | `npm start`          | Serve the production build on 3001 (or 5001) |
| `frontend/` | `npm run lint`       | Run ESLint                             |

## Demo login credentials

| Role    | Email           | Password   |
|---------|-----------------|------------|
| student | student@uni.edu | student123 |
| admin   | admin@uni.edu   | admin123   |

Seeded courses: `SE101 Software Project I` and `WEB201 Web Development`. The student is enrolled in both.

See [`frontend/README.md`](frontend/README.md) for the folder tree and the URL → concept table.
