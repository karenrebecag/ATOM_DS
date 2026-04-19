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

// ── Atoms — Buttons ────────────────────────────────────────
export { Button } from './atoms/buttons/Button';
export type { ButtonProps } from './atoms/buttons/Button';

// ── Atoms — Media ──────────────────────────────────────────
export { Avatar } from './atoms/media/Avatar';
export type { AvatarProps } from './atoms/media/Avatar';

// ── Atoms — Indicators ─────────────────────────────────────
export { Badge } from './atoms/indicators/Badge';
export type { BadgeProps } from './atoms/indicators/Badge';

// ── Utilities ──────────────────────────────────────────────
export { cn } from './utils/cn';
