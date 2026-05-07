import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#030712]/80 backdrop-blur-2xl border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="relative group">
          <span className="text-2xl font-bold font-[Space_Grotesk] tracking-tight text-white">
            H
            <span className="gradient-text">M</span>
          </span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 group-hover:w-full transition-all duration-300" />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-300 font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://github.com/HetulMistry"
            target="_blank"
            rel="noreferrer"
            className="ml-4 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300"
          >
            GitHub ↗
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#030712]/95 backdrop-blur-2xl border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all text-lg"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://github.com/HetulMistry"
                target="_blank"
                rel="noreferrer"
                className="mt-2 px-5 py-3 text-center font-semibold text-white bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl"
              >
                GitHub ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
