import { Canvas } from "@react-three/fiber";
import { KeyboardControls, Loader } from "@react-three/drei";
import { Suspense } from "react";
import Scene from "./components/3d/Scene";

export default function Portfolio() {
  return (
    <>
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "KeyW"] },
          { name: "backward", keys: ["ArrowDown", "KeyS"] },
          { name: "left", keys: ["ArrowLeft", "KeyA"] },
          { name: "right", keys: ["ArrowRight", "KeyD"] },
          { name: "jump", keys: ["Space"] },
        ]}
      >
        <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </KeyboardControls>

      <Loader />

      <div className="ui-overlay">
        <div className="flex justify-between w-full">
          <div>
            <h1 className="text-3xl font-bold text-white drop-shadow-md">Hetul Mistry</h1>
            <p className="text-white drop-shadow-md">Interactive Portfolio</p>
          </div>
          <div className="flex gap-4">
            <a 
              href="https://github.com/HetulMistry" 
              target="_blank" 
              rel="noreferrer"
              className="bg-white/20 hover:bg-white/40 backdrop-blur px-4 py-2 rounded text-white font-bold transition pointer-events-auto"
            >
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/hetulmistry/" 
              target="_blank" 
              rel="noreferrer"
              className="bg-white/20 hover:bg-white/40 backdrop-blur px-4 py-2 rounded text-white font-bold transition pointer-events-auto"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="controls-hint">
          <h3 className="font-bold mb-2">Controls</h3>
          <p className="text-sm">Use <strong>W A S D</strong> or <strong>Arrow Keys</strong> to roll the ball around.</p>
          <p className="text-sm mt-1">Roll into the signs or click the buttons!</p>
        </div>
      </div>
    </>
  );
}
