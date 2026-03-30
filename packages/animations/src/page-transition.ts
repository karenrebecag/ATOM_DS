/**
 * @module page-transition
 * Page enter animation — coordinated timeline that reveals above-fold
 * content with rich animations on initial load.
 *
 * **Vestibular risk**: Full-page coordinated entrance. If SplitText
 * is unavailable, falls back to a simple fade-up.
 *
 * ## Supported `data-*` attributes
 * - `data-load-heading`  — SplitText word-by-word reveal (yPercent, rotate).
 *                          Falls back to simple fade-up if SplitText unavailable.
 * - `data-load-reveal`   — Fade up from `y: 2em` with stagger
 * - `data-load-nav`      — Navbar slide-in from `yPercent: -125`
 * - `data-nav-entered`   — Set after nav entrance (prevents re-animating on SPA nav)
 * - `data-motion-exempt`  — Skips animation
 *
 * ## Usage
 * ```ts
 * import { runPageEnterAnimation } from '@anthropic-atom/animations';
 *
 * const timeline = runPageEnterAnimation();
 * ```
 */

import { gsap, ScrollTrigger, DURATION, STAGGER } from "./config";
import { prefersReducedMotion } from "./motion";
import type { AnimationConfig } from "./types";

/**
 * Run the coordinated page-enter animation timeline.
 *
 * **Vestibular risk** — if reduced motion is preferred, elements
 * are set to their visible state instantly (no animation).
 *
 * @param config - Optional scope container (defaults to `document`)
 * @returns GSAP timeline (or undefined if nothing to animate)
 */
export function runPageEnterAnimation(
  config: AnimationConfig = {},
): gsap.core.Timeline | undefined {
  const { scope = document } = config;

  const headings = scope.querySelectorAll<HTMLElement>(
    "[data-load-heading]",
  );
  const revealTargets = scope.querySelectorAll<HTMLElement>(
    "[data-load-reveal]",
  );
  const navBar = document.querySelector<HTMLElement>("[data-load-nav]");

  if (!headings.length && !revealTargets.length && !navBar) return;

  // Vestibular risk: set final states instantly
  if (prefersReducedMotion()) {
    if (headings.length) gsap.set(headings, { autoAlpha: 1, y: 0 });
    if (revealTargets.length)
      gsap.set(revealTargets, { autoAlpha: 1, y: 0 });
    if (navBar) gsap.set(navBar, { yPercent: 0 });
    return;
  }

  // SplitText is a Club GSAP plugin — may not be registered
  const SplitText =
    (window as any).SplitText || (gsap as any).SplitText || null;
  const hasSplitText = SplitText !== null;

  const tl = gsap.timeline({
    defaults: {
      duration: DURATION.double,
      ease: "expo.out",
      stagger: STAGGER.default,
    },
    onComplete: () => {
      ScrollTrigger.refresh();
    },
  });

  // ── Navbar slide-in ────────────────────────────────────────
  // Only on first load (once) — subsequent pages the nav is already visible
  if (navBar && !navBar.hasAttribute("data-nav-entered")) {
    gsap.set(navBar, { yPercent: -125 });
    tl.to(
      navBar,
      {
        yPercent: 0,
        ease: "expo.out",
        duration: 1,
        clearProps: "transform",
        onComplete: () => {
          navBar.setAttribute("data-nav-entered", "");
        },
      },
      0.1,
    );
  }

  // ── Heading word-by-word reveal ────────────────────────────
  if (headings.length) {
    if (hasSplitText) {
      const split = new SplitText(headings, {
        type: "lines, words",
        mask: "lines",
        linesClass: "text-line",
      });

      gsap.set(split.words, {
        yPercent: 100,
        rotate: 10,
        transformOrigin: "bottom left",
      });

      tl.to(
        split.words,
        {
          yPercent: 0,
          rotate: 0,
          delay: 0.1,
        },
        "<",
      );
    } else {
      // Fallback: simple fade-up per heading
      gsap.set(headings, { autoAlpha: 0, y: "1.5em" });
      tl.to(
        headings,
        {
          autoAlpha: 1,
          y: 0,
        },
        0.2,
      );
    }
  }

  // ── General element reveal ─────────────────────────────────
  if (revealTargets.length) {
    gsap.set(revealTargets, { autoAlpha: 0, y: "2em" });
    tl.to(
      revealTargets,
      {
        autoAlpha: 1,
        y: 0,
      },
      headings.length ? "<" : 0.2,
    );
  }

  return tl;
}
