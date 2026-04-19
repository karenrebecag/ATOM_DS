/**
 * @module loading
 * Shimmer text animation for loading states and decorative use.
 *
 * GSAP-powered shimmering gradient that sweeps across text.
 * Inspired by 21st.dev/r/ElevenLabs/shimmering-text, adapted to GSAP.
 *
 * ## How it works
 * - Text gets a two-layer background: base (muted) + shimmer highlight
 * - `background-clip: text` makes it visible through the text only
 * - GSAP tweens `backgroundPositionX` from 100% to 0% in a loop
 *
 * ## Supported `data-*` attributes
 * - `data-shimmer`        — Enable shimmer. Optional value = duration in seconds (default: `2`)
 * - `data-motion-exempt`  — Skips shimmer animation for this element
 *
 * ## Auto-applied selectors
 * - `.link-button__loading-text` — LinkButton loading state
 *
 * ## CSS custom properties (overridable per-context)
 * - `--shimmer-base`      — Base text color (default: `var(--fg-tertiary)`)
 * - `--shimmer-highlight`  — Shimmer peak color (default: `var(--fg-primary)`)
 *
 * ## Usage
 * ```html
 * <span data-shimmer>Loading...</span>
 * <span data-shimmer="3">Slower sweep (3s)</span>
 * ```
 *
 * ```ts
 * import { initShimmerText } from '@atomchat/animations';
 *
 * const cleanup = initShimmerText();
 * // Later:
 * cleanup();
 * ```
 */

import { gsap } from "../../core/config";
import { prefersReducedMotion, isMotionExempt } from "../../core/motion";
import type { AnimationConfig, CleanupFn } from "../../core/types";
import { NOOP } from "../../core/types";

/**
 * Initialize shimmer text animations.
 *
 * Applies inline background styles and a looping `backgroundPositionX`
 * tween. Cleanup removes all inline styles and kills tweens.
 *
 * Respects `prefers-reduced-motion` (shows text normally) and
 * `data-motion-exempt` (per-element opt-out).
 *
 * @param config - Optional scope container (defaults to `document`)
 * @returns Cleanup that kills all shimmer tweens and removes inline styles
 */
export function initShimmerText(config: AnimationConfig = {}): CleanupFn {
  const { scope = document } = config;
  const elements = scope.querySelectorAll<HTMLElement>(
    "[data-shimmer], .link-button__loading-text",
  );

  if (!elements.length) return NOOP;

  // Reduced motion: just show text normally
  if (prefersReducedMotion()) return NOOP;

  const tweens: gsap.core.Tween[] = [];
  const styledElements: HTMLElement[] = [];

  elements.forEach((el) => {
    if (isMotionExempt(el)) return;

    const duration = parseFloat(el.getAttribute("data-shimmer") || "") || 2;

    // Use CSS custom properties for shimmer colors (semantic tokens)
    // --shimmer-base and --shimmer-highlight can be overridden per-context
    // Default: neutral grays. LinkButton loading: blues (set via SCSS).
    const baseColor = "var(--shimmer-base, var(--fg-tertiary))";
    const shimmerColor = "var(--shimmer-highlight, var(--fg-primary))";

    // Apply shimmer background styles inline
    Object.assign(el.style, {
      background: `
        linear-gradient(
          90deg,
          ${baseColor} 0%,
          ${baseColor} 35%,
          ${shimmerColor} 50%,
          ${baseColor} 65%,
          ${baseColor} 100%
        )
      `.trim(),
      backgroundSize: "300% 100%",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundPositionX: "100%",
    });

    styledElements.push(el);

    // Tween backgroundPositionX from 100% → 0%
    // GSAP handles % values on backgroundPosition natively
    const tween = gsap.fromTo(
      el,
      { backgroundPositionX: "100%" },
      {
        backgroundPositionX: "0%",
        duration,
        ease: "none",
        repeat: -1,
        repeatDelay: 0.3,
      },
    );

    tweens.push(tween);
  });

  return () => {
    tweens.forEach((t) => t.kill());
    styledElements.forEach((el) => {
      Object.assign(el.style, {
        background: "",
        backgroundSize: "",
        backgroundClip: "",
        WebkitBackgroundClip: "",
        WebkitTextFillColor: "",
        backgroundPositionX: "",
      });
    });
  };
}

/**
 * Master init — backwards-compatible entry point.
 * Delegates entirely to {@link initShimmerText}.
 */
export function initLoadingAnimations(config: AnimationConfig = {}): CleanupFn {
  return initShimmerText(config);
}
