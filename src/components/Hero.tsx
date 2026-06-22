import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Mail, MapPin } from "lucide-react";
import { DiaTextReveal } from "@/components/ui/dia-text-reveal";
import { ShineBorder } from "@/components/ui/shine-border";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { animate, stagger, createTimeline, spring } from "animejs";
import { scrambleText } from "animejs/text";
import { portfolioData } from "@/data/portfolioData";

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
  addEventListener?: (type: "change", listener: () => void) => void;
  removeEventListener?: (type: "change", listener: () => void) => void;
};

const HeroScene = lazy(() => import("./3d/HeroScene"));

export default function Hero() {
  const [canRenderScene, setCanRenderScene] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
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
    if (!canRenderScene) {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = undefined;
      }
      return;
    }

    timeoutRef.current = window.setTimeout(() => {
      setSceneReady(true);
    }, 400);

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [canRenderScene]);

  const shouldLoadScene = canRenderScene && sceneReady;

  // Anime.js: Timeline for CTA buttons entrance + scrambleText on focus areas
  const ctaRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    // Staggered CTA buttons with spring easing
    const ctaButtons =
      ctaRef.current?.querySelectorAll<HTMLElement>("a, button");
    if (ctaButtons && ctaButtons.length > 0) {
      const tl = createTimeline({
        defaults: { ease: spring({ stiffness: 200, damping: 18 }) },
      });
      tl.add(
        ctaButtons,
        {
          opacity: [0, 1],
          translateY: [20, 0],
          delay: stagger(80),
          duration: 600,
        },
        1200,
      );
    }

    // ScrambleText decode effect on focus area cards
    const focusCards =
      focusRef.current?.querySelectorAll<HTMLElement>(".focus-area-text");
    if (focusCards && focusCards.length > 0) {
      animate(focusCards, {
        textContent: scrambleText({
          chars: "lowercase",
          revealRate: 40,
          settleDuration: 400,
        }),
        duration: 1800,
        delay: stagger(200, { start: 1600 }),
        ease: "linear",
      });
    }
  }, []);

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
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/4 px-3 py-2 text-sm text-slate-300 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <ShineBorder
                shineColor={[
                  "#38BDF8",
                  "#F59E0B",
                  "#E5E7EB",
                  "#34D399",
                  "#A78BFA",
                ]}
                className="pointer-events-none rounded-md z-20"
                borderWidth={1}
              />
              {portfolioData.hero.statusBadge}
            </div>
          </div>
          <h1 className="font-[Space_Grotesk] text-5xl font-semibold leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl">
            <DiaTextReveal
              text={portfolioData.personal.name}
              textColor="white"
              duration={1.5}
              delay={0.5}
              colors={["#38BDF8", "#F59E0B", "#E5E7EB", "#34D399", "#A78BFA"]}
            />
          </h1>
          <TypingAnimation
            className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-xl sm:leading-8"
            typeSpeed={10}
            startOnView={false}
            delay={100}
          >
            {portfolioData.hero.tagline}
          </TypingAnimation>
          <div className="mt-5 flex items-center gap-2 text-sm text-slate-400">
            <MapPin size={16} />
            {portfolioData.personal.location}
          </div>
          <div ref={ctaRef} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={portfolioData.hero.cta.primary.link}
              style={{ opacity: 0 }}
            >
              <InteractiveHoverButton className="text-sm">
                {portfolioData.hero.cta.primary.text}
              </InteractiveHoverButton>
            </a>
            <a
              href={portfolioData.hero.cta.secondary.link}
              style={{ opacity: 0 }}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-slate-800 border border-white/10 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              {portfolioData.hero.cta.secondary.text}
              <Mail size={16} />
            </a>
          </div>
          <div
            ref={focusRef}
            className="mt-12 grid max-w-3xl gap-4 sm:grid-cols-3"
          >
            {portfolioData.hero.focusAreas.map((item) => (
              <div
                key={item.title}
                className="surface-card border border-white/5 rounded-lg p-4 text-left transition hover:border-white/10"
              >
                <span className="block text-[10px] uppercase tracking-wider text-sky-400 font-mono mb-1">
                  {item.kicker}
                </span>
                <h4 className="focus-area-text font-semibold text-white text-sm mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
