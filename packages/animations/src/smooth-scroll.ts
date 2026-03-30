/**
 * @module smooth-scroll
 * Lenis smooth scrolling integration with GSAP ticker sync.
 *
 * Singleton pattern — only one Lenis instance exists at a time.
 * `initSmoothScroll()` destroys the previous instance before creating a new one,
 * supporting the Barba.js page-transition recreate cycle.
 *
 * ## Configuration
 * - `lerp: 0.165` — smoothing factor
 * - `wheelMultiplier: 1.25` — scroll speed multiplier
 *
 * ## Lifecycle
 * - `initSmoothScroll()` — Creates a new instance (destroys previous if exists)
 * - `destroySmoothScroll()` — Fully cleans up instance + ticker callback
 * - `getLenis()` — Returns current instance or null
 *
 * ## Usage
 * ```ts
 * import { initSmoothScroll, destroySmoothScroll, getLenis } from '@atomchat/animations';
 *
 * const lenis = initSmoothScroll();
 * // ... on page leave:
 * destroySmoothScroll();
 * ```
 */

// @ts-expect-error - Lenis is an optional peer dependency
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./config";

// ── Singleton State ────────────────────────────────────────────

let lenisInstance: Lenis | null = null;
let tickerCallback: ((time: number) => void) | null = null;

/**
 * Create a new Lenis smooth scroll instance.
 *
 * Destroys existing instance first to prevent leaks.
 * Syncs Lenis scroll position with GSAP ScrollTrigger and
 * drives Lenis from GSAP's ticker for frame-perfect sync.
 *
 * @returns The new Lenis instance
 */
export function initSmoothScroll(): Lenis {
  if (lenisInstance) {
    destroySmoothScroll();
  }

  lenisInstance = new Lenis({
    lerp: 0.165,
    wheelMultiplier: 1.25,
  });

  // Sync Lenis scroll position with GSAP ScrollTrigger
  lenisInstance.on("scroll", ScrollTrigger.update);

  // Drive Lenis from GSAP's ticker for frame-perfect sync
  tickerCallback = (time: number): void => {
    lenisInstance?.raf(time * 1000);
  };
  gsap.ticker.add(tickerCallback);

  // Smooth out lag spikes (500ms threshold, 33ms average)
  gsap.ticker.lagSmoothing(500, 33);

  return lenisInstance;
}

/**
 * Get the current Lenis instance.
 *
 * @returns Current Lenis instance or `null` if not initialized
 */
export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Destroy the current Lenis instance and clean up GSAP ticker.
 *
 * Safe to call even if no instance exists.
 */
export function destroySmoothScroll(): void {
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
  }

  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}
