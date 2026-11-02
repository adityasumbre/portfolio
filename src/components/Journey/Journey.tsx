"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { BookOpen, Code2, GraduationCap, Sparkles } from "lucide-react";
import { useRef } from "react";

import { journey, type JourneyEntry } from "@/data/journey";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ICONS = {
  Education: GraduationCap,
  Learning: BookOpen,
  Projects: Code2,
  Focus: Sparkles,
} as const;

function Milestone({
  entry,
  index,
}: {
  entry: JourneyEntry;
  index: number;
}) {
  const Icon = ICONS[entry.tag as keyof typeof ICONS] ?? Code2;
  const alignRight = index % 2 === 1;

  return (
    <li className="relative pl-14 md:grid md:grid-cols-2 md:gap-14 md:pl-0">
      {/* Node on the line */}
      <span
        aria-hidden="true"
        className="absolute left-5 top-1 z-10 -translate-x-1/2 md:left-1/2"
      >
        <span className="relative grid h-9 w-9 place-items-center rounded-full border border-white/12 bg-[#150a08] text-gold shadow-[0_0_0_5px_rgba(8,4,3,1)]">
          <span className="absolute inset-0 rounded-full bg-gold/10" />
          <Icon className="relative h-3.5 w-3.5" />
          <span className="absolute inset-0 animate-pulse-ring rounded-full border border-gold/40" />
        </span>
      </span>

      <div
        className={cn(
          "relative",
          alignRight ? "md:col-start-2 md:pl-0" : "md:pr-0",
        )}
      >
        <Reveal y={20} delay={0.05}>
          <div
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[linear-gradient(160deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] p-5 transition-all duration-500 hover:border-white/[0.15] hover:bg-white/[0.05] sm:p-6",
              !alignRight && "md:mr-0",
            )}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(420px circle at 0% 0%, rgba(255,176,32,0.10), transparent 60%)",
              }}
            />

            <div className="relative flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-gold/90">
                {entry.tag}
              </span>
              {entry.period ? (
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-dim">
                  {entry.period}
                </span>
              ) : null}
              <span className="ml-auto font-mono text-[0.58rem] text-white/15">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <h3 className="relative mt-3.5 font-display text-lg font-semibold tracking-tight text-chalk">
              {entry.title}
            </h3>

            <p className="relative mt-2 text-[0.84rem] leading-relaxed text-mist">
              {entry.description}
            </p>

            {entry.detail ? (
              <p className="relative mt-3 border-t border-white/[0.06] pt-3 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-dim">
                {entry.detail}
              </p>
            ) : null}
          </div>
        </Reveal>
      </div>
    </li>
  );
}

export function Journey() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 72%", "end 58%"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="relative overflow-hidden border-y border-white/[0.05] bg-abyss/60 py-24 md:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-[0.16] [mask-image:radial-gradient(ellipse_55%_60%_at_50%_40%,#000,transparent_78%)]" />
        <div className="glow-blob left-1/2 top-1/3 h-[28rem] w-[28rem] -translate-x-1/2 bg-ember/8" />
      </div>

      <div className="shell">
        <SectionHeading
          id="journey-heading"
          eyebrow="04 — Development Journey"
          title={
            <>
              From fundamentals to{" "}
              <span className="text-gradient-accent">real software</span>.
            </>
          }
          description="A progression built on learning by doing — coursework, self-directed study, and projects that had to actually work."
          align="center"
        />

        <div ref={trackRef} className="relative mx-auto mt-16 max-w-4xl">
          {/* Rail */}
          <div
            aria-hidden="true"
            className="absolute left-5 top-2 h-[calc(100%-1rem)] w-px -translate-x-1/2 bg-white/[0.08] md:left-1/2"
          >
            <motion.div
              style={{ scaleY: reduceMotion ? 1 : progress }}
              className="h-full w-full origin-top bg-[linear-gradient(180deg,#ffb020,#ff3d24_55%,#c81e4a)] shadow-[0_0_14px_rgba(255,61,36,0.55)]"
            />
          </div>

          <ol className="flex flex-col gap-10 md:gap-12">
            {journey.map((entry, index) => (
              <Milestone key={entry.id} entry={entry} index={index} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
