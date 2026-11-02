"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type RingConfig = {
  radius: number;
  tube: number;
  rotation: [number, number, number];
  color: string;
  opacity: number;
  speed: number;
  /** Angle offset so the satellites don't line up. */
  offset: number;
  satelliteSize: number;
  satelliteColor: string;
};

const RINGS: RingConfig[] = [
  {
    radius: 2.1,
    tube: 0.006,
    rotation: [Math.PI / 2.35, 0.12, 0],
    color: "#ff9a3c",
    opacity: 0.42,
    speed: 0.22,
    offset: 0,
    satelliteSize: 0.05,
    satelliteColor: "#ffe0b8",
  },
  {
    radius: 2.62,
    tube: 0.005,
    rotation: [Math.PI / 1.72, -0.55, 0.45],
    color: "#c81e4a",
    opacity: 0.34,
    speed: -0.16,
    offset: 2.1,
    satelliteSize: 0.042,
    satelliteColor: "#ffadb0",
  },
  {
    radius: 3.16,
    tube: 0.004,
    rotation: [Math.PI / 2.9, 0.85, -0.32],
    color: "#ff3d24",
    opacity: 0.26,
    speed: 0.11,
    offset: 4.2,
    satelliteSize: 0.036,
    satelliteColor: "#ffb27a",
  },
];

function Ring({ config }: { config: RingConfig }) {
  const group = useRef<THREE.Group>(null);
  const satellite = useRef<THREE.Mesh>(null);
  const satelliteGlow = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;

    group.current.rotation.z = t * config.speed + config.offset;

    const angle = t * (0.5 + config.speed) + config.offset;
    const x = Math.cos(angle) * config.radius;
    const y = Math.sin(angle) * config.radius;

    if (satellite.current) satellite.current.position.set(x, y, 0);
    if (satelliteGlow.current) satelliteGlow.current.position.set(x, y, 0);
  });

  return (
    <group rotation={config.rotation}>
      <group ref={group}>
        <mesh>
          <torusGeometry args={[config.radius, config.tube, 8, 220]} />
          <meshBasicMaterial
            color={config.color}
            transparent
            opacity={config.opacity}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Traveling light node along the ring */}
        <mesh ref={satellite}>
          <sphereGeometry args={[config.satelliteSize, 16, 16]} />
          <meshBasicMaterial color={config.satelliteColor} toneMapped={false} />
        </mesh>
        <mesh ref={satelliteGlow} scale={3.2}>
          <sphereGeometry args={[config.satelliteSize, 16, 16]} />
          <meshBasicMaterial
            color={config.satelliteColor}
            transparent
            opacity={0.16}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Three tilted orbital rings with travelling light nodes. The rings give the
 * scene a sense of scale and slow, deliberate motion.
 */
export function OrbitalRings({ count = RINGS.length }: { count?: number }) {
  const rings = useMemo(() => RINGS.slice(0, count), [count]);
  return (
    <group>
      {rings.map((ring, index) => (
        <Ring key={index} config={ring} />
      ))}
    </group>
  );
}
