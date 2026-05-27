// import { ContactShadows, Float, Line } from "@react-three/drei";
import { Float, Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type Point3 = [number, number, number];

const networkNodes: { position: Point3; color: string }[] = [
  { position: [-2.05, 0.95, 0.05], color: "#38bdf8" },
  { position: [-1.2, 1.55, -0.15], color: "#34d399" },
  { position: [-0.15, 1.05, 0.2], color: "#f59e0b" },
  { position: [0.75, 1.5, -0.1], color: "#a78bfa" },
  { position: [1.55, 0.78, 0.15], color: "#38bdf8" },
];

const connections: [Point3, Point3][] = [
  [networkNodes[0].position, networkNodes[1].position],
  [networkNodes[1].position, networkNodes[2].position],
  [networkNodes[2].position, networkNodes[3].position],
  [networkNodes[3].position, networkNodes[4].position],
  [networkNodes[0].position, networkNodes[2].position],
  [networkNodes[2].position, networkNodes[4].position],
];

function CodePanel() {
  const rows = useMemo(
    () => [
      { width: 1.45, y: 0.46, color: "#38bdf8" },
      { width: 1.9, y: 0.19, color: "#e5e7eb" },
      { width: 1.15, y: -0.08, color: "#34d399" },
      { width: 1.65, y: -0.35, color: "#a78bfa" },
    ],
    [],
  );

  return (
    <group position={[-1.1, -0.25, 0.18]} rotation={[0.04, -0.22, 0.02]}>
      {/* <mesh castShadow receiveShadow> */}
      <mesh>
        <boxGeometry args={[2.7, 1.75, 0.08]} />
        <meshStandardMaterial
          color="#111827"
          roughness={0.55}
          metalness={0.05}
        />
      </mesh>
      <mesh position={[-1.09, 0.7, 0.06]}>
        <boxGeometry args={[0.18, 0.08, 0.02]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      <mesh position={[-0.83, 0.7, 0.06]}>
        <boxGeometry args={[0.18, 0.08, 0.02]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
      <mesh position={[-0.57, 0.7, 0.06]}>
        <boxGeometry args={[0.18, 0.08, 0.02]} />
        <meshStandardMaterial color="#22c55e" />
      </mesh>
      {rows.map((row, index) => (
        <mesh key={row.y} position={[-0.15 + index * 0.08, row.y, 0.065]}>
          <boxGeometry args={[row.width, 0.07, 0.025]} />
          <meshStandardMaterial
            color={row.color}
            emissive={row.color}
            emissiveIntensity={0.12}
            roughness={0.35}
          />
        </mesh>
      ))}
    </group>
  );
}

function DataStack() {
  return (
    <group position={[1.45, -0.34, 0.02]} rotation={[0.04, 0.34, -0.02]}>
      {[0, 1, 2].map((level) => (
        // <mesh
        //   key={level}
        //   position={[0, level * 0.24, 0]}
        //   castShadow
        //   receiveShadow
        // >
        <mesh key={level} position={[0, level * 0.24, 0]}>
          <cylinderGeometry args={[0.48, 0.48, 0.15, 48]} />
          <meshStandardMaterial
            color={level === 1 ? "#164e63" : "#0f172a"}
            emissive={level === 2 ? "#38bdf8" : "#000000"}
            emissiveIntensity={level === 2 ? 0.14 : 0}
            roughness={0.4}
            metalness={0.12}
          />
        </mesh>
      ))}
      {/* <mesh position={[0, 0.86, 0]} castShadow> */}
      <mesh position={[0, 0.86, 0]}>
        <boxGeometry args={[0.96, 0.08, 0.96]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={0.18}
        />
      </mesh>
    </group>
  );
}

function ProjectTiles() {
  const tiles = [
    { position: [-0.75, -1.28, 0.42] as Point3, color: "#38bdf8" },
    { position: [0.03, -1.22, 0.5] as Point3, color: "#34d399" },
    { position: [0.81, -1.28, 0.42] as Point3, color: "#f59e0b" },
  ];

  return (
    <group rotation={[-0.18, 0.08, 0]}>
      {tiles.map((tile, index) => (
        // <mesh key={index} position={tile.position} castShadow receiveShadow>
        <mesh key={index} position={tile.position}>
          <boxGeometry args={[0.58, 0.12, 0.7]} />
          <meshStandardMaterial
            color="#111827"
            emissive={tile.color}
            emissiveIntensity={0.08}
            roughness={0.42}
            metalness={0.16}
          />
        </mesh>
      ))}
    </group>
  );
}

function Network() {
  return (
    <group position={[0.08, 0.02, 0.48]}>
      {connections.map(([start, end], index) => (
        <Line
          key={`${start.join("-")}-${end.join("-")}-${index}`}
          points={[start, end]}
          color="#64748b"
          lineWidth={1}
          transparent
          opacity={0.55}
        />
      ))}
      {networkNodes.map((node) => (
        // <mesh key={node.position.join("-")} position={node.position} castShadow>
        <mesh key={node.position.join("-")} position={node.position}>
          <sphereGeometry args={[0.075, 24, 24]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={0.3}
            roughness={0.28}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function Scene() {
  const root = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!root.current) return;

    const elapsed = state.clock.getElapsedTime();
    const targetY = state.pointer.x * 0.18 + Math.sin(elapsed * 0.28) * 0.1;
    const targetX = -0.1 + state.pointer.y * 0.08;

    root.current.rotation.y = THREE.MathUtils.lerp(
      root.current.rotation.y,
      targetY,
      delta * 1.8,
    );
    root.current.rotation.x = THREE.MathUtils.lerp(
      root.current.rotation.x,
      targetX,
      delta * 1.8,
    );
    root.current.position.y = Math.sin(elapsed * 0.7) * 0.05;
  });

  return (
    <>
      <ambientLight intensity={1.1} />
      {/* <directionalLight position={[4, 5, 5]} intensity={1.7} castShadow /> */}
      <directionalLight position={[4, 5, 5]} intensity={1.7} />
      <pointLight position={[-3, 2, 3]} color="#38bdf8" intensity={1.9} />
      <pointLight position={[3, -1, 2]} color="#f59e0b" intensity={0.95} />
      <Float speed={1.4} rotationIntensity={0.08} floatIntensity={0.18}>
        <group ref={root} position={[0.18, -0.18, 0]} scale={1.18}>
          {/* <mesh
            position={[0, -1.52, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
          >
          */}
          <mesh position={[0, -1.52, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[2.45, 72]} />
            <meshStandardMaterial
              color="#0b1120"
              roughness={0.7}
              metalness={0.05}
            />
          </mesh>
          <CodePanel />
          <DataStack />
          <ProjectTiles />
          <Network />
        </group>
      </Float>
      {/* <ContactShadows position={[0, -1.55, 0]} scale={5.4} blur={2.6} opacity={0.32} /> */}
    </>
  );
}
