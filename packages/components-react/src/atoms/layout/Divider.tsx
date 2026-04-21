/**
 * Divider (Atom)
 *
 * Horizontal rule separator. opacity prop maps to --divider-opacity CSS variable.
 * HTML matches Astro component 1:1.
 *
 * @see packages/css/src/components/divider.css
 * @see packages/components-astro/src/atoms/layout/Divider.astro
 */

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  opacity?: number;
}

export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  ({ opacity, className, style, ...rest }, ref) => (
    <hr
      ref={ref}
      className={cn('divider', className)}
      data-divider
      aria-hidden="true"
      style={opacity !== undefined ? { '--divider-opacity': opacity, ...style } as React.CSSProperties : style}
      {...rest}
    />
  )
);

Divider.displayName = 'Divider';
