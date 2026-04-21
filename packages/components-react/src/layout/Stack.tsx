/**
 * Stack (Layout)
 *
 * Vertical stack layout with configurable gap and alignment.
 * Supports polymorphic rendering via the `as` prop.
 *
 * @see packages/css/src/layout/stack.css
 */

import { forwardRef, type HTMLAttributes } from 'react';
import type { GapSize, Alignment } from '../types';
import { cn } from '../utils/cn';

// ── Types ────────────────────────────────────────────────
export interface StackProps extends HTMLAttributes<HTMLElement> {
  gap?: GapSize;
  align?: Alignment;
  as?: 'div' | 'section' | 'article';
}

// ── Stack Component ──────────────────────────────────────
export const Stack = forwardRef<HTMLElement, StackProps>(
  ({ gap = 'm', align, as: Tag = 'div', className, children, ...rest }, ref) => {
    const classes = cn(
      'stack',
      `stack--gap-${gap}`,
      align && `stack--align-${align}`,
      className
    );

    return (
      <Tag ref={ref as React.Ref<HTMLDivElement>} className={classes} data-stack data-gap={gap} {...rest}>
        {children}
      </Tag>
    );
  }
);

Stack.displayName = 'Stack';
