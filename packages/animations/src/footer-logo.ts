/**
 * @module footer-logo
 * Footer logo scroll-linked scatter/assemble animation.
 *
 * SVG path elements scatter outward (rotate + yPercent) and reassemble
 * to their original positions as the user scrolls to the bottom of the page.
 * Only active on desktop (min-width: 768px).
 *
 * ## Supported `data-*` attributes
 * - `data-footer-logo-wrap` — Logo wrapper element
 * - `data-motion-exempt`    — Skips animation
 *
 * ## Usage
 * ```ts
 * import { initFooterLogo } from '@atomchat/animations';
 *
 * const cleanup = initFooterLogo();
 * cleanup();
 * ```
 */

import { gsap, ScrollTrigger } from "./config";
import { prefersReducedMotion, isMotionExempt } from "./motion";
import type { AnimationConfig, CleanupFn } from "./types";
import { NOOP } from "./types";

/**
 * Initialize footer logo scatter animation.
 *
 * Uses `gsap.matchMedia` to only run on desktop viewports.
 * Checks `prefersReducedMotion()` and `isMotionExempt()` at setup.
 *
 * @param config - Optional scope container (defaults to `document`)
 * @returns Cleanup that kills ScrollTriggers and matchMedia context
 */
export function initFooterLogo(config: AnimationConfig = {}): CleanupFn {
  const { scope = document } = config;

  const logo = scope.querySelector<HTMLElement>("[data-footer-logo-wrap]");
  if (!logo) return NOOP;
  if (isMotionExempt(logo)) return NOOP;
  if (prefersReducedMotion()) return NOOP;

  const paths = Array.from(logo.querySelectorAll("path"));
  if (!paths.length) return NOOP;

  const triggers: ScrollTrigger[] = [];

  const mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    const R = 7.5;
    const Y = 10;

    gsap.set(paths, { transformOrigin: "center center" });

    // Staggered initial positions:
    // Outer letters get more rotation + vertical displacement
    const offsets: [number, number][] = [
      [-6 * R, 9 * Y], // path 0
      [-3 * R, 3.5 * Y], // path 1
      [-1.5 * R, 2 * Y], // path 2
      [0, 0], // path 3 (center — stays still)
      [1.5 * R, 1 * Y], // path 4
      [3 * R, 3.5 * Y], // path 5
      [6 * R, 9 * Y], // path 6
    ];

    paths.forEach((path, i) => {
      const idx = i % offsets.length;
      const [rotate, yPercent] = offsets[idx];
      if (rotate !== 0 || yPercent !== 0) {
        gsap.set(path, { rotate, yPercent });
      }
    });

    const tween = gsap.to(paths, {
      rotate: 0,
      yPercent: 0,
      ease: "none",
      scrollTrigger: {
        trigger: logo,
        start: "top bottom",
        endTrigger: document.body,
        end: "bottom bottom",
        scrub: true,
      },
    });

    if (tween.scrollTrigger) {
      triggers.push(tween.scrollTrigger);
    }
  });

  return () => {
    triggers.forEach((st) => st.kill());
    mm.kill();
  };
}
