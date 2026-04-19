/**
 * @module effects/scroll
 * Scroll-based animations (reveal, parallax, scroll direction).
 * Transversal — can be applied to any scrollable content.
 */

// Scroll reveal
export { initReveal, initBatchReveal } from './reveal';

// Parallax
export { initParallax, initParallaxScale } from './parallax';

// Scroll detection & progress
export { initScrollDirection } from './scroll-direction';
export { initProgressNav } from './progress-nav';
