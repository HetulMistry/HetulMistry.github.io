import { RigidBody, Physics } from "@react-three/rapier";
import { Text, Float, Sky, ContactShadows, Html } from "@react-three/drei";
import Player from "./Player";

function Sign({ position, rotation, title, subtitle, link }: any) {
  return (
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Base / Pole */}
        <mesh position={[0, 1, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.2, 2, 0.2]} />
          <meshStandardMaterial color="#333" />
        </mesh>

        {/* Sign board */}
        <mesh position={[0, 2.2, 0.1]} castShadow receiveShadow>
          <boxGeometry args={[3, 1.2, 0.2]} />
          <meshStandardMaterial color="#fff" />
        </mesh>

        <Text
          position={[0, 2.4, 0.21]}
          fontSize={0.3}
          color="#000"
          anchorX="center"
          anchorY="middle"
        >
          {title}
        </Text>
        <Text
          position={[0, 2.0, 0.21]}
          fontSize={0.15}
          color="#666"
          anchorX="center"
          anchorY="middle"
        >
          {subtitle}
        </Text>

        {link && (
          <Html position={[0, 1.5, 0.21]} transform distanceFactor={5}>
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              style={{
                background: 'blue',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: 'bold',
                pointerEvents: 'auto'
              }}
            >
              Visit
            </a>
          </Html>
        )}
      </RigidBody>
    </group>
  );
}

export default function Scene() {
  return (
    <>
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[10, 20, 10]}
        intensity={1.5}
        shadow-mapSize={[1024, 1024]}
      >
        <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
      </directionalLight>

      <Physics>
        <Player />

        {/* Ground */}
        <RigidBody type="fixed" colliders="cuboid" restitution={0.2} friction={1}>
          <mesh receiveShadow position={[0, -0.5, 0]}>
            <boxGeometry args={[50, 1, 50]} />
            <meshStandardMaterial color="#88d8b0" />
          </mesh>
        </RigidBody>

        {/* Main Title */}
        <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
          <Text
            position={[0, 4, -5]}
            fontSize={2}
            color="white"
            outlineWidth={0.05}
            outlineColor="#000"
          >
            Hetul Mistry
          </Text>
          <Text
            position={[0, 2.5, -5]}
            fontSize={0.5}
            color="#ffeeb1"
            outlineWidth={0.02}
            outlineColor="#000"
          >
            Full-Stack Developer
          </Text>
        </Float>

        {/* Portfolio Signs */}
        <Sign
          position={[4, 0, 4]}
          rotation={[0, -1.2, 0]}
          title="GitHub / LinkedIn"
          subtitle="Let's connect!"
          link="https://github.com/HetulMistry"
        />

        {/* Some physical obstacles */}
        <RigidBody position={[0, 5, 0]} colliders="cuboid" mass={1}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="hotpink" />
          </mesh>
        </RigidBody>
        <RigidBody position={[-2, 5, 0]} colliders="cuboid" mass={1}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>
        <RigidBody position={[2, 5, 0]} colliders="cuboid" mass={1}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="yellow" />
          </mesh>
        </RigidBody>

      </Physics>

      <ContactShadows position={[0, 0, 0]} scale={50} blur={2} opacity={0.4} />
    </>
  );
}
