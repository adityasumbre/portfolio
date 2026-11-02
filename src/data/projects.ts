/**
 * ---------------------------------------------------------------------------
 * FEATURED PROJECTS — EDIT THIS FILE ONLY
 * ---------------------------------------------------------------------------
 * HOW TO EDIT
 *   • Set `image` to "/images/projects/hotel.jpg" (etc.) once you've dropped a
 *     screenshot into  public/images/projects/ . Leave it as null and the card
 *     renders a designed, hand-built UI preview instead — nothing looks broken.
 *   • Set `liveUrl` / `repoUrl` to null and that button is simply not rendered.
 *     There are never any dead links on the page.
 *   • `highlights` should only contain features that genuinely exist.
 *   • `accent` drives the card's preview colour. `visual` picks the preview
 *     layout ("dashboard" or "orders").
 *
 * I have NOT invented metrics, users, stars or dates for your projects.
 * ---------------------------------------------------------------------------
 */

export type ProjectStatus = "live" | "development";

export type Project = {
  id: string;
  number: string;
  title: string;
  description: string;
  tech: string[];
  status: ProjectStatus;
  statusLabel: string;
  highlights: string[];
  /** Path under /public, or null to use the generated UI preview. */
  image: string | null;
  imageAlt: string | null;
  /** Accent colour used by the generated preview. */
  accent: string;
  /** Which preview layout to render when `image` is null. */
  visual: "dashboard" | "orders";
  /** Shown in the preview's fake address bar. */
  previewUrl: string;
  liveUrl: string | null;
  repoUrl: string | null;
};

export const projects: Project[] = [
  {
    id: "hotel-management-system",
    number: "01",
    title: "Hotel Management System",
    description:
      "A web-based Hotel Management System designed to simplify hotel operations, including room management, bookings, guest information, attendance, complaints, and administrative activities.",
    tech: ["React", "Node.js", "Supabase"],
    status: "live",
    statusLabel: "Developed project",
    highlights: [
      "Room management",
      "Bookings & guest information",
      "Attendance tracking",
      "Complaint handling",
      "Administrative activities",
    ],
    image: null,
    imageAlt: "Hotel Management System dashboard preview",
    accent: "#ffb020",
    visual: "dashboard",
    previewUrl: "hotelmanagement-teal.vercel.app",
    liveUrl: "https://hotelmanagement-teal.vercel.app",
    repoUrl: null,
  },
  {
    id: "laundry-management-system",
    number: "02",
    title: "Laundry Management System",
    description:
      "A software solution being developed to digitise laundry business operations. The project aims to manage orders, customers, billing, cloth tracking, expenses, delivery workflows, and reports.",
    tech: [],
    status: "development",
    statusLabel: "In development",
    highlights: [
      "Order & customer management",
      "Billing",
      "Cloth tracking",
      "Expense tracking",
      "Delivery workflows",
      "Reports",
    ],
    image: null,
    imageAlt: "Laundry Management System preview",
    accent: "#c81e4a",
    visual: "orders",
    previewUrl: "localhost:3000/orders",
    liveUrl: null,
    repoUrl: null,
  },
];
