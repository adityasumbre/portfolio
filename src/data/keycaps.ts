/**
 * ---------------------------------------------------------------------------
 * HERO KEYCAP ORB — EDIT THIS FILE ONLY
 * ---------------------------------------------------------------------------
 * The caps on the hero's 3D keycap ball. `keycapKeys` is ordered most
 * important first: the first cap sits dead centre facing you, the rest spiral
 * outward. The far side of the ball reuses the list.
 *
 * Keep the labels short — two to four characters read best on a cap.
 *
 * The stack here mirrors `src/data/skills.ts`. If you add a technology there
 * and want it on the ball, add a matching cap below. The palette maps the
 * component's five finishes onto this site's tokens (ember red, gold,
 * graphite, mist) so the orb belongs to the rest of the page.
 * ---------------------------------------------------------------------------
 */

import type { Keycap, KeycapPalette } from "@/components/ui/keycap-orb";

export const keycapKeys: Keycap[] = [
  // Centre cap — the monogram.
  { label: "AS", finish: "lime", hotkey: "a" },

  // Languages
  { label: "JS", finish: "cobalt", hotkey: "j" },
  { label: "Py", finish: "ink", hotkey: "p" },
  { label: "C++", finish: "ash" },
  { label: "Java", finish: "cobalt" },

  // Frontend
  { label: "Re", finish: "ink", hotkey: "r" },
  { label: "Nx", finish: "ash", hotkey: "n" },
  { label: "HTML", finish: "ink" },
  { label: "CSS", finish: "cobalt" },

  // Backend + data
  { icon: "terminal", finish: "ash" },
  { label: "API", finish: "ink" },
  { label: "SQL", finish: "ash" },
  { icon: "layers", finish: "glass" },
  { icon: "bolt", finish: "ink" },

  // Tools
  { label: "Git", finish: "ash", hotkey: "g" },
  { icon: "code", finish: "ink" },
  { icon: "pen", finish: "glass" },
  { label: "⌘", finish: "glass" },

  // Texture — glyphs that keep the ball reading as a keyboard.
  { icon: "braces", finish: "ink" },
  { icon: "cube", finish: "glass" },
  { icon: "check", finish: "lime" },
  { icon: "gear", finish: "ash" },
  { icon: "folder", finish: "ink" },
  { icon: "at", finish: "glass" },
  { icon: "hash", finish: "cobalt" },
  { icon: "search", finish: "ink" },
];

/**
 * The five finishes, remapped to the site palette:
 *   ink    — graphite caps, pale legends
 *   ash    — light mist caps, deep-espresso legends
 *   glass  — translucent warm plastic
 *   cobalt — ember red
 *   lime   — gold (the ball's brightest accent)
 */
export const keycapPalette: KeycapPalette = {
  ink: { cap: "#241310", legend: "#f7ddcb" },
  ash: { cap: "#eccbb5", legend: "#2a1009" },
  glass: { cap: "#ffb08a", legend: "#b22a10" },
  cobalt: { cap: "#d3361a", legend: "#360d05" },
  lime: { cap: "#ffb020", legend: "#2a1206" },
};
