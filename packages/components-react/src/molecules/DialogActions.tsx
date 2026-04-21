/**
 * DialogActions (Molecule — Dialog subcomponent)
 *
 * Footer with action buttons. Children always passed explicitly in React.
 * HTML structure matches Astro component 1:1.
 *
 * @see packages/css/src/components/feedback/dialog.css
 * @see packages/components-astro/src/molecules/DialogActions.astro
 */

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

export interface DialogActionsProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'hug' | 'fill';
  counterText?: string;
}

export const DialogActions = forwardRef<HTMLDivElement, DialogActionsProps>(
  ({ variant = 'hug', counterText, className, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn('dialog-actions', `dialog-actions--${variant}`, className)}
      {...rest}
    >
      {counterText && (
        <span className="dialog-actions__counter">{counterText}</span>
      )}
      {children}
    </div>
  )
);

DialogActions.displayName = 'DialogActions';
