/**
 * @module layout-grid-flip
 * GSAP Flip-powered grid layout toggling between "large" (3-col)
 * and "small" (5-col) grid layouts with smooth card repositioning.
 *
 * ## Supported `data-*` attributes
 * - `data-layout-group`                — Wrapper (status + buttons + grid)
 * - `data-layout-status`               — Current layout mode on the group
 * - `data-layout-button="large|small"` — Toggle buttons
 * - `data-layout-grid`                 — Grid container (queried for items)
 * - `data-layout-grid-collection`      — Height-lock container
 * - `data-layout-grid-item`            — Individual cards to animate
 * - `data-transitioning`               — Set during Flip animation
 * - `data-motion-exempt`               — Skips Flip animation (instant toggle)
 *
 * ## CSS classes
 * - `.is--active` — Active state on toggle buttons
 *
 * ## Usage
 * ```ts
 * import { initLayoutGridFlip } from '@atomchat/animations';
 *
 * const cleanup = initLayoutGridFlip();
 * cleanup();
 * ```
 */

import { gsap, ScrollTrigger, Flip } from "../core/config";
import { prefersReducedMotion, isMotionExempt } from "../core/motion";
import type { AnimationConfig, CleanupFn } from "../core/types";
import { NOOP } from "../core/types";

const ACTIVE_CLASS = "is--active";

/**
 * Initialize Flip-powered grid layout toggling.
 *
 * Checks `prefersReducedMotion()` inside click handler —
 * if reduced, toggles layout instantly without animation.
 * Checks `isMotionExempt()` per group at setup.
 *
 * @param config - Optional scope container (defaults to `document`)
 * @returns Cleanup that kills active timelines and removes listeners
 */
export function initLayoutGridFlip(config: AnimationConfig = {}): CleanupFn {
  const { scope = document } = config;
  const groups = scope.querySelectorAll<HTMLElement>("[data-layout-group]");

  if (!groups.length) return NOOP;

  const cleanups: CleanupFn[] = [];

  groups.forEach((group) => {
    if (isMotionExempt(group)) return;

    let activeTween: gsap.core.Timeline | null = null;

    const buttons = group.querySelectorAll<HTMLButtonElement>(
      "[data-layout-button]",
    );
    const grid = group.querySelector<HTMLElement>("[data-layout-grid]");
    const collection = group.querySelector<HTMLElement>(
      "[data-layout-grid-collection]",
    );

    if (!buttons.length || !grid || !collection) return;

    // a11y: set initial aria-pressed
    buttons.forEach((b) =>
      b.setAttribute(
        "aria-pressed",
        String(b.classList.contains(ACTIVE_CLASS)),
      ),
    );

    const handleClick = (btn: HTMLButtonElement) => () => {
      const targetLayout = btn.getAttribute("data-layout-button");
      const currentLayout = group.getAttribute("data-layout-status");
      if (currentLayout === targetLayout) return;

      // Kill any in-flight animation
      if (activeTween) {
        activeTween.kill();
        activeTween = null;
      }

      // Reduced-motion: just toggle, no animation
      if (prefersReducedMotion()) {
        group.setAttribute("data-layout-status", targetLayout!);
        buttons.forEach((b) => {
          const isActive = b === btn;
          b.classList.toggle(ACTIVE_CLASS, isActive);
          b.setAttribute("aria-pressed", String(isActive));
        });
        ScrollTrigger.refresh();
        return;
      }

      // Record state of items
      const items = grid.querySelectorAll("[data-layout-grid-item]");
      const state = Flip.getState(items, { simple: true });

      // Measure current height
      collection.getBoundingClientRect();
      const prevH = collection.offsetHeight;

      // Switch to target layout
      group.setAttribute("data-layout-status", targetLayout!);
      buttons.forEach((b) => {
        const isActive = b === btn;
        b.classList.toggle(ACTIVE_CLASS, isActive);
        b.setAttribute("aria-pressed", String(isActive));
      });

      // Measure next height
      collection.getBoundingClientRect();
      const nextH = collection.offsetHeight;

      // Pin collection height to prevent collapse during absolute positioning
      gsap.set(collection, { height: prevH });

      // Build timeline: Flip + collection height animation
      const tl = gsap.timeline({
        onStart: () => {
          group.setAttribute("data-transitioning", "true");
        },
        onInterrupt: () => {
          group.removeAttribute("data-transitioning");
          gsap.set(collection, { clearProps: "height" });
        },
        onComplete: () => {
          group.removeAttribute("data-transitioning");
          gsap.set(collection, { clearProps: "height" });
          ScrollTrigger.refresh();
          activeTween = null;
        },
      });

      tl.add(
        Flip.from(state, {
          duration: 0.65,
          ease: "power4.inOut",
          absolute: true,
          nested: true,
          prune: true,
          stagger:
            targetLayout === "large"
              ? { each: 0.03, from: "end" }
              : { each: 0.03, from: "start" },
        }),
        0,
      ).to(
        collection,
        {
          height: nextH,
          duration: 0.65,
          ease: "power4.inOut",
        },
        0,
      );

      activeTween = tl;
    };

    const handlers: Array<[HTMLButtonElement, () => void]> = [];
    buttons.forEach((btn) => {
      const handler = handleClick(btn);
      btn.addEventListener("click", handler);
      handlers.push([btn, handler]);
    });

    cleanups.push(() => {
      if (activeTween) {
        activeTween.kill();
        activeTween = null;
      }
      handlers.forEach(([btn, handler]) =>
        btn.removeEventListener("click", handler),
      );
    });
  });

  return () => cleanups.forEach((fn) => fn());
}
