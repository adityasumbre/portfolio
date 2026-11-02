/**
 * ---------------------------------------------------------------------------
 * DEVELOPMENT JOURNEY — EDIT THIS FILE ONLY
 * ---------------------------------------------------------------------------
 * IMPORTANT: I have deliberately NOT put years or dates on these milestones,
 * because inventing a timeline for you would be dishonest.
 *
 * To add a date, set `period` on any entry, e.g.:
 *     period: "2025",
 *     period: "2024 — 2025",
 *     period: "Ongoing",
 * If `period` is null, no date chip is rendered for that milestone.
 *
 * Add, remove or reorder entries freely — the timeline adapts.
 * ---------------------------------------------------------------------------
 */

import { personalInfo } from "./personalInfo";

export type JourneyEntry = {
  id: string;
  /** Shown as the small tag on the milestone card. */
  tag: string;
  title: string;
  description: string;
  /** Optional date/period chip. null = hidden. */
  period: string | null;
  /** Optional extra detail line shown under the description. */
  detail?: string;
};

export const journey: JourneyEntry[] = [
  {
    id: "education",
    tag: "Education",
    title: personalInfo.degree,
    description: `Studying ${personalInfo.degree} at ${personalInfo.institute}, building a foundation in programming, data structures, computer systems and software design.`,
    period: null,
    detail: `Expected completion: ${personalInfo.expectedCompletion}`,
  },
  {
    id: "learning-web",
    tag: "Learning",
    title: "Web Development Learning Journey",
    description:
      "Self-directed learning across the full stack — moving from HTML and CSS into JavaScript, React, Next.js, Node.js, Express and REST APIs, then connecting it all to real databases.",
    period: null,
    detail: "Languages, frontend, backend, APIs and databases",
  },
  {
    id: "projects",
    tag: "Projects",
    title: "Practical Software Development",
    description:
      "Building real, usable products rather than tutorials — including the Hotel Management System and the Laundry Management System — designing the data model, the interface and the backend together.",
    period: null,
    detail: "Hotel Management System · Laundry Management System",
  },
  {
    id: "current-focus",
    tag: "Focus",
    title: "Building & Learning Continuously",
    description:
      "Currently focused on strengthening full-stack fundamentals and shipping complete products — from database design and APIs through to the interface people actually use.",
    period: null,
    detail: "Full-stack development · Desktop software · AI-powered software",
  },
];
