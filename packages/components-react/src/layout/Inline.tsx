/**
 * Inline (Layout Primitive)
 *
 * Horizontal flex layout with consistent gap between children.
 * Use for horizontal lists, button groups, tag clouds, or any horizontally-arranged content.
 *
 * Performance: Simple layout component
 *
 * @see packages/css/src/layout/inline.css
 * @see packages/tokens/src/components/layout.json
 */

import { forwardRef, type ElementType, type HTMLAttributes } from 'react';
import type { GapSize, Alignment, Justify } from '../types';
import { cn } from '../utils/cn';

export interface InlineProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  gap?: GapSize;
  align?: Alignment;
  justify?: Justify;
  wrap?: boolean;
}

export const Inline = forwardRef<HTMLElement, InlineProps>(
  ({ as = 'div', gap = 'm', align = 'center', justify = 'start', wrap = false, className, children, ...rest }, ref) => {
    const Tag = as;

    const classes = cn(
      'inline',
      `inline--gap-${gap}`,
      align !== 'center' && `inline--align-${align}`,
      justify !== 'start' && `inline--justify-${justify}`,
      wrap && 'inline--wrap',
      className
    );

    return (
      <Tag ref={ref} className={classes} data-inline {...rest}>
        {children}
      </Tag>
    );
  }
);

Inline.displayName = 'Inline';
