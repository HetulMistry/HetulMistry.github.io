import { Canvas } from "@react-three/fiber";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Scene from "./3d/Scene";

const focusAreas = ["Full-stack apps", "AI-assisted tools", "Data-driven systems"];

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden pt-24">
      <div className="absolute inset-0 z-0 opacity-25 sm:opacity-[0.45] lg:opacity-100">
        <Canvas
          shadows
          dpr={[1, 1.6]}
          camera={{ position: [0, 0.15, 6.6], fov: 38 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene />
        </Canvas>
      </div>

      <div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,#08090c_0%,rgba(8,9,12,0.96)_34%,rgba(8,9,12,0.6)_62%,rgba(8,9,12,0.18)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 z-[1] h-32 bg-[linear-gradient(180deg,rgba(8,9,12,0),#08090c)]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl items-center px-6 pb-20">
        <div className="w-full min-w-0 max-w-3xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-300 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Open to full-stack and AI-focused opportunities
          </div>

          <h1 className="font-[Space_Grotesk] text-5xl font-semibold leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl">
            Hetul Mistry
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-xl sm:leading-8">
            Full-stack developer and B.Tech CSE student building practical web products,
            backend systems, and AI-enabled workflows with React, TypeScript, Node.js,
            Python, and Firebase.
          </p>

          <div className="mt-5 flex items-center gap-2 text-sm text-slate-400">
            <MapPin size={16} />
            Gandhinagar, Gujarat, India
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex shrink-0 items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              View Projects
              <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.08]"
            >
              Contact
              <Mail size={16} />
            </a>
            <a
              href="https://github.com/HetulMistry"
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.08]"
            >
              <FaGithub size={17} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/hetulmistry/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.08]"
            >
              <FaLinkedin size={17} />
              LinkedIn
            </a>
          </div>

          <div className="mt-12 grid max-w-2xl gap-3 sm:grid-cols-3">
            {focusAreas.map((item) => (
              <div key={item} className="surface-card rounded-lg px-4 py-3 text-sm text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
