/**
 * @module stats
 * Stats count-up animation with odometer-style rolling digits.
 *
 * Uses ScrollTrigger for viewport detection and the odometer module
 * for smooth rolling digit transitions. Numbers, suffixes, and labels
 * animate in sequence with stagger timing.
 *
 * ## Supported `data-*` attributes
 * - `data-stats-section`      — Root section element (ScrollTrigger target)
 * - `data-stat-number`        — Number element (requires `data-target` and `data-odometer-element`)
 * - `data-target`             — Target number value (e.g. `"1500"`)
 * - `data-separator="true"`   — Use dot separator for thousands (e.g. `1.500`)
 * - `data-stat-suffix`        — Suffix element (%, x, h, +)
 * - `data-stat-label`         — Label element
 * - `data-motion-exempt`      — Skips animation for this section
 *
 * ## Usage
 * ```ts
 * import { initStats } from '@atomchat/animations';
 *
 * const cleanup = initStats();
 * // Later:
 * cleanup();
 * ```
 */

import { gsap, ScrollTrigger } from "../core/config";
import { prefersReducedMotion, isMotionExempt } from "../core/motion";
import { initNumberOdometer } from "./odometer";
import type { AnimationConfig, CleanupFn } from "../core/types";
import { NOOP } from "../core/types";

function formatNumber(n: number, useSeparator?: boolean): string {
  if (!useSeparator) return Math.round(n).toString();
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/**
 * Initialize stats count-up animations for `[data-stats-section]` elements.
 *
 * Checks `prefersReducedMotion()` at the top — if reduced, numbers are
 * set to their final values instantly (no rolling animation).
 *
 * @param config - Optional scope container (defaults to `document`)
 * @returns Cleanup that kills all ScrollTriggers created by this init
 */
export function initStats(config: AnimationConfig = {}): CleanupFn {
  const { scope = document } = config;

  const sections = scope.querySelectorAll<HTMLElement>(
    "[data-stats-section]",
  );

  if (!sections.length) return NOOP;
  if (prefersReducedMotion()) return NOOP;

  const cleanups: CleanupFn[] = [];

  sections.forEach((section) => {
    if (isMotionExempt(section)) return;

    const numberEls =
      section.querySelectorAll<HTMLSpanElement>("[data-stat-number]");
    const labelEls =
      section.querySelectorAll<HTMLElement>("[data-stat-label]");
    const suffixEls =
      section.querySelectorAll<HTMLElement>("[data-stat-suffix]");

    if (!numberEls.length) return;

    // Set initial visibility
    gsap.set(labelEls, { opacity: 0, y: 8 });
    gsap.set(suffixEls, { opacity: 0 });

    const targets = Array.from(numberEls).map((el) => ({
      el,
      target: Number(el.dataset.target) || 0,
      separator: el.dataset.separator === "true",
    }));

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      once: true,
      onEnter: () => {
        // Initialize odometer when trigger fires
        const updateOdometer = initNumberOdometer();
        const tl = gsap.timeline();

        // Trigger odometer animations with stagger timing
        targets.forEach((t, i) => {
          const targetValue = formatNumber(t.target, t.separator);
          const startTime = i * 0.12;
          const duration = 1.6 + i * 0.15;

          tl.call(
            () => {
              updateOdometer(t.el, targetValue, { duration });
            },
            [],
            startTime,
          );
        });

        // Animate suffixes
        suffixEls.forEach((el, i) => {
          tl.to(
            el,
            { opacity: 1, duration: 0.5, ease: "power2.out" },
            0.2 + i * 0.12,
          );
        });

        // Animate labels
        labelEls.forEach((el, i) => {
          tl.to(
            el,
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            0.6 + i * 0.1,
          );
        });
      },
    });

    cleanups.push(() => st.kill());
  });

  return () => cleanups.forEach((fn) => fn());
}
