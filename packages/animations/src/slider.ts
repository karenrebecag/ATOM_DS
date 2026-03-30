/**
 * @module slider
 * Rotation slider — GSAP Draggable carousel with inertia.
 *
 * Items are arranged in a rotation pattern where each item's visual
 * rotation is determined by its distance from the active index.
 * Supports drag, throw (inertia), and nav button interactions.
 *
 * ## Supported `data-*` attributes
 * - `data-slider-init`           — Activates the slider on this root
 * - `data-slider-rotate="20"`    — Rotation step in degrees
 * - `data-slider-collection`     — Drag hit-area element
 * - `data-slider-list`           — Track element
 * - `data-slider-item`           — Individual items
 * - `data-slider-control="N"`    — Nav button (1-indexed)
 * - `data-slider-drag-status`    — Set to `"grab"` | `"grabbing"`
 * - `data-slider-item-status`    — Set to `"active"` | `"inview"` | `"not-active"`
 * - `data-slider-control-status` — Set to `"active"` | `"not-active"`
 * - `data-motion-exempt`         — Skips animation
 *
 * ## CSS custom properties (read from root)
 * - `--slider-status`  — `"on"` to enable, anything else to disable
 * - `--slider-spv`     — Slides per view (default 3)
 *
 * ## Usage
 * ```ts
 * import { initRotationSlider } from '@atomchat/animations';
 *
 * const cleanup = initRotationSlider();
 * cleanup();
 * ```
 */

import { gsap, Draggable } from "./config";
import { isMotionExempt } from "./motion";
import type { AnimationConfig, CleanupFn } from "./types";
import { NOOP } from "./types";

const SLIDE_DURATION = 1.5;
const THROW_MAX = 1;
const THROW_MIN = 0.5;
const DRAG_RES = 0.025;
const THROW_RES = 2000;
const CLICK_EASE = "expo.out";

const mod = (n: number, m: number): number => ((n % m) + m) % m;

/**
 * Initialize rotation slider(s) within scope.
 *
 * Motion checks: `isMotionExempt()` per root. Draggable interactions
 * are inherently user-initiated so no `prefersReducedMotion()` gate.
 *
 * @param config - Optional scope container (defaults to `document`)
 * @returns Cleanup that kills Draggable instances, tweens, and listeners
 */
