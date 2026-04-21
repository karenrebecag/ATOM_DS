/**
 * Card (Molecule)
 *
 * Composable card container. Use with CardHeader, CardBody, CardFooter.
 * HTML matches Astro component 1:1.
 *
 * @see packages/css/src/components/card.css
 * @see packages/components-astro/src/molecules/Card.astro
 */

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={cn('card', className)} {...rest}>
      {children}
    </div>
  )
);

Card.displayName = 'Card';
