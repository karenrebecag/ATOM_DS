/**
 * @atomchat.io/components-react — Component exports
 *
 * Currently available components:
 * import { Button } from '@atomchat.io/components-react'
 *
 * @version 1.0.0 — Button only (other components coming soon)
 */

// ── Types ──────────────────────────────────────────────────
export type {
  SizeVariant,
  ButtonVariant,
} from './types';

// ── Atoms ──────────────────────────────────────────────────
export { Button } from './atoms/Button';
export type { ButtonProps } from './atoms/Button';

// ── Utilities ──────────────────────────────────────────────
export { cn } from './utils/cn';
