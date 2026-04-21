/**
 * Container (Layout)
 *
 * Constrains content width with responsive max-width variants.
 *
 * @see packages/css/src/layout/container.css
 */

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

// ── Types ────────────────────────────────────────────────
export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'medium' | 'small';
}

// ── Container Component ──────────────────────────────────
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = 'default', className, children, ...rest }, ref) => {
    const classes = cn(
      'container',
      size !== 'default' && `container--${size}`,
      className
    );

    return (
      <div ref={ref} className={classes} data-container data-size={size} {...rest}>
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';
