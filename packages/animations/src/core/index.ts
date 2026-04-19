/**
 * @module core
 * Core animation system exports.
 */

// GSAP config & constants
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
} from './config';

// Types
export type {
  AnimationConfig,
  CleanupFn,
  AnimationOptions,
  MotionLevel,
} from './types';
export { NOOP } from './types';

// Motion preference system
export {
  getMotionLevel,
  prefersReducedMotion,
  setMotionLevel,
  watchMotionPreference,
  isMotionExempt,
} from './motion';
