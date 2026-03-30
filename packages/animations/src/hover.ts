/**
 * @module hover
 * Hover & interaction animations: rotate-on-hover, card lift, magnetic follow.
 *
 * ## Initialization order
 * `initRotateClones()` → `initRotateCalc()` → `initHoverRotate()`
 * (clones must exist and `--y` must be calculated before rotation animations run)
 *
 * ## Supported `data-*` attributes
 * - `data-hover-rotate`   — Rotate label on pointer-enter (reads `--r` for angle)
 * - `data-clones-ready`   — Set by `initRotateClones` when clone setup is complete
 * - `data-card-hover`     — Card lift + shadow-promote + image zoom on hover
 * - `data-magnetic`       — Element follows cursor within bounds (value = strength, default 0.3)
 * - `data-size="full"`    — Full-width button variant (triples `--y`, longer rotation)
 * - `data-motion-exempt`  — Skips animation for this element and its descendants
 *
 * ## Usage
 * ```ts
 * import { initRotateClones, initRotateCalc, initHoverRotate, initCardHover, initMagnetic } from '@anthropic-atom/animations';
 *
 * const cleanups = [
 *   initRotateClones(),
 *   initRotateCalc(),
 *   initHoverRotate(),
 *   initCardHover(),
 *   initMagnetic(),
 * ];
 *
 * // Cleanup all
 * cleanups.forEach(fn => fn());
 * ```
 */

import { gsap, DURATION } from "./config";
import { prefersReducedMotion, isMotionExempt } from "./motion";
import type { AnimationConfig, CleanupFn } from "./types";
import { NOOP } from "./types";

// ── Rotation origin targets ──────────────────────────────────
const LABEL_SELECTORS =
  ".button__label, .icon-button__icon, .tag__label, .chip__label, .chip-filter__label";

// ── Constants for --y calculation ────────────────────────────
const Y_PADDING = 30;
const Y_BASE_OFFSET = 12;
const Y_CHAR_MULTIPLIER = 6;
const Y_MIN = 100;
const Y_MAX = 10000;

// ── Card hover constants (animation behaviour, not visual tokens) ──
const CARD_IMG_SCALE = 1.03;

/**
 * Detect pre-rendered clones in Astro components.
 *
 * Astro scoped CSS breaks JS-based cloning (clones don't get
 * `data-astro-cid` attributes). Instead, clones are pre-rendered
 * in the Astro template with `aria-hidden="true"` and a `--clone`
 * modifier class. This function marks elements as ready so
 * {@link initHoverRotate} knows they're set up.
 *
 * For non-Astro contexts or fallback, it still creates clones
 * inline-styled if no pre-rendered clones are found.
 *
 * @param config - Optional scope container (defaults to `document`)
 * @returns Cleanup function (no-op — clones are DOM structure, not animations)
 */
export function initRotateClones(config: AnimationConfig = {}): CleanupFn {
  const { scope = document } = config;
  const elements = scope.querySelectorAll<HTMLElement>("[data-hover-rotate]");
  if (!elements.length) return NOOP;

  elements.forEach((el) => {
    if (el.hasAttribute("data-clones-ready")) return;

    // Check if clones are pre-rendered in the Astro template
    const hasPreRenderedClones = el.querySelector('[aria-hidden="true"]');
    if (hasPreRenderedClones) {
      el.setAttribute("data-clones-ready", "");
      return;
    }

    // Fallback: create clones inline-styled (non-Astro contexts)
    const items = el.querySelectorAll<HTMLElement>(LABEL_SELECTORS);
    if (!items.length) return;

    const r = parseFloat(getComputedStyle(el).getPropertyValue("--r")) || 20;

    items.forEach((item) => {
      item.style.transformOrigin = `50% var(--y, 1100%)`;
      item.style.transform = `rotate(0deg)`;

      const clone = item.cloneNode(true) as HTMLElement;
      clone.setAttribute("aria-hidden", "true");
      clone.style.position = "absolute";
      clone.style.width = "100%";
      clone.style.height = "100%";
      clone.style.display = getComputedStyle(item).display;
      clone.style.alignItems = "center";
      clone.style.justifyContent = "center";
      clone.style.transformOrigin = `50% var(--y, 1100%)`;
      clone.style.transform = `rotate(${-r}deg)`;

      item.parentElement!.style.position = "relative";
      item.parentElement!.appendChild(clone);
    });

    el.setAttribute("data-clones-ready", "");
  });

  return NOOP;
}