export function initRotationSlider(
  config: AnimationConfig = {},
): CleanupFn {
  const { scope = document } = config;
  const roots =
    scope.querySelectorAll<HTMLElement>("[data-slider-init]");

  if (!roots.length) return NOOP;

  const cleanups: CleanupFn[] = [];

  roots.forEach((root) => {
    if (isMotionExempt(root)) return;

    const collection = root.querySelector<HTMLElement>(
      "[data-slider-collection]",
    );
    const track = root.querySelector<HTMLElement>("[data-slider-list]");
    const items = Array.from(
      root.querySelectorAll<HTMLElement>("[data-slider-item]"),
    );
    const controls = Array.from(
      root.querySelectorAll<HTMLElement>("[data-slider-control]"),
    );
    if (!collection || !track || !items.length) return;

    const rotateStep = parseFloat(
      root.getAttribute("data-slider-rotate") || "0",
    );
    if (rotateStep <= 0) return;

    const styles = getComputedStyle(root);
    const statusVar = styles.getPropertyValue("--slider-status").trim();
    let spvVar = parseFloat(
      styles.getPropertyValue("--slider-spv"),
    );

    const firstRect = items[0].getBoundingClientRect();
    const itemW = firstRect.width;
    const itemH = firstRect.height;
    const slideW = itemW;

    if (isNaN(spvVar)) spvVar = 3;
    const spv = Math.max(1, Math.min(spvVar, items.length));
    const visCount = Math.ceil(spv);
    const sliderEnabled = statusVar === "on" && spv < items.length;

    if (!sliderEnabled) {
      root.removeAttribute("data-slider-drag-status");
      return;
    }

    root.setAttribute("data-slider-drag-status", "grab");

    const n = items.length;

    // Clear old visuals
    gsap.set(items, {
      clearProps: "position,top,left,marginRight,transform",
    });
    items.forEach((el) =>
      el.removeAttribute("data-slider-item-status"),
    );

    track.style.position = "relative";
    track.style.height = itemH + "px";

    items.forEach((el) => {
      gsap.set(el, { xPercent: -50 });
    });

    const setRot = items.map((el) =>
      gsap.quickSetter(el, "rotate", "deg"),
    );

    // Invisible proxy for animation
    const proxy = document.createElement("div");
    gsap.set(proxy, { x: 0 });

    const idxFromProxy = (): number =>
      -(gsap.getProperty(proxy, "x") as number) / slideW;

    const nearestDelta = (
      i: number,
      idxReal: number,
      len: number,
    ): number => {
      const k = Math.round((idxReal - i) / len);
      return i - (idxReal - k * len);
    };

    function setStatuses(idxReal: number): void {
      const idxMod = mod(Math.round(idxReal), n);
      const left = Math.floor((visCount - 1) / 2);
      const right = visCount - 1 - left;

      items.forEach((el) =>
        el.setAttribute("data-slider-item-status", "not-active"),
      );
      items[idxMod].setAttribute("data-slider-item-status", "active");

      for (let k = 1; k <= right; k++)
        items[mod(idxMod + k, n)].setAttribute(
          "data-slider-item-status",
          "inview",
        );
      for (let k = 1; k <= left; k++)
        items[mod(idxMod - k, n)].setAttribute(
          "data-slider-item-status",
          "inview",
        );

      // Update control buttons
      controls.forEach((btn) => {
        const val = btn.getAttribute("data-slider-control");
        if (val && /^\d+$/.test(val)) {
          const idx = Math.max(
            0,
            Math.min(n - 1, parseInt(val, 10) - 1),
          );
          btn.setAttribute(
            "data-slider-control-status",
            idx === idxMod ? "active" : "not-active",
          );
        }
      });
    }

    function render(): void {
      const idxReal = idxFromProxy();
      for (let i = 0; i < n; i++) {
        setRot[i](nearestDelta(i, idxReal, n) * rotateStep);
      }
      setStatuses(idxReal);
    }

    // Nav button click handlers
    const buttonHandlers: Array<[HTMLElement, () => void]> = [];

    controls.forEach((btn) => {
      const val = btn.getAttribute("data-slider-control");
      if (!val || !/^\d+$/.test(val)) return;

      btn.setAttribute("data-slider-control-status", "not-active");
      const targetZero = Math.max(
        0,
        Math.min(n - 1, parseInt(val, 10) - 1),
      );

      const handler = (): void => {
        gsap.killTweensOf(proxy);
        const idxReal = idxFromProxy();
        const delta = nearestDelta(targetZero, idxReal, n);
        const targetIdx = idxReal + delta;
        const targetX = -targetIdx * slideW;
        gsap.to(proxy, {
          x: targetX,
          duration: SLIDE_DURATION,
          ease: CLICK_EASE,
          onUpdate: render,
        });
      };

      btn.addEventListener("click", handler);
      buttonHandlers.push([btn, handler]);
    });

    // Draggable
    const draggable = Draggable.create(proxy, {
      type: "x",
      trigger: collection,
      inertia: true,
      maxDuration: THROW_MAX,
      minDuration: THROW_MIN,
      dragResistance: DRAG_RES,
      throwResistance: THROW_RES,
      bounds: undefined,
      edgeResistance: 0,
      snap: (v: number) => Math.round(v / slideW) * slideW,
      onDrag: render,
      onThrowUpdate: render,
      onThrowComplete: () => {
        render();
        root.setAttribute("data-slider-drag-status", "grab");
      },
      onPress: () =>
        root.setAttribute("data-slider-drag-status", "grabbing"),
      onDragStart: () =>
        root.setAttribute("data-slider-drag-status", "grabbing"),
      onRelease: () =>
        root.setAttribute("data-slider-drag-status", "grab"),
    })[0];

    gsap.set(track, { x: 0 });
    render();

    cleanups.push(() => {
      draggable.kill();
      gsap.killTweensOf(proxy);
      buttonHandlers.forEach(([btn, handler]) =>
        btn.removeEventListener("click", handler),
      );
      items.forEach((el) => {
        el.removeAttribute("data-slider-item-status");
        gsap.set(el, { clearProps: "transform" });
      });
      controls.forEach((btn) =>
        btn.removeAttribute("data-slider-control-status"),
      );
      track.style.position = "";
      track.style.height = "";
    });
  });

  return () => cleanups.forEach((fn) => fn());
}
