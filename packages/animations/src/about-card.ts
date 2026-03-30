/**
 * @module about-card
 * Persona-swapping concentric layer rotation animation.
 *
 * Three circular layers rotate with randomized angles while swapping
 * between two persona images. An SVG progress indicator and marker
 * animate in sync.
 *
 * Differs from `rotating-layers` in that it:
 * - Swaps persona images (`autoAlpha` toggle) at 28% of each rotation
 * - Uses fixed timing (turn: 0.75s, reset: 0.45s, marker: 0.4s)
 * - Has progress-path stagger animation (SVG indicator)
 * - Marker starts at scale 2 (fixed, not ratio-based)
 * - Uses angles: gap=45, minAbs=30, range=180
 * - Sequence: innermost layer first (2->1->0), then reset (2->1->0)
 *
 * ## Supported `data-*` attributes
 * - `data-about-intro-card`   — Container (value = current persona id)
 * - `data-about-img-wrap`     — Image wrapper containing layers
 * - `data-rotate-layer`       — Each circular layer (3 required)
 * - `data-rotate-marker`      — Rotating marker/indicator
 * - `data-autoplay-indicator` — SVG element with `<path>` children for progress
 * - `data-motion-exempt`      — Skips animation
 *
 * ## Usage
 * ```ts
 * import { initAboutCardAnimation } from '@anthropic-atom/animations';
 *
 * const cleanup = initAboutCardAnimation();
 * cleanup();
 * ```
 */

import { gsap, ScrollTrigger } from "./config";
import { prefersReducedMotion, isMotionExempt } from "./motion";
import type { AnimationConfig, CleanupFn } from "./types";
import { NOOP } from "./types";

