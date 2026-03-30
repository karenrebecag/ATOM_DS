/**
 * @module @anthropic-atom/animations
 * Animation system entry point.
 *
 * Import this module to initialize all animation systems at once,
 * or import individual modules for granular control.
 *
 * ## Usage (all at once)
 * ```ts
 * import { initAllAnimations } from '@anthropic-atom/animations';
 *
 * const cleanup = initAllAnimations();
 * // ... on page leave:
 * cleanup();
 * ```
 *
 * ## Usage (individual)
 * ```ts
 * import { initReveal } from '@anthropic-atom/animations';
 * import { initMagnetic } from '@anthropic-atom/animations';
 *
 * initReveal();
 * initMagnetic();
 * ```
 */

import { prefersReducedMotion } from "./motion";
import type { AnimationConfig, CleanupFn } from "./types";
import { NOOP } from "./types";

// ── Individual module imports (used by initAllAnimations) ────

import { initReveal, initBatchReveal } from "./reveal";
import { initTextReveal } from "./text";
import { initParallax, initParallaxScale } from "./parallax";
import { initMarqueeObserver } from "./marquee";
import {
  initRotateClones,
  initRotateCalc,
  initHoverRotate,
  initCardHover,
  initMagnetic,
} from "./hover";
import { initRotationSlider } from "./slider";
import { initVerticalSlider } from "./vertical-slider";
import { initRotatingLayers } from "./rotating-layers";
import { initAboutCardAnimation } from "./about-card";
import { initFooterLogo } from "./footer-logo";
import { initPricingSection } from "./pricing";
import { initFlickCards } from "./flick-cards";
import { initLogoWallCycle } from "./logo-wall";
import { initDraggableMarquee } from "./draggable-marquee";
import { initStats } from "./stats";
import { initFeatures } from "./features";
import { initProgressNav } from "./progress-nav";
import { initLayoutGridFlip } from "./layout-grid-flip";
import {
  initLoadingAnimations,
  initShimmerText,
} from "./loading";
import {
  animateToastEnter,
  animateToastExit,
  restackToasts,
  initToastAnimations,
  cleanupToastAnimations,
} from "./toast";
import { hideBadge, showBadge, animateBadgeEntry } from "./badge";
import { initScrollDirection } from "./scroll-direction";
import { runPageEnterAnimation } from "./page-transition";
import {
  initSmoothScroll,
  getLenis,
  destroySmoothScroll,
} from "./smooth-scroll";
import { initBarba } from "./transitions";
import { initCursor, destroyCursor } from "./cursor";
import { initNumberOdometer } from "./odometer";
import {
  runParallaxLeave,
  runParallaxEnter,
  runParallaxOnce,
} from "./parallax-transition";
import { initSidebarCollapse } from "./sidebar-wipe";
import { initSocialProof } from "./social-proof";

// ── Type re-exports ──────────────────────────────────────────

export type {
  AnimationConfig,
  CleanupFn,
  AnimationOptions,
  MotionLevel,
} from "./types";
export { NOOP } from "./types";

// ── Config re-exports ────────────────────────────────────────

export {
  gsap,
  ScrollTrigger,
  Draggable,
  InertiaPlugin,
  Observer,
  Flip,
  DURATION,
  STAGGER,
  MM,
} from "./config";

// ── Motion re-exports ────────────────────────────────────────

export {
  getMotionLevel,
  prefersReducedMotion,
  setMotionLevel,
  watchMotionPreference,
  isMotionExempt,
} from "./motion";

// ── Module re-exports ────────────────────────────────────────

// about-card
export { initAboutCardAnimation };

// badge
export { hideBadge, showBadge, animateBadgeEntry };

// cursor
export { initCursor, destroyCursor };

// draggable-marquee
export { initDraggableMarquee };

// features
export { initFeatures };

// flick-cards
export { initFlickCards };

// footer-logo
export { initFooterLogo };

// hover
export {
  initRotateClones,
  initRotateCalc,
  initHoverRotate,
  initCardHover,
  initMagnetic,
};

// layout-grid-flip
export { initLayoutGridFlip };

// loading
export { initLoadingAnimations, initShimmerText };

// logo-wall
export { initLogoWallCycle };

// marquee
export { initMarqueeObserver };

// odometer
export { initNumberOdometer };

// page-transition
export { runPageEnterAnimation };

// parallax
export { initParallax, initParallaxScale };

// parallax-transition
export { runParallaxLeave, runParallaxEnter, runParallaxOnce };

// pricing
export { initPricingSection };

// progress-nav
export { initProgressNav };

// reveal
export { initReveal, initBatchReveal };

// rotating-layers
export { initRotatingLayers };

// scroll-direction
export { initScrollDirection };

// sidebar-wipe
export { initSidebarCollapse };

// slider
export { initRotationSlider };

// smooth-scroll
export { initSmoothScroll, getLenis, destroySmoothScroll };

// social-proof
export { initSocialProof };

// stats
export { initStats };

// text
export { initTextReveal };

// toast
export {
  animateToastEnter,
  animateToastExit,
  restackToasts,
  initToastAnimations,
  cleanupToastAnimations,
};

// transitions
export { initBarba };

// vertical-slider
export { initVerticalSlider };

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

  // Scroll direction (pure DOM, no scope needed)
  cleanups.push(initScrollDirection());

  return () => {
    cleanups.forEach((fn) => fn());
  };
}
