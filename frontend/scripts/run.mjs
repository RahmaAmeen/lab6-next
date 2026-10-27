// Starts Next.js on a free port: 3001, or 5001 if 3001 is already in use.
// Also points API_URL at the backend: the backend moves to 5000 only when 3000
// is taken, so if something answers on 5000 we use that, otherwise 3000.
// An API_URL set in your shell wins over this detection.
//
// Usage: node scripts/run.mjs dev | start
import net from "node:net";
import { spawn } from "node:child_process";

const FRONTEND_PORTS = [3001, 5001];
const BACKEND_FALLBACK = "http://localhost:5000";

// Can we bind to this port? (false = something is already listening on it)
const isFree = (port) =>
  new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", () => resolve(false));
    server.once("listening", () => server.close(() => resolve(true)));
    server.listen(port);
  });

// Is a server answering on this port?
const isListening = (port) =>
  new Promise((resolve) => {
    const socket = net.connect(port, "localhost");
    socket.once("connect", () => { socket.end(); resolve(true); });
    socket.once("error", () => resolve(false));
  });

const mode = process.argv[2] ?? "dev";

let port;
for (const p of FRONTEND_PORTS) {
  if (await isFree(p)) { port = p; break; }
  console.warn(`Port ${p} is already in use, trying the next one...`);
}
if (!port) {
  console.error(`All ports are in use: ${FRONTEND_PORTS.join(", ")}`);
  process.exit(1);
}

const env = { ...process.env };
if (!process.env.API_URL && (await isListening(5000))) {
  env.API_URL = BACKEND_FALLBACK; // overrides .env.local
}
console.log(`Frontend on http://localhost:${port} → backend ${env.API_URL ?? "from .env.local"}`);

const child = spawn("npx", ["next", mode, "-p", String(port)], { stdio: "inherit", env, shell: true });
child.on("exit", (code) => process.exit(code ?? 0));
