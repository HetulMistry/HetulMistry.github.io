import { AnimatePresence, m } from "framer-motion";
import {
  ExternalLink,
  GitBranch,
  GitCommitHorizontal,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { useCallback, useState } from "react";
import { Tree, Folder, File } from "@/components/ui/file-tree";
import { Safari } from "@/components/ui/safari";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { portfolioData, type Project } from "@/data/portfolioData";
import { useActivityData, type ActivityCommit } from "@/hooks/useActivityData";
import { ProjectArchitectureExplorer } from "@/components/ProjectArchitectureExplorer";

const { categories } = portfolioData.projectsSection;

const projectMap = new Map<string, Project>(
  categories.flatMap((c) => c.projects.map((p) => [p.id, p])),
);
const DEFAULT_PROJECT_ID = categories[0].projects[0].id;
const ALL_FOLDER_IDS = categories.map((c) => c.id);

const SCREEN = {
  left: `${(1 / 1203) * 100}%`,
  top: `${(52 / 753) * 100}%`,
  width: `${(1200 / 1203) * 100}%`,
  height: `${(700 / 753) * 100}%`,
};
const TRANSPARENT =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

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

function SafariBrowser({ project }: { project: Project }) {
  const [iframeKey, setIframeKey] = useState(0);
  const hasDemoUrl = project.status === "live" && !!project.demo;
  const displayUrl = hasDemoUrl
    ? project.demo!.replace(/^https?:\/\//, "")
    : `hetulmistry.tech/${project.id}`;

  return (
    <div className="relative w-full" style={{ aspectRatio: "1203/753" }}>
      <div
        className="absolute overflow-hidden"
        style={{
          zIndex: 5,
          left: SCREEN.left,
          top: SCREEN.top,
          width: SCREEN.width,
          height: SCREEN.height,
          borderRadius: "0 0 11px 11px",
        }}
      >
        {hasDemoUrl ? (
          <iframe
            key={iframeKey}
            src={project.demo}
            className="h-full w-full border-0 bg-slate-900"
            title={`${project.title} live preview`}
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-5 bg-[#0b1120] p-10 text-center">
            <StatusBadge status={project.status} />
            <p className="font-[Space_Grotesk] text-lg font-semibold text-white">
              {project.title}
            </p>
            <p className="max-w-sm text-sm leading-6 text-slate-400">
              {project.description}
            </p>
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/4 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/8"
              >
                <GitBranch size={13} />
                View on GitHub
              </a>
            )}
          </div>
        )}
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{ zIndex: 10 }}
      >
        <Safari
          url={displayUrl}
          imageSrc={TRANSPARENT}
          style={{ aspectRatio: "unset", width: "100%", height: "100%" }}
        />
      </div>
      {hasDemoUrl && (
        <div className="absolute bottom-3 right-3 z-20 flex gap-1.5">
          <button
            onClick={() => setIframeKey((k) => k + 1)}
            title="Reload preview"
            className="flex items-center gap-1 rounded border border-white/10 bg-black/60 px-2 py-1 text-xs text-slate-300 backdrop-blur transition hover:bg-black/80 hover:text-white"
          >
            <RotateCcw size={10} />
            Reload
          </button>
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 rounded border border-white/10 bg-black/60 px-2 py-1 text-xs text-slate-300 backdrop-blur transition hover:bg-black/80 hover:text-white"
          >
            <ExternalLink size={10} />
            Open
          </a>
        </div>
      )}
    </div>
  );
}

