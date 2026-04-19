/**
 * @module flick-cards
 * Draggable showcase carousel — cards fan out like a deck.
 *
 * Uses GSAP Draggable for drag interaction and elastic easing
 * for card repositioning. Smart click passthrough when drag
 * distance is minimal (<4px).
 *
 * ## Supported `data-*` attributes
 * - `data-flick-cards-init`          — Carousel root (init trigger)
 * - `data-flick-cards-collection`    — Absolute overlay container
 * - `data-flick-cards-list`          — Flex list wrapper
 * - `data-flick-cards-item`          — Each card
 * - `data-flick-cards-item-status`   — Set by JS: `active` | `2-after` | `2-before` | `3-after` | `3-before` | `hidden`
 * - `data-flick-drag-status`         — Set on root: `grab` | `grabbing`
 * - `data-flick-cards-dragger`       — Invisible drag overlay (created at runtime)
 * - `data-motion-exempt`             — Skips flick card animation
 *
 * ## Usage
 * ```ts
 * import { initFlickCards } from '@atomchat/animations';
 *
 * const cleanup = initFlickCards();
 * cleanup();
 * ```
 */

import { gsap, Draggable } from "../core/config";
import { prefersReducedMotion, isMotionExempt } from "../core/motion";
import type { AnimationConfig, CleanupFn } from "../core/types";
import { NOOP } from "../core/types";

// ── Position presets ─────────────────────────────────────────

interface CardPositionConfig {
  x: number; // xPercent
  y: number; // yPercent
  rot: number; // rotation degrees
  s: number; // scale
  o: number; // opacity
  z: number; // z-index
}

function getPositionConfig(
  i: number,
  currentIndex: number,
  total: number,
): CardPositionConfig {
  let diff = i - currentIndex;
  if (diff > total / 2) diff -= total;
  else if (diff < -total / 2) diff += total;

  switch (diff) {
    case 0:
      return { x: 0, y: 0, rot: 0, s: 1.0, o: 1, z: 5 };
    case 1:
      return { x: 25, y: 5, rot: 5, s: 0.9, o: 1, z: 4 };
    case -1:
      return { x: -25, y: 5, rot: -5, s: 0.9, o: 1, z: 4 };
    case 2:
      return { x: 45, y: 7, rot: 10, s: 0.75, o: 1, z: 3 };
    case -2:
      return { x: -45, y: 7, rot: -10, s: 0.75, o: 1, z: 3 };
    default: {
      const dir = diff > 0 ? 1 : -1;
      return { x: 55 * dir, y: 5, rot: 15 * dir, s: 0.6, o: 0, z: 2 };
    }
  }
}

function statusFromConfig(cfg: CardPositionConfig): string {
  if (cfg.x === 0) return "active";
  if (cfg.x === 25) return "2-after";
  if (cfg.x === -25) return "2-before";
  if (cfg.x === 45) return "3-after";
  if (cfg.x === -45) return "3-before";
  return "hidden";
}

/**
 * Initialize flick card carousels.
 *
 * Checks `prefersReducedMotion()` and `isMotionExempt()` per
 * carousel instance.
 *
 * @param config - Optional scope container (defaults to `document`)
 * @returns Cleanup that kills Draggable instances and removes dragger elements
 */
