/**
 * @module parallax-transition
 * Overlapping parallax page transitions for Barba.js.
 *
 * The new page slides up from the bottom (100vh -> 0) while the current page
 * shifts upward at a slower rate (0 -> -25vh), creating a parallax depth effect.
 * A dark overlay fades over the outgoing page to enhance the layering.
 *
 * **Vestibular risk**: Full-page motion transitions. When motion is reduced,
 * leave fades out instantly and enter appears instantly.
 *
 * ## Required DOM structure
 * ```html
 * <div data-transition-wrap class="transition">
 *   <div data-transition-dark class="transition__dark"></div>
 * </div>
 * ```
 *
 * ## Z-index layering
 * - `transition-wrap`: z-index 2 during leave
 * - Incoming page: z-index 3 to appear on top
 *
 * ## Usage
 * ```ts
 * import { runParallaxLeave, runParallaxEnter, runParallaxOnce } from '@anthropic-atom/animations';
 *
 * // In Barba.js transition hooks:
 * async leave({ current }) { await runParallaxLeave(current.container); }
 * async enter({ next }) { await runParallaxEnter(next.container, resetPage); }
 * ```
 */

import { gsap } from "./config";
import { CustomEase } from "gsap/CustomEase";
import { prefersReducedMotion } from "./motion";

// Named ease for parallax transitions (not a plugin registration — just a curve definition)
CustomEase.create("parallax", "0.7, 0.05, 0.13, 1");

/**
 * Leave animation — current page shifts up, dark overlay fades in.
 *
 * **Vestibular risk** — if reduced motion, hides outgoing page instantly.
 *
 * @param current - The outgoing Barba container element
 * @returns GSAP timeline (thenable)
 */
export function runParallaxLeave(
  current: HTMLElement,
): gsap.core.Timeline {
  const transitionWrap = document.querySelector<HTMLElement>(
    "[data-transition-wrap]",
  );
  const transitionDark = transitionWrap?.querySelector<HTMLElement>(
    "[data-transition-dark]",
  );

  const tl = gsap.timeline({
    onComplete: () => {
      current.remove();
    },
  });

  if (prefersReducedMotion()) {
    return tl.set(current, { autoAlpha: 0 });
  }

  // Layer the transition wrap above current content
  if (transitionWrap) {
    tl.set(transitionWrap, { zIndex: 2 });
  }

  // Dark overlay fades in over outgoing page
  if (transitionDark) {
    tl.fromTo(
      transitionDark,
      { autoAlpha: 0 },
      { autoAlpha: 0.8, duration: 1.2, ease: "parallax" },
      0,
    );
  }

  // Current page shifts upward (slower than incoming — parallax effect)
  tl.fromTo(
    current,
    { y: "0vh" },
    { y: "-25vh", duration: 1.2, ease: "parallax" },
    0,
  );

  // Reset dark overlay for next transition
  if (transitionDark) {
    tl.set(transitionDark, { autoAlpha: 0 });
  }

  return tl;
}

/**
 * Enter animation — new page slides up from bottom.
 *
 * **Vestibular risk** — if reduced motion, shows incoming page instantly.
 *
 * @param next - The incoming Barba container element
 * @param resetPage - Callback to reset scroll position and clear inline styles
 * @returns Promise that resolves when enter animation is ready
 */
export function runParallaxEnter(
  next: HTMLElement,
  resetPage: (container: HTMLElement) => void,
): Promise<void> {
  const tl = gsap.timeline();

  if (prefersReducedMotion()) {
    tl.set(next, { autoAlpha: 1 });
    tl.add("pageReady");
    tl.call(() => resetPage(next), undefined, "pageReady");
    return new Promise((resolve) =>
      tl.call(resolve, undefined, "pageReady"),
    );
  }

  // New page slides up from bottom
  tl.set(next, { zIndex: 3 });

  tl.fromTo(
    next,
    { y: "100vh" },
    {
      y: "0vh",
      duration: 1.2,
      clearProps: "all",
      ease: "parallax",
    },
    0,
  );

  tl.add("pageReady");
  tl.call(() => resetPage(next), undefined, "pageReady");

  return new Promise((resolve) => {
    tl.call(resolve, undefined, "pageReady");
  });
}

/**
 * Once animation — first page load (no transition, just reset).
 *
 * @param next - The initial container
 * @param resetPage - Callback to reset scroll position
 * @returns GSAP timeline
 */
export function runParallaxOnce(
  next: HTMLElement,
  resetPage: (container: HTMLElement) => void,
): gsap.core.Timeline {
  const tl = gsap.timeline();
  tl.call(() => resetPage(next), undefined, 0);
  return tl;
}
