import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[128px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[128px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "3s" }} />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
        <div className="max-w-5xl">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm text-slate-400">Open to opportunities</span>
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black font-[Space_Grotesk] tracking-tighter leading-[0.9]">
              <span className="text-white">Hetul</span>
              <br />
              <span className="gradient-text">Mistry</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 text-lg sm:text-xl lg:text-2xl text-slate-400 leading-relaxed max-w-2xl"
          >
            Full-stack developer building{" "}
            <span className="text-white font-medium">scalable systems</span>,{" "}
            <span className="text-white font-medium">AI-powered tools</span>, and{" "}
            <span className="text-white font-medium">data-driven applications</span>.
          </motion.p>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2 mt-4 text-slate-500"
          >
            <MapPin size={16} />
            <span className="text-sm">Gandhinagar, Gujarat, India</span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <a
              href="#projects"
              className="group flex items-center gap-3 px-7 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-2xl font-semibold hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105 transition-all duration-300"
            >
              View Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://github.com/HetulMistry"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 px-7 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-semibold hover:bg-white/10 hover:scale-105 transition-all duration-300"
            >
              <FaGithub size={20} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/hetulmistry/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 px-7 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-semibold hover:bg-white/10 hover:scale-105 transition-all duration-300"
            >
              <FaLinkedin size={20} />
              LinkedIn
            </a>
          </motion.div>

          {/* Tech stack marquee */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-3 mt-14"
          >
            {["React", "Next.js", "TypeScript", "Node.js", "Python", "C++", "Firebase", "Tailwind CSS", "System Design"].map(
              (tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.06 }}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300 cursor-default"
                >
                  {tech}
                </motion.span>
              )
            )}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-slate-600 tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border-2 border-slate-700 flex justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-slate-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
