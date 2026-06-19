/**
 * Local development mock API server
 *
 * This server emulates Vercel Functions for local development.
 * Run this alongside Vite: `node scripts/mock-api-server.js`
 *
 * The Vite proxy (in vite.config.ts) forwards /api/* requests to localhost:3000
 */

import http from "http";

const PORT = 3000;

// Mock commit count - update this for testing
// In production, the real Vercel Function fetches this from GitHub
const MOCK_TOTAL_COMMITS = 450;

const routes = {
  "/api/github/total-commits": (req, res) => {
    if (req.method !== "GET") {
      res.writeHead(405, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Method not allowed" }));
      return;
    }

    res.writeHead(200, {
      "Content-Type": "application/json",
      "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
    });

    res.end(
      JSON.stringify({
        username: "HetulMistry",
        totalCommits: MOCK_TOTAL_COMMITS,
        reposChecked: 4,
      }),
    );
  },
};

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  const handler = routes[req.url];
  if (handler) {
    handler(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`\n✓ Mock API server running on http://localhost:${PORT}`);
  console.log(`  → GET /api/github/total-commits (returns mock data)`);
  console.log(`\nMake sure vite.config.ts has the proxy configured.\n`);
});
