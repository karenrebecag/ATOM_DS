/**
 * BulletItem (Atom)
 *
 * List item for unordered bullet lists. bulletColor maps to --bullet-color CSS variable.
 * HTML matches Astro component 1:1.
 *
 * @see packages/css/src/components/lists.css
 * @see packages/components-astro/src/atoms/lists/BulletItem.astro
 */

import { forwardRef, type LiHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface BulletItemProps extends LiHTMLAttributes<HTMLLIElement> {
  bulletColor?: string;
}

export const BulletItem = forwardRef<HTMLLIElement, BulletItemProps>(
  ({ bulletColor, className, style, children, ...rest }, ref) => (
    <li
      ref={ref}
      className={cn('bullet-item', className)}
      style={bulletColor ? { '--bullet-color': bulletColor, ...style } as React.CSSProperties : style}
      {...rest}
    >
      {children}
    </li>
  )
);

BulletItem.displayName = 'BulletItem';
