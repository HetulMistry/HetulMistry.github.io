import { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { CommandPalette } from "@/components/ui/command-palette";
import type { CommandItem } from "@/components/ui/command-palette";

const About = lazy(() => import("@/components/About"));
const Skills = lazy(() => import("@/components/Skills"));
const Contact = lazy(() => import("@/components/Contact"));
const Projects = lazy(() => import("@/components/Projects"));

const SectionDivider = () => (
  <div className="mx-auto max-w-7xl px-6">
    <div className="h-px bg-white/10" />
  </div>
);

export default function Portfolio() {
  const [activeOverlay, setActiveOverlay] = useState<"palette" | "mobile-menu" | null>(null);

  useEffect(() => {
    import("@/components/About");
  }, []);

  // Command palette items
  const commandItems: CommandItem[] = [
    {
      id: "about",
      label: "About",
      description: "View developer profile",
      section: "navigation",
      action: () => {
        setActiveOverlay(null);
        document
          .getElementById("about")
          ?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "skills",
      label: "Skills",
      description: "Technical expertise",
      section: "navigation",
      action: () => {
        setActiveOverlay(null);
        document
          .getElementById("skills")
          ?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "projects",
      label: "Projects",
      description: "Portfolio of work",
      section: "navigation",
      action: () => {
        setActiveOverlay(null);
        document
          .getElementById("projects")
          ?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "contact",
      label: "Contact",
      description: "Get in touch",
      section: "navigation",
      action: () => {
        setActiveOverlay(null);
        document
          .getElementById("contact")
          ?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "github",
      label: "Open GitHub",
      description: "Visit GitHub profile",
      section: "links",
      action: () => {
        setActiveOverlay(null);
        window.open("https://github.com/HetulMistry", "_blank");
      },
    },
    {
      id: "linkedin",
      label: "Open LinkedIn",
      description: "Visit LinkedIn profile",
      section: "links",
      action: () => {
        setActiveOverlay(null);
        window.open("https://www.linkedin.com/in/hetulmistry/", "_blank");
      },
    },
  ];

  // Listen for command palette keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setActiveOverlay((prev) => (prev === "palette" ? null : "palette"));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <CommandPalette
        isOpen={activeOverlay === "palette"}
        onClose={() => setActiveOverlay(null)}
        items={commandItems}
      />

      <Navbar
        mobileOpen={activeOverlay === "mobile-menu"}
        onMobileOpenChange={(open) =>
          setActiveOverlay(open ? "mobile-menu" : null)
        }
      />
      <Hero />

      <SectionDivider />

      <Suspense fallback={null}>
        <About />
      </Suspense>

      <Suspense fallback={null}>
        <Skills />
      </Suspense>

      <SectionDivider />

      <Suspense fallback={null}>
        <Projects />
      </Suspense>

      <Suspense fallback={null}>
        <Contact />
      </Suspense>
    </main>
  );
}
