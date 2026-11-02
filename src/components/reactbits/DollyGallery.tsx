"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";

import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

export type DollyGalleryItem = {
  id: string;
  number: string;
  title: string;
  description: string;
  statusLabel: string;
  status: "live" | "development";
  tech: readonly string[];
  accent: string;
  href: string;
  visual: ReactNode;
};

function StatusPill({ item }: { item: DollyGalleryItem }) {
  const isLive = item.status === "live";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.14em]",
        isLive
          ? "border-mint/30 bg-mint/[0.08] text-mint"
          : "border-amber-400/30 bg-amber-400/[0.08] text-amber-300",
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          isLive ? "bg-mint" : "bg-amber-300",
        )}
      />
      {item.statusLabel}
    </span>
  );
}

function range(
  value: number,
  inputStart: number,
  inputEnd: number,
  outputStart: number,
  outputEnd: number,
): number {
  if (inputEnd === inputStart) return outputEnd;
  const t = Math.min(1, Math.max(0, (value - inputStart) / (inputEnd - inputStart)));
  return outputStart + (outputEnd - outputStart) * t;
}

function DollyCard({
  item,
  index,
  total,
  progress,
  active,
}: {
  item: DollyGalleryItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  active: boolean;
}) {
  const band = 1 / total;
  const enterStart = Math.max(0, index * band - 0.14);
  const enterEnd = index * band;
  const exitStart = Math.max(0, (index + 1) * band - 0.1);
  const exitEnd = Math.min(1, (index + 1) * band + 0.1);

  const z = useTransform(progress, (value) => {
    if (index > 0 && value < enterEnd) {
      return range(value, enterStart, enterEnd, -1800, 0);
    }
    if (index < total - 1 && value > exitStart) {
      return range(value, exitStart, exitEnd, 0, 1800);
    }
    return 0;
  });
  const opacity = useTransform(progress, (value) => {
    if (index > 0 && value < enterEnd) {
      return range(value, enterStart, enterEnd, 0, 1);
    }
    if (index < total - 1 && value > exitStart) {
      return range(value, exitStart, exitStart + 0.08, 1, 0);
    }
    return 1;
  });
  const scale = useTransform(progress, (value) => {
    if (index > 0 && value < enterEnd) {
      return range(value, enterStart, enterEnd, 0.82, 1);
    }
    if (index < total - 1 && value > exitStart) {
      return range(value, exitStart, exitEnd, 1, 1.08);
    }
    return 1;
  });
  const rotateX = useTransform(progress, (value) => {
    if (index > 0 && value < enterEnd) {
      return range(value, enterStart, enterEnd, 12, 0);
    }
    if (index < total - 1 && value > exitStart) {
      return range(value, exitStart, exitEnd, 0, -8);
    }
    return 0;
  });

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4">
      <motion.div
        style={{ z, opacity, scale, rotateX }}
        className={cn(
          "relative w-[min(90vw,1100px)]",
          active ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!active}
      >
        <div
          aria-hidden="true"
          className="absolute inset-8 -z-10 rounded-[3rem] blur-3xl"
          style={{ backgroundColor: item.accent, opacity: 0.12 }}
        />

        <article className="grid overflow-hidden rounded-[1.75rem] border border-white/[0.1] bg-[#0d0605]/95 shadow-[0_60px_140px_-70px_rgba(0,0,0,1)] lg:grid-cols-[1.12fr_0.88fr]">
          <div className="relative flex items-center border-b border-white/[0.06] bg-[#080403] p-4 sm:p-6 lg:border-b-0 lg:border-r">
            <div className="w-full">{item.visual}</div>
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-dim">
                Project {item.number}
              </span>
              <StatusPill item={item} />
            </div>

            <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-chalk sm:text-3xl">
              {item.title}
            </h3>

            <p className="mt-3 text-[0.86rem] leading-relaxed text-mist">
              {item.description}
            </p>

            {item.tech.length > 0 ? (
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technology stack">
                {item.tech.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-white/[0.09] bg-white/[0.03] px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-mist"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            ) : null}

            <a
              href={item.href}
              tabIndex={active ? undefined : -1}
              className="group/link mt-6 inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-gold transition-colors hover:text-chalk"
            >
              View project details
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </article>
      </motion.div>
    </div>
  );
}

function StaticCard({ item }: { item: DollyGalleryItem }) {
  return (
    <a
      href={item.href}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0605]/80 transition-colors hover:border-white/20"
    >
      <div className="border-b border-white/[0.06] bg-[#080403] p-3">
        {item.visual}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-dim">
            {item.number}
          </span>
          <StatusPill item={item} />
        </div>
        <h3 className="mt-2 font-display text-base font-semibold tracking-tight text-chalk">
          {item.title}
        </h3>
        <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-gold">
          View details
          <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}

/**
 * Dolly Gallery
 *
 * Project previews stacked in depth. On large screens the section pins and
 * scroll flies each card toward the viewer; on small screens (and for
 * reduced-motion users) the same previews become a static, readable gallery.
 */
export function DollyGallery({ items }: { items: DollyGalleryItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(items.length - 1, Math.max(0, Math.floor(value * items.length)));
    setActiveIndex((current) => (current === next ? current : next));
  });

  if (items.length === 0) return null;

  if (reducedMotion) {
    return (
      <div ref={ref} className="mt-12 grid gap-5 sm:grid-cols-2">
        {items.map((item) => (
          <StaticCard key={item.id} item={item} />
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Mobile / tablet: horizontal snap gallery, no pinning. */}
      <div className="mt-10 lg:hidden">
        <div
          aria-label="Project previews"
          className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <div key={item.id} className="min-w-[84%] snap-center sm:min-w-[55%]">
              <StaticCard item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: pinned dolly fly-through. */}
      <div
        ref={ref}
        className="relative mt-12 hidden lg:block"
        style={{ height: `${items.length * 95 + 40}vh` }}
      >
        <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-24 z-20 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0d0605]/70 px-3.5 py-1.5 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-dim backdrop-blur-md">
              <ArrowDown className="h-3 w-3 text-gold/70" aria-hidden="true" />
              Scroll to fly through
            </span>
          </div>

          <div
            className="relative h-full w-full"
            style={{ perspective: 1500, transformStyle: "preserve-3d" }}
          >
            {items.map((item, index) => (
              <DollyCard
                key={item.id}
                item={item}
                index={index}
                total={items.length}
                progress={scrollYProgress}
                active={index === activeIndex}
              />
            ))}
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-7 z-20 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              {items.map((item, index) => (
                <span
                  key={item.id}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    index === activeIndex
                      ? "w-6 bg-gold"
                      : "w-1.5 bg-white/20",
                  )}
                />
              ))}
            </div>
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-dim">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(items.length).padStart(2, "0")} · {items[activeIndex]?.title}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
