export interface ActivityCommit {
  hash: string;
  message: string;
}

export interface ActivityData {
  [projectId: string]: ActivityCommit[];
}

export const fallbackActivityData: ActivityData = {
  "portfolio-website": [
    {
      hash: "c163566",
      message: "feat: implement write on text effect in hero section",
    },
    {
      hash: "eb5d2ef",
      message: "fix: remove external PAT dependency from commit workflow",
    },
    {
      hash: "2a4c1d8",
      message: "refactor: optimize three.js hero scene performance",
    },
  ],
  "subscription-tracker": [
    {
      hash: "03e422c",
      message: "fix: update footer url for portfolio",
    },
    {
      hash: "b4f00de",
      message: "fix: enable color mode toggle using palette configuration",
    },
    {
      hash: "32ac048",
      message:
        "feat: enable color mode and user color mode toggle in MkDocs theme configuration",
    },
  ],
  "notion-clone": [
    {
      hash: "1718391",
      message:
        "Merge pull request #3 from HetulMistry/dependabot/npm_and_yarn/next-16.2.7",
    },
    {
      hash: "480a14f",
      message: "chore: upgrade next.js to 16.2.7",
    },
    {
      hash: "9b11908",
      message:
        "Merge pull request #2 from HetulMistry/dependabot/npm_and_yarn/diff-5.2.2",
    },
  ],
  "url-shortener": [
    {
      hash: "725768e",
      message:
        "feat: implement full backend stack including authentication, URL shortener logic, analytics, logging, and test suites",
    },
    {
      hash: "8a09fbc",
      message:
        "feat: initialize backend project with authentication, URL shortening service, and Redis caching support",
    },
    {
      hash: "f7fab6b",
      message:
        "feat: implement core URL management system with CRUD operations, custom aliasing, and analytics tracking",
    },
  ],
};
