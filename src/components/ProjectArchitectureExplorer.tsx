import { m } from "framer-motion";
import {
  Database,
  HardDrive,
  Server,
  Shield,
  Sparkles,
  Workflow,
  Code2,
} from "lucide-react";

import { categories } from "@/data/projects";

const layerOrder = [
  "frontend",
  "backend",
  "database",
  "authentication",
  "ai",
  "storage",
  "infrastructure",
] as const;

const layerMeta = {
  frontend: { label: "Frontend", icon: Code2 },
  backend: { label: "Backend", icon: Server },
  database: { label: "Database", icon: Database },
  authentication: { label: "Authentication", icon: Shield },
  ai: { label: "AI Layer", icon: Sparkles },
  storage: { label: "Storage", icon: HardDrive },
  infrastructure: { label: "Infrastructure", icon: Workflow },
} as const;

const projectMap = new Map(
  categories.flatMap((category) =>
    category.projects.map((project) => [project.id, project]),
  ),
);

export function ProjectArchitectureExplorer({
  projectId,
}: {
  projectId: string;
}) {
  const project = projectMap.get(projectId);

  if (!project?.architecture) return null;

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        {layerOrder.map((layer) => {
          const entries = project.architecture?.[layer];
          if (!entries || entries.length === 0) return null;

          const Icon = layerMeta[layer].icon;

          return (
            <m.div
              key={layer}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              className="surface-card rounded-lg p-4"
            >
              <div className="mb-3 flex items-center gap-2 text-slate-200">
                <Icon size={16} className="text-sky-300" />
                <h3 className="text-sm font-semibold">
                  {layerMeta[layer].label}
                </h3>
              </div>
              <div className="space-y-2">
                {entries.map((entry) => (
                  <div
                    key={entry}
                    className="flex items-start gap-2 rounded-md border border-white/5 bg-white/2 px-3 py-2"
                  >
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />
                    <span className="text-sm text-slate-300">{entry}</span>
                  </div>
                ))}
              </div>
            </m.div>
          );
        })}
      </div>
    </div>
  );
}
