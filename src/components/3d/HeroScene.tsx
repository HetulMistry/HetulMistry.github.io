import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Scene from "./Scene";

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 opacity-25 sm:opacity-[0.45] lg:opacity-100">
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
