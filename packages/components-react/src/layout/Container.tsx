/**
 * Container (Layout Primitive)
 *
 * Max-width centered layout container with responsive horizontal padding.
 * Limits content width and centers horizontally for optimal reading experience.
 *
 * Performance: Polymorphic component without inline definitions
 *
 * @see packages/css/src/layout/container.css
 * @see packages/tokens/src/components/layout.json
 */

import { forwardRef, type ElementType, type HTMLAttributes } from 'react';
import type { ContainerSize } from '../types';
import { cn } from '../utils/cn';

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  size?: ContainerSize;
}

export const Container = forwardRef<HTMLElement, ContainerProps>(
  ({ as = 'div', size = 'lg', className, children, ...rest }, ref) => {
    const Tag = as;

    const classes = cn('container', `container--${size}`, className);

    return (
      <Tag ref={ref} className={classes} data-container {...rest}>
        {children}
      </Tag>
    );
  }
);

Container.displayName = 'Container';
