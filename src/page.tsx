import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
// import Projects from "./components/Projects";

const About = lazy(() => import("./components/About"));
const Skills = lazy(() => import("./components/Skills"));
const Contact = lazy(() => import("./components/Contact"));

const SectionDivider = () => (
  <div className="mx-auto max-w-7xl px-6">
    <div className="h-px bg-white/10" />
  </div>
);

export default function Portfolio() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navbar />
      <Hero />

      <SectionDivider />

      <Suspense fallback={null}>
        <About />
      </Suspense>

      <SectionDivider />

      <Suspense fallback={null}>
        <Skills />
      </Suspense>

      {/* <SectionDivider />

      <Suspense fallback={null}>
        <Projects />
      </Suspense> */}

      <Suspense fallback={null}>
        <Contact />
      </Suspense>
    </main>
  );
}
