import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";

import { projects, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { DollyGallery, type DollyGalleryItem } from "@/components/reactbits/DollyGallery";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { ButtonLink } from "@/components/ui/Button";
import { ProjectVisual } from "./ProjectVisual";

function StatusBadge({ project }: { project: Project }) {
  const isLive = project.status === "live";

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
      {project.statusLabel}
    </span>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const visualFirst = index % 2 === 1;

  return (
    <Reveal y={30} delay={index * 0.08}>
      <TiltCard intensity={2.5} className="h-full">
        <article
          id={project.id}
          className="relative scroll-mt-28 overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[linear-gradient(155deg,rgba(255,255,255,0.045),rgba(255,255,255,0.008))] shadow-[0_40px_100px_-60px_rgba(0,0,0,0.95)] transition-colors duration-500 hover:border-white/[0.16]"
        >
          {/* Accent wash on hover */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover/tilt:opacity-100"
            style={{
              background: `radial-gradient(700px circle at ${
                visualFirst ? "20%" : "80%"
              } 0%, ${project.accent}14, transparent 62%)`,
            }}
          />

          <div className="relative grid lg:grid-cols-2">
            {/* ---------- Copy ---------- */}
            <div
              className={cn(
                "relative z-10 order-2 p-6 sm:p-8 lg:p-10",
                visualFirst ? "lg:order-2" : "lg:order-1",
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-dim">
                  Project {project.number}
                </span>
                <StatusBadge project={project} />
              </div>

              <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-chalk sm:text-3xl">
                {project.title}
              </h3>

              <p className="mt-3 max-w-lg text-[0.9rem] leading-relaxed text-mist">
                {project.description}
              </p>

              <ul className="mt-6 grid gap-x-5 gap-y-2 sm:grid-cols-2">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2 text-[0.78rem] leading-snug text-mist/85"
                  >
                    <Check
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/80"
                      aria-hidden="true"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>

              {project.tech.length > 0 ? (
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technology stack">
                  {project.tech.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-white/[0.09] bg-white/[0.03] px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-mist"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="mt-7 flex flex-wrap items-center gap-3">
                {project.liveUrl ? (
                  <ButtonLink
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="md"
                  >
                    Visit Live Site
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </ButtonLink>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-4 py-2.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-dim">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-300/80" />
                    Public link coming soon
                  </span>
                )}

                {project.repoUrl ? (
                  <ButtonLink
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    size="md"
                  >
                    Source Code
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </ButtonLink>
                ) : null}
              </div>
            </div>

            {/* ---------- Visual ---------- */}
            <div
              className={cn(
                "relative order-1 p-5 sm:p-7 lg:order-2 lg:p-8",
                visualFirst ? "lg:order-1" : "lg:order-2",
              )}
            >
              <div
                aria-hidden="true"
                className="absolute inset-6 -z-10 rounded-full blur-3xl"
                style={{ backgroundColor: project.accent, opacity: 0.1 }}
              />
              <div className="transition-transform duration-700 ease-out group-hover/tilt:scale-[1.02]">
                {project.image ? (
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10">
                    <Image
                      src={project.image}
                      alt={project.imageAlt ?? project.title}
                      fill
                      sizes="(max-width: 1024px) 90vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <ProjectVisual
                    variant={project.visual}
                    accent={project.accent}
                    url={project.previewUrl}
                  />
                )}
              </div>
            </div>
          </div>
        </article>
      </TiltCard>
    </Reveal>
  );
}

export function Projects() {
  const galleryItems: DollyGalleryItem[] = projects.map((project) => ({
    id: project.id,
    number: project.number,
    title: project.title,
    description: project.description,
    statusLabel: project.statusLabel,
    status: project.status,
    tech: project.tech,
    accent: project.accent,
    href: `#${project.id}`,
    visual: (
      <ProjectVisual
        variant={project.visual}
        accent={project.accent}
        url={project.previewUrl}
      />
    ),
  }));

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative py-24 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="glow-blob left-[10%] top-[6%] h-[26rem] w-[26rem] bg-ember/12" />
        <div className="glow-blob right-[-10%] bottom-[18%] h-[24rem] w-[24rem] bg-wine/10" />
      </div>

      <div className="shell">
        <SectionHeading
          id="projects-heading"
          eyebrow="03 — Featured Projects"
          title={
            <>
              Work that solves{" "}
              <span className="text-gradient-accent">real problems</span>.
            </>
          }
          description="Software built for actual operational workflows — not demo apps. Each project starts with a real problem and ends with something usable."
        />

        <DollyGallery items={galleryItems} />

        <div className="mt-20 flex items-center gap-4">
          <span className="eyebrow">Project details</span>
          <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
        </div>

        <div className="mt-8 flex flex-col gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
