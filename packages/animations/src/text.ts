/**
 * @module text
 * Word-by-word and line-by-line scroll-triggered text reveal animations.
 *
 * Requires GSAP SplitText plugin (Club GSAP). If SplitText is not
 * available at runtime, falls back to a simple fade-up reveal.
 *
 * ## Supported `data-*` attributes
 * - `data-text-reveal`    — Reveal type: `"words"` (default) | `"lines"`
 * - `data-motion-exempt`  — Skips animation, element renders in visible state
 *
 * ## Usage
 * ```html
 * <h1 data-text-reveal>Hello World</h1>
 * <h2 data-text-reveal="lines">Line by line reveal</h2>
 * ```
 *
 * ```ts
 * import { initTextReveal } from '@atomchat/animations';
 *
 * const cleanup = initTextReveal();
 * // Later (reverts SplitText DOM changes):
 * cleanup();
 * ```
 */

import { gsap, DURATION, STAGGER } from "./config";
import { prefersReducedMotion, isMotionExempt } from "./motion";
import type { AnimationConfig, CleanupFn } from "./types";
import { NOOP } from "./types";

interface TextRevealConfig extends AnimationConfig {
  /** ScrollTrigger start position. Default: `"top 85%"` */
  start?: string;
  /** Run only once. Default: `true` */
  once?: boolean;
}

/**
 * Initialize scroll-triggered text reveal animations.
 *
 * When SplitText is available, splits text into words/lines and
 * animates them with yPercent + rotation. Without SplitText, falls
 * back to a whole-element fade-up.
 *
 * Respects `prefers-reduced-motion` (skips animation) and
 * `data-motion-exempt` (per-element opt-out).
 *
 * @param config - Optional scope, start position, and once toggle
 * @returns Cleanup that reverts SplitText DOM splits and kills tweens
 */
export function initTextReveal(config: TextRevealConfig = {}): CleanupFn {
  const { start = "top 85%", once = true, scope = document } = config;

  const headings = scope.querySelectorAll<HTMLElement>("[data-text-reveal]");
  if (!headings.length) return NOOP;

  // SplitText is a Club GSAP plugin — may not be registered.
  // Dynamic check is unavoidable; plugin has no TS declarations in standard package.
  const SplitText =
    (window as any).SplitText || (gsap as any).SplitText || null;
  const hasSplitText = SplitText !== null;

  const splits: Array<{ revert: () => void }> = [];
  const tweens: gsap.core.Tween[] = [];

  headings.forEach((el) => {
    if (isMotionExempt(el)) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { autoAlpha: 1, y: 0 });
      return;
    }

    const type = el.getAttribute("data-text-reveal") || "words";

    if (hasSplitText) {
      const result = initWithSplitText(el, type, start, once, SplitText);
      if (result) {
        splits.push(result.split);
        tweens.push(result.tween);
      }
    } else {
      const tween = initFallback(el, start, once);
      tweens.push(tween);
    }
  });

  return () => {
    tweens.forEach((t) => {
      t.scrollTrigger?.kill();
      t.kill();
    });
    splits.forEach((split) => {
      try {
        split.revert();
      } catch {
        /* already reverted */
      }
    });
  };
}

function initWithSplitText(
  el: HTMLElement,
  type: string,
  start: string,
  once: boolean,
  SplitText: any,
): { split: { revert: () => void }; tween: gsap.core.Tween } | null {
  const splitType = type === "lines" ? "lines" : "lines, words";
  const split = new SplitText(el, {
    type: splitType,
    mask: "lines",
    linesClass: "text-line",
  });

  const targets = type === "lines" ? split.lines : split.words;

  gsap.set(targets, {
    yPercent: 100,
    rotate: 10,
    transformOrigin: "bottom left",
  });

  const tween = gsap.to(targets, {
    yPercent: 0,
    rotate: 0,
    duration: DURATION.double,
    ease: "expo.out",
    stagger: STAGGER.default,
    scrollTrigger: {
      trigger: el,
      start,
      once,
    },
  });

  return { split, tween };
}

function initFallback(
  el: HTMLElement,
  start: string,
  once: boolean,
): gsap.core.Tween {
  gsap.set(el, { autoAlpha: 0, y: "1.5em" });

  return gsap.to(el, {
    autoAlpha: 1,
    y: 0,
    duration: DURATION.onehalf,
    ease: "expo.out",
    scrollTrigger: {
      trigger: el,
      start,
      once,
    },
  });
}
