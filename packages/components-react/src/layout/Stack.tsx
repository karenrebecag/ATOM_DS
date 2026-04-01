/**
 * Stack (Layout Primitive)
 *
 * Vertical flex layout with consistent gap between children.
 * Use for vertical lists, forms, card stacks, or any vertically-arranged content.
 *
 * Performance: Simple layout component with polymorphic rendering
 *
 * @see packages/css/src/layout/stack.css
 * @see packages/tokens/src/components/layout.json
 */

import { forwardRef, type ElementType, type HTMLAttributes } from 'react';
import type { GapSize, Alignment, Justify } from '../types';
import { cn } from '../utils/cn';

export interface StackProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  gap?: GapSize;
  align?: Alignment;
  justify?: Justify;
  fullHeight?: boolean;
}

export const Stack = forwardRef<HTMLElement, StackProps>(
  ({ as = 'div', gap = 'm', align = 'stretch', justify = 'start', fullHeight = false, className, children, ...rest }, ref) => {
    const Tag = as;

    const classes = cn(
      'stack',
      `stack--gap-${gap}`,
      align !== 'stretch' && `stack--align-${align}`,
      justify !== 'start' && `stack--justify-${justify}`,
      fullHeight && 'stack--full-height',
      className
    );

    return (
      <Tag ref={ref} className={classes} data-stack {...rest}>
        {children}
      </Tag>
    );
  }
);

Stack.displayName = 'Stack';
