import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { AuroraText } from "@/components/ui/aurora-text";
import { DiaTextReveal } from "@/components/ui/dia-text-reveal";
import { ShineBorder } from "@/components/ui/shine-border";

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
  addEventListener?: (type: "change", listener: () => void) => void;
  removeEventListener?: (type: "change", listener: () => void) => void;
};

const focusAreas = [
  "Full-stack apps",
  "AI-assisted tools",
  "Data-driven systems",
];

const HeroScene = lazy(() => import("./3d/HeroScene"));

export default function Hero() {
  const [canRenderScene, setCanRenderScene] = useState(false);
  const [shouldLoadScene, setShouldLoadScene] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection =
      "connection" in navigator
        ? (navigator as Navigator & { connection?: NetworkInformation })
            .connection
        : undefined;

    const updatePreference = () => {
      const effectiveType = connection?.effectiveType ?? "";
      const isLowData =
        connection?.saveData === true || /2g/.test(effectiveType);

      setCanRenderScene(
        !mobileQuery.matches && !motionQuery.matches && !isLowData,
      );
    };

    updatePreference();

    mobileQuery.addEventListener("change", updatePreference);
    motionQuery.addEventListener("change", updatePreference);
    connection?.addEventListener?.("change", updatePreference);

    return () => {
      mobileQuery.removeEventListener("change", updatePreference);
      motionQuery.removeEventListener("change", updatePreference);
      connection?.removeEventListener?.("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    // Setting state directly in effect when dependency changes is safe here
    // because it's in a guard clause and doesn't cause infinite loops
    if (!canRenderScene) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldLoadScene(false);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = undefined;
      }
      return;
    }

    timeoutRef.current = window.setTimeout(() => {
      setShouldLoadScene(true);
    }, 700);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [canRenderScene]);

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden pt-24">
      {shouldLoadScene && (
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      )}

      <div className="absolute inset-0 z-1 bg-[linear-gradient(90deg,#08090c_0%,rgba(8,9,12,0.96)_34%,rgba(8,9,12,0.6)_62%,rgba(8,9,12,0.18)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 z-1 h-32 bg-[linear-gradient(180deg,rgba(8,9,12,0),#08090c)]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl items-center px-6 pb-20">
        <div className="w-full min-w-0 max-w-3xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/4 px-3 py-2 text-sm text-slate-300 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <AuroraText
              colors={["#38BDF8", "#F59E0B", "#E5E7EB", "#34D399", "#A78BFA"]}
              className="font-medium"
            >
              Open to full-stack and AI-focused opportunities
            </AuroraText>
          </div>

          <h1 className="font-[Space_Grotesk] text-5xl font-semibold leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl">
            <DiaTextReveal
              text="Hetul Mistry"
              textColor="white"
              duration={1.5}
              delay={0.5}
              colors={["#38BDF8", "#F59E0B", "#E5E7EB", "#34D399", "#A78BFA"]}
            />
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-xl sm:leading-8">
            Full-stack developer and B.Tech CSE student building practical web
            products, backend systems, and AI-enabled workflows with React,
            TypeScript, Node.js, Python, and Firebase.
          </p>

          <div className="mt-5 flex items-center gap-2 text-sm text-slate-400">
            <MapPin size={16} />
            Gandhinagar, Gujarat, India
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <div className="relative inline-block">
              <a
                href="#projects"
                className="inline-flex shrink-0 items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 relative z-10"
              >
                View Projects
                <ArrowRight size={16} />
              </a>
              <ShineBorder
                shineColor={[
                  "#38BDF8",
                  "#F59E0B",
                  "#E5E7EB",
                  "#34D399",
                  "#A78BFA",
                ]}
                className="pointer-events-none rounded-md z-20"
                borderWidth={2}
              />
            </div>
            <a
              href="#contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Contact
              <Mail size={16} />
            </a>
            <a
              href="https://github.com/HetulMistry"
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              <FaGithub size={17} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/hetulmistry/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              <FaLinkedin size={17} />
              LinkedIn
            </a>
          </div>

          <div className="mt-12 grid max-w-2xl gap-3 sm:grid-cols-3">
            {focusAreas.map((item) => (
              <div
                key={item}
                className="surface-card rounded-lg px-4 py-3 text-sm text-slate-300"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
