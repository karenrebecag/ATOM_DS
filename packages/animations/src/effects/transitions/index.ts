/**
 * @module effects/transitions
 * Page and route transition animations.
 * Used for SPAs, multi-page transitions, and navigation.
 */

// Page transitions
export { runPageEnterAnimation } from './page-transition';
export {
  runParallaxLeave,
  runParallaxEnter,
  runParallaxOnce,
} from './parallax-transition';

// Sidebar/Panel transitions
export { initSidebarCollapse } from './sidebar-wipe';
