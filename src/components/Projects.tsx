import { motion } from "framer-motion";
import { ExternalLink, GitBranch } from "lucide-react";

interface Project {
  title: string;
  description: string;
  stack: string[];
  link: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "Subscription Tracker",
    description:
      "Backend-focused subscription tracking with CRUD flows, authentication structure, and database modeling.",
    stack: ["JavaScript", "Node.js", "Express", "MongoDB"],
    link: "https://github.com/HetulMistry/subscription-tracker",
    featured: true,
  },
  {
    title: "LDP Restaurant System",
    description:
      "A university restaurant menu management system that demonstrates C++ fundamentals, OOP, file handling, and collaborative development.",
    stack: ["C++", "OOP", "File I/O", "CLI"],
    link: "https://github.com/HetulMistry/LDP-Project",
    featured: true,
  },
  {
    title: "Portfolio Website",
    description:
      "A responsive developer portfolio built with React, TypeScript, Tailwind CSS, Framer Motion, and a relevant Three.js hero scene.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Three.js"],
    link: "https://github.com/HetulMistry/HetulMistry.github.io",
  },
  {
    title: "Scrite Contributor Work",
    description:
      "Open-source exploration in a larger C++ and Qt codebase, with attention to collaboration workflows and existing architecture.",
    stack: ["C++", "Qt", "Open Source"],
    link: "https://github.com/HetulMistry/scrite",
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
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-slate-400 transition hover:border-white/20 hover:text-white"
          aria-label={`View ${project.title}`}
        >
          <ExternalLink size={16} />
        </a>
      </div>

      <p className="mt-5 flex-1 text-sm leading-7 text-slate-400">{project.description}</p>

      <div className="mt-7 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span key={tech} className="skill-chip">
            {tech}
          </span>
        ))}
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
            A small set of projects that show backend design, C++ fundamentals,
            frontend execution, and open-source exploration.
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
            className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.08]"
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
