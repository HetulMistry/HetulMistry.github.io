import { AnimatePresence, m } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
  onSearchClick: () => void;
}

export default function Navbar({
  mobileOpen,
  onMobileOpenChange,
  onSearchClick,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  const handleMobileNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (!element) {
      onMobileOpenChange(false);
      return;
    }

    event.preventDefault();
    onMobileOpenChange(false);

    window.setTimeout(() => {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", href);
    }, 80);
  };

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 32);
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onMobileOpenChange(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen, onMobileOpenChange]);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition ${
        scrolled
          ? "border-b border-white/10 bg-dark-950/88 shadow-lg shadow-black/20 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <a
          href="#"
          className="font-[Space_Grotesk] text-lg font-semibold text-white"
        >
          Hetul Mistry
        </a>
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <ContextMenu key={link.label}>
              <ContextMenuTrigger asChild>
                <a
                  href={link.href}
                  onClick={() => {
                    onMobileOpenChange(false);
                  }}
                  className="rounded-md px-3 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              </ContextMenuTrigger>
              <ContextMenuContent className="border-white/8 bg-dark-900/95 backdrop-blur">
                <ContextMenuItem
                  onSelect={() => {
                    document
                      .getElementById(link.href.replace("#", ""))
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-slate-200 focus:bg-white/8 focus:text-white"
                >
                  Scroll to {link.label}
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))}
          <a
            href="https://github.com/HetulMistry"
            target="_blank"
            rel="noreferrer"
            className="ml-3 rounded-md border border-white/10 bg-white/4 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/8"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/HetulMistry"
            target="_blank"
            rel="noreferrer"
            className="ml-3 rounded-md border border-white/10 bg-white/4 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/8"
          >
            LinkedIn
          </a>
          <button
            onClick={onSearchClick}
            className="ml-3 flex items-center gap-2 rounded-md border border-white/10 bg-white/4 px-3 py-2 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:bg-white/8 hover:text-white"
            title="Open Command Palette (⌘K)"
          >
            <Search size={14} className="opacity-75" />
            <span className="hidden xl:inline text-xs text-slate-400 font-medium">
              Search
            </span>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[9px] font-medium text-slate-500">
              <span>⌘</span>K
            </kbd>
          </button>
        </div>
        <button
          onClick={() => onMobileOpenChange(!mobileOpen)}
          className="rounded-md border border-white/10 bg-white/4 p-2 text-white lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <>
            <m.button
              aria-label="Close mobile menu"
              className="fixed inset-0 z-40 bg-black/20 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => onMobileOpenChange(false)}
            />
            <m.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative z-50 border-b border-white/10 bg-dark-950/96 backdrop-blur-xl lg:hidden"
              id="mobile-menu"
            >
              <div className="flex flex-col gap-1 px-6 pb-6">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(event) => handleMobileNavClick(event, link.href)}
                    className="rounded-md px-3 py-3 text-left text-slate-300 transition hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="https://github.com/HetulMistry"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 rounded-md border border-white/10 bg-white/4 px-3 py-3 text-center font-semibold text-white"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/HetulMistry"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 rounded-md border border-white/10 bg-white/4 px-3 py-3 text-center font-semibold text-white"
                >
                  LinkedIn
                </a>
                <button
                  onClick={() => {
                    onMobileOpenChange(false);
                    onSearchClick();
                  }}
                  className="mt-2 flex items-center justify-center gap-2 rounded-md border border-sky-400/20 bg-sky-400/10 px-3 py-3 text-center font-semibold text-sky-300"
                >
                  <Search size={14} />
                  Open Command Palette
                </button>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
