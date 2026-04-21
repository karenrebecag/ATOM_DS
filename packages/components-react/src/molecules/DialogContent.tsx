/**
 * DialogContent (Molecule — Dialog subcomponent)
 *
 * Flexible dialog content area. Accepts any children.
 * HTML structure matches Astro component 1:1.
 *
 * @see packages/css/src/components/feedback/dialog.css
 * @see packages/components-astro/src/molecules/DialogContent.astro
 */

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

export interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={cn('dialog-content', className)} {...rest}>
      {children}
    </div>
  )
);

DialogContent.displayName = 'DialogContent';
