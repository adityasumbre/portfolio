"use client";

import { useEffect, useRef } from "react";

import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Grid cell size in CSS pixels. */
  cellSize?: number;
};

const GLYPHS = [".", ":", "+", "*", "x", "o", "O", "#"] as const;

/**
 * ASCII Ripple
 *
 * A low-contrast field of ASCII glyphs that ripples under the pointer. It is
 * deliberately quiet: it sits behind the hero content, uses one accent colour
 * and pauses when the hero is off-screen.
 */
export function AsciiRipple({ className, cellSize = 20 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let columns = 0;
    let rows = 0;
    let frame = 0;
    let visible = true;
    let disposed = false;
    let lastDraw = 0;
    const pointer = { x: -9999, y: -9999, active: false };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;

      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cell = window.innerWidth < 640 ? Math.max(cellSize, 24) : cellSize;
      columns = Math.ceil(width / cell) + 1;
      rows = Math.ceil(height / cell) + 1;

      context.font = `10px ui-monospace, SFMono-Regular, Menlo, monospace`;
      context.textAlign = "center";
      context.textBaseline = "middle";
    };

    const render = (time: number, force = false) => {
      if (disposed) return;

      if (!force) {
        if (!visible || document.hidden) {
          frame = window.requestAnimationFrame(render);
          return;
        }
        // ~30fps is plenty for a background texture.
        if (time - lastDraw < 33) {
          frame = window.requestAnimationFrame(render);
          return;
        }
        lastDraw = time;
      }

      context.clearRect(0, 0, width, height);

      const cell = columns > 1 ? width / (columns - 1) : cellSize;
      const seconds = time / 1000;
      const pointerX = pointer.active ? pointer.x : width * 0.5;
      const pointerY = pointer.active ? pointer.y : height * 0.42;

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const x = column * cell;
          const y = row * cell;

          const base =
            Math.sin(column * 0.16 + row * 0.22 + seconds * 0.35) * 0.5 + 0.5;
          const dx = x - pointerX;
          const dy = y - pointerY;
          const distance = Math.hypot(dx, dy);
          const ripple =
            Math.sin(distance * 0.075 - seconds * 2.1) *
            Math.exp(-distance / 240);

          const value = base * 0.22 + (ripple + 1) * 0.24;
          const alpha = Math.max(0, Math.min(0.34, value * 0.34));
          if (alpha < 0.012) continue;

          const glyph =
            GLYPHS[
              Math.min(
                GLYPHS.length - 1,
                Math.max(0, Math.round(value * (GLYPHS.length - 1))),
              )
            ];

          context.globalAlpha = alpha;
          context.fillStyle = "#ffc39a";
          context.fillText(glyph, x, y);
        }
      }

      context.globalAlpha = 1;
      if (!force) frame = window.requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active =
        pointer.x >= -40 &&
        pointer.x <= rect.width + 40 &&
        pointer.y >= -40 &&
        pointer.y <= rect.height + 40;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        lastDraw = 0;
      },
      { threshold: 0.01 },
    );
    observer.observe(canvas);

    const resizeObserver = new ResizeObserver(() => {
      resize();
      render(performance.now(), true);
    });
    resizeObserver.observe(canvas);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    resize();
    render(performance.now(), true);

    if (!reducedMotion) {
      frame = window.requestAnimationFrame(render);
    }

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [cellSize, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none h-full w-full", className)}
    />
  );
}
