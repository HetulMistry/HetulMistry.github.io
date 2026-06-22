// Re-export types and data from the central portfolioData file.
// All project data now lives in portfolioData.ts.
export type { Project, ProjectCategory as Category } from "./portfolioData";
export { categories } from "./portfolioData";
