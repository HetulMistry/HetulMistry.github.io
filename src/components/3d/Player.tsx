import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import { useRef } from "react";
import * as THREE from "three";

export default function Player() {
  const body = useRef<RapierRigidBody>(null);
  const [, get] = useKeyboardControls();
  
  // Camera smoothing ref
  const smoothedCameraPosition = useRef(new THREE.Vector3(10, 10, 10));
  const smoothedCameraTarget = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    if (!body.current) return;

    const { forward, backward, left, right } = get();
    
    // Movement logic
    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };
    
    const impulseStrength = 0.6 * delta * 60;
    const torqueStrength = 0.2 * delta * 60;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }
    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }
    if (right) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }
    if (left) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }

    body.current.applyImpulse(impulse, true);
    body.current.applyTorqueImpulse(torque, true);

    // Camera follow logic
    const bodyPosition = body.current.translation();
    const cameraPosition = new THREE.Vector3()
      .copy(bodyPosition as any)
      .add(new THREE.Vector3(0, 5, 10)); // Offset

    const cameraTarget = new THREE.Vector3()
      .copy(bodyPosition as any)
      .add(new THREE.Vector3(0, 0, 0)); // Look at player

    smoothedCameraPosition.current.lerp(cameraPosition, 5 * delta);
    smoothedCameraTarget.current.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(smoothedCameraPosition.current);
    state.camera.lookAt(smoothedCameraTarget.current);
  });

  return (
    <RigidBody
      ref={body}
      colliders="ball"
      restitution={0.2}
      friction={1}
      linearDamping={0.5}
      angularDamping={0.5}
      position={[0, 1, 0]}
    >
      <mesh castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
    </RigidBody>
  );
}
