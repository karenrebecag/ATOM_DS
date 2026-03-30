/**
 * @module toast
 * Position-aware toast entrance/exit animations with stacking support.
 *
 * ## Features
 * - Direction-aware slide in (top positions slide from above, bottom from below)
 * - Staggered stacking when multiple toasts appear
 * - Smooth exit with fade + slide
 * - Automatic gap management between stacked toasts
 * - Reduced motion: simplified fade only (no slide/scale)
 *
 * ## Supported `data-*` attributes
 * - `data-motion-exempt` — Skips animation for this toast element
 *
 * ## CSS classes
 * - `.toast` — Expected on each toast element for DOM queries
 *
 * ## Usage
 * ```ts
 * import { initToastAnimations, animateToastExit, restackToasts } from '@anthropic-atom/animations';
 *
 * // Setup observer on container
 * const cleanup = initToastAnimations(container, 'top-right');
 *
 * // Manual exit
 * await animateToastExit(toastEl, { position: 'top-right', container });
 * restackToasts(container);
 *
 * // Later:
 * cleanup();
 * ```
 */

import { gsap, DURATION, STAGGER } from "./config";
import { prefersReducedMotion, isMotionExempt } from "./motion";
import type { CleanupFn } from "./types";
import { NOOP } from "./types";

export interface ToastAnimationConfig {
  position: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  container: HTMLElement;
}

/**
 * Animate toast entrance with position-aware direction.
 *
 * Respects `prefers-reduced-motion` (fade only, no slide/scale)
 * and `data-motion-exempt` (sets opacity to 1 instantly).
 *
 * @returns Cleanup that kills the entrance tween
 */
export function animateToastEnter(
  toast: HTMLElement,
  config: ToastAnimationConfig,
): CleanupFn {
  if (isMotionExempt(toast)) {
    gsap.set(toast, { opacity: 1 });
    return NOOP;
  }

  const { position } = config;
  const isTop = position.startsWith("top");
  const yOffset = isTop ? -100 : 100;

  // Reduced motion: just fade in
  if (prefersReducedMotion()) {
    const tween = gsap.to(toast, {
      opacity: 1,
      duration: DURATION.quarter,
      ease: "power2.out",
    });
    return () => tween.kill();
  }

  // Full animation: slide + fade + scale
  gsap.set(toast, {
    opacity: 0,
    y: yOffset,
    scale: 0.95,
  });

  const tween = gsap.to(toast, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: DURATION.half,
    ease: "atom",
    clearProps: "all",
  });

  return () => tween.kill();
}

/**
 * Animate toast exit with position-aware direction.
 * Removes the toast element from DOM on completion.
 *
 * Returns a Promise that resolves after the exit animation finishes
 * and the toast DOM node is removed — use `await` before restacking.
 *
 * Respects `prefers-reduced-motion` (fade only) and `data-motion-exempt`
 * (removes immediately).
 */
export function animateToastExit(
  toast: HTMLElement,
  config: ToastAnimationConfig,
): Promise<void> {
  if (isMotionExempt(toast)) {
    toast.remove();
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const { position } = config;
    const isTop = position.startsWith("top");
    const yOffset = isTop ? -50 : 50;

    // Reduced motion: just fade out
    if (prefersReducedMotion()) {
      gsap.to(toast, {
        opacity: 0,
        duration: DURATION.quarter,
        ease: "power2.in",
        onComplete: () => {
          toast.remove();
          resolve();
        },
      });
      return;
    }

    // Full animation: slide + fade + scale
    gsap.to(toast, {
      opacity: 0,
      y: yOffset,
      scale: 0.9,
      duration: DURATION.half,
      ease: "power2.in",
      onComplete: () => {
        toast.remove();
        resolve();
      },
    });
  });
}

/**
 * Restack toasts with smooth animation when one is removed.
 * Animates each remaining toast to its new position.
 *
 * Respects `prefers-reduced-motion` (skips restacking animation).
 */
export function restackToasts(container: HTMLElement): void {
  const toasts = Array.from(
    container.querySelectorAll<HTMLElement>(".toast"),
  );

  if (prefersReducedMotion()) return;

  toasts.forEach((toast, index) => {
    gsap.to(toast, {
      y: 0,
      duration: DURATION.half,
      ease: "atom",
      delay: index * STAGGER.fast,
    });
  });
}

/**
 * Initialize toast animations for a container.
 *
 * Sets up a MutationObserver that auto-animates new `.toast` elements
 * added to the container.
 *
 * @param container - The toast container element
 * @param position - Toast position (determines slide direction)
 * @returns Cleanup that disconnects the observer
 */
export function initToastAnimations(
  container: HTMLElement,
  position: ToastAnimationConfig["position"],
): CleanupFn {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (
          node instanceof HTMLElement &&
          node.classList.contains("toast")
        ) {
          animateToastEnter(node, { position, container });
        }
      });
    });
  });

  observer.observe(container, { childList: true });

  return () => {
    observer.disconnect();
  };
}

/**
 * Cleanup toast animations for a container.
 * Backward-compatible standalone cleanup for callers using the
 * old init/cleanup split pattern.
 *
 * Prefer using the {@link CleanupFn} returned by {@link initToastAnimations} instead.
 */
export function cleanupToastAnimations(container: HTMLElement): void {
  // Check for observer stored by older init patterns
  const observer = (container as any)._toastObserver as
    | MutationObserver
    | undefined;
  if (observer) {
    observer.disconnect();
    delete (container as any)._toastObserver;
  }
}
