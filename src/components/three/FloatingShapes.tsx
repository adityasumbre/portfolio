"use client";

import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type ShapeConfig = {
  geometry: "octahedron" | "tetrahedron" | "box" | "torusKnot" | "dodecahedron" | "cone";
  position: [number, number, number];
  scale: number;
  color: string;
  emissive: string;
  wireframe: boolean;
  speed: number;
  rotationIntensity: number;
};

const SHAPES: ShapeConfig[] = [
  {
    geometry: "octahedron",
    position: [2.55, 1.15, -0.4],
    scale: 0.42,
    color: "#2b100a",
    emissive: "#ffb020",
    wireframe: false,
    speed: 1.2,
    rotationIntensity: 1.1,
  },
  {
    geometry: "torusKnot",
    position: [-2.65, 0.55, -0.9],
    scale: 0.3,
    color: "#2b0a12",
    emissive: "#c81e4a",
    wireframe: false,
    speed: 1.6,
    rotationIntensity: 1.4,
  },
  {
    geometry: "tetrahedron",
    position: [-2.1, -1.5, 0.5],
    scale: 0.36,
    color: "#2a120a",
    emissive: "#ff3d24",
    wireframe: true,
    speed: 1.4,
    rotationIntensity: 0.9,
  },
  {
    geometry: "dodecahedron",
    position: [2.15, -1.45, 0.2],
    scale: 0.32,
    color: "#2b130c",
    emissive: "#ff9a3c",
    wireframe: false,
    speed: 1.1,
    rotationIntensity: 1.2,
  },
  {
    geometry: "box",
    position: [0.4, 2.05, -1.6],
    scale: 0.24,
    color: "#25100a",
    emissive: "#ff7d45",
    wireframe: true,
    speed: 1.8,
    rotationIntensity: 1.6,
  },
  {
    geometry: "octahedron",
    position: [-0.6, -2.1, -1.2],
    scale: 0.22,
    color: "#2b120b",
    emissive: "#ff9a72",
    wireframe: true,
    speed: 1.5,
    rotationIntensity: 1.3,
  },
  {
    geometry: "cone",
    position: [2.9, -0.2, -1.8],
    scale: 0.2,
    color: "#25100a",
    emissive: "#ffb020",
    wireframe: false,
    speed: 1.3,
    rotationIntensity: 1.0,
  },
  {
    geometry: "tetrahedron",
    position: [-1.35, 1.9, -1.9],
    scale: 0.18,
    color: "#2a120a",
    emissive: "#ff5a3c",
    wireframe: false,
    speed: 2,
    rotationIntensity: 1.5,
  },
];

function Shape({ config }: { config: ShapeConfig }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.rotation.x = t * 0.18 * config.speed;
    mesh.current.rotation.y = t * 0.24 * config.speed;
  });

  const geometry = useMemo(() => {
    switch (config.geometry) {
      case "octahedron":
        return <octahedronGeometry args={[1, 0]} />;
      case "tetrahedron":
        return <tetrahedronGeometry args={[1, 0]} />;
      case "box":
        return <boxGeometry args={[1.15, 1.15, 1.15]} />;
      case "torusKnot":
        return <torusKnotGeometry args={[0.62, 0.19, 128, 16]} />;
      case "dodecahedron":
        return <dodecahedronGeometry args={[1, 0]} />;
      case "cone":
        return <coneGeometry args={[0.9, 1.5, 5]} />;
    }
  }, [config.geometry]);

  return (
    <Float
      speed={config.speed}
      rotationIntensity={config.rotationIntensity * 0.35}
      floatIntensity={1.1}
      floatingRange={[-0.18, 0.18]}
    >
      <mesh ref={mesh} position={config.position} scale={config.scale}>
        {geometry}
        {config.wireframe ? (
          <meshBasicMaterial
            color={config.emissive}
            wireframe
            transparent
            opacity={0.42}
          />
        ) : (
          <meshStandardMaterial
            color={config.color}
            emissive={config.emissive}
            emissiveIntensity={0.32}
            metalness={0.92}
            roughness={0.24}
            envMapIntensity={1.15}
          />
        )}
      </mesh>
    </Float>
  );
}

/**
 * Small geometric satellites that drift around the core. Purely decorative,
 * so they're hidden on low-power devices via the parent's `quality` prop.
 */
export function FloatingShapes({ count = SHAPES.length }: { count?: number }) {
  const shapes = useMemo(() => SHAPES.slice(0, count), [count]);
  return (
    <group>
      {shapes.map((shape, index) => (
        <Shape key={`${shape.geometry}-${index}`} config={shape} />
      ))}
    </group>
  );
}
