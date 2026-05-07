import { motion } from "framer-motion";
import { ExternalLink, GitFork, Star } from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface Project {
  title: string;
  description: string;
  stack: string[];
  link: string;
  stars?: number;
  forks?: number;
  featured?: boolean;
  gradient: string;
}

const projects: Project[] = [
  {
    title: "Subscription Tracker",
    description:
      "A backend-focused project for tracking subscriptions with full CRUD operations, authentication workflows, and database modeling. Built to solidify Node.js and API design skills.",
    stack: ["JavaScript", "Node.js", "Express", "MongoDB"],
    link: "https://github.com/HetulMistry/subscription-tracker",
    forks: 1,
    featured: true,
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "LDP Restaurant System",
    description:
      "A command-line restaurant menu management system built as a university group project. Demonstrates C++ fundamentals, problem solving, and collaborative development.",
    stack: ["C++", "OOP", "File I/O", "CLI"],
    link: "https://github.com/HetulMistry/LDP-Project",
    featured: true,
    gradient: "from-violet-500/20 to-purple-500/20",
  },
  {
    title: "Portfolio Website",
    description:
      "This very portfolio — a modern, animated developer portfolio built with React, TypeScript, Tailwind CSS v4, and Framer Motion. Features glassmorphism, gradient animations, and responsive design.",
    stack: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    link: "https://github.com/HetulMistry/HetulMistry.github.io",
    featured: true,
    gradient: "from-emerald-500/20 to-green-500/20",
  },
  {
    title: "Scrite (Contributor)",
    description:
      "Contributed to Scrite, a crossplatform screenwriting software. Explored large C++ codebases, Qt framework, and open-source collaboration workflows.",
    stack: ["C++", "Qt", "Open Source"],
    link: "https://github.com/HetulMistry/scrite",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative glass-card rounded-3xl overflow-hidden ${
        project.featured ? "md:col-span-1" : ""
      }`}
    >
      {/* Gradient top bar */}
      <div className={`h-1 bg-gradient-to-r ${project.gradient.replace("/20", "")} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Hover gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="relative p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            {project.featured && (
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full mb-3">
                Featured
              </span>
            )}
            <h3 className="text-2xl font-bold text-white font-[Space_Grotesk] group-hover:text-white transition-colors">
              {project.title}
            </h3>
          </div>
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300"
            aria-label={`View ${project.title} on GitHub`}
          >
            <ExternalLink size={16} />
          </a>
        </div>

        {/* Description */}
        <p className="text-slate-400 leading-relaxed mb-6 group-hover:text-slate-300 transition-colors">
          {project.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/5 text-slate-400"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-slate-500 text-sm">
            {project.stars !== undefined && (
              <span className="flex items-center gap-1">
                <Star size={14} /> {project.stars}
              </span>
            )}
            {project.forks !== undefined && (
              <span className="flex items-center gap-1">
                <GitFork size={14} /> {project.forks}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-blue-400 mb-3 block">
            Projects
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold font-[Space_Grotesk] text-white">
            Selected{" "}
            <span className="gradient-text">Work</span>
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-2xl">
            A collection of projects that showcase my skills in full-stack development,
            system design, and collaborative coding.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* View all on GitHub */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/HetulMistry?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 text-white bg-white/5 border border-white/10 rounded-2xl font-semibold hover:bg-white/10 hover:scale-105 transition-all duration-300"
          >
            <FaGithub size={20} />
            View All Repositories
            <ExternalLink size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
