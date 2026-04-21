/**
 * CardBody (Molecule — Card subcomponent)
 *
 * Body section of a Card. Accepts headline/subhead props or custom children.
 * When children are passed they render inside card-body__content wrapper.
 * HTML matches Astro component 1:1.
 *
 * @see packages/css/src/components/card.css
 * @see packages/components-astro/src/molecules/CardBody.astro
 */

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  headline?: string;
  subhead?: string;
  bodyText?: string;
}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ headline, subhead, bodyText, className, children, ...rest }, ref) => {
    const showHeadGroup = headline || subhead;

    return (
      <div ref={ref} className={cn('card-body', className)} {...rest}>
        {showHeadGroup && (
          <div className="card-body__head">
            {headline && <h4 className="card-body__headline">{headline}</h4>}
            {subhead && <p className="card-body__subhead">{subhead}</p>}
          </div>
        )}

        {children ? (
          <div className="card-body__content">
            {children}
          </div>
        ) : bodyText ? (
          <p className="card-body__text">{bodyText}</p>
        ) : null}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';
