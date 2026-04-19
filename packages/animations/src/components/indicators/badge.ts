/**
 * @module badge
 * Reusable GSAP animations for badge components.
 * Handles show/hide states, entry animations, and count updates.
 *
 * ## Supported `data-*` attributes
 * - `data-badge`         — Badge container (required for initBadge)
 * - `data-count`         — Current notification count (watched by MutationObserver)
 * - `data-context`       — Overflow context: "default" | "inbox"
 * - `data-badge-text`    — Text element for odometer animation
 * - `data-motion-exempt` — Skips animation entirely when present on element or ancestor
 *
 * ## Usage
 * ```ts
 * import { initBadge, showBadge, hideBadge } from '@atomchat/animations';
 *
 * // Auto-init all badges (sets up observers + entry animation)
 * const cleanup = initBadge();
 *
 * // Or use imperative utilities directly
 * const cleanup = showBadge(badgeEl);
 * const cleanup = hideBadge(badgeEl, { duration: 0.5 });
 * ```
 */

import { gsap, DURATION } from "../../core/config";
import { prefersReducedMotion, isMotionExempt } from "../../core/motion";
import type { AnimationConfig, AnimationOptions, CleanupFn } from "../../core/types";
import { NOOP } from "../../core/types";
import { initNumberOdometer } from "../../effects/text/odometer";

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

/**
 * Initialize badge lifecycle management.
 *
 * Sets up MutationObserver for all `[data-badge]` elements to:
 * - Watch `data-count` attribute changes
 * - Animate count updates with odometer effect
 * - Show/hide badge when count changes to/from 0
 * - Trigger entry animation on mount if count > 0
 *
 * @param config - Optional scope config
 * @returns Cleanup function that disconnects all observers
 *
 * @example
 * ```ts
 * // Auto-init all badges
 * const cleanup = initBadge();
 *
 * // Later, update badge count via attribute
 * badge.setAttribute('data-count', '42');
 * // → Automatically animates from old value to 42
 *
 * // Set to 0 to hide
 * badge.setAttribute('data-count', '0');
 * // → Automatically scales out
 * ```
 */
export function initBadge(config: AnimationConfig = {}): CleanupFn {
  const scope = config.scope || document;
  const badges = scope.querySelectorAll<HTMLElement>("[data-badge]");

  if (!badges.length) return NOOP;

  // Initialize odometer system for count updates
  const updateOdometer = initNumberOdometer();

  // Track observers for cleanup
  const observers: MutationObserver[] = [];
  const cleanups: CleanupFn[] = [];

  badges.forEach((badge) => {
    const badgeText = badge.querySelector<HTMLElement>("[data-badge-text]");
    if (!badgeText) return;

    let currentCount = parseInt(badge.dataset.count || "0", 10);
    const context = badge.dataset.context || "default";

    // Helper to calculate display value
    function getDisplayValue(count: number, context: string): string {
      if (count <= 0) return "0";
      if (context === "inbox") {
        if (count >= 50) return "+50";
        return count.toString();
      }
      if (count > 99) return "99+";
      return count.toString();
    }

    // Observe attribute changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "data-count") {
          const newCount = parseInt(badge.dataset.count || "0", 10);

          if (newCount !== currentCount) {
            const newDisplay = getDisplayValue(newCount, context);

            // Animate count change with odometer
            updateOdometer(badgeText, newDisplay, { duration: 0.4 });

            // Update aria-label
            const ariaLabel = `${newCount} ${newCount === 1 ? 'notification' : 'notifications'}`;
            badge.setAttribute("aria-label", ariaLabel);

            // Hide badge if count becomes 0
            if (newCount === 0 && currentCount > 0) {
              cleanups.push(hideBadge(badge));
            }
            // Show badge if count was 0 and now > 0
            else if (newCount > 0 && currentCount === 0) {
              cleanups.push(showBadge(badge));
            }

            currentCount = newCount;
          }
        }
      });
    });

    observer.observe(badge, {
      attributes: true,
      attributeFilter: ["data-count"],
    });

    observers.push(observer);

    // Entry animation for badges visible on mount (count > 0)
    if (currentCount > 0) {
      cleanups.push(animateBadgeEntry(badge));
    }
  });

  // Return cleanup that disconnects all observers
  return () => {
    observers.forEach((observer) => observer.disconnect());
    cleanups.forEach((cleanup) => cleanup());
  };
}
