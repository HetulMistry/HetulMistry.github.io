import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
// import Projects from "./components/Projects";
import Contact from "./components/Contact";

export default function Portfolio() {
  return (
    <main className="relative min-h-screen overflow-hidden noise-overlay">
      <Navbar />
      <Hero />

      <div className="mx-auto max-w-7xl px-6">
        <div className="h-px bg-white/10" />
      </div>

      <About />

      <div className="mx-auto max-w-7xl px-6">
        <div className="h-px bg-white/10" />
      </div>

      <Skills />

      {/* <div className="mx-auto max-w-7xl px-6">
        <div className="h-px bg-white/10" />
      </div> */}

      {/* <Projects /> */}

      {/* <div className="mx-auto max-w-7xl px-6">
        <div className="h-px bg-white/10" />
      </div> */}

      <Contact />
    </main>
  );
}
