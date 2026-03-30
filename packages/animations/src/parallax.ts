/**
 * @module parallax
 * Scroll-linked parallax animations that progress with the scrollbar.
 *
 * **Vestibular risk**: These animations involve continuous scroll-linked
 * movement. `prefersReducedMotion()` is checked at the TOP of each
 * function — if reduced, no parallax is created (elements stay static).
 *
 * ## Supported `data-*` attributes
 * - `data-parallax`        — Y-axis parallax (reads `data-speed` for distance)
 * - `data-speed`           — Pixels of Y movement through scroll range (default: `50`). Positive = moves down, negative = moves up.
 * - `data-parallax-scale`  — Scale parallax (reads `data-from` and `data-to`)
 * - `data-from`            — Starting scale (default: `1.15`)
 * - `data-to`              — Ending scale (default: `1`)
 * - `data-motion-exempt`   — Skips parallax for this element
 *
 * ## Usage
 * ```html
 * <div data-parallax data-speed="-50">Moves up slower</div>
 * <div data-parallax data-speed="100">Moves down faster</div>
 * <img data-parallax-scale data-from="1.15" />
 * ```
 *
 * ```ts
 * import { initParallax, initParallaxScale } from '@atomchat/animations';
 *
 * const cleanups = [initParallax(), initParallaxScale()];
 * // Later:
 * cleanups.forEach(fn => fn());
 * ```
 */

import { gsap, ScrollTrigger } from "./config";
import { prefersReducedMotion, isMotionExempt } from "./motion";
import type { AnimationConfig, CleanupFn } from "./types";
import { NOOP } from "./types";

/**
 * Y-axis parallax based on `data-speed` attribute.
 *
 * **Vestibular risk** — bails entirely if motion is reduced.
 *
 * @param config - Optional scope container (defaults to `document`)
 * @returns Cleanup that kills all parallax ScrollTriggers and tweens
 */
export function initParallax(config: AnimationConfig = {}): CleanupFn {
  if (prefersReducedMotion()) return NOOP;

  const { scope = document } = config;

  const elements = scope.querySelectorAll<HTMLElement>("[data-parallax]");
  if (!elements.length) return NOOP;

  const tweens: gsap.core.Tween[] = [];

  elements.forEach((el) => {
    if (isMotionExempt(el)) return;

    const speed = parseFloat(el.getAttribute("data-speed") || "50");

    const tween = gsap.to(el, {
      y: speed,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    tweens.push(tween);
  });

  return () => {
    tweens.forEach((t) => {
      t.scrollTrigger?.kill();
      t.kill();
    });
  };
}

/**
 * Scale parallax: element scales down (or up) as it scrolls through viewport.
 *
 * **Vestibular risk** — bails entirely if motion is reduced.
 *
 * @param config - Optional scope container (defaults to `document`)
 * @returns Cleanup that kills all scale-parallax ScrollTriggers and tweens
 */
export function initParallaxScale(config: AnimationConfig = {}): CleanupFn {
  if (prefersReducedMotion()) return NOOP;

  const { scope = document } = config;

  const elements =
    scope.querySelectorAll<HTMLElement>("[data-parallax-scale]");
  if (!elements.length) return NOOP;

  const tweens: gsap.core.Tween[] = [];

  elements.forEach((el) => {
    if (isMotionExempt(el)) return;

    const from = parseFloat(el.getAttribute("data-from") || "1.15");
    const to = parseFloat(el.getAttribute("data-to") || "1");

    const tween = gsap.fromTo(
      el,
      { scale: from },
      {
        scale: to,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );

    tweens.push(tween);
  });

  return () => {
    tweens.forEach((t) => {
      t.scrollTrigger?.kill();
      t.kill();
    });
  };
}
