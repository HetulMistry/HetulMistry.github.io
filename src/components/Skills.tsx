import { m } from "framer-motion";
import { Braces, Database, GitBranch, LayoutTemplate } from "lucide-react";
import type { ReactNode } from "react";
import { Pointer } from "@/components/ui/pointer";

interface SkillCategory {
  title: string;
  icon: ReactNode;
  description: string;
  skills: string[];
  pointerColor: string;
}

const categories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: <LayoutTemplate size={18} />,
    description:
      "Interfaces with clean component structure and responsive behavior.",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Three.js",
      "HTML",
      "CSS",
    ],
    pointerColor: "#38bdf8",
  },
  {
    title: "Backend",
    icon: <Database size={18} />,
    description:
      "APIs, authentication flows, data modeling, and backend logic.",
    skills: [
      "Node.js",
      "Express",
      "Firebase",
      "REST APIs",
      "SQL",
      "MongoDB",
      "Auth",
    ],
    pointerColor: "#34d399",
  },
  {
    title: "Programming",
    icon: <Braces size={18} />,
    description:
      "Core programming, problem solving, and data structure fundamentals.",
    skills: [
      "JavaScript",
      "TypeScript",
      "Python",
      "C++",
      "Data Structures",
      "OOP",
    ],
    pointerColor: "#a78bfa",
  },
  {
    title: "Workflow",
    icon: <GitBranch size={18} />,
    description: "Developer tooling and concepts that keep projects reliable.",
    skills: [
      "Git",
      "GitHub",
      "Vite",
      "System Design",
      "AI / ML Basics",
      "CI/CD",
      "Docker",
    ],
    pointerColor: "#f59e0b",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section-shell">
      <div className="mx-auto max-w-7xl px-6">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="section-heading"
        >
          <span className="section-kicker">Skills</span>
          <h2>Tools I use to build across the stack.</h2>
          <p>
            A focused snapshot of the technologies I use most often, grouped by
            how I apply them in projects.
          </p>
        </m.div>
        <div className="grid gap-4 md:grid-cols-2">
          {categories.map((category, index) => (
            <m.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="surface-card relative rounded-lg p-6 overflow-hidden"
            >
              <Pointer>
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-dark-900/95 text-white shadow-2xl backdrop-blur-md"
                  style={{ color: category.pointerColor }}
                >
                  {category.icon}
                </div>
              </Pointer>
              <div className="flex items-start gap-4">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/4"
                  style={{ color: category.pointerColor }}
                >
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-[Space_Grotesk] text-xl font-semibold text-white">
                    {category.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {category.description}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="skill-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