/**
 * Calculate and set `--y` (transform-origin Y) for rotate-hover elements.
 * Must be called before {@link initHoverRotate}.
 *
 * Watches for text changes (MutationObserver) and window resizes
 * to recalculate dynamically.
 *
 * @param config - Optional scope container (defaults to `document`)
 * @returns Cleanup that disconnects observer and removes resize listener
 */
export function initRotateCalc(config: AnimationConfig = {}): CleanupFn {
  const { scope = document } = config;
  const elements = scope.querySelectorAll<HTMLElement>("[data-hover-rotate]");
  if (!elements.length) return NOOP;

  function getMaxChars(el: HTMLElement): number {
    const labels = el.querySelectorAll<HTMLElement>(LABEL_SELECTORS);
    if (!labels.length) return (el.textContent || "").trim().length;
    let max = 0;
    labels.forEach((label) => {
      // Only count originals, skip clones
      if (label.getAttribute("aria-hidden") === "true") return;
      const len = (label.textContent || "").trim().length;
      if (len > max) max = len;
    });
    return max;
  }

  function computeY(chars: number, isFull: boolean): number {
    let y = Math.round(
      Y_MIN + Y_PADDING * (Y_BASE_OFFSET + Y_CHAR_MULTIPLIER * chars),
    );
    if (isFull) y *= 3;
    return Math.max(Y_MIN, Math.min(y, Y_MAX));
  }

  function update(el: HTMLElement) {
    const chars = getMaxChars(el);
    const isFull =
      el.classList.contains("button--full") || el.dataset.size === "full";
    const y = computeY(chars, isFull);
    el.style.setProperty("--y", y + "%");
  }

  // Initial calculation
  elements.forEach((el) => update(el));

  // Watch for text changes with a single observer on the common ancestor
  const observerRoot =
    scope instanceof Document ? scope.body : (scope as Element);
  const observer = new MutationObserver((mutations) => {
    const touched = new Set<HTMLElement>();
    mutations.forEach((m) => {
      const target =
        m.target.nodeType === Node.TEXT_NODE
          ? m.target.parentElement
          : (m.target as HTMLElement);
      if (!target) return;
      const root = target.closest<HTMLElement>("[data-hover-rotate]");
      if (root) touched.add(root);
    });
    touched.forEach((el) => update(el));
  });

  observer.observe(observerRoot, {
    characterData: true,
    childList: true,
    subtree: true,
  });

  // Recalculate on resize
  let resizeTimer: ReturnType<typeof setTimeout>;
  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(
      () => elements.forEach((el) => update(el)),
      150,
    );
  };
  window.addEventListener("resize", onResize);

  return () => {
    observer.disconnect();
    window.removeEventListener("resize", onResize);
    clearTimeout(resizeTimer);
  };
}

/**
 * Rotate animation on hover.
 * Reads `--r` from CSS for the rotation angle.
 *
 * **resetToRest pattern**: Before each animation, `gsap.set()` forces
 * originals to rotation 0 and clones to rotation -r. This is intentional —
 * it prevents state corruption when the user rapidly re-hovers before the
 * previous timeline completes. Without it, incremental `+=r` rotations
 * would stack and drift the label off its expected arc.
 *
 * Checks `prefersReducedMotion()` and `isMotionExempt()` inside the
 * pointer-enter handler (non-vestibular animation).
 *
 * @param config - Optional scope container (defaults to `document`)
 * @returns Cleanup that removes listeners and kills active timelines
 */
