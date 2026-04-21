/**
 * CardFooter (Molecule — Card subcomponent)
 *
 * Footer section of a Card. variant drives the CSS modifier class.
 * Children are always passed explicitly in React (no default button/tag injection).
 * HTML matches Astro component 1:1.
 *
 * @see packages/css/src/components/card.css
 * @see packages/components-astro/src/molecules/CardFooter.astro
 */

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'buttons' | 'tags';
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ variant = 'buttons', className, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn('card-footer', `card-footer--${variant}`, className)}
      {...rest}
    >
      {children}
    </div>
  )
);

CardFooter.displayName = 'CardFooter';
