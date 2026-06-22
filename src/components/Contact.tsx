import { m } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { waapi } from "animejs/waapi";
import { portfolioData } from "@/data/portfolioData";

const socials = [
  {
    label: "Email",
    icon: <Mail size={20} />,
    href: `mailto:${portfolioData.personal.email}`,
  },
  {
    label: "GitHub",
    icon: <FaGithub size={20} />,
    href: portfolioData.personal.githubProfileUrl,
  },
  {
    label: "LinkedIn",
    icon: <FaLinkedin size={20} />,
    href: portfolioData.personal.linkedinUrl,
  },
];

export default function Contact() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Anime.js WAAPI: glow border animation on social cards hover
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll<HTMLElement>(".social-card");
      cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          waapi.animate(card, {
            boxShadow: [
              "0 0 0px 0px rgba(56, 189, 248, 0)",
              "0 0 20px 2px rgba(56, 189, 248, 0.25)",
            ],
            duration: 300,
            ease: "out(3)",
          });
        });
        card.addEventListener("mouseleave", () => {
          waapi.animate(card, {
            boxShadow: [
              "0 0 20px 2px rgba(56, 189, 248, 0.25)",
              "0 0 0px 0px rgba(56, 189, 248, 0)",
            ],
            duration: 400,
            ease: "out(2)",
          });
        });
      });
    }
  }, []);

  return (
    <>
      <section id="contact" className="section-shell">
        <div className="mx-auto max-w-7xl px-6">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { 
                opacity: 1, 
                y: 0, 
                transition: { 
                  duration: 0.5,
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                } 
              }
            }}
            className="grid gap-10 border-y border-white/10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
          >
            <div>
              <span className="section-kicker">{portfolioData.contact.title}</span>
              <h2 className="mt-3 max-w-2xl font-[Space_Grotesk] text-4xl font-semibold leading-tight text-white sm:text-5xl">
                {portfolioData.contact.heading}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-400">
                {portfolioData.contact.description}
              </p>
            </div>

            <div ref={cardsRef} className="grid gap-3 sm:grid-cols-3">
              {socials.map((social) => (
                <m.a
                  key={social.label}
                  href={social.href}
                  target={social.label === "Email" ? undefined : "_blank"}
                  rel={social.label === "Email" ? undefined : "noreferrer"}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                  }}
                  className="social-card surface-card group rounded-lg p-5 text-slate-300 transition hover:text-white"
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
            (c) {new Date().getFullYear()} {portfolioData.personal.name}. Built with {portfolioData.footer.builtWith}.
          </p>
          <a
            href={portfolioData.personal.website}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 transition hover:text-slate-300"
          >
            {portfolioData.personal.website.replace("https://", "")}
            <ArrowUpRight size={14} />
          </a>
        </div>
      </footer>
    </>
  );
}

