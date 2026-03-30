/**
 * @module badge
 * Reusable GSAP animations for badge components.
 * Handles show/hide states and entry animations.
 *
 * These are **imperative utilities** (not init* setup functions).
 * Call them on-demand when showing/hiding a badge element.
 *
 * ## Supported `data-*` attributes
 * - `data-motion-exempt` — Skips animation entirely when present on element or ancestor
 *
 * ## Usage
 * ```ts
 * import { showBadge, hideBadge, animateBadgeEntry } from '@atomchat/animations';
 *
 * // Show with default timing
 * const cleanup = showBadge(badgeEl);
 *
 * // Hide with custom duration
 * const cleanup = hideBadge(badgeEl, { duration: 0.5 });
 *
 * // Entry animation (delegates to showBadge)
 * const cleanup = animateBadgeEntry(badgeEl);
 *
 * // Cleanup when done
 * cleanup();
 * ```
 */

import { gsap, DURATION } from "./config";
import { prefersReducedMotion, isMotionExempt } from "./motion";
import type { AnimationOptions, CleanupFn } from "./types";
import { NOOP } from "./types";

/**
 * Hide badge with scale-out animation.
 *
 * Respects `prefers-reduced-motion` and `data-motion-exempt`.
 * When motion is reduced, sets final state instantly.
 */
export function hideBadge(
  element: HTMLElement,
  options: AnimationOptions = {},
): CleanupFn {
  if (isMotionExempt(element)) return NOOP;

  if (prefersReducedMotion()) {
    gsap.set(element, { scale: 0, opacity: 0 });
    return NOOP;
  }

  const tween = gsap.to(element, {
    scale: 0,
    opacity: 0,
    duration: options.duration ?? DURATION.half,
    ease: options.ease ?? "power2.in",
    delay: options.delay,
  });

  return () => tween.kill();
}

/**
 * Show badge with scale-in animation.
 *
 * Respects `prefers-reduced-motion` and `data-motion-exempt`.
 * When motion is reduced, sets visible state instantly.
 *
 * Duration is intentionally 0.4s (not `DURATION.half`) —
 * slightly longer to complement the `back.out(1.7)` ease overshoot.
 */
export function showBadge(
  element: HTMLElement,
  options: AnimationOptions = {},
): CleanupFn {
  if (isMotionExempt(element)) return NOOP;

  if (prefersReducedMotion()) {
    gsap.set(element, { scale: 1, opacity: 1 });
    return NOOP;
  }

  const tween = gsap.from(element, {
    scale: 0,
    opacity: 0,
    /** Intentionally 0.4 (not DURATION.half) — slightly longer to complement back.out(1.7) ease */
    duration: options.duration ?? 0.4,
    ease: options.ease ?? "back.out(1.7)",
    delay: options.delay,
  });

  return () => tween.kill();
}

/**
 * Entry animation for badge (on initial mount).
 * Delegates to {@link showBadge} — identical behavior.
 *
 * Respects `prefers-reduced-motion` and `data-motion-exempt`.
 */
export function animateBadgeEntry(
  element: HTMLElement,
  options: AnimationOptions = {},
): CleanupFn {
  return showBadge(element, options);
}
