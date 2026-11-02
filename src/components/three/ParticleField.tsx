"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Deterministic PRNG (mulberry32).
 *
 * `Math.random()` is not allowed during render — React components must be pure,
 * and Cache Components/lint flag it. Seeding a tiny PRNG keeps the particle
 * layout stable across renders while still looking random.
 */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Ambient particle field — a slow-drifting shell of points around the scene.
 * Count is scaled down on mobile by the parent component.
 */
export function ParticleField({
  count = 1400,
  radius = 8.5,
}: {
  count?: number;
  radius?: number;
}) {
  const points = useRef<THREE.Points>(null);

  const { positions, sizes } = useMemo(() => {
    const random = mulberry32(0x5eed);
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i += 1) {
      // Spherical shell distribution, biased away from the very centre so the
      // core stays clean and readable.
      const r = radius * (0.35 + Math.pow(random(), 0.65) * 0.65);
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi) * 0.62;
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      sizes[i] = random() * 0.9 + 0.25;
    }

    return { positions, sizes };
  }, [count, radius]);

  useFrame((state, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.022;
    points.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.07) * 0.06;
  });

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        sizeAttenuation
        color="#ffd0a1"
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
