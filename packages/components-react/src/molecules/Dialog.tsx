/**
 * Dialog (Molecule)
 *
 * Composable modal dialog surface. Visibility controlled via `visible` prop.
 * Optional backdrop rendered when showBackdrop is true.
 * HTML structure matches Astro component 1:1.
 *
 * @see packages/css/src/components/feedback/dialog.css
 * @see packages/components-astro/src/molecules/Dialog.astro
 */

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

export interface DialogProps extends HTMLAttributes<HTMLDivElement> {
  size?: 's' | 'm' | 'l';
  centered?: boolean;
  visible?: boolean;
  showBackdrop?: boolean;
  onBackdropClick?: () => void;
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      size = 's',
      centered = false,
      visible = false,
      showBackdrop = false,
      onBackdropClick,
      id,
      className,
      children,
      ...rest
    },
    ref
  ) => (
    <>
      {showBackdrop && (
        <div
          className={cn(
            'dialog-backdrop',
            visible ? 'dialog-backdrop--visible' : 'dialog-backdrop--hidden'
          )}
          data-dialog-backdrop={id}
          onClick={onBackdropClick}
        />
      )}
      <div
        ref={ref}
        className={cn(
          'dialog',
          `dialog--${size}`,
          centered && 'dialog--centered',
          visible && 'dialog--visible',
          className
        )}
        role="dialog"
        aria-modal="true"
        id={id}
        data-dialog={id ?? ''}
        {...rest}
      >
        {children}
      </div>
    </>
  )
);

Dialog.displayName = 'Dialog';
