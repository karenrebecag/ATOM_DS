/**
 * @module motion
 * Three-tier motion preference system (Google Material / Adobe Spectrum pattern).
 *
 * ## Tiers (checked in priority order)
 *
 * | Tier | Source | Controls |
 * |------|--------|----------|
 * | 1 — OS | `prefers-reduced-motion` media query | System-wide preference |
 * | 2 — Site | `<html data-motion="reduced|none">` | User toggle on your site |
 * | 3 — Element | `data-motion-exempt` attribute | Per-component opt-out |
 *
 * ## Priority
 * `'none'` wins over everything. OS `reduced` overrides site `full`.
 * Element `data-motion-exempt` bypasses all animation regardless of level.
 *
 * ## Usage
 * ```ts
 * import { prefersReducedMotion, getMotionLevel, setMotionLevel } from '@atom/animations';
 *
 * // Quick boolean check (most common)
 * if (prefersReducedMotion()) return;
 *
 * // Three-tier level
 * const level = getMotionLevel(); // 'full' | 'reduced' | 'none'
 *
 * // User toggle button
 * setMotionLevel('reduced');
 *
 * // Per-element exemption
 * if (isMotionExempt(el)) return;
 * ```
 *
 * ## CSS Usage
 * ```css
 * html[data-motion="reduced"] .hero-parallax { transform: none !important; }
 * html[data-motion="none"] * { animation: none !important; transition: none !important; }
 * ```
 *
 * @see WCAG 2.3.3 (AAA) — Animation from Interactions
 */

import type { MotionLevel, CleanupFn } from "./types";

// ── OS-level media query ──────────────────────────────────────

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function getOsPreference(): MotionLevel {
  if (typeof window === "undefined") return "full";
  return window.matchMedia(REDUCED_MOTION_QUERY).matches ? "reduced" : "full";
}

// ── Site-level attribute ──────────────────────────────────────

function getSitePreference(): MotionLevel | null {
  if (typeof document === "undefined") return null;
  const attr = document.documentElement.getAttribute("data-motion");
  if (attr === "none") return "none";
  if (attr === "reduced") return "reduced";
  return null;
}

// ── Public API ────────────────────────────────────────────────

/**
 * Get the effective motion level by checking all three tiers.
 *
 * Resolution order:
 * 1. If site-level is `'none'` → return `'none'` (wins over everything)
 * 2. If OS says reduced → return `'reduced'`
 * 3. If site-level is `'reduced'` → return `'reduced'`
 * 4. Otherwise → return `'full'`
 */
export function getMotionLevel(): MotionLevel {
  const site = getSitePreference();
  const os = getOsPreference();

  // 'none' always wins
  if (site === "none") return "none";

  // OS reduced wins over site full
  if (os === "reduced") return "reduced";

  // Site reduced
  if (site === "reduced") return "reduced";

  return "full";
}

/**
 * Quick boolean check: returns `true` if motion is NOT fully enabled.
 * Use as the first guard in animation functions.
 *
 * Replaces the old `window.matchMedia("(prefers-reduced-motion: reduce)").matches`
 * with a three-tier check.
 */
export function prefersReducedMotion(): boolean {
  return getMotionLevel() !== "full";
}

/**
 * Set the site-level motion preference.
 * Sets `data-motion` attribute on `<html>`.
 *
 * Use for a "reduce animations" toggle button in your UI.
 * Pass `'full'` to remove the attribute (defer to OS preference).
 *
 * @example
 * ```ts
 * // Toggle button handler
 * const btn = document.querySelector('#motion-toggle');
 * btn.addEventListener('click', () => {
 *   const current = getMotionLevel();
 *   setMotionLevel(current === 'full' ? 'reduced' : 'full');
 * });
 * ```
 */
export function setMotionLevel(level: MotionLevel): void {
  if (typeof document === "undefined") return;

  if (level === "full") {
    document.documentElement.removeAttribute("data-motion");
  } else {
    document.documentElement.setAttribute("data-motion", level);
  }
}

/**
 * Watch for changes to motion preference (OS-level and site-level).
 * Fires callback immediately with current level, then on every change.
 *
 * @returns Cleanup function that removes all observers.
 *
 * @example
 * ```ts
 * const cleanup = watchMotionPreference((level) => {
 *   console.log('Motion level changed:', level);
 *   if (level !== 'full') gsap.globalTimeline.pause();
 *   else gsap.globalTimeline.resume();
 * });
 * // Later:
 * cleanup();
 * ```
 */
export function watchMotionPreference(
  callback: (level: MotionLevel) => void,
): CleanupFn {
  if (typeof window === "undefined") return () => {};

  // Fire immediately with current level
  callback(getMotionLevel());

  // Watch OS-level changes
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  const onMediaChange = () => callback(getMotionLevel());
  mql.addEventListener("change", onMediaChange);

  // Watch site-level changes (data-motion attribute on <html>)
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "data-motion"
      ) {
        callback(getMotionLevel());
        break;
      }
    }
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-motion"],
  });

  return () => {
    mql.removeEventListener("change", onMediaChange);
    observer.disconnect();
  };
}

/**
 * Check if an element (or any ancestor) has the `data-motion-exempt` attribute.
 * Elements with this attribute should NEVER be animated, regardless of motion level.
 *
 * @example
 * ```html
 * <div data-motion-exempt>
 *   <span>This content never animates</span>
 * </div>
 * ```
 *
 * ```ts
 * if (isMotionExempt(el)) return; // Skip animation entirely
 * ```
 */
export function isMotionExempt(element: HTMLElement): boolean {
  return element.closest("[data-motion-exempt]") !== null;
}
