/**
 * @module marquee
 * CSS marquee viewport-aware play/pause controller.
 *
 * No GSAP — uses IntersectionObserver to pause CSS `@keyframes`
 * when the marquee scrolls out of viewport. The actual animation
 * is defined in the component's CSS (`animation: translateX ...`).
 *
 * Auto-calculates `animation-duration` based on content width
 * and a configurable pixels-per-second rate.
 *
 * ## Supported `data-*` attributes
 * - `data-marquee`        — Wrapper element (observed for viewport intersection)
 * - `data-marquee-list`   — Animated list element(s) inside the wrapper
 * - `data-motion-exempt`  — Skips auto-play setup for this marquee
 *
 * ## Usage
 * ```ts
 * import { initMarqueeObserver } from '@anthropic-atom/animations';
 *
 * const cleanup = initMarqueeObserver();
 * // With custom speed:
 * const cleanup = initMarqueeObserver({ pixelsPerSecond: 80 });
 * // Later:
 * cleanup();
 * ```
 */

import { prefersReducedMotion, isMotionExempt } from "./motion";
import type { AnimationConfig, CleanupFn } from "./types";
import { NOOP } from "./types";

interface MarqueeConfig extends AnimationConfig {
  /** Pixels per second for auto-calculated duration. Default: `50` */
  pixelsPerSecond?: number;
}

/**
 * Observe `[data-marquee]` elements and pause/resume their CSS
 * animations based on viewport visibility.
 *
 * Respects `prefers-reduced-motion` (skips all auto-play) and
 * `data-motion-exempt` (per-element opt-out).
 *
 * @param config - Optional scope and speed override
 * @returns Cleanup that disconnects the IntersectionObserver
 */
export function initMarqueeObserver(config: MarqueeConfig = {}): CleanupFn {
  const { pixelsPerSecond = 50, scope = document } = config;

  const marquees = scope.querySelectorAll<HTMLElement>("[data-marquee]");
  if (!marquees.length) return NOOP;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (prefersReducedMotion()) return;

        const lists =
          target.querySelectorAll<HTMLElement>("[data-marquee-list]");
        lists.forEach((list) => {
          list.style.animationPlayState = isIntersecting
            ? "running"
            : "paused";
        });
      });
    },
    { threshold: 0 },
  );

  marquees.forEach((marquee) => {
    if (isMotionExempt(marquee)) return;

    // Auto-calculate duration based on content width
    const lists = marquee.querySelectorAll<HTMLElement>("[data-marquee-list]");
    lists.forEach((list) => {
      const duration = list.offsetWidth / pixelsPerSecond;
      list.style.animationDuration = `${duration}s`;
      list.style.animationPlayState = "paused";
    });

    observer.observe(marquee);
  });

  return () => {
    observer.disconnect();
  };
}
