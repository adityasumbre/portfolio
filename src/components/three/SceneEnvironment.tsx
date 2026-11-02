"use client";

import { Environment, Lightformer } from "@react-three/drei";

/**
 * A fully procedural environment map built from lightformers.
 *
 * Why not an HDR preset? Presets download a multi-megabyte file from a CDN at
 * runtime, which is slow and can fail offline. Rendering the reflections from
 * a handful of emissive planes gives the metal surfaces something to reflect
 * while keeping the scene self-contained and fast.
 */
export function SceneEnvironment() {
  return (
    <Environment resolution={128} frames={1}>
      {/* Cool key light, upper right */}
      <Lightformer
        form="rect"
        intensity={2.6}
        color="#ff6a3d"
        position={[5, 3, 4]}
        scale={[7, 7, 1]}
      />
      {/* Amber rim light, left */}
      <Lightformer
        form="rect"
        intensity={2.2}
        color="#ffb020"
        position={[-5, 1.5, 3]}
        scale={[5, 6, 1]}
      />
      {/* Crimson bounce, lower left */}
      <Lightformer
        form="rect"
        intensity={1.6}
        color="#c81e4a"
        position={[-3, -4, 2]}
        scale={[6, 5, 1]}
      />
      {/* Soft white top light for crisp specular highlights */}
      <Lightformer
        form="rect"
        intensity={1.4}
        color="#fff3e9"
        position={[0, 6, 1]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[8, 8, 1]}
      />
      {/* Deep ember fill so shadows never read as flat black */}
      <Lightformer
        form="rect"
        intensity={1.1}
        color="#5a1a10"
        position={[2, -5, -3]}
        scale={[8, 8, 1]}
      />
    </Environment>
  );
}
