/**
 * Badge (Notification Badge)
 *
 * A notification indicator with smart overflow logic.
 * Displays notification counts with context-aware capping rules.
 *
 * Performance optimizations:
 * - Pure function logic hoisted to module level (js-cache-function-results pattern)
 * - Early return for zero count (js-early-exit)
 *
 * @see packages/css/src/components/badge.css
 * @see packages/tokens/src/components/badge.json
 */

import { forwardRef, type HTMLAttributes } from 'react';
import type { BadgeType, BadgeState, BadgeContext } from '../types';
import { cn } from '../utils/cn';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  count: number;
  context?: BadgeContext;
  type?: BadgeType;
  state?: BadgeState;
}

// ── Badge Display Logic (hoisted pure function) ───────────
// Rule: js-cache-function-results - Pure logic at module level
function getBadgeDisplay(count: number, context: BadgeContext): string | null {
  // Rule: js-early-exit - Return early for invalid cases
  if (count <= 0) return null;

  if (context === 'inbox') {
    // Inbox context: cap at +50
    if (count >= 50) return '+50';
    return count.toString();
  }

  // Default context: cap at 99+
  if (count > 99) return '99+';
  return count.toString();
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ count = 0, context = 'default', type = 'neutral', state = 'default', className, ...rest }, ref) => {
    const displayValue = getBadgeDisplay(count, context);

    // Don't render if count is zero or invalid
    if (!displayValue) return null;

    const ariaLabel = `${count} ${count === 1 ? 'notification' : 'notifications'}`;

    const classes = cn('badge', `badge--${type}`, `badge--${state}`, className);

    return (
      <span
        ref={ref}
        className={classes}
        data-badge
        data-count={count}
        data-context={context}
        data-state={state}
        role="status"
        aria-label={ariaLabel}
        {...rest}
      >
        <span className="badge__text" data-badge-text>
          {displayValue}
        </span>
      </span>
    );
  }
);

Badge.displayName = 'Badge';
