/**
 * Grid (Layout Primitive)
 *
 * CSS Grid layout with responsive column system and consistent gap.
 * Use for card grids, image galleries, dashboard layouts, or any grid-based content.
 *
 * Performance: Simple layout component
 *
 * @see packages/css/src/layout/grid.css
 * @see packages/tokens/src/components/layout.json
 */

import { forwardRef, type ElementType, type HTMLAttributes } from 'react';
import type { GridColumns, GapSize, Alignment, Justify } from '../types';
import { cn } from '../utils/cn';

export interface GridProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  columns?: GridColumns;
  gap?: GapSize;
  align?: Alignment;
  justify?: Justify;
  preserve?: boolean;
}

export const Grid = forwardRef<HTMLElement, GridProps>(
  (
    {
      as = 'div',
      columns = 3,
      gap = 'm',
      align = 'stretch',
      justify = 'stretch',
      preserve = false,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const Tag = as;

    // Build column class
    const columnClass = typeof columns === 'number' ? `grid--cols-${columns}` : `grid--${columns}`;

    const classes = cn(
      'grid',
      columnClass,
      `grid--gap-${gap}`,
      align !== 'stretch' && `grid--align-${align}`,
      justify !== 'stretch' && `grid--justify-${justify}`,
      preserve && 'grid--preserve',
      className
    );

    return (
      <Tag ref={ref} className={classes} data-grid {...rest}>
        {children}
      </Tag>
    );
  }
);

Grid.displayName = 'Grid';
