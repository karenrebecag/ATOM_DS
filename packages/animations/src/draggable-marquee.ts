/**
 * @module draggable-marquee
 * GSAP-powered infinite marquee with drag interaction.
 * Uses Observer for pointer/touch input and ScrollTrigger
 * to pause when out of viewport.
 *
 * ## Supported `data-*` attributes
 * - `data-draggable-marquee`             — Wrapper element (init trigger, set to "initialized" after setup)
 * - `data-draggable-marquee-collection`  — Translating container (moved by GSAP)
 * - `data-draggable-marquee-list`        — Original item list (gets cloned for seamless loop)
 * - `data-draggable-marquee-clone`       — Set on cloned lists (removed on cleanup)
 * - `data-direction="left|right"`        — Initial scroll direction (default: `"left"`)
 * - `data-duration="20"`                 — Seconds per full loop (default: `20`)
 * - `data-multiplier="35"`               — Max drag speed cap (default: `35`)
 * - `data-sensitivity="0.01"`            — Drag velocity scaling (default: `0.01`)
 * - `data-motion-exempt`                 — Skips animation for this wrapper
 *
 * ## Usage
 * ```ts
 * import { initDraggableMarquee } from '@atomchat/animations';
 *
 * const cleanup = initDraggableMarquee();
 * // Later:
 * cleanup();
 * ```
 */

import { gsap, ScrollTrigger, Observer } from "./config";
import { prefersReducedMotion, isMotionExempt } from "./motion";
import type { AnimationConfig, CleanupFn } from "./types";
import { NOOP } from "./types";

function getNumberAttr(el: Element, name: string, fallback: number): number {
  const value = parseFloat(el.getAttribute(name) || "");
  return Number.isFinite(value) ? value : fallback;
}

function setupInstance(wrapper: HTMLElement): CleanupFn | null {
  if (isMotionExempt(wrapper)) return NOOP;
  if (prefersReducedMotion()) return NOOP;

  const collection = wrapper.querySelector<HTMLElement>(
    "[data-draggable-marquee-collection]",
  );
  const list = wrapper.querySelector<HTMLElement>(
    "[data-draggable-marquee-list]",
  );
  if (!collection || !list) return null;

  const duration = getNumberAttr(wrapper, "data-duration", 20);
  const multiplier = getNumberAttr(wrapper, "data-multiplier", 35);
  const sensitivity = getNumberAttr(wrapper, "data-sensitivity", 0.01);

  const wrapperWidth = wrapper.getBoundingClientRect().width;
  const listWidth = list.scrollWidth || list.getBoundingClientRect().width;
  if (!wrapperWidth || !listWidth) return null;

  // Clone lists until we have enough to fill the viewport seamlessly
  const minRequiredWidth = wrapperWidth + listWidth + 2;
  while (collection.scrollWidth < minRequiredWidth) {
    const listClone = list.cloneNode(true) as HTMLElement;
    listClone.setAttribute("data-draggable-marquee-clone", "");
    listClone.setAttribute("aria-hidden", "true");
    collection.appendChild(listClone);
  }

  const wrapX = gsap.utils.wrap(-listWidth, 0);

  gsap.set(collection, { x: 0 });

  const marqueeLoop = gsap.to(collection, {
    x: -listWidth,
    duration,
    ease: "none",
    repeat: -1,
    onReverseComplete() {
      marqueeLoop.progress(1);
    },
    modifiers: {
      x: (x: string) => wrapX(parseFloat(x)) + "px",
    },
  });

  // Direction
  const initialDir = (
    wrapper.getAttribute("data-direction") || "left"
  ).toLowerCase();
  const baseDirection = initialDir === "right" ? -1 : 1;

  const timeScale = { value: baseDirection };
  wrapper.setAttribute(
    "data-direction",
    baseDirection < 0 ? "right" : "left",
  );

  if (baseDirection < 0) marqueeLoop.progress(1);

  function applyTimeScale() {
    marqueeLoop.timeScale(timeScale.value);
    wrapper.setAttribute(
      "data-direction",
      timeScale.value < 0 ? "right" : "left",
    );
  }

  applyTimeScale();

  // Drag observer
  const marqueeObserver = Observer.create({
    target: wrapper,
    type: "pointer,touch",
    preventDefault: true,
    debounce: false,
    onChangeX: (obs: any) => {
      let velocityTimeScale = obs.velocityX * -sensitivity;
      velocityTimeScale = gsap.utils.clamp(
        -multiplier,
        multiplier,
        velocityTimeScale,
      );

      gsap.killTweensOf(timeScale);

      const restingDirection = velocityTimeScale < 0 ? -1 : 1;

      gsap
        .timeline({ onUpdate: applyTimeScale })
        .to(timeScale, {
          value: velocityTimeScale,
          duration: 0.1,
          overwrite: true,
        })
        .to(timeScale, { value: restingDirection, duration: 1.0 });
    },
  });

  // Pause when out of viewport
  const scrollTrigger = ScrollTrigger.create({
    trigger: wrapper,
    start: "top bottom",
    end: "bottom top",
    onEnter: () => {
      marqueeLoop.resume();
      applyTimeScale();
      marqueeObserver.enable();
    },
    onEnterBack: () => {
      marqueeLoop.resume();
      applyTimeScale();
      marqueeObserver.enable();
    },
    onLeave: () => {
      marqueeLoop.pause();
      marqueeObserver.disable();
    },
    onLeaveBack: () => {
      marqueeLoop.pause();
      marqueeObserver.disable();
    },
  });

  wrapper.setAttribute("data-draggable-marquee", "initialized");

  return () => {
    marqueeLoop.kill();
    marqueeObserver.kill();
    scrollTrigger.kill();
    collection
      .querySelectorAll("[data-draggable-marquee-clone]")
      .forEach((clone) => clone.remove());
  };
}

/**
 * Initialize all `[data-draggable-marquee]` instances in scope.
 *
 * Handles elements that may not be visible at init time (e.g. responsive
 * `display:none` swaps) by deferring setup via ResizeObserver.
 *
 * Respects `prefers-reduced-motion` and `data-motion-exempt` —
 * checked when each instance is set up (auto-playing continuous animation).
 *
 * @param config - Optional scope container (defaults to `document`)
 * @returns Cleanup that kills all loops, observers, and removes cloned DOM
 */
export function initDraggableMarquee(
  config: AnimationConfig = {},
): CleanupFn {
  const { scope = document } = config;
  const wrappers = scope.querySelectorAll<HTMLElement>(
    "[data-draggable-marquee]:not([data-draggable-marquee='initialized'])",
  );

  if (!wrappers.length) return NOOP;

  const cleanups: CleanupFn[] = [];

  wrappers.forEach((wrapper) => {
    // Try to init immediately (works if visible)
    const cleanup = setupInstance(wrapper);
    if (cleanup) {
      cleanups.push(cleanup);
      return;
    }

    // If not visible yet (display:none responsive swap), watch for resize
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          const lazyCleanup = setupInstance(wrapper);
          if (lazyCleanup) {
            cleanups.push(lazyCleanup);
            ro.disconnect();
          }
        }
      }
    });
    ro.observe(wrapper);
    cleanups.push(() => ro.disconnect());
  });

  return () => {
    cleanups.forEach((fn) => fn());
  };
}
