/**
 * @module types
 * Shared type definitions for the ATOM animation system.
 *
 * Every init* function accepts AnimationConfig and returns CleanupFn.
 * Imperative utils accept AnimationOptions for per-call overrides.
 */

/**
 * Configuration passed to every init* function.
 * Scopes DOM queries to a specific container (defaults to document).
 */
export interface AnimationConfig {
  scope?: Element | Document;
}

/**
 * Cleanup function returned by every init* and imperative animation.
 * Call to remove all event listeners, kill tweens, and free resources.
 */
export type CleanupFn = () => void;

/**
 * Per-animation override options for imperative utilities.
 * All fields optional — defaults come from DURATION/STAGGER constants.
 */
export interface AnimationOptions {
  duration?: number;
  ease?: string;
  delay?: number;
}

/**
 * Three-tier motion preference level.
 *
 * - `'full'`    — All animations enabled (default)
 * - `'reduced'` — Simplified animations (no parallax, shorter durations)
 * - `'none'`    — No animations at all (instant state changes)
 */
export type MotionLevel = "full" | "reduced" | "none";

/** No-op cleanup for skipped or exempt animations. */
export const NOOP: CleanupFn = () => {};
