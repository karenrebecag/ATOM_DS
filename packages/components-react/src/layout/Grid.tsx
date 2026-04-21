/**
 * Grid (Layout)
 *
 * CSS grid layout with configurable columns and gap.
 *
 * @see packages/css/src/layout/grid.css
 */

import { forwardRef, type HTMLAttributes } from 'react';
import type { GapSize } from '../types';
import { cn } from '../utils/cn';

// ── Types ────────────────────────────────────────────────
export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: number | string;
  gap?: GapSize;
}

// ── Grid Component ───────────────────────────────────────
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ columns, gap = 'm', className, children, ...rest }, ref) => {
    const classes = cn(
      'grid',
      columns && `grid--cols-${columns}`,
      `grid--gap-${gap}`,
      className
    );

    return (
      <div
        ref={ref}
        className={classes}
        data-grid
        data-columns={columns}
        data-gap={gap}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';
