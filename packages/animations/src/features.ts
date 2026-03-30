/**
 * @module features
 * BentoGrid staggered card entrance animation.
 *
 * Cards fade up with stagger when the grid section scrolls into view.
 *
 * ## Supported `data-*` attributes
 * - `data-features-section` — Root section element (ScrollTrigger target)
 * - `data-motion-exempt`    — Skips animation for this section
 *
 * ## CSS classes queried
 * - `.bento-card`, `.features-card` — Cards to animate
 * - `.bento-section__grid--desktop`, `.bento-section__slider-wrap`,
 *   `.features-section__grid--desktop`, `.features-section__slider-wrap` — Trigger elements
 *
 * ## Usage
 * ```ts
 * import { initFeatures } from '@atomchat/animations';
 *
 * const cleanup = initFeatures();
 * cleanup();
 * ```
 */

import { gsap, ScrollTrigger } from "./config";
import { prefersReducedMotion, isMotionExempt } from "./motion";
import type { AnimationConfig, CleanupFn } from "./types";
import { NOOP } from "./types";

/**
 * Initialize bento grid card entrance animations.
 *
 * Checks `prefersReducedMotion()` inside ScrollTrigger callback and
 * `isMotionExempt()` per section.
 *
 * @param config - Optional scope container (defaults to `document`)
 * @returns Cleanup that kills all ScrollTriggers
 */
export function initFeatures(config: AnimationConfig = {}): CleanupFn {
  const { scope = document } = config;

  const sections = scope.querySelectorAll<HTMLElement>(
    "[data-features-section]",
  );

  if (!sections.length) return NOOP;

  const cleanups: CleanupFn[] = [];

  sections.forEach((section) => {
    if (isMotionExempt(section)) return;

    const cards = section.querySelectorAll<HTMLElement>(
      ".bento-card, .features-card",
    );
    if (!cards.length) return;

    if (prefersReducedMotion()) {
      gsap.set(cards, { opacity: 1, y: 0 });
      return;
    }

    // Stagger card entrance
    gsap.set(cards, { opacity: 0, y: 40 });

    const gridOrSlider =
      section.querySelector(".bento-section__grid--desktop") ||
      section.querySelector(".bento-section__slider-wrap") ||
      section.querySelector(".features-section__grid--desktop") ||
      section.querySelector(".features-section__slider-wrap");

    if (gridOrSlider) {
      const st = ScrollTrigger.create({
        trigger: gridOrSlider,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
          });
        },
      });

      cleanups.push(() => st.kill());
    }
  });

  return () => cleanups.forEach((fn) => fn());
}
