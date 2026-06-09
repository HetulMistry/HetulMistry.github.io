import fs from "node:fs/promises";
import "dotenv/config";

const repos = {
  "portfolio-website": "HetulMistry/HetulMistry.github.io",
  "subscription-tracker": "HetulMistry/subscription-tracker",
  "notion-clone": "HetulMistry/notion-clone",
  "url-shortener": "HetulMistry/URL-Shortener",
};

const output = {};

for (const [projectId, repo] of Object.entries(repos)) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repo}/commits?per_page=3`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${process.env.GH_PAT}`,
        },
      },
    );

    if (!response.ok) {
      console.error(`Failed: ${repo}`, response.status, response.statusText);
      const text = await response.text();
      console.error(text);
      continue;
    }

    const commits = await response.json();

    output[projectId] = commits.map((commit) => ({
      hash: commit.sha.slice(0, 7),
      message: commit.commit.message.split("\n")[0],
    }));
  } catch (error) {
    console.error(repo, error);
  }
}

const fileContent = `
export interface GeneratedCommit {
  hash: string;
  message: string;
}

// AUTO-GENERATED FILE
// DO NOT EDIT

export const generatedCommits: Record<string, GeneratedCommit[]> = ${JSON.stringify(output, null, 2)};
`;

await fs.writeFile("src/data/generated-project-commits.ts", fileContent);

console.log("✓ generated commits");
