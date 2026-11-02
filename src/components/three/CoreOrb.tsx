"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

/**
 * The centrepiece of the hero scene: a faceted dark-metal core wrapped in two
 * counter-rotating wireframe shells, with a soft halo behind it.
 */
export function CoreOrb({ quality = "high" }: { quality?: "high" | "low" }) {
  const group = useRef<THREE.Group>(null);
  const outerShell = useRef<THREE.Mesh>(null);
  const innerShell = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (group.current) {
      group.current.position.y = Math.sin(t * 0.55) * 0.06;
    }
    if (outerShell.current) {
      outerShell.current.rotation.y += delta * 0.12;
      outerShell.current.rotation.x += delta * 0.035;
    }
    if (innerShell.current) {
      innerShell.current.rotation.y -= delta * 0.19;
      innerShell.current.rotation.z += delta * 0.05;
    }
    if (core.current) {
      core.current.rotation.y += delta * 0.08;
      core.current.rotation.x = Math.sin(t * 0.22) * 0.12;
    }
  });

  return (
    <group ref={group}>
      {/* Soft halo behind the core — fakes a bloom pass cheaply. */}
      <mesh position={[0, 0, -1.4]} scale={3.1}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#c81e0f"
          transparent
          opacity={0.075}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer wireframe shell */}
      <mesh ref={outerShell}>
        <icosahedronGeometry args={[1.72, 1]} />
        <meshBasicMaterial
          color="#ff9a3c"
          wireframe
          transparent
          opacity={0.13}
          depthWrite={false}
        />
      </mesh>

      {/* Inner wireframe shell, counter-rotating */}
      <mesh ref={innerShell}>
        <icosahedronGeometry args={[1.34, 0]} />
        <meshBasicMaterial
          color="#ff9a72"
          wireframe
          transparent
          opacity={0.17}
          depthWrite={false}
        />
      </mesh>

      {/* Faceted metal core */}
      <mesh ref={core} scale={0.92}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#1a0a07"
          emissive="#b8350f"
          emissiveIntensity={0.42}
          metalness={0.96}
          roughness={0.16}
          envMapIntensity={1.4}
          flatShading
        />
      </mesh>

      {/* Glowing inner seam — visible through the faceted gaps */}
      <mesh scale={0.99}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#ffb020"
          wireframe
          transparent
          opacity={0.22}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Thin equator ring, catches the light */}
      {quality === "high" ? (
        <mesh rotation={[Math.PI / 2.05, 0, 0.12]}>
          <torusGeometry args={[1.16, 0.006, 8, 160]} />
          <meshBasicMaterial
            color="#ffc98a"
            transparent
            opacity={0.5}
            depthWrite={false}
          />
        </mesh>
      ) : null}
    </group>
  );
}
