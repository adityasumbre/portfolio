import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  /** Monospace label, e.g. "01 — About". */
  eyebrow: string;
  /** The heading text. Keep it short and meaningful. */
  title: ReactNode;
  /** Optional supporting sentence under the heading. */
  description?: ReactNode;
  /** Align the block left (default) or centre. */
  align?: "left" | "center";
  /** id used by the section's aria-labelledby. */
  id: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Reveal>
        <span className={cn("eyebrow", align === "center" && "justify-center")}>
          {eyebrow}
        </span>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 id={id} className="mt-5 text-h2 font-semibold text-chalk">
          {title}
        </h2>
      </Reveal>

      {description ? (
        <Reveal delay={0.16}>
          <p className="mt-5 text-lead text-mist">{description}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
