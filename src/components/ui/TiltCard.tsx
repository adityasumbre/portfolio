"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Maximum tilt in degrees. Keep it subtle (4–8 feels premium). */
  intensity?: number;
  /** Show the cursor-following highlight. */
  spotlight?: boolean;
  /** Lift the card slightly on hover. */
  lift?: boolean;
};

/**
 * A pointer-reactive 3D card: subtle rotateX/rotateY tilt, a cursor-tracking
 * highlight, and an optional lift. Automatically inert for users who prefer
 * reduced motion, and on touch devices (no pointermove events fire).
 */
export function TiltCard({
  children,
  className,
  intensity = 6,
  spotlight = true,
  lift = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const spring = { stiffness: 220, damping: 24, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [intensity, -intensity]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-intensity, intensity]), spring);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    px.set(x - 0.5);
    py.set(y - 0.5);

    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  }

  function handlePointerLeave() {
    px.set(0);
    py.set(0);
  }

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      whileHover={lift ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className={cn("group/tilt relative", className)}
    >
      {spotlight ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(255,125,69,0.13), transparent 62%)",
          }}
        />
      ) : null}
      {children}
    </motion.div>
  );
}
