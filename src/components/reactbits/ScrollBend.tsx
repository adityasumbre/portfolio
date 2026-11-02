"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

import { skillCategories } from "@/data/skills";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

const STRIP = skillCategories.flatMap((category) => category.skills).slice(0, 12);

type PanelProps = {
  item: (typeof STRIP)[number];
  index: number;
  total: number;
  bend: MotionValue<number>;
};

function BendPanel({ item, index, total, bend }: PanelProps) {
  const center = total > 1 ? (index - (total - 1) / 2) / (total - 1) : 0;
  const curve = Math.exp(-Math.pow(center * 2.6, 2));

  const y = useTransform(bend, (value) => value * curve * 24);
  const scaleY = useTransform(bend, (value) => 1 + Math.abs(value) * curve * 0.07);
  const rotateX = useTransform(bend, (value) => value * curve * -7);

  return (
    <motion.div
      style={{ y, scaleY, rotateX }}
      className="group relative h-[8.5rem] w-[10.5rem] shrink-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-[linear-gradient(155deg,rgba(255,255,255,0.055),rgba(255,255,255,0.008))] p-4 sm:h-[9.5rem] sm:w-[12.5rem] sm:p-5"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl"
        style={{ backgroundColor: item.accent, opacity: 0.16 }}
      />
      <div className="relative flex h-full flex-col justify-between">
        <span
          className="grid h-8 w-8 place-items-center rounded-lg border font-mono text-[0.6rem] font-semibold"
          style={{
            color: item.accent,
            borderColor: `${item.accent}45`,
            backgroundColor: `${item.accent}14`,
          }}
        >
          {item.short}
        </span>
        <span
          aria-hidden="true"
          className="my-3 h-px w-full bg-gradient-to-r from-white/10 via-white/[0.04] to-transparent"
        />
        <div>
          <p className="font-display text-sm font-semibold tracking-tight text-chalk/90">
            {item.name}
          </p>
          <p className="mt-1 font-mono text-[0.5rem] uppercase tracking-[0.2em] text-dim">
            Stack
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Scroll Bend
 *
 * A horizontal strip of stack tiles that bows and stretches with scroll
 * velocity. The strip also tracks slowly across the viewport as it passes.
 * Purely decorative — the same technologies are listed accessibly in Skills.
 */
export function ScrollBend({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, {
    stiffness: 180,
    damping: 32,
    restDelta: 0.001,
  });
  const bend = useTransform(smoothVelocity, [-2600, 0, 2600], [-1, 0, 1]);
  const zero = useMotionValue(0);
  const activeBend = reducedMotion ? zero : bend;
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const activeX = reducedMotion ? zero : x;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden border-y border-white/[0.05] bg-abyss/40 py-10 sm:py-12",
        className,
      )}
    >
      <div className="shell mb-6 flex items-center justify-between gap-4">
        <span className="eyebrow">Stack / In motion</span>
        <span className="font-mono text-[0.55rem] uppercase tracking-[0.24em] text-dim">
          Scroll to bend
        </span>
      </div>

      <div className="relative" style={{ perspective: 900 }}>
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-void to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-void to-transparent sm:w-28" />

        {reducedMotion ? (
          <div className="flex justify-center gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {STRIP.slice(0, 6).map((item, index) => (
              <BendPanel
                key={item.name}
                item={item}
                index={index}
                total={6}
                bend={zero}
              />
            ))}
          </div>
        ) : (
          <motion.div
            style={{ x: activeX }}
            className="flex w-max gap-4 px-6 sm:gap-5 sm:px-10"
          >
            {STRIP.map((item, index) => (
              <BendPanel
                key={item.name}
                item={item}
                index={index}
                total={STRIP.length}
                bend={activeBend}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