export function initHoverRotate(config: AnimationConfig = {}): CleanupFn {
  const { scope = document } = config;

  const elements = scope.querySelectorAll<HTMLElement>("[data-hover-rotate]");
  if (!elements.length) return NOOP;

  const listeners: Array<{ el: HTMLElement; handler: EventListener }> = [];

  function isClone(item: HTMLElement): boolean {
    return (
      item.getAttribute("aria-hidden") === "true" ||
      item.classList.contains("button__label--clone") ||
      item.classList.contains("icon-button__icon--clone") ||
      item.classList.contains("tag__label--clone") ||
      item.classList.contains("chip__label--clone") ||
      item.classList.contains("chip-filter__label--clone")
    );
  }

  /**
   * Force clean rest state: originals at rotation 0, clones at -r.
   * Prevents state corruption on rapid re-hover (see module JSDoc).
   */
  function resetToRest(
    originals: HTMLElement[],
    clones: HTMLElement[],
    r: number,
  ) {
    originals.forEach((orig) => gsap.set(orig, { rotation: 0, opacity: 1 }));
    clones.forEach((clone) => gsap.set(clone, { rotation: -r, opacity: 0 }));
  }

  elements.forEach((el) => {
    let lastTime = 0;
    const COOLDOWN = 100;

    const onEnter = () => {
      if (prefersReducedMotion()) return;
      if (isMotionExempt(el)) return;

      const now = performance.now();
      if (now - lastTime < COOLDOWN) return;
      lastTime = now;

      const targets = el.querySelectorAll<HTMLElement>(LABEL_SELECTORS);
      const items = targets.length ? Array.from(targets) : [el];

      const r =
        parseFloat(getComputedStyle(el).getPropertyValue("--r")) || 20;
      const isFull =
        el.classList.contains("button--full") || el.dataset.size === "full";
      const duration = isFull ? 0.75 : DURATION.half;

      const originals: HTMLElement[] = [];
      const clones: HTMLElement[] = [];
      items.forEach((item) => {
        if (isClone(item)) {
          clones.push(item);
        } else {
          originals.push(item);
        }
      });

      // Kill previous animation and force clean rest state
      if ((el as any)._rotTl) {
        (el as any)._rotTl.kill();
      }
      resetToRest(originals, clones, r);

      // Show clones, start animation
      clones.forEach((clone) => gsap.set(clone, { opacity: 1 }));

      const tl = gsap.timeline({
        onComplete: () => {
          resetToRest(originals, clones, r);
          (el as any)._rotTl = null;
        },
      });

      tl.to(
        originals,
        {
          rotation: `+=${r}`,
          opacity: 0,
          duration,
          ease: "atom",
          stagger: 0.075,
        },
        0,
      );

      tl.to(
        clones,
        {
          rotation: 0,
          opacity: 1,
          duration,
          ease: "atom",
          stagger: 0.075,
        },
        0,
      );

      (el as any)._rotTl = tl;
    };

    el.addEventListener("pointerenter", onEnter);
    listeners.push({ el, handler: onEnter });
  });

  return () => {
    listeners.forEach(({ el, handler }) => {
      el.removeEventListener("pointerenter", handler);
      if ((el as any)._rotTl) {
        (el as any)._rotTl.kill();
        (el as any)._rotTl = null;
      }
    });
  };
}

/**
 * Card hover: lift + shadow-promote + image zoom.
 *
 * Reads design tokens once at init time:
 * - `--xs` — lift distance in pixels
 * - `--elevation-card` — rest box-shadow
 * - `--elevation-popover` — hover box-shadow
 * - `--Primitive-Zinc-200` — rest border color
 * - `--Primitive-Zinc-400` — hover border color
 *
 * Checks `prefersReducedMotion()` and `isMotionExempt()` inside
 * pointer handlers (non-vestibular animation).
 *
 * @param config - Optional scope container (defaults to `document`)
 * @returns Cleanup that removes listeners and clears inline styles
 */
