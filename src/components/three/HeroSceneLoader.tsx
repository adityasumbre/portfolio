"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import { SceneFallback } from "./SceneFallback";
import { WebGLBoundary } from "./WebGLBoundary";

/**
 * The three.js bundle is large, so it is:
 *   1. dynamically imported (kept out of the initial JS payload), and
 *   2. paused whenever the hero scrolls out of view (saves battery + GPU).
 */
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <SceneFallback />,
});

type Props = {
  isMobile: boolean;
  reducedMotion: boolean;
};

export function HeroSceneLoader({ isMobile, reducedMotion }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Respect reduced-motion: never spin up the WebGL renderer at all.
  if (reducedMotion) {
    return (
      <div className="h-full w-full">
        <SceneFallback />
      </div>
    );
  }

  return (
    <WebGLBoundary fallback={<SceneFallback />}>
      <div ref={containerRef} className="h-full w-full">
        <HeroScene isMobile={isMobile} reducedMotion={reducedMotion} active={active} />
      </div>
    </WebGLBoundary>
  );
}
