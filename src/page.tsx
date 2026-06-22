import { lazy, Suspense, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { portfolioData } from "@/data/portfolioData";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

const About = lazy(() => import("@/components/About"));
const Skills = lazy(() => import("@/components/Skills"));
const Contact = lazy(() => import("@/components/Contact"));
const Projects = lazy(() => import("@/components/Projects"));

const SectionDivider = () => (
  <div className="mx-auto max-w-7xl px-6">
    <div className="h-px bg-white/10" />
  </div>
);

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Portfolio() {
  const [activeOverlay, setActiveOverlay] = useState<
    "palette" | "mobile-menu" | null
  >(null);
  const paletteOpen = activeOverlay === "palette";
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (!hash) return;

    const targetId = hash.replace("#", "");
    if (!targetId) return;

    const element = document.getElementById(targetId);
    if (element) {
      // Element is already present, but during initial load/hydration,
      // a small delay ensures layout stability and accurate scroll positioning.
      const timer = setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return () => clearTimeout(timer);
    }

    // Poll for the lazy-loaded element to enter the DOM
    let attempts = 0;
    const maxAttempts = 50; // up to 5 seconds
    const interval = setInterval(() => {
      const el = document.getElementById(targetId);
      if (el) {
        clearInterval(interval);
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
      attempts++;
      if (attempts >= maxAttempts) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [location.hash]);

  useEffect(() => {
    import("@/components/About");
  }, []);

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

  const close = () => setActiveOverlay(null);

  const run = (fn: () => void) => {
    close();
    fn();
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <main className="relative min-h-screen overflow-x-hidden noise-overlay">
          <CommandDialog
            open={paletteOpen}
            onOpenChange={(open) => setActiveOverlay(open ? "palette" : null)}
            title="Command Palette"
            description="Navigate the portfolio or open external links."
            className="border-white/8 bg-dark-900/95 shadow-2xl backdrop-blur"
          >
            <CommandInput placeholder="Search commands, pages, or links…" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>

              <CommandGroup heading="Navigate">
                <CommandItem onSelect={() => run(() => scrollTo("about"))}>
                  About - View developer profile
                </CommandItem>
                <CommandItem onSelect={() => run(() => scrollTo("skills"))}>
                  Skills - Technical expertise
                </CommandItem>
                <CommandItem onSelect={() => run(() => scrollTo("projects"))}>
                  Projects - Portfolio of work
                </CommandItem>
                <CommandItem onSelect={() => run(() => scrollTo("contact"))}>
                  Contact - Get in touch
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Links">
                <CommandItem
                  onSelect={() =>
                    run(() =>
                      window.open(portfolioData.personal.githubProfileUrl, "_blank"),
                    )
                  }
                >
                  Open GitHub
                </CommandItem>
                <CommandItem
                  onSelect={() =>
                    run(() =>
                      window.open(
                        portfolioData.personal.linkedinUrl,
                        "_blank",
                      ),
                    )
                  }
                >
                  Open LinkedIn
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
          <Navbar
            mobileOpen={activeOverlay === "mobile-menu"}
            onMobileOpenChange={(open) =>
              setActiveOverlay(open ? "mobile-menu" : null)
            }
            onSearchClick={() => setActiveOverlay("palette")}
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
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuItem
          onSelect={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Back to Top
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onSelect={() => setActiveOverlay("palette")}>
          Open Command Palette
          <kbd className="ml-auto text-[10px] text-slate-500 font-mono select-none">
            ⌘K
          </kbd>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onSelect={() => scrollTo("about")}>
          About Me
        </ContextMenuItem>
        <ContextMenuItem onSelect={() => scrollTo("skills")}>
          Skills & Tech
        </ContextMenuItem>
        <ContextMenuItem onSelect={() => scrollTo("projects")}>
          Projects & Work
        </ContextMenuItem>
        <ContextMenuItem onSelect={() => scrollTo("contact")}>
          Contact Me
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
