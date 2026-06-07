import { m } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const socials = [
  {
    label: "Email",
    icon: <Mail size={20} />,
    href: "mailto:contact@hetulmistry.tech",
  },
  {
    label: "GitHub",
    icon: <FaGithub size={20} />,
    href: "https://github.com/HetulMistry",
  },
  {
    label: "LinkedIn",
    icon: <FaLinkedin size={20} />,
    href: "https://www.linkedin.com/in/hetulmistry/",
  },
];

export default function Contact() {
  return (
    <>
      <section id="contact" className="section-shell">
        <div className="mx-auto max-w-7xl px-6">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="grid gap-10 border-y border-white/10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
          >
            <div>
              <span className="section-kicker">Contact</span>
              <h2 className="mt-3 max-w-2xl font-[Space_Grotesk] text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Let us build something useful.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-400">
                I am open to internships, collaborations, and conversations
                around full-stack products, AI tooling, and practical software
                ideas.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {socials.map((social, index) => (
                <m.a
                  key={social.label}
                  href={social.href}
                  target={social.label === "Email" ? undefined : "_blank"}
                  rel={social.label === "Email" ? undefined : "noreferrer"}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="surface-card group rounded-lg p-5 text-slate-300 transition hover:text-white"
                >
                  <div className="flex items-center justify-between">
                    {social.icon}
                    <ArrowUpRight
                      size={16}
                      className="text-slate-500 transition group-hover:text-white"
                    />
                  </div>
                  <span className="mt-5 block font-semibold">
                    {social.label}
                  </span>
                </m.a>
              ))}
            </div>
          </m.div>
        </div>
      </section>

      <footer className="px-6 py-9">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-slate-600 sm:flex-row sm:items-center">
          <p>
            (c) 2026 Hetul Mistry. Built with React, TypeScript, Tailwind CSS,
            and Three.js.
          </p>
          <a
            href="https://hetulmistry.tech"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 transition hover:text-slate-300"
          >
            HetulMistry.tech
            <ArrowUpRight size={14} />
          </a>
        </div>
      </footer>
    </>
  );
}
