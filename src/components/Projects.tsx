import { motion } from "framer-motion";
import { ExternalLink, GitBranch } from "lucide-react";

interface Project {
  title: string;
  description: string;
  stack: string[];
  repo?: string;
  demo?: string;
  status?: "live" | "soon" | "working";
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "Portfolio Website",
    description:
      "A responsive developer portfolio built with React, TypeScript, Tailwind CSS, Framer Motion, and a relevant Three.js hero scene.",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Three.js",
      "Framer Motion",
      "Shadcn UI",
      "React Three Fiber",
    ],
    repo: "https://github.com/HetulMistry/HetulMistry.github.io",
    demo: "https://hetulmistry.github.io/",
    status: "live",
    featured: true,
  },
  {
    title: "Subscription Tracker",
    description:
      "Backend-focused subscription tracking with CRUD flows, authentication structure, and database modeling.",
    stack: [
      "Express",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "JWT",
      "Rate Limiting",
      "Swagger",
      "QR Code",
      "Zod",
    ],
    repo: "https://github.com/HetulMistry/subscription-tracker",
    demo: "https://subscription-tracker.hetulmistry.tech/",
    status: "live",
    featured: true,
  },
  {
    title: "URL Shortener",
    description:
      "A full-stack URL shortener with user authentication, link management, and analytics dashboard.",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
      "Convex",
      "Clerk",
      "BlockNote",
      "Zustand",
      "Zod",
    ],
    repo: "https://github.com/HetulMistry/URL-Shortener",
    status: "working",
  },
  {
    title: "Notion Clone",
    description:
      "An exploration of frontend architecture and rich text editing by building a Notion-like interface.",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
      "Convex",
      "Clerk",
      "BlockNote",
      "Zustand",
      "Zod",
    ],
    repo: "https://github.com/HetulMistry/notion-clone",
    demo: "https://notionclone.hetulmistry.tech/",
    status: "live",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="surface-card group flex h-full flex-col rounded-lg p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          {project.featured && (
            <span className="mb-3 inline-flex rounded-md border border-sky-400/20 bg-sky-400/10 px-2.5 py-1 text-xs font-medium text-sky-200">
              Featured
            </span>
          )}
          <h3 className="font-[Space_Grotesk] text-2xl font-semibold text-white">
            {project.title}
          </h3>
        </div>
        {/* TODO : Decide too keep it or not */}
        <div className="flex gap-2">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/4 text-slate-400 transition hover:border-white/20 hover:text-white"
              aria-label={`Open repository for ${project.title}`}
            >
              <GitBranch size={16} />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/4 text-slate-400 transition hover:border-white/20 hover:text-white"
              aria-label={`Open live demo for ${project.title}`}
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      <p className="mt-5 flex-1 text-sm leading-7 text-slate-400">
        {project.description}
      </p>

      <div className="mt-7 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span key={tech} className="skill-chip">
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-3">
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
        {project.status === "working" && (
          <span className="inline-flex items-center gap-2 rounded-md border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-200">
            Currently working
          </span>
        )}
        {project.status === "soon" && (
          <span className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/4 px-4 py-2 text-sm font-semibold text-slate-300">
            Coming soon
          </span>
        )}
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/4 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/8"
          >
            GitHub
            <GitBranch size={14} />
          </a>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-shell">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="section-heading"
        >
          <span className="section-kicker">Projects</span>
          <h2>Selected work with a clear engineering signal.</h2>
          <p>
            A small set of projects that show backend design, frontend
            execution, AI/ML, Data Science and open-source exploration.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <motion.div
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
        </motion.div>
      </div>
    </section>
  );
}
