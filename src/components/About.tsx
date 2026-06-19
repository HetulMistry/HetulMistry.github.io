import { m } from "framer-motion";
import { Code2, Brain, Rocket } from "lucide-react";
import { useState } from "react";
import { categories } from "@/data/projects";
import { useTotalCommits } from "@/hooks/useTotalCommits";

type AboutSection =
  | "expertise"
  | "interests"
  | "learning"
  | "education"
  | "workStyle";

const developerProfile = {
  name: "Hetul Mistry",
  title: "Full Stack Engineer",
  focus: "Product-oriented development",
  experience: {
    projects: categories.flatMap((category) => category.projects).length,
    repositories: categories
      .flatMap((category) => category.projects)
      .filter((project) => Boolean(project.repo)).length,
  },
  expertise: [
    "React & TypeScript",
    "Backend Systems",
    "Database Design",
    "DevOps & Deployment",
    "AI Integration",
  ],
  currentInterests: [
    "ML deployment pipelines",
    "Data-driven applications",
    "System architecture",
    "Developer experience",
  ],
  learning: [
    "Advanced ML techniques",
    "Distributed systems",
    "Rust fundamentals",
  ],
  education: {
    degree: "B.Tech Computer Science",
    institution: "Silver Oak University",
    focus: "Systems & Algorithms",
  },
  workStyle: {
    approach: "Clean, maintainable code",
    philosophy: "Ship useful products",
    values: ["Code clarity", "User experience", "Engineering excellence"],
  },
};

export default function About() {
  const { totalCommits, isLoading } = useTotalCommits();
  const [expanded, setExpanded] = useState<AboutSection>("expertise");

  const toggleSection = (section: AboutSection) => {
    setExpanded(section);
  };

  return (
    <section id="about" className="section-shell">
      <div className="mx-auto max-w-7xl px-6">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="section-heading"
        >
          <span className="section-kicker">Developer Profile</span>
          <h2>Practical engineering, shipped code</h2>
          <p>
            Building products that matter. Strong foundation across full-stack
            development, systems design, and AI-driven applications.
          </p>
        </m.div>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="surface-card rounded-lg p-6 border border-sky-400/20">
              <div className="mb-4">
                <h3 className="font-[Space_Grotesk] text-2xl font-semibold text-white">
                  {developerProfile.name}
                </h3>
                <p className="text-sm text-sky-400 font-mono mt-1">
                  {developerProfile.title}
                </p>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                {developerProfile.focus}
              </p>
              <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-slate-500">Projects</div>
                  <div className="font-mono font-semibold text-white">
                    {developerProfile.experience.projects}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Repositories</div>
                  <div className="font-mono font-semibold text-white">
                    {developerProfile.experience.repositories}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Commit count</div>
                  <div className="font-mono font-semibold text-white">
                    {isLoading ? "Loading..." : totalCommits.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Open source</div>
                  <div className="font-mono font-semibold text-emerald-400">
                    {developerProfile.experience.repositories > 0
                      ? "Public work available"
                      : "Not available"}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {[
                {
                  icon: <Rocket size={16} />,
                  title: "Product Focus",
                  desc: "Ship usable applications",
                },
                {
                  icon: <Brain size={16} />,
                  title: "Systems Thinking",
                  desc: "Full-stack understanding",
                },
                {
                  icon: <Code2 size={16} />,
                  title: "Code Quality",
                  desc: "Clean, maintainable code",
                },
              ].map((highlight) => (
                <div
                  key={highlight.title}
                  className="surface-card rounded-lg border border-white/8 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 shrink-0 text-sky-400">
                      {highlight.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm">
                        {highlight.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {highlight.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </m.div>
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-3 lg:min-h-115"
          >
            <ExpandableSection
              title="expertise"
              expanded={expanded === "expertise"}
              onToggle={() => toggleSection("expertise")}
              content={
                <div className="space-y-2">
                  {developerProfile.expertise.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-2 text-sm text-slate-300"
                    >
                      <span className="text-sky-400">▸</span>
                      {tech}
                    </div>
                  ))}
                </div>
              }
            />
            <ExpandableSection
              title="currentInterests"
              expanded={expanded === "interests"}
              onToggle={() => toggleSection("interests")}
              content={
                <div className="space-y-2">
                  {developerProfile.currentInterests.map((interest) => (
                    <div
                      key={interest}
                      className="flex items-center gap-2 text-sm text-slate-300"
                    >
                      <span className="text-purple-400">▸</span>
                      {interest}
                    </div>
                  ))}
                </div>
              }
            />
            <ExpandableSection
              title="learning"
              expanded={expanded === "learning"}
              onToggle={() => toggleSection("learning")}
              content={
                <div className="space-y-2">
                  {developerProfile.learning.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-sm text-slate-300"
                    >
                      <span className="text-emerald-400">▸</span>
                      {item}
                    </div>
                  ))}
                </div>
              }
            />
            <ExpandableSection
              title="education"
              expanded={expanded === "education"}
              onToggle={() => toggleSection("education")}
              content={
                <div className="space-y-2">
                  <div>
                    <div className="text-xs text-slate-500">degree</div>
                    <div className="text-sm text-slate-300 font-mono">
                      "{developerProfile.education.degree}"
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">institution</div>
                    <div className="text-sm text-slate-300 font-mono">
                      "{developerProfile.education.institution}"
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">focus</div>
                    <div className="text-sm text-slate-300 font-mono">
                      "{developerProfile.education.focus}"
                    </div>
                  </div>
                </div>
              }
            />
            <ExpandableSection
              title="workStyle"
              expanded={expanded === "workStyle"}
              onToggle={() => toggleSection("workStyle")}
              content={
                <div className="space-y-2">
                  <div>
                    <div className="text-xs text-slate-500">approach</div>
                    <div className="text-sm text-slate-300 font-mono">
                      "{developerProfile.workStyle.approach}"
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">philosophy</div>
                    <div className="text-sm text-slate-300 font-mono">
                      "{developerProfile.workStyle.philosophy}"
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">values</div>
                    <div className="space-y-1">
                      {developerProfile.workStyle.values.map((value) => (
                        <div
                          key={value}
                          className="text-sm text-slate-300 font-mono"
                        >
                          • "{value}"
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              }
            />
          </m.div>
        </div>
      </div>
    </section>
  );
}

interface ExpandableSectionProps {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  content: React.ReactNode;
}

function ExpandableSection({
  title,
  expanded,
  onToggle,
  content,
}: ExpandableSectionProps) {
  const contentId = `about-${title}-content`;

  return (
    <m.div
      className="surface-card rounded-lg overflow-hidden"
      animate={{
        borderColor: expanded ? "rgba(56, 189, 248, 0.3)" : "transparent",
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={contentId}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/3 transition-colors"
      >
        <span className="font-mono text-sm text-slate-400">
          <span className="text-sky-400">{expanded ? "▾" : "▸"}</span> {title}
          <span className="text-slate-600">: </span>
          <span className="text-slate-500">{expanded ? "{" : "..."}</span>
        </span>
      </button>

      <m.div
        id={contentId}
        initial={false}
        animate={{
          height: expanded ? "auto" : 0,
          opacity: expanded ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden border-t border-white/5"
      >
        <div className="px-4 py-3 bg-white/2">
          {content}
          <div className="text-sky-400 text-sm font-mono mt-2">{"}"}</div>
        </div>
      </m.div>
    </m.div>
  );
}
