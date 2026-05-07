import { motion } from "framer-motion";
import { GraduationCap, Rocket, Brain, Code2 } from "lucide-react";

const stats = [
  { value: "8+", label: "Repositories" },
  { value: "5+", label: "Technologies" },
  { value: "4+", label: "Years Coding" },
  { value: "15+", label: "Gists" },
];

const highlights = [
  { icon: <Rocket size={20} />, text: "Building full-stack applications & backend systems" },
  { icon: <Brain size={20} />, text: "Exploring Data Science, ML & automation" },
  { icon: <Code2 size={20} />, text: "Scalable architecture & real-world problem solving" },
  { icon: <GraduationCap size={20} />, text: "B.Tech CSE at Silver Oak University" },
];

export default function About() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-blue-400 mb-3 block">
            About
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold font-[Space_Grotesk] text-white">
            Turning ideas into
            <br />
            <span className="gradient-text">functional products.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card rounded-3xl p-8 sm:p-10">
              {/* Code-editor style header */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs text-slate-600 font-mono">about.tsx</span>
              </div>

              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                I'm a <span className="text-white font-medium">B.Tech Computer Science</span> student
                at Silver Oak University with a passion for building things that matter. I started with
                C++ and digital logic, then evolved into modern web development and AI-powered tools.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                I enjoy turning ideas into functional products through clean, efficient, and
                maintainable code. Currently exploring ML deployment, system design, and
                performance optimization.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-4 text-center"
                >
                  <div className="text-2xl font-bold text-white font-[Space_Grotesk]">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1 }}
                whileHover={{ x: 8 }}
                className="group glass-card rounded-2xl p-6 flex items-start gap-5 cursor-default"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-white/5 flex items-center justify-center text-blue-400 group-hover:text-white group-hover:from-blue-500/30 group-hover:to-violet-500/30 transition-all duration-300">
                  {item.icon}
                </div>
                <p className="text-slate-300 text-lg leading-relaxed group-hover:text-white transition-colors duration-300">
                  {item.text}
                </p>
              </motion.div>
            ))}

            {/* Morphing gradient blob decoration */}
            <div className="relative mt-8 h-40 rounded-3xl overflow-hidden glass-card flex items-center justify-center">
              <div className="absolute w-32 h-32 bg-gradient-to-br from-blue-500 to-violet-600 opacity-20 morph-blob" />
              <p className="relative text-slate-500 text-sm font-mono">
                💡 Always learning, always building.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
