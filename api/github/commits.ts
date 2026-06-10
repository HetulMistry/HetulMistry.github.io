import type { VercelRequest, VercelResponse } from "@vercel/node";

interface GitHubCommit {
  sha: string;
  author?: {
    login?: string;
  };
  commit: {
    message: string;
    author?: {
      name?: string;
    };
  };
}

interface ActivityCommit {
  hash: string;
  message: string;
}

interface ActivityData {
  [projectId: string]: ActivityCommit[];
}

const PROJECTS = {
  "portfolio-website": "HetulMistry/HetulMistry.github.io",
  "subscription-tracker": "HetulMistry/subscription-tracker",
  "notion-clone": "HetulMistry/notion-clone",
  "url-shortener": "HetulMistry/URL-Shortener",
} as const;

const IGNORED_BOT_AUTHORS = [
  "github-actions[bot]",
  "dependabot[bot]",
  "renovabot[bot]",
  "renovate[bot]",
];

const IGNORED_MESSAGE_PATTERNS = [
  /^chore: update project commit data/i,
  /^chore: update dependencies/i,
  /^(renovate|dependabot):/i,
];

function isBotCommit(commit: GitHubCommit): boolean {
  const authorName = commit.commit?.author?.name || "";
  const authorLogin = commit.author?.login || "";
  const message = commit.commit?.message || "";

  if (
    IGNORED_BOT_AUTHORS.some(
      (bot) => authorName.includes(bot) || authorLogin.includes(bot),
    )
  )
    return true;

  if (IGNORED_MESSAGE_PATTERNS.some((pattern) => pattern.test(message)))
    return true;

  return false;
}

async function fetchRepoCommits(
  repo: string,
  token: string,
): Promise<ActivityCommit[]> {
  const url = `https://api.github.com/repos/${repo}/commits?per_page=10`;

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 10000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "HetulMistry-Portfolio/1.0",
      },
    });

    clearTimeout(timeout);

    if (!response.ok)
      throw new Error(`Failed to fetch ${repo}: ${response.status}`);

    const commits = (await response.json()) as GitHubCommit[];

    return commits
      .filter((commit) => !isBotCommit(commit))
      .slice(0, 3)
      .map((commit) => ({
        hash: commit.sha.slice(0, 7),
        message: commit.commit.message.split("\n")[0],
      }));
  } finally {
    clearTimeout(timeout);
  }

  //   if (!response.ok) {
  //     console.error(
  //       `GitHub API error for ${repo}: ${response.status} ${response.statusText}`,
  //     );
  //     throw new Error(`Failed to fetch ${repo}: ${response.status}`);
  //   }

  //   const commits = (await response.json()) as GitHubCommit[];

  //   const filtered = commits
  //     .filter((commit) => !isBotCommit(commit))
  //     .slice(0, 3)
  //     .map((commit) => ({
  //       hash: commit.sha.slice(0, 7),
  //       message: commit.commit.message.split("\n")[0],
  //     }));

  //   return filtered;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const gitHubToken = process.env.GH_PAT;

  if (!gitHubToken) {
    console.error("GITHUB_TOKEN environment variable not set");
    res.status(500).json({ error: "GitHub token not configured" });
    return;
  }

  try {
    const activityData: ActivityData = {};

    const promises = Object.entries(PROJECTS).map(async ([projectId, repo]) => {
      try {
        const commits = await fetchRepoCommits(repo, gitHubToken);
        return { projectId, commits };
      } catch (error) {
        console.error(`Error fetching ${projectId}:`, error);
        return { projectId, commits: [] };
      }
    });

    const results = await Promise.all(promises);

    for (const { projectId, commits } of results)
      activityData[projectId] = commits;

    res.setHeader(
      "Cache-Control",
      "public, max-age=1800, s-maxage=1800, stale-while-revalidate=3600",
    );
    res.setHeader("Content-Type", "application/json");

    res.status(200).json(activityData);
  } catch (error) {
    console.error("Error in commits handler:", error);

    res.setHeader("Cache-Control", "public, max-age=300");
    res.status(500).json({
      error: "Failed to fetch commits",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
