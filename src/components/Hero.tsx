import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody, RapierRigidBody } from "@react-three/rapier";
import { Environment, useCursor } from "@react-three/drei";
import { useRef, useState } from "react";

function InteractiveShape({ position, color, geometryType }: { position: [number, number, number], color: string, geometryType: "box" | "sphere" | "icosahedron" }) {
  const body = useRef<RapierRigidBody>(null);
  const [hovered, setHovered] = useState(false);
  
  // Changes cursor to pointer when hovering over these objects
  useCursor(hovered);

  // Apply a random upward impulse and spin when clicked
  const jump = () => {
    if (body.current) {
      body.current.applyImpulse({ 
        x: (Math.random() - 0.5) * 8, 
        y: 8 + Math.random() * 6, 
        z: (Math.random() - 0.5) * 8 
      }, true);
      
      body.current.applyTorqueImpulse({ 
        x: (Math.random() - 0.5) * 2, 
        y: (Math.random() - 0.5) * 2, 
        z: (Math.random() - 0.5) * 2 
      }, true);
    }
  };

  return (
    <RigidBody 
      ref={body} 
      position={position} 
      colliders={geometryType === "sphere" ? "ball" : geometryType === "icosahedron" ? "hull" : "cuboid"} 
      restitution={0.8}
    >
      <mesh 
        castShadow 
        receiveShadow 
        onClick={jump}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {geometryType === "box" && <boxGeometry args={[1.2, 1.2, 1.2]} />}
        {geometryType === "sphere" && <sphereGeometry args={[0.8, 32, 32]} />}
        {geometryType === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
        
        <meshStandardMaterial 
          color={color} 
          roughness={0.1} 
          metalness={0.6} 
          emissive={hovered ? color : "#000"} 
          emissiveIntensity={hovered ? 0.4 : 0} 
        />
      </mesh>
    </RigidBody>
  );
}

function Interactive3DElement() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 10], fov: 40 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} castShadow />
      <Environment preset="city" />

      <Physics>
        {/* Playable floating blocks */}
        <InteractiveShape position={[-2.5, 2, 0]} color="#60a5fa" geometryType="box" />
        <InteractiveShape position={[0, 4, 0]} color="#a78bfa" geometryType="sphere" />
        <InteractiveShape position={[2.5, 3, 0]} color="#22d3ee" geometryType="icosahedron" />

        {/* Invisible boundaries to keep them bouncing inside the view */}
        <RigidBody type="fixed" position={[0, -4, 0]}>
          <mesh><boxGeometry args={[20, 1, 10]} /><meshStandardMaterial transparent opacity={0} /></mesh>
        </RigidBody>
        <RigidBody type="fixed" position={[-6, 0, 0]}>
          <mesh><boxGeometry args={[1, 20, 10]} /><meshStandardMaterial transparent opacity={0} /></mesh>
        </RigidBody>
        <RigidBody type="fixed" position={[6, 0, 0]}>
          <mesh><boxGeometry args={[1, 20, 10]} /><meshStandardMaterial transparent opacity={0} /></mesh>
        </RigidBody>
        <RigidBody type="fixed" position={[0, 0, -3]}>
          <mesh><boxGeometry args={[20, 20, 1]} /><meshStandardMaterial transparent opacity={0} /></mesh>
        </RigidBody>
        <RigidBody type="fixed" position={[0, 0, 5]}>
          <mesh><boxGeometry args={[20, 20, 1]} /><meshStandardMaterial transparent opacity={0} /></mesh>
        </RigidBody>
      </Physics>
    </Canvas>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      
      {/* 3D Canvas Background */}
      {/* Absolute positioning on the right, mix-blend to fit perfectly into the dark theme */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 z-10 lg:opacity-100 opacity-30 pointer-events-auto">
         <Interactive3DElement />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10 pb-20 w-full relative z-20 pointer-events-none">
        <div className="max-w-3xl">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm text-slate-300">Open to opportunities</span>
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black font-[Space_Grotesk] tracking-tighter leading-[0.9]">
              <span className="text-white drop-shadow-xl">Hetul</span>
              <br />
              <span className="gradient-text drop-shadow-xl">Mistry</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 text-lg sm:text-xl lg:text-2xl text-slate-300 leading-relaxed max-w-2xl drop-shadow-lg"
          >
            Full-stack developer building{" "}
            <span className="text-white font-medium">scalable systems</span>,{" "}
            <span className="text-white font-medium">AI-powered tools</span>, and{" "}
            <span className="text-white font-medium">data-driven applications</span>.
          </motion.p>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2 mt-4 text-slate-400 drop-shadow-lg"
          >
            <MapPin size={16} />
            <span className="text-sm">Gandhinagar, Gujarat, India</span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-4 mt-10 pointer-events-auto"
          >
            <a
              href="#projects"
              className="group flex items-center gap-3 px-7 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-2xl font-semibold hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105 transition-all duration-300"
            >
              View Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://github.com/HetulMistry"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 px-7 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-semibold hover:bg-white/10 hover:scale-105 transition-all duration-300 backdrop-blur-md"
            >
              <FaGithub size={20} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/hetulmistry/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 px-7 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-semibold hover:bg-white/10 hover:scale-105 transition-all duration-300 backdrop-blur-md"
            >
              <FaLinkedin size={20} />
              LinkedIn
            </a>
          </motion.div>

          {/* Tech stack marquee */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-3 mt-14 pointer-events-auto"
          >
            {["React", "Next.js", "TypeScript", "Node.js", "Python", "C++", "Firebase", "Tailwind CSS", "System Design"].map(
              (tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.06 }}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-white/[0.03] border border-white/[0.06] text-slate-300 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300 cursor-default backdrop-blur-md"
                >
                  {tech}
                </motion.span>
              )
            )}
          </motion.div>
        </div>
      </div>

      {/* Floating hints */}
      <div className="absolute bottom-10 right-10 z-20 hidden lg:block pointer-events-none opacity-50 animate-pulse">
        <p className="text-white text-sm font-mono">👆 Click the 3D shapes to interact</p>
      </div>
    </section>
  );
}
