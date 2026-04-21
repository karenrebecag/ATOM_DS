/**
 * Spinner (Atom)
 *
 * Loading indicator with continuous rotation animation.
 * HTML output mirrors the Astro component exactly.
 *
 * @see packages/css/src/components/indicators/spinner.css
 * @see packages/tokens/src/components/indicators/spinner.json
 */

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export type SpinnerSize = 'xs' | 's' | 'm' | 'l' | 'xl';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ size = 'm', className, ...rest }, ref) => (
    <span
      ref={ref}
      className={cn('spinner', `spinner--${size}`, className)}
      role="status"
      aria-label="Loading"
      data-spinner
      {...rest}
    >
      <span className="spinner__track" />
      <span className="spinner__indicator" data-spinner-indicator />
    </span>
  )
);

Spinner.displayName = 'Spinner';
