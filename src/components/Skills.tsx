import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
  gradient: string;
}

const categories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: "🎨",
    gradient: "from-blue-500 to-cyan-400",
    skills: [
      { name: "React / Next.js", level: 85, color: "#60a5fa" },
      { name: "TypeScript", level: 80, color: "#3b82f6" },
      { name: "Tailwind CSS", level: 90, color: "#22d3ee" },
      { name: "HTML / CSS", level: 95, color: "#06b6d4" },
    ],
  },
  {
    title: "Backend",
    icon: "⚙️",
    gradient: "from-violet-500 to-purple-400",
    skills: [
      { name: "Node.js / Express", level: 75, color: "#a78bfa" },
      { name: "Firebase", level: 80, color: "#8b5cf6" },
      { name: "REST APIs", level: 82, color: "#7c3aed" },
      { name: "SQL / Database", level: 70, color: "#6d28d9" },
    ],
  },
  {
    title: "Programming",
    icon: "💻",
    gradient: "from-emerald-500 to-green-400",
    skills: [
      { name: "JavaScript", level: 88, color: "#34d399" },
      { name: "C++", level: 78, color: "#10b981" },
      { name: "Python", level: 72, color: "#059669" },
      { name: "Data Structures", level: 80, color: "#047857" },
    ],
  },
  {
    title: "Tools & Concepts",
    icon: "🛠️",
    gradient: "from-amber-500 to-orange-400",
    skills: [
      { name: "Git / GitHub", level: 88, color: "#fbbf24" },
      { name: "System Design", level: 65, color: "#f59e0b" },
      { name: "Vite / Webpack", level: 75, color: "#d97706" },
      { name: "AI / ML Basics", level: 60, color: "#b45309" },
    ],
  },
];

function SkillBar({ skill, inView }: { skill: Skill; inView: boolean }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-slate-300 font-medium">{skill.name}</span>
        <span className="text-slate-500 font-mono text-xs">{skill.level}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: skill.color }}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${skill.level}%` : 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function SkillCard({ category, index }: { category: SkillCategory; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="glass-card rounded-3xl p-7 group"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-7">
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300`}>
          {category.icon}
        </div>
        <h3 className="text-xl font-bold text-white font-[Space_Grotesk]">{category.title}</h3>
      </div>

      {/* Skill bars */}
      <div className="space-y-5">
        {category.skills.map((skill) => (
          <SkillBar key={skill.name} skill={skill} inView={inView} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-blue-400 mb-3 block">
            Skills
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold font-[Space_Grotesk] text-white">
            Technologies &{" "}
            <span className="gradient-text">Expertise</span>
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-2xl">
            A snapshot of the tools and technologies I work with across the stack.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <SkillCard key={cat.title} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
