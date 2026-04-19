/**
 * @module reveal
 * Scroll-triggered reveal animations.
 * Reusable patterns for elements that animate into view on scroll.
 *
 * ## Supported `data-*` attributes
 * - `data-reveal`          — Reveal type: `"fade"` | `"fade-up"` (default) | `"fade-down"` | `"fade-left"` | `"fade-right"` | `"fade-scale"` | `"stagger"`
 * - `data-stagger`         — Custom stagger value for `data-reveal="stagger"` (default: `0.05`)
 * - `data-batch-reveal`    — Batch-optimized reveal (uses ScrollTrigger.batch)
 * - `data-motion-exempt`   — Skips animation, element renders in final visible state
 *
 * ## Usage
 * ```html
 * <div data-reveal>...</div>
 * <div data-reveal="fade-scale">...</div>
 * <div data-reveal="stagger" data-stagger="0.08">
 *   <div>item</div>
 *   <div>item</div>
 * </div>
 * ```
 *
 * ```ts
 * import { initReveal, initBatchReveal } from '@atomchat/animations';
 *
 * const cleanups = [initReveal(), initBatchReveal()];
 * // Later:
 * cleanups.forEach(fn => fn());
 * ```
 */

import { gsap, ScrollTrigger, DURATION, STAGGER } from "../../core/config";
import { prefersReducedMotion, isMotionExempt } from "../../core/motion";
import type { AnimationConfig, CleanupFn } from "../../core/types";
import { NOOP } from "../../core/types";

interface RevealConfig extends AnimationConfig {
  /** ScrollTrigger start position. Default: `"top 85%"` */
  start?: string;
  /** Run only once. Default: `true` */
  once?: boolean;
}

// ── Reveal variant maps ──────────────────────────────────────

function getRevealFrom(type: string): gsap.TweenVars {
  switch (type) {
    case "fade":
      return { autoAlpha: 0 };
    case "fade-up":
      return { autoAlpha: 0, y: "2em" };
    case "fade-down":
      return { autoAlpha: 0, y: "-2em" };
    case "fade-left":
      return { autoAlpha: 0, x: "2em" };
    case "fade-right":
      return { autoAlpha: 0, x: "-2em" };
    case "fade-scale":
      return { autoAlpha: 0, scale: 0.9 };
    case "stagger":
      return { autoAlpha: 0, y: "2em" };
    default:
      return { autoAlpha: 0, y: "2em" };
  }
}

function getRevealTo(type: string): gsap.TweenVars {
  switch (type) {
    case "fade":
      return { autoAlpha: 1 };
    case "fade-up":
    case "fade-down":
      return { autoAlpha: 1, y: 0 };
    case "fade-left":
    case "fade-right":
      return { autoAlpha: 1, x: 0 };
    case "fade-scale":
      return { autoAlpha: 1, scale: 1 };
    case "stagger":
      return { autoAlpha: 1, y: 0 };
    default:
      return { autoAlpha: 1, y: 0 };
  }
}

/**
 * Initialize scroll-triggered reveal animations for `[data-reveal]` elements.
 *
 * Each element animates from its hidden state to visible when it scrolls
 * into the viewport. Supports multiple reveal variants via the attribute value.
 *
 * Respects `prefers-reduced-motion` (sets final state instantly) and
 * `data-motion-exempt` (per-element opt-out).
 *
 * @param config - Optional scope, start position, and once toggle
 * @returns Cleanup that kills all ScrollTriggers and tweens created by this init
 */
export function initReveal(config: RevealConfig = {}): CleanupFn {
  const { start = "top 85%", once = true, scope = document } = config;

  const elements = scope.querySelectorAll<HTMLElement>("[data-reveal]");
  if (!elements.length) return NOOP;

  const tweens: gsap.core.Tween[] = [];

  elements.forEach((el) => {
    const type = el.getAttribute("data-reveal") || "fade-up";
    const isStagger = type === "stagger";
    const targets = isStagger ? Array.from(el.children) : el;
    const toState = getRevealTo(type);

    if (isMotionExempt(el)) {
      gsap.set(targets, toState);
      return;
    }

    if (prefersReducedMotion()) {
      gsap.set(targets, toState);
      return;
    }

    const staggerVal =
      parseFloat(el.getAttribute("data-stagger") || "") || STAGGER.default;

    const fromVars = getRevealFrom(type);
    const toVars: gsap.TweenVars = {
      ...toState,
      duration: DURATION.onehalf,
      ease: "expo.out",
      stagger: isStagger ? staggerVal : undefined,
      scrollTrigger: {
        trigger: el,
        start,
        once,
      },
    };

    gsap.set(targets, fromVars);
    const tween = gsap.to(targets, toVars);
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
 * Batch reveal: efficient for many same-type elements.
 * Uses `ScrollTrigger.batch()` for performance — groups elements
 * entering the viewport in the same frame into a single staggered tween.
 *
 * Respects `prefers-reduced-motion` (sets final state instantly) and
 * `data-motion-exempt` (per-element opt-out).
 *
 * @param config - Optional scope, start position, and once toggle
 * @returns Cleanup that kills all batch ScrollTriggers
 */
export function initBatchReveal(config: RevealConfig = {}): CleanupFn {
  const { start = "top 85%", once = true, scope = document } = config;

  const allElements = scope.querySelectorAll<HTMLElement>("[data-batch-reveal]");
  if (!allElements.length) return NOOP;

  // Separate exempt/reduced elements from animatable ones
  const animatable: HTMLElement[] = [];

  allElements.forEach((el) => {
    if (isMotionExempt(el) || prefersReducedMotion()) {
      gsap.set(el, { autoAlpha: 1, y: 0 });
    } else {
      animatable.push(el);
    }
  });

  if (!animatable.length) return NOOP;

  gsap.set(animatable, { autoAlpha: 0, y: "2em" });

  // Snapshot triggers before batch to diff later
  const before = new Set(ScrollTrigger.getAll());

  ScrollTrigger.batch(animatable, {
    onEnter: (batch) => {
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        duration: DURATION.onehalf,
        ease: "expo.out",
        stagger: STAGGER.default,
        overwrite: true,
      });
    },
    ...(once
      ? {}
      : {
          onLeaveBack: (batch) => {
            gsap.set(batch, { autoAlpha: 0, y: "2em", overwrite: true });
          },
        }),
    start,
  });

  // Collect triggers created by batch
  const batchTriggers = ScrollTrigger.getAll().filter(
    (st) => !before.has(st),
  );

  return () => {
    batchTriggers.forEach((st) => st.kill());
  };
}
