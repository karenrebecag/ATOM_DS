/**
 * @module cursor
 * Custom cursor with GSAP-powered position tracking, rotation,
 * and contextual text labels.
 *
 * Position is set via `gsap.quickTo` on CSS `left` / `top` (no transform
 * conflicts). Transform is used exclusively for scale + rotation.
 *
 * ## Required DOM structure
 * ```html
 * <div id="custom-cursor"></div>
 * <div id="cursor-text">
 *   <span class="cursor-text__label"></span>
 * </div>
 * ```
 *
 * ## Supported `data-*` attributes
 * - `data-cursor-text="Label"` — Shows a contextual label on hover
 *
 * ## Auto-labelled elements
 * Links, buttons, inputs without `data-cursor-text` get auto-labels:
 * - `<a>` → "View" (or "Scroll" / "Email" / "Call" based on href)
 * - `<button>` → "Click"
 * - `<input>` / `<textarea>` → "Focus"
 *
 * ## Usage
 * ```ts
 * import { initCursor, destroyCursor } from '@atomchat/animations';
 *
 * initCursor();
 * // Later:
 * destroyCursor();
 * ```
 */

import { gsap, DURATION } from "./config";
import { prefersReducedMotion } from "./motion";
import type { CleanupFn } from "./types";
import { NOOP } from "./types";

// ── Selectors ────────────────────────────────────────────────
const INTERACTIVE =
  "a, button, [role='button'], input, textarea, select, [data-cursor-text]";

// ── State ────────────────────────────────────────────────────
let cursorEl: HTMLElement | null = null;
let textEl: HTMLElement | null = null;
let textContent: HTMLElement | null = null;
let cursorLeftTo: gsap.QuickToFunc;
let cursorTopTo: gsap.QuickToFunc;
let textLeftTo: gsap.QuickToFunc;
let textTopTo: gsap.QuickToFunc;
let isActive = false;
let isTextVisible = false;
let lastX = 0;
let lastY = 0;
let targetRotation = 0;
let currentRotation = 0;

// ── Touch detection ──────────────────────────────────────────
function isTouchDevice(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const hasTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isCoarse = window.matchMedia(
      "(hover: none) and (pointer: coarse)",
    ).matches;
    const isIPad =
      /iPad/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isSafariDesktop =
      /Safari/.test(navigator.userAgent) &&
      !/Chrome/.test(navigator.userAgent) &&
      !hasTouch &&
      !isIPad;
    if (isSafariDesktop) return false;
    return hasTouch || isCoarse || isIPad;
  } catch {
    return false;
  }
}

// ── Auto-label ───────────────────────────────────────────────
function getAutoLabel(el: Element): string {
  const tag = el.tagName.toLowerCase();
  if (tag === "a") {
    const href = el.getAttribute("href") || "";
    if (href.startsWith("#")) return "Scroll";
    if (href.startsWith("mailto:")) return "Email";
    if (href.startsWith("tel:")) return "Call";
    return "View";
  }
  if (tag === "button" || el.getAttribute("role") === "button")
    return "Click";
  if (["input", "textarea", "select"].includes(tag)) return "Focus";
  return "Click";
}

// ── Rotation from movement direction ─────────────────────────
function calcRotation(dx: number, dy: number): number {
  if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return targetRotation;
  return Math.atan2(dy, dx) * (180 / Math.PI) + 90;
}

// ── Activate on first interaction ────────────────────────────
function activate(x: number, y: number) {
  if (isActive) return;
  isActive = true;
  document.body.classList.add("custom-cursor-active");

  lastX = x;
  lastY = y;

  // Snap immediately (no tween on first frame)
  gsap.set(cursorEl, { left: x, top: y, opacity: 1 });
  cursorLeftTo(x);
  cursorTopTo(y);
}

// ── Core handlers ────────────────────────────────────────────
function onMouseMove(e: MouseEvent) {
  if (!isActive) {
    activate(e.clientX, e.clientY);
    return;
  }

  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  lastX = e.clientX;
  lastY = e.clientY;

  cursorLeftTo(e.clientX);
  cursorTopTo(e.clientY);

  if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
    targetRotation = calcRotation(dx, dy);
  }

  if (isTextVisible) {
    textLeftTo(e.clientX + 20);
    textTopTo(e.clientY - 28);
  }
}

