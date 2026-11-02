"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";

import { CoreOrb } from "./CoreOrb";
import { FloatingShapes } from "./FloatingShapes";
import { OrbitalRings } from "./OrbitalRings";
import { ParticleField } from "./ParticleField";
import { SceneEnvironment } from "./SceneEnvironment";

type SceneProps = {
  isMobile: boolean;
  reducedMotion: boolean;
  active: boolean;
};

/**
 * Wraps the whole scene in a group that eases toward the pointer position.
 * Using damp() keeps the motion frame-rate independent and buttery.
 */
function SceneRig({
  children,
  reducedMotion,
  isMobile,
}: {
  children: React.ReactNode;
  reducedMotion: boolean;
  isMobile: boolean;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current || reducedMotion) return;

    const targetY = state.pointer.x * 0.26;
    const targetX = -state.pointer.y * 0.18;

    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      targetY,
      2.4,
      delta,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      targetX,
      2.4,
      delta,
    );
  });

  return (
    <group ref={group} scale={isMobile ? 0.82 : 1}>
      {children}
    </group>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.5} color="#3d1f16" />
      <directionalLight position={[4, 6, 6]} intensity={1.35} color="#ffe7d8" />
      <pointLight position={[3.6, 1.6, 3]} intensity={26} distance={16} color="#ffb020" />
      <pointLight position={[-4, -1.2, 2.4]} intensity={20} distance={16} color="#c81e4a" />
      <pointLight position={[0, -3, 4]} intensity={12} distance={14} color="#ff3d24" />
    </>
  );
}

export default function HeroScene({ isMobile, reducedMotion, active }: SceneProps) {
  return (
    <Canvas
      dpr={[1, isMobile ? 1.4 : 1.85]}
      camera={{ position: [0, 0, isMobile ? 8.4 : 7.2], fov: 38 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      frameloop={active ? "always" : "never"}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.08;
      }}
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <SceneLights />
        <SceneEnvironment />

        <SceneRig reducedMotion={reducedMotion} isMobile={isMobile}>
          <CoreOrb quality={isMobile ? "low" : "high"} />
          <OrbitalRings count={isMobile ? 2 : 3} />
          <FloatingShapes count={isMobile ? 5 : 8} />
          <ParticleField count={isMobile ? 520 : 1500} />
        </SceneRig>
      </Suspense>
    </Canvas>
  );
}
