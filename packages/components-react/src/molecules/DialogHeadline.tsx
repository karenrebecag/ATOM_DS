/**
 * DialogHeadline (Molecule — Dialog subcomponent)
 *
 * Header with headline, optional supporting text, back/close buttons.
 * HTML structure matches Astro component 1:1.
 *
 * @see packages/css/src/components/feedback/dialog.css
 * @see packages/components-astro/src/molecules/DialogHeadline.astro
 */

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../utils/cn';

// Hoisted static icons
const BackIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M10 13L5 8L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloseIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export interface DialogHeadlineProps extends HTMLAttributes<HTMLDivElement> {
  headline: string;
  supportingText?: string;
  alignment?: 'left' | 'center';
  hasBack?: boolean;
  isClosable?: boolean;
  icon?: ReactNode;
  onBack?: () => void;
  onClose?: () => void;
}

export const DialogHeadline = forwardRef<HTMLDivElement, DialogHeadlineProps>(
  (
    {
      headline,
      supportingText,
      alignment = 'left',
      hasBack = false,
      isClosable = true,
      icon,
      onBack,
      onClose,
      className,
      ...rest
    },
    ref
  ) => {
    const isCenter = alignment === 'center';

    return (
      <div
        ref={ref}
        className={cn('dialog-headline', `dialog-headline--${alignment}`, className)}
        {...rest}
      >
        {/* Center: icon slot */}
        {isCenter && icon && (
          <div className="dialog-headline__icon">{icon}</div>
        )}

        {/* Back button */}
        {hasBack && (
          <button type="button" className="dialog-headline__back" aria-label="Go back" onClick={onBack}>
            {BackIcon}
          </button>
        )}

        {/* Headline */}
        <h2 className="dialog-headline__title">{headline}</h2>

        {/* Center: supporting text */}
        {isCenter && supportingText && (
          <p className="dialog-headline__supporting">{supportingText}</p>
        )}

        {/* Close button */}
        {isClosable && (
          <button type="button" className="dialog-headline__close" aria-label="Close dialog" onClick={onClose}>
            {CloseIcon}
          </button>
        )}
      </div>
    );
  }
);

DialogHeadline.displayName = 'DialogHeadline';