// ── Angle generation helpers ────────────────────────────────

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function pickAngles(
  { gap = 45, minAbs = 30, range = 180 } = {},
): [number, number, number] {
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
 * Initialize the about-card persona-swapping rotation animation.
 *
 * Checks `prefersReducedMotion()` and `isMotionExempt()` at setup
 * (continuous auto-playing animation).
 *
 * @param config - Optional scope container (defaults to `document`)
 * @returns Cleanup that kills timeline and ScrollTrigger
 */
export function initAboutCardAnimation(
  config: AnimationConfig = {},
): CleanupFn {
  const { scope = document } = config;

  const card = scope.querySelector<HTMLElement>("[data-about-intro-card]");
  if (!card) return NOOP;
  if (isMotionExempt(card)) return NOOP;
  if (prefersReducedMotion()) return NOOP;

  const wrap = card.querySelector<HTMLElement>("[data-about-img-wrap]");
  const layers = wrap
    ? Array.from(wrap.querySelectorAll<HTMLElement>("[data-rotate-layer]"))
    : [];
  if (layers.length !== 3) return NOOP;

  const marker = wrap?.querySelector<HTMLElement>("[data-rotate-marker]");
  if (!marker) return NOOP;

  const progress = card.querySelector<SVGElement>(
    "[data-autoplay-indicator]",
  );
  const progressPaths = progress
    ? Array.from(progress.querySelectorAll<SVGPathElement>("path"))
    : [];

  // Each layer has 2 images: persona A (index 0) and persona B (index 1)
  const layerImgs = layers.map((l) =>
    Array.from(l.querySelectorAll<HTMLImageElement>("img")).slice(0, 2),
  );
  if (layerImgs.some((arr) => arr.length < 2)) return NOOP;

  let current = 0; // 0 = persona A, 1 = persona B

  function setPersonaAll(idx: number) {
    layerImgs.forEach((imgs) => {
      imgs.forEach((img, i) =>
        gsap.set(img, { autoAlpha: i === idx ? 1 : 0 }),
      );
    });
  }

  function swapPersonaOne(layerIndex: number, idx: number) {
    const imgs = layerImgs[layerIndex];
    imgs.forEach((img, i) =>
      gsap.set(img, { autoAlpha: i === idx ? 1 : 0 }),
    );
  }

  // ── Initial state ──
  gsap.set([marker, ...layers], { transformOrigin: "50% 50%" });
  gsap.set(layers, { rotation: 0 });
  gsap.set(marker, { scale: 2 });

  // ── Timing constants (match original exactly) ──
  const progUp = 2;
  const durationTurn = 0.75;
  const durationReset = 0.45;
  const durationMarker = 0.4;

  setPersonaAll(current);

  const tl = gsap.timeline({ repeat: -1, paused: true });

  function buildCycle() {
    const [a1, a2, a3] = pickAngles({ gap: 45, minAbs: 30, range: 180 });

    // ── Progress paths fade in (stagger from end, 2x faster) ──
    if (progressPaths.length) {
      tl.set(progressPaths, { opacity: 0.2 }, 0);
      tl.to(
        progressPaths,
        {
          opacity: 1,
          duration: 0.01,
          ease: "none",
          stagger: { amount: progUp / 2, from: "end" },
        },
        0,
      );
    }

    // ── Rotation start label (halfway through progress) ──
    tl.add("rotStart", progUp / 2);

    // ── Swap persona (toggle current) ──
    tl.call(
      () => {
        current ^= 1;
        card.setAttribute(
          "data-about-intro-card",
          current === 0 ? "persona-a" : "persona-b",
        );
      },
      undefined,
      "rotStart",
    );

    // ── Marker scales down from 2 → 1 ──
    tl.to(marker, { scale: 1, duration: durationMarker }, "rotStart");

    // ── Layer 2 (innermost, 50%) rotates first ──
    tl.to(layers[2], { rotation: a1, duration: durationTurn }, ">");
    tl.to(marker, { rotation: `+=${a1}`, duration: durationTurn }, "<");
    tl.call(
      () => swapPersonaOne(2, current),
      undefined,
      `<+=${durationTurn * 0.28}`,
    );

    // ── Marker scales 1 → 1.5 ──
    tl.to(marker, { scale: 1.5, duration: durationMarker });

    // ── Layer 1 (middle, 75%) ──
    tl.to(layers[1], { rotation: a2, duration: durationTurn });
    tl.to(marker, { rotation: `+=${a2}`, duration: durationTurn }, "<");
    tl.call(
      () => swapPersonaOne(1, current),
      undefined,
      `<+=${durationTurn * 0.28}`,
    );

    // ── Marker scales 1.5 → 2 ──
    tl.to(marker, { scale: 2, duration: durationMarker });

    // ── Layer 0 (outermost, 100%) ──
    tl.to(layers[0], { rotation: a3, duration: durationTurn });
    tl.to(marker, { rotation: `+=${a3}`, duration: durationTurn }, "<");
    tl.call(
      () => swapPersonaOne(0, current),
      undefined,
      `<+=${durationTurn * 0.28}`,
    );

    // ══ RESET SEQUENCE ══

    // ── Marker scales 2 → 1 ──
    tl.to(marker, { scale: 1, duration: durationMarker });

    // ── Layer 2 resets ──
    tl.to(layers[2], { rotation: 0, duration: durationReset }, ">");
    tl.to(
      marker,
      { rotation: `+=${-a1}`, duration: durationReset },
      "<",
    );

    // ── Marker 1 → 1.5 ──
    tl.to(marker, { scale: 1.5, duration: durationMarker });

    // ── Layer 1 resets ──
    tl.to(layers[1], { rotation: 0, duration: durationReset });
    tl.to(
      marker,
      { rotation: `+=${-a2}`, duration: durationReset },
      "<",
    );

    // ── Marker 1.5 → 2 ──
    tl.to(marker, { scale: 2, duration: durationMarker });

    // ── Layer 0 resets ──
    tl.to(layers[0], { rotation: 0, duration: durationReset });
    tl.to(
      marker,
      { rotation: `+=${-a3}`, duration: durationReset },
      "<",
    );

    // ── Progress paths fade out ──
    if (progressPaths.length) {
      tl.to(
        progressPaths,
        {
          opacity: 0.2,
          stagger: { amount: durationReset, from: "start" },
        },
        "<",
      );
    }
  }

  buildCycle();

  // ── ScrollTrigger: play/pause on visibility ──
  const st = ScrollTrigger.create({
    trigger: card,
    start: "top bottom",
    end: "bottom top",
    onEnter: () => (tl.totalTime() === 0 ? tl.play(0) : tl.play()),
    onEnterBack: () => (tl.totalTime() === 0 ? tl.play(0) : tl.play()),
    onLeave: () => tl.pause(),
    onLeaveBack: () => tl.pause(),
  });

  if (ScrollTrigger.isInViewport && ScrollTrigger.isInViewport(card)) {
    tl.play(0);
  }

  return () => {
    tl.kill();
    st.kill();
  };
}
