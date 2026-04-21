/**
 * NumberItem (Atom)
 *
 * List item for ordered numbered lists. numberColor maps to --number-color CSS variable.
 * HTML matches Astro component 1:1.
 *
 * @see packages/css/src/components/lists.css
 * @see packages/components-astro/src/atoms/lists/NumberItem.astro
 */

import { forwardRef, type LiHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface NumberItemProps extends LiHTMLAttributes<HTMLLIElement> {
  number: number | string;
  numberColor?: string;
}

export const NumberItem = forwardRef<HTMLLIElement, NumberItemProps>(
  ({ number, numberColor, className, style, children, ...rest }, ref) => (
    <li
      ref={ref}
      className={cn('number-item', className)}
      data-number={number}
      style={numberColor ? { '--number-color': numberColor, ...style } as React.CSSProperties : style}
      {...rest}
    >
      {children}
    </li>
  )
);

NumberItem.displayName = 'NumberItem';
