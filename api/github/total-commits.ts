import type { VercelRequest, VercelResponse } from "@vercel/node";

const REPOS = [
  "HetulMistry/HetulMistry.github.io",
  "HetulMistry/subscription-tracker",
  "HetulMistry/notion-clone",
  "HetulMistry/URL-Shortener",
] as const;

interface Contributor {
  login: string;
  contributions: number;
}

async function getRepoCommitCount(
  repo: string,
  username: string,
  token: string | undefined,
): Promise<number> {
  console.log("[total-commits] fetching contributors for", repo);

  const baseHeaders: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "Portfolio-API",
  };
  const url = `https://api.github.com/repos/${repo}/contributors?per_page=100&anon=1`;

  let response = await fetch(url, {
    headers: token
      ? { ...baseHeaders, Authorization: `Bearer ${token}` }
      : baseHeaders,
  });

  // A configured GH_PAT that is missing, expired, revoked, or has the wrong
  // scopes will get a 401/403 here. Retry unauthenticated instead of
  // reporting 0 for every repo - public repo data doesn't need a token.
  if (
    !response.ok &&
    token &&
    (response.status === 401 || response.status === 403)
  ) {
    console.error(
      `[total-commits] GH_PAT rejected for ${repo} (${response.status}); retrying unauthenticated`,
    );
    response = await fetch(url, { headers: baseHeaders });
  }

  if (!response.ok) {
    console.error(`Failed fetching contributors for ${repo}:`, response.status);
    return 0;
  }

  const contributors = (await response.json()) as Contributor[];
  console.log(
    "[total-commits] received",
    contributors.length,
    "contributors for",
    repo,
  );

  const user = contributors.find(
    (contributor) => contributor.login.toLowerCase() === username.toLowerCase(),
  );

  return user?.contributions ?? 0;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  console.log("[total-commits] handler invoked with method", req.method);
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const token = process.env.GH_PAT;
  console.log("[total-commits] GH_PAT present?", !!token);

  try {
    const username = "HetulMistry";
    console.log(
      "[total-commits] fetching commit counts for",
      REPOS.length,
      "repos",
    );

    const counts = await Promise.all(
      REPOS.map((repo) => getRepoCommitCount(repo, username, token)),
    );
    console.log("[total-commits] counts received", counts);

    const totalCommits = counts.reduce((sum, count) => sum + count, 0);

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=1800, stale-while-revalidate=3600",
    );

    res.status(200).json({
      username,
      totalCommits,
      reposChecked: REPOS.length,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch commit count",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
