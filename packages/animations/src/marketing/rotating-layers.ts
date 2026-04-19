/**
 * @module rotating-layers
 * Concentric circle rotation animation with random angles.
 *
 * Three concentric circular layers rotate to random angles, then reset.
 * Includes a rotating marker element and optional counter-rotation for
 * child elements that should stay upright.
 *
 * ScrollTrigger pauses the timeline when out of view to save resources.
 *
 * ## Supported `data-*` attributes
 * - `data-rotating-layers`  — Container element
 * - `data-rotate-layer`     — Each circular layer (expects 3)
 * - `data-rotate-marker`    — Rotating marker/indicator
 * - `data-rotate-ignore`    — Elements inside layers that counter-rotate
 * - `data-motion-exempt`    — Skips animation
 *
 * ## Usage
 * ```ts
 * import { initRotatingLayers } from '@atomchat/animations';
 *
 * const cleanup = initRotatingLayers();
 * cleanup();
 * ```
 */

import { gsap, ScrollTrigger } from "../core/config";
import { prefersReducedMotion, isMotionExempt } from "../core/motion";
import type { AnimationConfig, CleanupFn } from "../core/types";
import { NOOP } from "../core/types";

// ── Angle generation helpers ────────────────────────────────

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function pickAngles({
  gap = 45,
  minAbs = 0,
  range = 180,
} = {}): [number, number, number] {
  const pick = (): number => {
    let a = rand(-range, range);
    while (Math.abs(a) < minAbs) a = rand(-range, range);
    return a;
  };

  const a1 = pick();

  let a2 = pick();
  let tries = 0;
  while (Math.abs(a2 - a1) < gap && tries++ < 50) a2 = pick();

  let a3 = pick();
  tries = 0;
  while (Math.abs(a3 - a2) < gap && tries++ < 50) a3 = pick();

  return [a1, a2, a3];
}

/**
 * Initialize concentric rotating layer animations.
 *
 * Auto-playing continuous animation — checks `prefersReducedMotion()`
 * and `isMotionExempt()` at setup (not inside handlers).
 *
 * @param config - Optional scope container (defaults to `document`)
 * @returns Cleanup that kills timelines and ScrollTriggers
 */
export function initRotatingLayers(
  config: AnimationConfig = {},
): CleanupFn {
  const { scope = document } = config;
  const wrappers =
    scope.querySelectorAll<HTMLElement>("[data-rotating-layers]");

  if (!wrappers.length) return NOOP;

  const cleanups: CleanupFn[] = [];

  wrappers.forEach((w) => {
    if (isMotionExempt(w as HTMLElement)) return;
    if (prefersReducedMotion()) return;

    const layers = Array.from(
      w.querySelectorAll<HTMLElement>("[data-rotate-layer]"),
    );
    if (layers.length !== 3) return;

    const marker = w.querySelector<HTMLElement>("[data-rotate-marker]");
    const ignores = layers.map((l) =>
      Array.from(l.querySelectorAll<HTMLElement>("[data-rotate-ignore]")),
    );

    // Set transform origins
    const allEls = marker
      ? [marker, ...layers, ...ignores.flat()]
      : [...layers, ...ignores.flat()];
    gsap.set(allEls, { transformOrigin: "50% 50%" });
    gsap.set([...layers, ...ignores.flat()], { rotation: 0 });

    // Compute relative scales for marker
    const base = layers[2].offsetWidth || 1;
    const s1 = (layers[0].offsetWidth || 1) / base;
    const s2 = (layers[1].offsetWidth || 1) / base;
    const s3 = 1;
    if (marker) gsap.set(marker, { scale: s3 });

    // ── Build repeating timeline ──
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 1,
      paused: true,
      onRepeat: () => {
        tl.clear();
        buildSequence();
      },
    });

    function buildSequence(): void {
      const [a1, a2, a3] = pickAngles({
        gap: 15,
        minAbs: 0,
        range: 270,
      });
      const d1 = rand(0.7, 1.2);
      const d2 = rand(0.7, 1.2);
      const d3 = rand(0.7, 1.2);
      const dReset = 0.75;

      // Layer 0 (outermost)
      if (marker) tl.to(marker, { scale: s1, duration: 0.4 });
      tl.to(layers[0], { rotation: a3, duration: d3 }, ">");
      if (marker)
        tl.to(marker, { rotation: `+=${a3}`, duration: d3 }, "<");
      if (ignores[0]?.length)
        tl.to(ignores[0], { rotation: -a3, duration: d3 }, "<");

      // Layer 1 (middle)
      if (marker) tl.to(marker, { scale: s2, duration: 0.4 });
      tl.to(layers[1], { rotation: a2, duration: d2 }, ">");
      if (marker)
        tl.to(marker, { rotation: `+=${a2}`, duration: d2 }, "<");
      if (ignores[1]?.length)
        tl.to(ignores[1], { rotation: -a2, duration: d2 }, "<");

      // Layer 2 (innermost)
      if (marker) tl.to(marker, { scale: s3, duration: 0.4 });
      tl.to(layers[2], { rotation: a1, duration: d1 }, ">");
      if (marker)
        tl.to(marker, { rotation: `+=${a1}`, duration: d1 }, "<");
      if (ignores[2]?.length)
        tl.to(ignores[2], { rotation: -a1, duration: d1 }, "<");

      // Reset Layer 0
      if (marker) tl.to(marker, { scale: s1, duration: 0.3 });
      tl.to(layers[0], { rotation: 0, duration: dReset }, ">");
      if (marker)
        tl.to(marker, { rotation: `+=${-a3}`, duration: dReset }, "<");
      if (ignores[0]?.length)
        tl.to(ignores[0], { rotation: 0, duration: dReset }, "<");

      // Reset Layer 1
      if (marker) tl.to(marker, { scale: s2, duration: 0.3 });
      tl.to(layers[1], { rotation: 0, duration: dReset }, ">");
      if (marker)
        tl.to(marker, { rotation: `+=${-a2}`, duration: dReset }, "<");
      if (ignores[1]?.length)
        tl.to(ignores[1], { rotation: 0, duration: dReset }, "<");

      // Reset Layer 2
      if (marker) tl.to(marker, { scale: s3, duration: 0.3 });
      tl.to(layers[2], { rotation: 0, duration: dReset }, ">");
      if (marker)
        tl.to(marker, { rotation: `+=${-a1}`, duration: dReset }, "<");
      if (ignores[2]?.length)
        tl.to(ignores[2], { rotation: 0, duration: dReset }, "<");

      // Hold before repeat
      tl.to({}, { duration: 1 });
    }

    buildSequence();

    // ── ScrollTrigger: play/pause on visibility ──
    const st = ScrollTrigger.create({
      trigger: w as HTMLElement,
      start: "top bottom",
      end: "bottom top",
      onEnter: () =>
        tl.totalTime() === 0 ? tl.play(0) : tl.play(),
      onEnterBack: () =>
        tl.totalTime() === 0 ? tl.play(0) : tl.play(),
      onLeave: () => tl.pause(),
      onLeaveBack: () => tl.pause(),
    });

    // Start if already in viewport
    if (
      ScrollTrigger.isInViewport &&
      ScrollTrigger.isInViewport(w as HTMLElement)
    ) {
      tl.play(0);
    }

    cleanups.push(() => {
      tl.kill();
      st.kill();
    });
  });

  return () => cleanups.forEach((fn) => fn());
}
