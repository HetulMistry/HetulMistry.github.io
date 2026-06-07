import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [pendingScroll, setPendingScroll] = useState<string | null>(null);

  const handleMobileNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (!element) {
      setMobileOpen(false);
      return;
    }

    event.preventDefault();
    setMobileOpen(false);

    window.setTimeout(() => {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", href);
    }, 80);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                setMobileOpen(false);
              }}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
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
        </div>

        <button
          onClick={() => setMobileOpen((open) => !open)}
          className="rounded-md border border-white/10 bg-white/[0.04] p-2 text-white lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence
        onExitComplete={() => {
          if (pendingScroll) {
            const target = document.querySelector(pendingScroll);
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
              window.history.pushState(null, "", pendingScroll);
            }
            setPendingScroll(null);
          }
        }}
      >
        {mobileOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-b border-white/10 bg-dark-950/96 backdrop-blur-xl lg:hidden"
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
