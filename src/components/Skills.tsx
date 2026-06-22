import { m } from "framer-motion";
import { Braces, Database, GitBranch, LayoutTemplate } from "lucide-react";
import type { ReactNode } from "react";
import { Pointer } from "@/components/ui/pointer";
import { portfolioData, type SkillCategory } from "@/data/portfolioData";

const iconMap: Record<SkillCategory["iconName"], ReactNode> = {
  LayoutTemplate: <LayoutTemplate size={18} />,
  Database: <Database size={18} />,
  Braces: <Braces size={18} />,
  GitBranch: <GitBranch size={18} />,
};

export default function Skills() {
  return (
    <section id="skills" className="section-shell relative">
      <div className="mx-auto max-w-7xl px-6">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="section-heading"
        >
          <span className="section-kicker">
            {portfolioData.skillsSection.title}
          </span>
          <h2>{portfolioData.skillsSection.subtitle}</h2>
          <p>{portfolioData.skillsSection.description}</p>
        </m.div>
        <div className="grid gap-4 md:grid-cols-2">
          {portfolioData.skillsSection.categories.map((category, index) => {
            const icon = iconMap[category.iconName];
            return (
              <m.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="surface-card relative rounded-lg p-6 overflow-hidden"
              >
                <Pointer>
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-dark-900/95 text-white shadow-2xl backdrop-blur-md"
                    style={{ color: category.pointerColor }}
                  >
                    {icon}
                  </div>
                </Pointer>
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/4"
                    style={{ color: category.pointerColor }}
                  >
                    {icon}
                  </div>
                  <div>
                    <h3 className="font-[Space_Grotesk] text-xl font-semibold text-white">
                      {category.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {category.description}
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span key={skill} className="skill-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
