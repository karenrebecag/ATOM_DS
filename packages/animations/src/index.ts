/**
 * @module @atomchat/animations
 * Animation system entry point — Reorganized with hybrid espejo structure.
 *
 * ## Structure
 * - `core/` — GSAP config, types, motion system
 * - `components/` — Component-specific animations (espejo structure)
 * - `effects/` — Transversal animations (scroll, text, interactions, transitions)
 * - `marketing/` — Landing page specific (not DS core)
 *
 * ## Import Patterns
 *
 * ### Component-specific (espejo):
 * ```ts
 * import { initBadge } from '@atomchat/animations/components/indicators';
 * import { initToast } from '@atomchat/animations/components/feedback';
 * ```
 *
 * ### Transversal effects:
 * ```ts
 * import { initReveal } from '@atomchat/animations/effects/scroll';
 * import { initHoverRotate } from '@atomchat/animations/effects/interactions';
 * import { initTextReveal } from '@atomchat/animations/effects/text';
 * ```
 *
 * ### Marketing (landing pages only):
 * ```ts
 * import { initPricing, initStats } from '@atomchat/animations/marketing';
 * ```
 *
 * ### All at once (legacy):
 * ```ts
 * import { initAllAnimations } from '@atomchat/animations';
 * ```
 */

import { prefersReducedMotion } from "./core/motion";
import type { AnimationConfig, CleanupFn } from "./core/types";
import { NOOP } from "./core/types";

// ── Individual module imports (used by initAllAnimations) ────

import { initReveal, initBatchReveal } from "./effects/scroll/reveal";
import {
  initTextReveal,
  initMaskedReveal,
  initFadeUpLoad,
  initScrambleLoad,
  initScrambleHover,
  initHighlightScroll,
  initScrambleScroll,
  initTextAnimations,
} from "./effects/text/text";
import { initParallax, initParallaxScale } from "./effects/scroll/parallax";
import { initMarqueeObserver } from "./marketing/marquee";
import {
  initRotateClones,
  initRotateCalc,
  initHoverRotate,
  initCardHover,
  initMagnetic,
} from "./effects/interactions/hover";
import { initRotationSlider } from "./marketing/slider";
import { initVerticalSlider } from "./marketing/vertical-slider";
import { initRotatingLayers } from "./marketing/rotating-layers";
import { initAboutCardAnimation } from "./marketing/about-card";
import { initFooterLogo } from "./marketing/footer-logo";
import { initPricingSection } from "./marketing/pricing";
import { initFlickCards } from "./marketing/flick-cards";
import { initLogoWallCycle } from "./marketing/logo-wall";
import { initDraggableMarquee } from "./marketing/draggable-marquee";
import { initStats } from "./marketing/stats";
import { initFeatures } from "./marketing/features";
import { initProgressNav } from "./effects/scroll/progress-nav";
import { initLayoutGridFlip } from "./marketing/layout-grid-flip";
import {
  initLoadingAnimations,
  initShimmerText,
} from "./components/indicators/loading";
import {
  animateToastEnter,
  animateToastExit,
  restackToasts,
  initToastAnimations,
  cleanupToastAnimations,
} from "./components/feedback/toast";
import { initBadge, hideBadge, showBadge, animateBadgeEntry } from "./components/indicators/badge";
import { initScrollDirection } from "./effects/scroll/scroll-direction";
import { runPageEnterAnimation } from "./effects/transitions/page-transition";
import { initCursor, destroyCursor } from "./effects/interactions/cursor";
import { initNumberOdometer } from "./effects/text/odometer";
import {
  runParallaxLeave,
  runParallaxEnter,
  runParallaxOnce,
} from "./effects/transitions/parallax-transition";
import { initSidebarCollapse } from "./effects/transitions/sidebar-wipe";
import { initSocialProof } from "./marketing/social-proof";

// ── Re-exports by Category ───────────────────────────────────

// Core
export * from './core';

// Components (espejo structure)
export * from './components';

// Effects (transversal)
export * from './effects';

// Marketing (landing pages)
export * from './marketing';

// ── Master initializer ───────────────────────────────────────

/**
 * Initialize all animation systems at once.
 *
 * Returns a master cleanup function that disposes all listeners,
 * observers, ScrollTriggers, and GSAP tweens.
 *
 * Uses the three-tier motion system — if motion is not `'full'`,
 * individual init functions handle their own reduced-motion behavior
 * (most return NOOP, vestibular-risk modules bail early).
 *
 * @param scope - Container to scope DOM queries (defaults to `document`)
 * @returns Master cleanup function
 */
export function initAllAnimations(
  scope: Element | Document = document,
): CleanupFn {
  const config: AnimationConfig = { scope };
  const cleanups: CleanupFn[] = [];

  // Scroll reveals
  cleanups.push(initReveal(config));
  cleanups.push(initBatchReveal(config));

  // Text animations
  cleanups.push(initTextReveal(config));

  // Parallax (vestibular-risk — bails early if reduced)
  cleanups.push(initParallax(config));
  cleanups.push(initParallaxScale(config));

  // Hover interactions
  cleanups.push(initRotateClones(config));
  cleanups.push(initRotateCalc(config));
  cleanups.push(initHoverRotate(config));
  cleanups.push(initCardHover(config));
  cleanups.push(initMagnetic(config));

  // Marquee
  cleanups.push(initMarqueeObserver(config));

  // Rotation slider
  cleanups.push(initRotationSlider(config));

  // Vertical slider (vestibular-risk — bails early if reduced)
  cleanups.push(initVerticalSlider(config));

  // Rotating layers
  cleanups.push(initRotatingLayers(config));

  // About card (persona-swapping concentric layers)
  cleanups.push(initAboutCardAnimation(config));

  // Pricing section toggle
  cleanups.push(initPricingSection(config));

  // Flick cards carousel
  cleanups.push(initFlickCards(config));

  // Logo wall cycle
  cleanups.push(initLogoWallCycle(config));

  // Draggable marquee
  cleanups.push(initDraggableMarquee(config));

  // Stats count-up
  cleanups.push(initStats(config));

  // Social proof strip
  cleanups.push(initSocialProof(config));

  // Features bento grid
  cleanups.push(initFeatures(config));

  // Progress navigation
  cleanups.push(initProgressNav(config));

  // Layout grid flip
  cleanups.push(initLayoutGridFlip(config));

  // Loading animations
  cleanups.push(initLoadingAnimations(config));

  // Footer logo scatter
  cleanups.push(initFooterLogo(config));

  // Sidebar collapse/expand
  cleanups.push(initSidebarCollapse(config));

  // Badge lifecycle (count updates, show/hide, odometer)
  cleanups.push(initBadge(config));

  // Scroll direction (pure DOM, no scope needed)
  cleanups.push(initScrollDirection());

  return () => {
    cleanups.forEach((fn) => fn());
  };
}
