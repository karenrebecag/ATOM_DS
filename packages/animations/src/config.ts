/**
 * @module config
 * GSAP plugin registration, constants, and global defaults.
 *
 * **Import this module once** — it registers all GSAP plugins as a side effect.
 * All other animation modules import `{ gsap }` from here to get the
 * pre-configured instance.
 *
 * ## Registered Plugins
 * - ScrollTrigger — scroll-linked animations
 * - CustomEase — "atom" ease curve
 * - Draggable — drag interactions
 * - InertiaPlugin — momentum-based dragging
 * - Observer — scroll/touch/pointer observation (used by draggable-marquee)
 * - Flip — FLIP animations for layout transitions (used by layout-grid-flip)
 *
 * ## Constants
 * - `DURATION` — timing scale matching @atom/tokens motion tokens
 * - `STAGGER` — stagger scale for batch/list animations
 * - `MM` — GSAP matchMedia instance for responsive animations
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Observer } from "gsap/Observer";
import { Flip } from "gsap/Flip";
import { SplitText } from "gsap/SplitText";

// ── Plugin Registration (ONE place, never duplicated) ─────────
gsap.registerPlugin(ScrollTrigger, CustomEase, Draggable, InertiaPlugin, Observer, Flip, SplitText);

// ── Custom Ease ───────────────────────────────────────────────
// Matches --ease-default / motion.easing.atom in @atom/tokens
CustomEase.create("atom", "0.625, 0.05, 0, 1");

// ── Timing Constants ──────────────────────────────────────────
// Maps to @atom/tokens motion.duration.*
export const DURATION = {
  quarter: 0.15,
  half: 0.3,
  threeQuarters: 0.45,
  default: 0.6,
  onehalf: 0.9,
  double: 1.2,
} as const;

// Maps to @atom/tokens motion.stagger.*
export const STAGGER = {
  fast: 0.03,
  default: 0.05,
  slow: 0.1,
} as const;

// ── GSAP Defaults ─────────────────────────────────────────────
gsap.defaults({
  ease: "atom",
  duration: DURATION.default,
});

// ── Ticker Management ─────────────────────────────────────────
// Pause GSAP when tab is not visible (saves CPU/battery).
// Note: ScrollTrigger.refresh() is called when tab becomes visible again
// to handle any layout shifts that occurred while hidden.
if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      gsap.ticker.sleep();
    } else {
      gsap.ticker.wake();
      ScrollTrigger.refresh();
    }
  });
}

// ── Responsive matchMedia Instance ────────────────────────────
export const MM = gsap.matchMedia();

// ── Re-exports ────────────────────────────────────────────────
export { gsap, ScrollTrigger, Draggable, InertiaPlugin, Observer, Flip, SplitText };
