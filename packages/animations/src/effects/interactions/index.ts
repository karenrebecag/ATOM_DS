/**
 * @module effects/interactions
 * User interaction animations (hover, cursor, magnetic).
 * Transversal — can be applied to any component.
 */

// Hover animations
export {
  initRotateClones,
  initRotateCalc,
  initHoverRotate,
  initCardHover,
  initMagnetic,
} from './hover';

// Custom cursor
export { initCursor, destroyCursor } from './cursor';
