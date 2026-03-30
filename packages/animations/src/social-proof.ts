/**
 * @module social-proof
 * Social proof strip staggered entrance animation.
 *
 * Reveals eyebrow, subline, metric values, and metric labels
 * in a coordinated stagger sequence triggered by ScrollTrigger.
 *
 * ## Supported `data-*` attributes
 * - `data-social-proof-section`  — Root section element
 * - `data-sp-value`              — Metric value elements
 * - `data-motion-exempt`         — Skips animation
 *
 * ## CSS classes
 * - `.social-proof__eyebrow`      — Eyebrow text
 * - `.social-proof__subline`      — Subline text
 * - `.social-proof__metric-label` — Metric label elements
 *
 * ## Usage
 * ```ts
 * import { initSocialProof } from '@atomchat/animations';
 *
 * const cleanup = initSocialProof();
 * cleanup();
 * ```
 */

import { gsap, ScrollTrigger } from "./config";
import { prefersReducedMotion, isMotionExempt } from "./motion";
import type { AnimationConfig, CleanupFn } from "./types";
import { NOOP } from "./types";

/**
 * Initialize social proof strip entrance animation.
 *
 * Checks `prefersReducedMotion()` and `isMotionExempt()` per section
 * at setup — the ScrollTrigger fires once and does not repeat.
 *
 * @param config - Optional scope container (defaults to `document`)
 * @returns Cleanup that kills ScrollTriggers
 */
export function initSocialProof(
  config: AnimationConfig = {},
): CleanupFn {
  const { scope = document } = config;

  const sections = scope.querySelectorAll<HTMLElement>(
    "[data-social-proof-section]",
  );

  if (!sections.length) return NOOP;

  const cleanups: CleanupFn[] = [];

  sections.forEach((section) => {
    if (isMotionExempt(section)) return;
    if (prefersReducedMotion()) return;

    const eyebrow = section.querySelector(".social-proof__eyebrow");
    const subline = section.querySelector(".social-proof__subline");
    const metricValues = section.querySelectorAll("[data-sp-value]");
    const metricLabels = section.querySelectorAll(
      ".social-proof__metric-label",
    );

    const elements = [
      eyebrow,
      subline,
      ...Array.from(metricValues),
      ...Array.from(metricLabels),
    ].filter(Boolean);
    if (!elements.length) return;

    gsap.set(elements, { opacity: 0, y: 16 });

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 85%",
      once: true,
      onEnter: () => {
        const tl = gsap.timeline();

        if (eyebrow)
          tl.to(eyebrow, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        if (subline)
          tl.to(
            subline,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
            },
            "-=0.3",
          );

        tl.to(
          metricValues,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1,
          },
          "-=0.2",
        );

        tl.to(
          metricLabels,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.1,
          },
          "-=0.4",
        );
      },
    });

    cleanups.push(() => st.kill());
  });

  return () => cleanups.forEach((fn) => fn());
}
