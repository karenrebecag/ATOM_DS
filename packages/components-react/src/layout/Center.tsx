/**
 * Center (Layout)
 *
 * Centers its children both horizontally and vertically.
 *
 * @see packages/css/src/layout/center.css
 */

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

// ── Types ────────────────────────────────────────────────
export interface CenterProps extends HTMLAttributes<HTMLDivElement> {}

// ── Center Component ─────────────────────────────────────
export const Center = forwardRef<HTMLDivElement, CenterProps>(
  ({ className, children, ...rest }, ref) => {
    const classes = cn('center', className);

    return (
      <div ref={ref} className={classes} data-center {...rest}>
        {children}
      </div>
    );
  }
);

Center.displayName = 'Center';