export function initCardHover(config: AnimationConfig = {}): CleanupFn {
  const { scope = document } = config;
  const cards = scope.querySelectorAll<HTMLElement>("[data-card-hover]");
  if (!cards.length) return NOOP;

  // Read DS tokens once at init (static theme)
  const root = getComputedStyle(document.documentElement);
  const liftPx = parseFloat(root.getPropertyValue("--xs")) || 4;
  const shadowRest = root.getPropertyValue("--elevation-card").trim();
  const shadowHover = root.getPropertyValue("--elevation-popover").trim();
  const borderRest = root.getPropertyValue("--Primitive-Zinc-200").trim();
  const borderHover = root.getPropertyValue("--Primitive-Zinc-400").trim();

  const listeners: Array<{
    el: HTMLElement;
    enter: EventListener;
    leave: EventListener;
  }> = [];

  cards.forEach((card) => {
    const img = card.querySelector<HTMLElement>("img");

    const onEnter = () => {
      if (prefersReducedMotion()) return;
      if (isMotionExempt(card)) return;

      gsap.to(card, {
        y: -liftPx,
        boxShadow: shadowHover,
        borderColor: borderHover,
        duration: DURATION.half,
        ease: "atom",
        overwrite: true,
      });

      if (img) {
        gsap.to(img, {
          scale: CARD_IMG_SCALE,
          duration: DURATION.half,
          ease: "atom",
          overwrite: true,
        });
      }
    };

    const onLeave = () => {
      if (prefersReducedMotion()) return;
      if (isMotionExempt(card)) return;

      gsap.to(card, {
        y: 0,
        boxShadow: shadowRest,
        borderColor: borderRest,
        duration: DURATION.half,
        ease: "atom",
        overwrite: true,
      });

      if (img) {
        gsap.to(img, {
          scale: 1,
          duration: DURATION.half,
          ease: "atom",
          overwrite: true,
        });
      }
    };

    card.addEventListener("pointerenter", onEnter);
    card.addEventListener("pointerleave", onLeave);
    listeners.push({ el: card, enter: onEnter, leave: onLeave });
  });

  return () => {
    listeners.forEach(({ el, enter, leave }) => {
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
      gsap.set(el, { clearProps: "y,boxShadow,borderColor" });
      const img = el.querySelector<HTMLElement>("img");
      if (img) gsap.set(img, { clearProps: "transform" });
    });
  };
}

/**
 * Magnetic effect: element follows cursor within bounds.
 *
 * The `data-magnetic` attribute value sets the strength multiplier
 * (default: `0.3`). Higher values = stronger pull toward cursor.
 *
 * Uses `gsap.quickTo()` for 60fps pointer tracking without creating
 * new tweens on every frame.
 *
 * Checks `prefersReducedMotion()` and `isMotionExempt()` inside
 * pointer handler (non-vestibular animation).
 *
 * @param config - Optional scope container (defaults to `document`)
 * @returns Cleanup that removes listeners and resets position
 */
export function initMagnetic(config: AnimationConfig = {}): CleanupFn {
  const { scope = document } = config;

  const elements = scope.querySelectorAll<HTMLElement>("[data-magnetic]");
  if (!elements.length) return NOOP;

  const listeners: Array<{
    el: HTMLElement;
    move: EventListener;
    leave: EventListener;
  }> = [];

  elements.forEach((el) => {
    const strength = parseFloat(el.getAttribute("data-magnetic") || "0.3");

    const xTo = gsap.quickTo(el, "x", {
      duration: DURATION.half,
      ease: "power3",
    });
    const yTo = gsap.quickTo(el, "y", {
      duration: DURATION.half,
      ease: "power3",
    });

    const onMove = (e: Event) => {
      if (prefersReducedMotion()) return;
      if (isMotionExempt(el)) return;

      const pe = e as PointerEvent;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      xTo((pe.clientX - cx) * strength);
      yTo((pe.clientY - cy) * strength);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    listeners.push({ el, move: onMove, leave: onLeave });
  });

  return () => {
    listeners.forEach(({ el, move, leave }) => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      gsap.set(el, { x: 0, y: 0 });
    });
  };
}
