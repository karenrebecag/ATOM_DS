/**
 * @module scroll-direction
 * Scroll direction detection via data attributes on `<body>`.
 *
 * No GSAP — pure scroll listener that sets attributes for CSS-driven
 * scroll-aware styles (e.g. auto-hiding navigation).
 *
 * ## Attributes set on `<body>`
 * - `data-scrolling-started="true"` — Set once user starts scrolling
 * - `data-scroll-direction="up" | "down"` — Current scroll direction
 *
 * ## CSS usage
 * ```css
 * body[data-scroll-direction="down"] .nav { transform: translateY(-100%); }
 * body[data-scroll-direction="up"] .nav { transform: translateY(0); }
 * ```
 *
 * ## Usage
 * ```ts
 * import { initScrollDirection } from '@atomchat/animations';
 *
 * const cleanup = initScrollDirection();
 * // Later:
 * cleanup();
 * ```
 */

import type { CleanupFn } from "./types";
import { NOOP } from "./types";

/**
 * Initialize scroll direction tracking.
 *
 * Sets `data-scroll-direction` and `data-scrolling-started` attributes
 * on `document.body` as the user scrolls. No animation — purely
 * informational attributes for CSS selectors.
 *
 * @returns Cleanup that removes the scroll listener
 */
export function initScrollDirection(): CleanupFn {
  if (typeof window === "undefined") return NOOP;

  let lastScrollY = 0;

  const onScroll = () => {
    const currentScrollY = window.scrollY;
    const direction = currentScrollY > lastScrollY ? "down" : "up";

    document.body.setAttribute("data-scrolling-started", "true");
    document.body.setAttribute("data-scroll-direction", direction);

    lastScrollY = currentScrollY;
  };

  window.addEventListener("scroll", onScroll, { passive: true });

  return () => {
    window.removeEventListener("scroll", onScroll);
  };
}