function CommitLog({
  commits,
  isLoading,
}: {
  commits: ActivityCommit[];
  isLoading: boolean;
}) {
  if (isLoading && commits.length === 0)
    return (
      <p className="font-mono text-xs text-slate-500">
        Loading repository activity…
      </p>
    );
  if (commits.length === 0)
    return (
      <p className="font-mono text-xs text-slate-500">
        Repository activity unavailable.
      </p>
    );
  return (
    <div className="space-y-2">
      {commits.map((c) => (
        <div key={c.hash} className="flex items-center gap-2.5">
          <GitCommitHorizontal size={13} className="shrink-0 text-slate-600" />
          <span className="shrink-0 font-mono text-xs text-sky-400/80">
            {c.hash}
          </span>
          <span className="truncate font-mono text-xs text-slate-400">
            {c.message}
          </span>
        </div>
      ))}
    </div>
  );
}

function CollapsibleArchitecture({ projectId }: { projectId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-6 border-t border-white/8 pt-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between font-mono text-xs font-semibold uppercase tracking-widest text-slate-600 transition hover:text-slate-400"
      >
        <span>Architecture</span>
        <ChevronRight
          size={14}
          className="transition-transform duration-200"
          style={{ transform: isOpen ? "rotate(90deg)" : "none" }}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-4 overflow-hidden"
          >
            <ProjectArchitectureExplorer projectId={projectId} />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectDetails({
  project,
  commits,
  isLoading,
}: {
  project: Project;
  commits: ActivityCommit[];
  isLoading: boolean;
}) {
  const repoLabel = project.repo
    ? project.repo.replace("https://github.com/", "")
    : "GitHub";

  return (
    <AnimatePresence mode="wait">
      <m.div
        key={project.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="flex h-full flex-col overflow-hidden"
      >
        <div className="flex-1 overflow-y-auto p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              {project.featured && (
                <span className="mb-2 inline-flex rounded-md border border-sky-400/20 bg-sky-400/10 px-2 py-0.5 text-xs font-medium text-sky-300">
                  Featured
                </span>
              )}
              <h3 className="font-[Space_Grotesk] text-xl font-semibold leading-tight text-white">
                {project.title}
              </h3>
            </div>
            <StatusBadge status={project.status} />
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-400 line-clamp-3">
            {project.description}
          </p>
          <div className="my-5 overflow-hidden rounded-lg border border-white/8 bg-white/2">
            <SafariBrowser project={project} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="skill-chip">
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-5">
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-slate-600">
              $ git log --oneline
            </p>
            <CommitLog commits={commits} isLoading={isLoading} />
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {project.status === "live" && project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Live Demo <ExternalLink size={14} />
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/4 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/8"
              >
                <GitBranch size={14} /> {repoLabel}
              </a>
            )}
          </div>
          <CollapsibleArchitecture projectId={project.id} />
        </div>
      </m.div>
    </AnimatePresence>
  );
}

