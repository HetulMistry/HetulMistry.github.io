import { motion } from "framer-motion";
import { Brain, Code2, GraduationCap, Rocket } from "lucide-react";

const stats = [
  { value: "8+", label: "Repositories" },
  { value: "4+", label: "Years coding" },
  { value: "15+", label: "Gists" },
  { value: "5+", label: "Core technologies" },
];

const highlights = [
  {
    icon: <Rocket size={18} />,
    title: "Product-minded engineering",
    text: "I like shipping usable applications, not just isolated demos.",
  },
  {
    icon: <Brain size={18} />,
    title: "AI and data curiosity",
    text: "Currently exploring ML deployment, automation, and data-backed workflows.",
  },
  {
    icon: <Code2 size={18} />,
    title: "Systems foundation",
    text: "Comfortable moving between frontend detail, API design, and database structure.",
  },
  {
    icon: <GraduationCap size={18} />,
    title: "Education",
    text: "B.Tech Computer Science at Silver Oak University.",
  },
];

export default function About() {
  return (
    <section id="about" className="section-shell">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="section-heading"
        >
          <span className="section-kicker">About</span>
          <h2>Focused on practical, maintainable products.</h2>
          <p>
            I started with C++ and digital logic, then moved into modern web
            development, backend systems, and AI-powered tools.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="surface-card rounded-lg p-6 sm:p-8">
              <p className="text-lg leading-8 text-slate-300">
                I am a B.Tech Computer Science student at Silver Oak University with a
                strong interest in building clean, useful software. My current work sits
                around React, TypeScript, Node.js, Firebase, Python, and the basics of
                ML-driven product ideas.
              </p>
              <p className="mt-5 text-base leading-7 text-slate-400">
                I care about clarity: readable interfaces, predictable APIs, and code that
                can grow without getting noisy.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="surface-card rounded-lg p-4">
                  <div className="font-[Space_Grotesk] text-2xl font-semibold text-white">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs leading-5 text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="surface-card rounded-lg p-5"
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-sky-300">
                  {item.icon}
                </div>
                <h3 className="font-[Space_Grotesk] text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
