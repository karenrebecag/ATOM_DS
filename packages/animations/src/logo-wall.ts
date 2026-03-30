/**
 * @module logo-wall
 * Logo wall cycle animation — randomly swaps logos in a grid
 * with slide-and-fade transitions.
 *
 * Uses CSS `display: none` on items to determine visible count per viewport.
 * ScrollTrigger pauses animation when out of view.
 *
 * ## Supported `data-*` attributes
 * - `data-logo-wall-cycle-init`      — Root element (init trigger)
 * - `data-logo-wall-list`            — List container
 * - `data-logo-wall-item`            — Each slot
 * - `data-logo-wall-target`          — Logo element (cloned for pool)
 * - `data-logo-wall-target-parent`   — Optional parent for target placement
 * - `data-logo-wall-shuffle="false"` — Disable initial shuffle
 * - `data-motion-exempt`             — Skips animation
 *
 * ## Usage
 * ```ts
 * import { initLogoWallCycle } from '@anthropic-atom/animations';
 *
 * const cleanup = initLogoWallCycle();
 * cleanup();
 * ```
 */

import { gsap, ScrollTrigger } from "./config";
import { prefersReducedMotion, isMotionExempt } from "./motion";
import type { AnimationConfig, CleanupFn } from "./types";
import { NOOP } from "./types";

/**
 * Initialize logo wall cycle animations.
 *
 * Checks `prefersReducedMotion()` and `isMotionExempt()` per root
 * (auto-playing continuous animation).
 *
 * @param config - Optional scope container (defaults to `document`)
 * @returns Cleanup that kills timelines, ScrollTriggers, and visibility listeners
 */
export function initLogoWallCycle(config: AnimationConfig = {}): CleanupFn {
  const { scope = document } = config;
  const roots = scope.querySelectorAll<HTMLElement>(
    "[data-logo-wall-cycle-init]",
  );

  if (!roots.length) return NOOP;

  const cleanups: CleanupFn[] = [];

  roots.forEach((root) => {
    if (isMotionExempt(root)) return;
    if (prefersReducedMotion()) return;

    const loopDelay = 1.5;
    const duration = 0.9;

    const list = root.querySelector<HTMLElement>("[data-logo-wall-list]");
    if (!list) return;

    const items = Array.from(
      list.querySelectorAll<HTMLElement>("[data-logo-wall-item]"),
    );

    const shuffleFront =
      root.getAttribute("data-logo-wall-shuffle") !== "false";

    const originalTargets = items
      .map((item) =>
        item.querySelector<HTMLElement>("[data-logo-wall-target]"),
      )
      .filter(Boolean) as HTMLElement[];

    let visibleItems: HTMLElement[] = [];
    let visibleCount = 0;
    let pool: HTMLElement[] = [];
    let pattern: number[] = [];
    let patternIndex = 0;
    let tl: gsap.core.Timeline | null = null;

    function isVisible(el: HTMLElement): boolean {
      return window.getComputedStyle(el).display !== "none";
    }

    function shuffleArray<T>(arr: T[]): T[] {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    function setup() {
      if (tl) tl.kill();

      visibleItems = items.filter(isVisible);
      visibleCount = visibleItems.length;

      pattern = shuffleArray(
        Array.from({ length: visibleCount }, (_, i) => i),
      );
      patternIndex = 0;

      // Remove all injected targets
      items.forEach((item) => {
        item
          .querySelectorAll("[data-logo-wall-target]")
          .forEach((old) => old.remove());
      });

      pool = originalTargets.map(
        (n) => n.cloneNode(true) as HTMLElement,
      );

      let front: HTMLElement[];
      let rest: HTMLElement[];

      if (shuffleFront) {
        const shuffledAll = shuffleArray(pool);
        front = shuffledAll.slice(0, visibleCount);
        rest = shuffleArray(shuffledAll.slice(visibleCount));
      } else {
        front = pool.slice(0, visibleCount);
        rest = shuffleArray(pool.slice(visibleCount));
      }
      pool = front.concat(rest);

      for (let i = 0; i < visibleCount; i++) {
        const parent =
          visibleItems[i].querySelector(
            "[data-logo-wall-target-parent]",
          ) || visibleItems[i];
        const node = pool.shift();
        if (node) parent.appendChild(node);
      }

      tl = gsap.timeline({ repeat: -1, repeatDelay: loopDelay });
      tl.call(swapNext);
      tl.play();
    }

    function swapNext() {
      const nowCount = items.filter(isVisible).length;
      if (nowCount !== visibleCount) {
        setup();
        return;
      }
      if (!pool.length) return;

      const idx = pattern[patternIndex % visibleCount];
      patternIndex++;

      const container = visibleItems[idx];
      const parent =
        container.querySelector("[data-logo-wall-target-parent]") ||
        container.querySelector(
          "*:has(> [data-logo-wall-target])",
        ) ||
        container;
      const existing = parent.querySelectorAll("[data-logo-wall-target]");
      if (existing.length > 1) return;

      const current = parent.querySelector<HTMLElement>(
        "[data-logo-wall-target]",
      );
      const incoming = pool.shift();
      if (!incoming) return;

      gsap.set(incoming, { yPercent: 50, autoAlpha: 0 });
      parent.appendChild(incoming);

      if (current) {
        gsap.to(current, {
          yPercent: -50,
          autoAlpha: 0,
          duration,
          ease: "expo.inOut",
          onComplete: () => {
            current.remove();
            pool.push(current);
          },
        });
      }

      gsap.to(incoming, {
        yPercent: 0,
        autoAlpha: 1,
        duration,
        delay: 0.1,
        ease: "expo.inOut",
      });
    }

    setup();

    const st = ScrollTrigger.create({
      trigger: root,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => tl?.play(),
      onLeave: () => tl?.pause(),
      onEnterBack: () => tl?.play(),
      onLeaveBack: () => tl?.pause(),
    });

    const onVisibility = () => {
      if (document.hidden) {
        tl?.pause();
      } else {
        tl?.play();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    cleanups.push(() => {
      tl?.kill();
      st.kill();
      document.removeEventListener("visibilitychange", onVisibility);
    });
  });

  return () => cleanups.forEach((fn) => fn());
}
