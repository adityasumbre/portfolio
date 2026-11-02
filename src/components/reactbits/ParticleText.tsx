"use client";

import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

type Props = {
  /** Lines of text to render as particles. */
  lines: readonly string[];
  /** Optional class names for the plain-text fallback lines. */
  lineClassNames?: readonly string[];
  className?: string;
  /** Upper bound on particles. Lower values are used on small screens. */
  maxParticles?: number;
};

type Particle = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
};

const PALETTE = {
  lineOne: ["#fdf0e7", "#ffe3d1"],
  lineTwo: ["#ff7d45", "#ffb020"],
} as const;

function hexToRgb(hex: string): [number, number, number] {
  const value = hex.replace("#", "");
  const full =
    value.length === 3
      ? value
          .split("")
          .map((char) => char + char)
          .join("")
      : value;
  const number = Number.parseInt(full, 16);
  return [(number >> 16) & 255, (number >> 8) & 255, number & 255];
}

function mixHex(from: string, to: string, amount: number): string {
  const a = hexToRgb(from);
  const b = hexToRgb(to);
  const t = Math.min(1, Math.max(0, amount));
  const channels = a.map((channel, index) =>
    Math.round(channel + (b[index] - channel) * t),
  );
  return `rgb(${channels[0]} ${channels[1]} ${channels[2]})`;
}

/**
 * Particle Text
 *
 * A canvas recreation of the React Bits "Particle Text" effect: the name is
 * sampled from rendered text, then rebuilt from particles that scatter away
 * from the cursor and spring back into place.
 *
 * Accessibility: the real text is always present as visually hidden content,
 * and a styled plain-text fallback is used for reduced-motion users or if the
 * canvas cannot be created.
 */