export function initFlickCards(config: AnimationConfig = {}): CleanupFn {
  const { scope = document } = config;
  const sliders = scope.querySelectorAll<HTMLElement>(
    "[data-flick-cards-init]",
  );
  if (!sliders.length) return NOOP;

  const cleanups: CleanupFn[] = [];

  sliders.forEach((slider) => {
    if (isMotionExempt(slider)) return;
    if (prefersReducedMotion()) return;

    const list = slider.querySelector<HTMLElement>(
      "[data-flick-cards-list]",
    );
    if (!list) return;

    const cards = Array.from(
      list.querySelectorAll<HTMLElement>("[data-flick-cards-item]"),
    );
    const total = cards.length;
    if (total < 7) return;

    let activeIndex = 0;
    const sliderWidth = slider.offsetWidth;
    const threshold = 0.1;

    // ── Create invisible draggers ──
    const draggers: HTMLDivElement[] = [];
    cards.forEach((card) => {
      const dragger = document.createElement("div");
      dragger.setAttribute("data-flick-cards-dragger", "");
      card.appendChild(dragger);
      draggers.push(dragger);
    });

    slider.setAttribute("data-flick-drag-status", "grab");

    // ── Render all cards to their positions ──
    function renderCards(currentIndex: number) {
      cards.forEach((card, i) => {
        const cfg = getPositionConfig(i, currentIndex, total);
        card.setAttribute(
          "data-flick-cards-item-status",
          statusFromConfig(cfg),
        );
        card.style.zIndex = String(cfg.z);

        gsap.to(card, {
          duration: 0.6,
          ease: "elastic.out(1.2, 1)",
          xPercent: cfg.x,
          yPercent: cfg.y,
          rotation: cfg.rot,
          scale: cfg.s,
          opacity: cfg.o,
        });
      });
    }

    renderCards(activeIndex);

    // ── Draggable ──
    let pressClientX = 0;
    let pressClientY = 0;

    const draggables = Draggable.create(draggers, {
      type: "x",
      edgeResistance: 0.8,
      bounds: { minX: -sliderWidth / 2, maxX: sliderWidth / 2 },
      inertia: false,

      onPress() {
        pressClientX = this.pointerEvent.clientX;
        pressClientY = this.pointerEvent.clientY;
        slider.setAttribute("data-flick-drag-status", "grabbing");
      },

      onDrag() {
        const rawProgress = this.x / sliderWidth;
        const progress = Math.min(1, Math.abs(rawProgress));
        const direction = rawProgress > 0 ? -1 : 1;
        const nextIndex = (activeIndex + direction + total) % total;

        cards.forEach((card, i) => {
          const from = getPositionConfig(i, activeIndex, total);
          const to = getPositionConfig(i, nextIndex, total);
          const mix = (prop: keyof CardPositionConfig) =>
            (from[prop] as number) +
            ((to[prop] as number) - (from[prop] as number)) * progress;

          gsap.set(card, {
            xPercent: mix("x"),
            yPercent: mix("y"),
            rotation: mix("rot"),
            scale: mix("s"),
            opacity: mix("o"),
          });
        });
      },

      onRelease() {
        slider.setAttribute("data-flick-drag-status", "grab");

        const releaseClientX = this.pointerEvent.clientX;
        const releaseClientY = this.pointerEvent.clientY;
        const dragDistance = Math.hypot(
          releaseClientX - pressClientX,
          releaseClientY - pressClientY,
        );

        const raw = this.x / sliderWidth;
        let shift = 0;
        if (raw > threshold) shift = -1;
        else if (raw < -threshold) shift = 1;

        if (shift !== 0) {
          activeIndex = (activeIndex + shift + total) % total;
        }

        renderCards(activeIndex);

        gsap.to(this.target, {
          x: 0,
          duration: 0.3,
          ease: "power1.out",
        });

        // Smart click: if barely dragged, pass click through
        if (dragDistance < 4) {
          const target = this.target as HTMLElement;
          target.style.pointerEvents = "none";
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              const el = document.elementFromPoint(
                releaseClientX,
                releaseClientY,
              );
              if (el) {
                el.dispatchEvent(
                  new MouseEvent("click", {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                  }),
                );
              }
              target.style.pointerEvents = "auto";
            });
          });
        }
      },
    });

    // ── Cleanup ──
    cleanups.push(() => {
      draggables.forEach((d) => d.kill());
      draggers.forEach((el) => el.remove());
    });
  });

  return () => cleanups.forEach((fn) => fn());
}
