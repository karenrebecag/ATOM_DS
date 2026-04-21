/**
 * CardHeader (Molecule — Card subcomponent)
 *
 * Header section of a Card with optional image/avatar, headline,
 * supporting text, and action slot.
 * HTML matches Astro component 1:1.
 *
 * @see packages/css/src/components/card.css
 * @see packages/components-astro/src/molecules/CardHeader.astro
 */

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  headline: string;
  supportingText?: string;
  image?: ReactNode;   // slot="image" equivalent
  action?: ReactNode;  // slot="action" equivalent
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ headline, supportingText, image, action, className, ...rest }, ref) => (
    <div ref={ref} className={cn('card-header', className)} {...rest}>
      <div className="card-header__content">
        {image && (
          <div className="card-header__image">
            {image}
          </div>
        )}
        <div className="card-header__text">
          <h3 className="card-header__headline">{headline}</h3>
          {supportingText && (
            <p className="card-header__supporting">{supportingText}</p>
          )}
        </div>
      </div>

      {action && (
        <div className="card-header__action">
          {action}
        </div>
      )}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';
