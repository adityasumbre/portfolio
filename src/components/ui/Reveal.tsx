"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait before this element animates in. */
  delay?: number;
  /** Vertical travel distance in px. */
  y?: number;
  className?: string;
  /** Render as a different element (defaults to div). */
  as?: "div" | "li" | "span" | "article";
  /** Animate only the first time it enters the viewport. */
  once?: boolean;
};

/**
 * Scroll-triggered fade + rise. Respects prefers-reduced-motion by rendering
 * the final state immediately — no movement, no delay.
 */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
  as = "div",
  once = true,
}: RevealProps) {
  const reduceMotion = usePrefersReducedMotion();
  const MotionTag = motion[as];

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  /** Delay between each child, in seconds. */
  step?: number;
  delay?: number;
};

/**
 * Parent wrapper that staggers `RevealItem` children as they scroll into view.
 */
export function Stagger({ children, className, step = 0.08, delay = 0 }: StaggerProps) {
  const reduceMotion = usePrefersReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      data-reveal=""
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: step, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  y = 18,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduceMotion = usePrefersReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      data-reveal=""
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