export function ParticleText({
  lines,
  lineClassNames,
  className,
  maxParticles = 12000,
}: Props) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);
  const showText = reducedMotion || !ready;

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let frame = 0;
    let lastTime = 0;
    let visible = true;
    let disposed = false;
    const pointer = { x: 0, y: 0, active: false };

    const build = () => {
      if (disposed) return;
      const rect = wrapper.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;

      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      const styles = window.getComputedStyle(wrapper);
      const fontSize = Number.parseFloat(styles.fontSize) || 64;
      const fontWeight = styles.fontWeight || "700";
      const fontFamily = styles.fontFamily || "sans-serif";

      // Draw the text to an offscreen canvas, then sample its pixels.
      const offscreen = document.createElement("canvas");
      offscreen.width = canvas.width;
      offscreen.height = canvas.height;
      const sample = offscreen.getContext("2d", { willReadFrequently: true });
      if (!sample) return;

      sample.scale(dpr, dpr);
      sample.clearRect(0, 0, width, height);
      sample.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
      sample.textAlign = "left";
      sample.textBaseline = "middle";
      sample.fillStyle = "#ffffff";

      // Chromium supports canvas letter spacing; harmless if unsupported.
      const spaced = sample as CanvasRenderingContext2D & {
        letterSpacing?: string;
      };
      try {
        spaced.letterSpacing = `${-0.045 * fontSize}px`;
      } catch {
        // Ignore unsupported canvas properties.
      }

      const slotHeight = height / lines.length;
      lines.forEach((line, index) => {
        const y = (index + 0.5) * slotHeight;
        sample.fillText(line, 0, y);
      });

      const data = sample.getImageData(0, 0, offscreen.width, offscreen.height);
      const pixels = data.data;
      const step = Math.max(1, Math.round(dpr * 1.7));
      const targets: Array<{
        x: number;
        y: number;
        color: string;
        size: number;
      }> = [];

      for (let y = 0; y < offscreen.height; y += step) {
        for (let x = 0; x < offscreen.width; x += step) {
          const alpha = pixels[(y * offscreen.width + x) * 4 + 3];
          if (alpha < 140) continue;

          const cssX = x / dpr;
          const cssY = y / dpr;
          const lineIndex = Math.min(
            lines.length - 1,
            Math.floor(cssY / slotHeight),
          );
          const progress = width > 0 ? cssX / width : 0;
          const colors = lineIndex === 0 ? PALETTE.lineOne : PALETTE.lineTwo;
          const color =
            lineIndex === 0
              ? mixHex(colors[0], colors[1], progress * 0.7)
              : mixHex(colors[0], colors[1], progress);

          targets.push({
            x: cssX,
            y: cssY,
            color,
            size: 1.25 + Math.random() * 0.85,
          });
        }
      }

      if (targets.length === 0) return;

      // Keep the particle count bounded, with a lower cap on small screens.
      const cap = width < 640 ? Math.min(maxParticles, 4000) : maxParticles;
      const stride = Math.max(1, Math.ceil(targets.length / cap));
      particles = targets
        .filter((_, index) => index % stride === 0)
        .map((target) => {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.max(width, height) * (0.35 + Math.random() * 0.45);
          return {
            x: width / 2 + Math.cos(angle) * radius,
            y: height / 2 + Math.sin(angle) * radius,
            targetX: target.x,
            targetY: target.y,
            vx: 0,
            vy: 0,
            size: target.size,
            color: target.color,
            alpha: 0.55 + Math.random() * 0.45,
          };
        });

      setReady(true);
      draw(performance.now(), true);
    };

    const draw = (time: number, force = false) => {
      if (disposed) return;
      if (!force && (!visible || document.hidden)) {
        frame = window.requestAnimationFrame(draw);
        return;
      }

      const delta = Math.min(32, time - (lastTime || time));
      lastTime = time;
      const speed = delta / 16.67;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);

      const repelRadius = Math.min(120, Math.max(70, width * 0.16));

      for (const particle of particles) {
        const dx = particle.targetX - particle.x;
        const dy = particle.targetY - particle.y;

        particle.vx += dx * 0.075 * speed;
        particle.vy += dy * 0.075 * speed;

        if (pointer.active) {
          const px = particle.x - pointer.x;
          const py = particle.y - pointer.y;
          const distance = Math.hypot(px, py);
          if (distance < repelRadius && distance > 0.001) {
            const force = (1 - distance / repelRadius) * 3.2 * speed;
            particle.vx += (px / distance) * force;
            particle.vy += (py / distance) * force;
          }
        }

        particle.vx *= Math.pow(0.82, speed);
        particle.vy *= Math.pow(0.82, speed);
        particle.x += particle.vx * speed;
        particle.y += particle.vy * speed;

        context.globalAlpha = particle.alpha;
        context.fillStyle = particle.color;
        context.fillRect(particle.x, particle.y, particle.size, particle.size);
      }

      context.globalAlpha = 1;
      if (!force) frame = window.requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x >= -60 && x <= rect.width + 60 && y >= -60 && y <= rect.height + 60) {
        pointer.x = x;
        pointer.y = y;
        pointer.active = true;
      } else {
        pointer.active = false;
      }
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const onVisibility = () => {
      if (!document.hidden) lastTime = 0;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) lastTime = 0;
      },
      { threshold: 0.01 },
    );
    observer.observe(wrapper);

    const resizeObserver = new ResizeObserver(() => {
      window.requestAnimationFrame(build);
    });
    resizeObserver.observe(wrapper);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    const start = () => {
      if (disposed) return;
      build();
      frame = window.requestAnimationFrame(draw);
    };

    // Wait for the display font so sampling matches the fallback text.
    if (document.fonts?.ready) {
      document.fonts.ready.then(start).catch(start);
    } else {
      start();
    }

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [lines, maxParticles, reducedMotion]);

  return (
    <span ref={wrapperRef} className={cn("relative block", className)}>
      <span className="sr-only">{lines.join(" ")}</span>

      {lines.map((line, index) => (
        <span
          key={line}
          aria-hidden="true"
          className={cn(
            "block transition-opacity duration-300",
            lineClassNames?.[index],
            showText ? "opacity-100" : "opacity-0",
          )}
        >
          {line}
        </span>
      ))}

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-500",
          showText ? "opacity-0" : "opacity-100",
        )}
      />
    </span>
  );
}
