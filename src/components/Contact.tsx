import { motion } from "framer-motion";
import { Mail, ArrowUpRight, Heart } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const socials = [
  {
    label: "GitHub",
    icon: <FaGithub size={22} />,
    href: "https://github.com/HetulMistry",
    color: "hover:border-slate-400",
  },
  {
    label: "LinkedIn",
    icon: <FaLinkedin size={22} />,
    href: "https://www.linkedin.com/in/hetulmistry/",
    color: "hover:border-blue-500",
  },
  {
    label: "Email",
    icon: <Mail size={22} />,
    href: "mailto:hetulmistry@gmail.com",
    color: "hover:border-emerald-500",
  },
];

export default function Contact() {
  return (
    <>
      <section id="contact" className="relative py-32 overflow-hidden">
        {/* Background accents */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-semibold tracking-widest uppercase text-blue-400 mb-3 block">
                Contact
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[Space_Grotesk] text-white leading-tight">
                Let's build something
                <br />
                <span className="gradient-text">meaningful together.</span>
              </h2>
              <p className="mt-6 text-lg text-slate-400 max-w-xl mx-auto">
                I'm always open to interesting conversations, collaborations,
                and new opportunities. Feel free to reach out!
              </p>
            </motion.div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-14 gradient-border rounded-3xl"
            >
              <div className="glass-card rounded-3xl p-10 sm:p-14">
                <div className="flex flex-wrap justify-center gap-5">
                  {socials.map((s, i) => (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target={s.label !== "Email" ? "_blank" : undefined}
                      rel="noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className={`flex items-center gap-4 px-8 py-5 rounded-2xl bg-white/[0.03] border border-white/10 text-slate-300 hover:text-white transition-all duration-300 ${s.color}`}
                    >
                      {s.icon}
                      <span className="font-semibold text-lg">{s.label}</span>
                      <ArrowUpRight size={16} className="text-slate-500" />
                    </motion.a>
                  ))}
                </div>

                {/* Bento link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="mt-10"
                >
                  <a
                    href="https://bento.me/hetul-mistry"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors text-sm"
                  >
                    🍱 bento.me/hetul-mistry
                    <ArrowUpRight size={14} />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-sm flex items-center gap-1.5">
            © 2026 Hetul Mistry — Built with <Heart size={14} className="text-rose-500" /> using React & Tailwind
          </p>
          <div className="flex items-center gap-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.label !== "Email" ? "_blank" : undefined}
                rel="noreferrer"
                className="text-slate-600 hover:text-white transition-colors"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
