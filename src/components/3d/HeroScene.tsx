import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import Scene from "./Scene";

export default function HeroScene() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // rAF ensures the browser has painted at least one frame before fading in
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      className="absolute inset-0 z-0 opacity-25 sm:opacity-[0.45] lg:opacity-100"
      style={{
        transition: "opacity 1.2s ease-out",
        opacity: visible ? undefined : 0,
      }}
    >
      <Suspense fallback={null}>
        <Canvas
          dpr={[1, 1.1]}
          camera={{ position: [0, 0.15, 6.6], fov: 38 }}
          gl={{
            antialias: false,
            powerPreference: "high-performance",
            alpha: true,
          }}
          performance={{ min: 0.5 }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
