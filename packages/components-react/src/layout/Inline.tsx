/**
 * Inline (Layout)
 *
 * Horizontal inline layout with configurable gap, alignment, and wrapping.
 *
 * @see packages/css/src/layout/inline.css
 */

import { forwardRef, type HTMLAttributes } from 'react';
import type { GapSize, Alignment } from '../types';
import { cn } from '../utils/cn';

// ── Types ────────────────────────────────────────────────
export interface InlineProps extends HTMLAttributes<HTMLDivElement> {
  gap?: GapSize;
  align?: Alignment;
  wrap?: boolean;
}

// ── Inline Component ─────────────────────────────────────
export const Inline = forwardRef<HTMLDivElement, InlineProps>(
  ({ gap = 'm', align, wrap = false, className, children, ...rest }, ref) => {
    const classes = cn(
      'inline',
      `inline--gap-${gap}`,
      align && `inline--align-${align}`,
      wrap && 'inline--wrap',
      className
    );

    return (
      <div ref={ref} className={classes} data-inline data-gap={gap} {...rest}>
        {children}
      </div>
    );
  }
);

Inline.displayName = 'Inline';
