import { AnimatePresence, m } from "framer-motion";
import {
  ChevronRight,
  ExternalLink,
  GitBranch,
  GitCommitHorizontal,
} from "lucide-react";
import { useCallback, useState } from "react";

import { Tree } from "@/components/ui/file-tree";
import type { TreeViewElement } from "@/components/ui/file-tree";
import { generatedCommits } from "@/data/generated-project-commits";
import { type Project, categories } from "@/data/projects";

const projectMap = new Map<string, Project>(
  categories.flatMap((c) => c.projects.map((p) => [p.id, p])),
);

const DEFAULT_PROJECT_ID = categories[0].projects[0].id;
const ALL_FOLDER_IDS = categories.map((c) => c.id);

const treeElements: TreeViewElement[] = categories.map((cat) => ({
  id: cat.id,
  name: cat.label,
  type: "folder" as const,
  isSelectable: false,
  children: cat.projects.map((p) => ({
    id: p.id,
    name: p.filename,
    isSelectable: true,
  })),
}));

function StatusBadge({ status }: { status: Project["status"] }) {
  if (status === "live")
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-300">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Live
      </span>
    );

  if (status === "working")
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md border border-sky-400/20 bg-sky-400/10 px-2.5 py-1 text-xs font-semibold text-sky-300">
        <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
        In progress
      </span>
    );

  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/4 px-2.5 py-1 text-xs font-semibold text-slate-400">
      Soon
    </span>
  );
}

function TerminalBar({ path }: { path: string }) {
  return <WindowHeader path={path} showDots />;
}

function WindowHeader({
  path,
  showDots = false,
}: {
  path: string;
  showDots?: boolean;
}) {
  return (
    <div className="flex h-12.25 items-center gap-3 border-b border-white/8 bg-white/2 px-4">
      {showDots && (
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
      )}
      <span className="font-mono text-xs text-slate-500 select-none truncate">
        {path}
      </span>
    </div>
  );
}