function DesktopExplorer() {
  const [selectedId, setSelectedId] = useState<string>(DEFAULT_PROJECT_ID);
  const { data: activityData, isLoading } = useActivityData();
  const selectedProject =
    projectMap.get(selectedId) ?? projectMap.get(DEFAULT_PROJECT_ID)!;

  const handleSelect = useCallback((id: string) => {
    if (projectMap.has(id)) setSelectedId(id);
  }, []);

  return (
    <div
      className="surface-card overflow-hidden rounded-lg"
      style={{ minHeight: 580 }}
    >
      <div className="flex" style={{ minHeight: 580 }}>
        <div
          className="flex flex-col border-r border-white/8"
          style={{ width: 256, flexShrink: 0 }}
        >
          <div className="flex h-12 items-center gap-3 border-b border-white/8 bg-white/2 px-4">
            <div className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="font-mono text-xs text-slate-500 select-none truncate">
              ~/{portfolioData.personal.githubUsername}/projects
            </span>
          </div>
          <div className="flex-1 overflow-hidden py-3">
            <Tree
              initialSelectedId={DEFAULT_PROJECT_ID}
              initialExpandedItems={ALL_FOLDER_IDS}
              sort="none"
              className="text-sm"
            >
              {categories.map((cat) => (
                <Folder key={cat.id} value={cat.id} element={cat.label}>
                  {cat.projects.map((p) => (
                    <ContextMenu key={p.id}>
                      <ContextMenuTrigger asChild>
                        <File
                          value={p.id}
                          handleSelect={handleSelect}
                          className={
                            selectedId === p.id
                              ? "bg-sky-400/10 text-white"
                              : "text-slate-400 hover:text-slate-200"
                          }
                        >
                          <span className="truncate font-mono text-xs">
                            {p.filename}
                          </span>
                        </File>
                      </ContextMenuTrigger>
                      <ContextMenuContent className="border-white/8 bg-dark-900/95 backdrop-blur">
                        <ContextMenuItem
                          onSelect={() => handleSelect(p.id)}
                          className="text-slate-200 focus:bg-white/8 focus:text-white"
                        >
                          Select project
                        </ContextMenuItem>
                        {p.status === "live" && p.demo && (
                          <>
                            <ContextMenuSeparator className="bg-white/8" />
                            <ContextMenuItem
                              onSelect={() => window.open(p.demo, "_blank")}
                              className="text-slate-200 focus:bg-white/8 focus:text-white"
                            >
                              Open demo{" "}
                              <ExternalLink
                                size={12}
                                className="ml-auto opacity-50"
                              />
                            </ContextMenuItem>
                            <ContextMenuItem
                              onSelect={() =>
                                navigator.clipboard.writeText(p.demo!)
                              }
                              className="text-slate-200 focus:bg-white/8 focus:text-white"
                            >
                              Copy demo URL
                            </ContextMenuItem>
                          </>
                        )}
                        {p.repo && (
                          <>
                            <ContextMenuSeparator className="bg-white/8" />
                            <ContextMenuItem
                              onSelect={() => window.open(p.repo, "_blank")}
                              className="text-slate-200 focus:bg-white/8 focus:text-white"
                            >
                              View on GitHub{" "}
                              <ExternalLink
                                size={12}
                                className="ml-auto opacity-50"
                              />
                            </ContextMenuItem>
                          </>
                        )}
                      </ContextMenuContent>
                    </ContextMenu>
                  ))}
                </Folder>
              ))}
            </Tree>
          </div>
        </div>
        <div className="relative flex flex-1 flex-col overflow-hidden">
          <ProjectDetails
            project={selectedProject}
            commits={activityData[selectedProject.id] ?? []}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

function MobileAccordion() {
  const [openId, setOpenId] = useState<string | null>(DEFAULT_PROJECT_ID);
  const { data: activityData, isLoading } = useActivityData();
  const toggle = useCallback(
    (id: string) => setOpenId((prev) => (prev === id ? null : id)),
    [],
  );

  return (
    <div className="space-y-2">
      {categories.flatMap((cat) =>
        cat.projects.map((project) => {
          const isOpen = openId === project.id;
          const commits = activityData[project.id] ?? [];

          return (
            <div
              key={project.id}
              className="surface-card overflow-hidden rounded-lg"
            >
              <button
                type="button"
                aria-expanded={isOpen}
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
                      <div className="mt-4">
                        <p className="mb-2 font-mono text-xs text-slate-600">
                          $ git log --oneline
                        </p>
                        <CommitLog commits={commits} isLoading={isLoading} />
                      </div>
                      <CollapsibleArchitecture projectId={project.id} />
                      <div className="mt-5 flex flex-wrap gap-2.5">
                        {project.status === "live" && project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
                          >
                            Live Demo <ExternalLink size={13} />
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
          <span className="section-kicker">
            {portfolioData.projectsSection.title}
          </span>
          <h2>{portfolioData.projectsSection.subtitle}</h2>
          <p>{portfolioData.projectsSection.description}</p>
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
            href={`${portfolioData.personal.githubProfileUrl}?tab=repositories`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/4 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/8"
          >
            <GitBranch size={17} />
            {portfolioData.projectsSection.viewAllReposText}
            <ExternalLink size={15} />
          </a>
        </m.div>
      </div>
    </section>
  );
}
