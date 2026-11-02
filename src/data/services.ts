/**
 * ---------------------------------------------------------------------------
 * SERVICES / "WHAT I DO" — EDIT THIS FILE ONLY
 * ---------------------------------------------------------------------------
 * Remove a card by deleting its object. Add one by copying an existing block.
 * `icon` must be one of the names supported in the Services component
 * (currently: "web", "software", "creative"). If you add a new card, pick one
 * of those three, or ask for a new icon to be added.
 * ---------------------------------------------------------------------------
 */

export type Service = {
  id: string;
  number: string;
  /** Supported: "web" | "software" | "creative" */
  icon: "web" | "software" | "creative";
  title: string;
  description: string;
  points: string[];
};

export const services: Service[] = [
  {
    id: "web-development",
    number: "01",
    icon: "web",
    title: "Web Development",
    description:
      "Responsive, production-ready websites and applications built end to end, from the first component to the deployed API.",
    points: [
      "Responsive websites",
      "Frontend development",
      "Full-stack applications",
      "API integration",
    ],
  },
  {
    id: "software-development",
    number: "02",
    icon: "software",
    title: "Software Development",
    description:
      "Practical software for real workflows — desktop tools and business systems built around how people actually work.",
    points: [
      "Desktop applications",
      "Business management software",
      "Database-driven applications",
      "Workflow automation",
    ],
  },
  {
    id: "creative-development",
    number: "03",
    icon: "creative",
    title: "Creative Development",
    description:
      "Interactive, considered digital experiences where design and engineering work together instead of competing.",
    points: [
      "Interactive web experiences",
      "Modern UI implementation",
      "3D website experiences",
      "Technology-focused digital products",
    ],
  },
];