function ProjectDetails({ project }: { project: Project }) {
  const repoLabel = project.repo
    ? project.repo.replace("https://github.com/", "")
    : "GitHub";

  return (
    <div className="flex h-full flex-col">
      <WindowHeader path={`~/${project.id}/${project.filename}`} />

      <AnimatePresence mode="wait">
        <m.div
          key={project.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="flex-1 overflow-y-auto p-6"
        >
          {" "}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              {project.featured && (
                <span className="mb-2 inline-flex rounded-md border border-sky-400/20 bg-sky-400/10 px-2 py-0.5 text-xs font-medium text-sky-300">
                  Featured
                </span>
              )}
              <h3 className="font-[Space_Grotesk] text-2xl font-semibold leading-tight text-white">
                {project.title}
              </h3>
            </div>
            <StatusBadge status={project.status} />
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            {project.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="skill-chip">
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-6">
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-slate-600">
              $ git log --oneline
            </p>
            <div className="space-y-2">
              {(
                generatedCommits[project.id as keyof typeof generatedCommits] ??
                []
              ).map((c) => (
                <div key={c.hash} className="flex items-center gap-2.5">
                  <GitCommitHorizontal
                    size={13}
                    className="shrink-0 text-slate-600"
                  />
                  <span className="shrink-0 font-mono text-xs text-sky-400/80">
                    {c.hash}
                  </span>
                  <span className="truncate font-mono text-xs text-slate-400">
                    {c.message}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            {project.status === "live" && project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Live Demo
                <ExternalLink size={14} />
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/4 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/8"
              >
                <GitBranch size={14} />
                {repoLabel}
              </a>
            )}
          </div>
        </m.div>
      </AnimatePresence>
    </div>
  );
}

function DesktopExplorer() {
  const [selectedId, setSelectedId] = useState<string>(DEFAULT_PROJECT_ID);
  const selectedProject =
    projectMap.get(selectedId) ?? projectMap.get(DEFAULT_PROJECT_ID)!;

  const handleSelectChange = useCallback((id: string | undefined) => {
    if (id && projectMap.has(id)) setSelectedId(id);
  }, []);

  return (
    <div
      className="surface-card overflow-hidden rounded-lg"
      style={{ minHeight: 520 }}
    >
      <div className="flex" style={{ minHeight: 520 }}>
        <div
          className="flex flex-col border-r border-white/8"
          style={{ width: 256, flexShrink: 0 }}
        >
          <TerminalBar path="~/HetulMistry/projects" />
          <div className="flex-1 overflow-y-auto px-2 pt-8 pb-4">
            <Tree
              elements={treeElements}
              sort="none"
              initialSelectedId={DEFAULT_PROJECT_ID}
              initialExpandedItems={ALL_FOLDER_IDS}
              onSelectChange={handleSelectChange}
              className="w-full"
            />
          </div>
        </div>
        <div className="relative flex flex-1 flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            <ProjectDetails project={selectedProject} />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function MobileAccordion() {
  const [openId, setOpenId] = useState<string | null>(DEFAULT_PROJECT_ID);

  const toggle = useCallback(
    (id: string) => setOpenId((prev) => (prev === id ? null : id)),
    [],
  );

  return (
    <div className="space-y-2">
      {categories.flatMap((cat) =>
        cat.projects.map((project) => {
          const isOpen = openId === project.id;
          const panelId = `mobile-panel-${project.id}`;
          const headingId = `mobile-heading-${project.id}`;

          return (
            <div
              key={project.id}
              className="surface-card overflow-hidden rounded-lg"
            >
              <button
                id={headingId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                type="button"
                onClick={() => toggle(project.id)}
                className="flex w-full items-center gap-3 px-4 py-4 text-left"
              >
                <span className="font-mono text-xs text-slate-600 select-none">
                  {project.filename.split(".").pop()}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-[Space_Grotesk] text-sm font-semibold text-white truncate">
                    {project.title}
                  </p>
                  <p className="mt-0.5 font-mono text-xs text-slate-500 truncate">
                    {project.tagline}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <StatusBadge status={project.status} />
                  <ChevronRight
                    size={15}
                    className="text-slate-600 transition-transform duration-150"
                    style={{ transform: isOpen ? "rotate(90deg)" : "none" }}
                  />
                </div>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <m.div
                    id={panelId}
                    role="region"
                    aria-labelledby={headingId}
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-white/8 px-4 pb-5 pt-4">
                      <p className="text-sm leading-7 text-slate-400">
                        {project.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span key={tech} className="skill-chip">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="mt-5">
                        <p className="mb-2.5 font-mono text-xs text-slate-600">
                          $ git log --oneline
                        </p>
                        <div className="space-y-1.5">
                          {(
                            generatedCommits[
                              project.id as keyof typeof generatedCommits
                            ] ?? []
                          ).map((c) => (
                            <div
                              key={c.hash}
                              className="flex items-center gap-2"
                            >
                              <GitCommitHorizontal
                                size={12}
                                className="shrink-0 text-slate-600"
                              />
                              <span className="shrink-0 font-mono text-xs text-sky-400/80">
                                {c.hash}
                              </span>
                              <span className="truncate font-mono text-xs text-slate-400">
                                {c.message}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-5 flex flex-wrap gap-2.5">
                        {project.status === "live" && project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
                          >
                            Live Demo
                            <ExternalLink size={13} />
                          </a>
                        )}
                        {project.repo && (
                          <a
                            href={project.repo}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/4 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/8"
                          >
                            <GitBranch size={13} />
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          );
        }),
      )}
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-shell">
      <div className="mx-auto max-w-7xl px-6">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="section-heading"
        >
          <span className="section-kicker">Projects</span>
          <h2>Selected work with a clear engineering signal.</h2>
          <p>
            A small set of projects showing backend design, frontend execution,
            and open-source exploration. Browse the explorer or tap a file to
            read more.
          </p>
        </m.div>
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="hidden md:block"
        >
          <DesktopExplorer />
        </m.div>
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="md:hidden"
        >
          <MobileAccordion />
        </m.div>
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mt-8"
        >
          <a
            href="https://github.com/HetulMistry?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/4 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/8"
          >
            <GitBranch size={17} />
            View all repositories
            <ExternalLink size={15} />
          </a>
        </m.div>
      </div>
    </section>
  );
}