function onMouseLeave() {
  if (!isActive) return;
  isActive = false;
  document.body.classList.remove("custom-cursor-active");
  gsap.set(cursorEl, { opacity: 0 });
  hideText();
}

function showText(label: string) {
  if (isTextVisible || !isActive) return;
  isTextVisible = true;
  textContent!.textContent = label;

  gsap.set(textEl, { left: lastX + 20, top: lastY - 28 });
  textLeftTo(lastX + 20);
  textTopTo(lastY - 28);
  gsap.to(textEl, {
    opacity: 1,
    scale: 1,
    duration: DURATION.quarter,
    ease: "atom",
  });
}

function hideText() {
  if (!isTextVisible) return;
  isTextVisible = false;
  gsap.to(textEl, {
    opacity: 0,
    scale: 0.85,
    duration: DURATION.quarter,
    ease: "atom",
  });
}

// ── Hover delegation ─────────────────────────────────────────
function onPointerOver(e: PointerEvent) {
  const target = (e.target as Element).closest?.(INTERACTIVE);
  if (!target || !isActive) return;

  gsap.to(cursorEl, {
    scale: 1.5,
    duration: DURATION.quarter,
    ease: "atom",
  });

  const label =
    target.getAttribute("data-cursor-text") || getAutoLabel(target);
  showText(label);
}

function onPointerOut(e: PointerEvent) {
  const target = (e.target as Element).closest?.(INTERACTIVE);
  if (!target) return;

  const related = (e.relatedTarget as Element)?.closest?.(INTERACTIVE);
  if (related) return;

  gsap.to(cursorEl, {
    scale: 1,
    duration: DURATION.quarter,
    ease: "atom",
  });
  hideText();
}

// ── Rotation tick ────────────────────────────────────────────
function rotationTick() {
  if (!isActive || !cursorEl) return;
  currentRotation += (targetRotation - currentRotation) * 0.1;
  gsap.set(cursorEl, { rotation: currentRotation });
}

// ── Public API ───────────────────────────────────────────────

/**
 * Initialize the custom cursor.
 *
 * Skips on touch devices and when `prefers-reduced-motion` is active.
 * Requires `#custom-cursor`, `#cursor-text`, and `.cursor-text__label`
 * elements in the DOM.
 *
 * @returns Cleanup that removes all listeners and resets state
 */
export function initCursor(): CleanupFn {
  if (isTouchDevice()) return NOOP;
  if (prefersReducedMotion()) return NOOP;

  cursorEl = document.getElementById("custom-cursor");
  textEl = document.getElementById("cursor-text");
  textContent = document.querySelector(".cursor-text__label");
  if (!cursorEl || !textEl || !textContent) return NOOP;

  // quickTo on `left` and `top` — transform stays free for scale/rotate
  cursorLeftTo = gsap.quickTo(cursorEl, "left", {
    duration: DURATION.half,
    ease: "power3",
  });
  cursorTopTo = gsap.quickTo(cursorEl, "top", {
    duration: DURATION.half,
    ease: "power3",
  });
  textLeftTo = gsap.quickTo(textEl, "left", {
    duration: DURATION.half,
    ease: "power3",
  });
  textTopTo = gsap.quickTo(textEl, "top", {
    duration: DURATION.half,
    ease: "power3",
  });

  // Events
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseleave", onMouseLeave);
  document.addEventListener("pointerover", onPointerOver);
  document.addEventListener("pointerout", onPointerOut);

  // Rotation synced with GSAP ticker
  gsap.ticker.add(rotationTick);

  return destroyCursor;
}

/**
 * Destroy the custom cursor and remove all listeners.
 * Also exported standalone for backward compatibility.
 */
export function destroyCursor(): void {
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseleave", onMouseLeave);
  document.removeEventListener("pointerover", onPointerOver);
  document.removeEventListener("pointerout", onPointerOut);
  gsap.ticker.remove(rotationTick);

  document.body.classList.remove("custom-cursor-active");
  isActive = false;
  isTextVisible = false;
}
