"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { keycapKeys, keycapPalette } from "@/data/keycaps";
import { personalInfo } from "@/data/personalInfo";
import { projects } from "@/data/projects";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { AsciiRipple } from "@/components/reactbits/AsciiRipple";
import { ParticleText } from "@/components/reactbits/ParticleText";
import { ButtonLink } from "@/components/ui/Button";
import KeycapOrb from "@/components/ui/keycap-orb";

const currentProject = projects.find((project) => project.status === "development");
const NAME_LINES = ["ADITYA", "SUMBRE"] as const;
const NAME_LINE_CLASSES = ["", "text-gradient-accent"] as const;

function RotatingFocus({ words }: { words: readonly string[] }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reduceMotion || words.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, 3000);
    return () => window.clearInterval(id);
  }, [reduceMotion, words.length]);

  return (
    <span className="relative inline-flex h-5 min-w-[13rem] items-center overflow-hidden align-bottom">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          initial={reduceMotion ? false : { y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={reduceMotion ? undefined : { y: "-110%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center whitespace-nowrap text-gold"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero({ hasPhoto = false }: { hasPhoto?: boolean }) {
  const isMobile = useIsMobile();
  const reduceMotion = usePrefersReducedMotion();

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.085, delayChildren: 0.08 } },
  };

  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-svh items-center overflow-hidden pb-24 pt-28 md:pt-32 lg:pb-28"
    >
      {/* Ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-[0.32] [mask-image:radial-gradient(ellipse_78%_62%_at_50%_38%,#000_10%,transparent_76%)]" />
        <AsciiRipple className="absolute inset-0 opacity-70" />
        <div className="glow-blob left-[-14%] top-[2%] h-[32rem] w-[32rem] bg-ember/20" />
        <div className="glow-blob right-[-10%] top-[16%] h-[30rem] w-[30rem] bg-gold/12" />
        <div className="glow-blob bottom-[-20%] left-[26%] h-[26rem] w-[26rem] bg-wine/12" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-void" />
      </div>

      <div className="shell grid w-full items-center gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-6">
        {/* ---------------- Text column ---------------- */}
        <motion.div
          variants={container}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          data-reveal=""
          className="relative z-10 max-w-2xl"
        >
          <motion.div variants={item} className="flex items-center gap-3">
            {hasPhoto ? (
              <span className="relative inline-flex h-11 w-11 shrink-0 rounded-full bg-[linear-gradient(140deg,#ff3d24,#ff7d45_55%,#ffb020)] p-[2px] shadow-[0_0_24px_-6px_rgba(255,61,36,0.75)]">
                <Image
                  src={personalInfo.photo}
                  alt={personalInfo.fullName}
                  width={44}
                  height={44}
                  priority
                  className="h-full w-full rounded-full object-cover object-[50%_28%]"
                />
              </span>
            ) : null}
            <span className="eyebrow">{personalInfo.greeting}</span>
            <span className="hidden h-px flex-1 bg-gradient-to-r from-white/15 to-transparent sm:block" />
          </motion.div>

          <motion.h1
            id="hero-heading"
            variants={item}
            className="mt-5 font-display text-display font-bold uppercase tracking-[-0.045em] text-chalk"
          >
            <ParticleText
              lines={NAME_LINES}
              lineClassNames={NAME_LINE_CLASSES}
            />
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-lg font-medium text-chalk/90 md:text-xl"
          >
            <span>Full Stack Web Developer</span>
            <span aria-hidden="true" className="text-gold/70">
              &amp;
            </span>
            <span>Programmer</span>
          </motion.p>

          <motion.p variants={item} className="mt-3 text-lead text-mist">
            {personalInfo.tagline}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-mist/85"
          >
            {personalInfo.heroIntro}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-6 flex flex-wrap items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-dim"
          >
            <span className="text-white/25">Focus</span>
            <span aria-hidden="true" className="text-white/20">
              /
            </span>
            <RotatingFocus words={personalInfo.rotatingFocus} />
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="#projects" size="lg">
              Explore My Work
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#contact" variant="secondary" size="lg">
              Let&apos;s Connect
            </ButtonLink>
          </motion.div>

          {currentProject ? (
            <motion.a
              variants={item}
              href={`#projects`}
              className="group mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] py-2 pl-3 pr-4 text-xs text-mist backdrop-blur-sm transition-colors hover:border-gold/35 hover:text-chalk"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/60 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              <span className="font-mono uppercase tracking-[0.14em] text-dim">
                Currently building
              </span>
              <span className="hidden text-chalk/80 sm:inline">
                {currentProject.title}
              </span>
              <ArrowRight
                className="h-3.5 w-3.5 text-dim transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </motion.a>
          ) : null}
        </motion.div>

        {/* ---------------- 3D column ---------------- */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          data-reveal=""
          className="relative h-[320px] w-full sm:h-[400px] lg:h-[600px]"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(255,61,36,0.22),transparent_62%)] blur-2xl"
          />

          {/* Keycap orb — a real WebGL ball of the stack. */}
          <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-void/80 shadow-[0_40px_120px_-50px_rgba(255,61,36,0.6)] ring-1 ring-inset ring-white/[0.04]">
            <KeycapOrb
              keys={keycapKeys}
              palette={keycapPalette}
              background="#080403"
              glow="#ff3d24"
              rings={9}
              scale={isMobile ? 0.8 : 0.68}
              autoRotate={!reduceMotion}
              speed={0.9}
              height="100%"
              className="h-full w-full"
              aria-label="Interactive ball of keycaps labelled with Aditya's stack. Drag to spin it, press a cap, or focus it and type."
            />

            {/* Floating label, ties the orb to the developer theme */}
            <div className="pointer-events-none absolute bottom-3 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-[#0d0605]/70 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-dim backdrop-blur-md sm:flex">
              <Sparkles className="h-3 w-3 text-gold/70" aria-hidden="true" />
              Live 3D · move your cursor
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center md:flex">
        <a
          href="#about"
          className="pointer-events-auto group flex flex-col items-center gap-2 text-dim transition-colors hover:text-chalk"
          aria-label="Scroll to the About section"
        >
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.28em]">
            Scroll
          </span>
          <span className="relative h-9 w-px overflow-hidden bg-white/12">
            <span className="absolute inset-x-0 top-0 h-4 animate-scroll-cue bg-gradient-to-b from-transparent via-gold to-transparent" />
          </span>
          <ArrowDown className="h-3 w-3 opacity-50" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
