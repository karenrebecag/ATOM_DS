/**
 * EmptyState (Atom)
 *
 * Placeholder for empty content areas. Layout differs between size="s" and size="m".
 * Renders default circle-slash icon if none provided.
 * HTML matches Astro component 1:1.
 *
 * @see packages/css/src/components/empty-state.css
 * @see packages/components-astro/src/atoms/indicators/EmptyState.astro
 */

import { forwardRef, type HTMLAttributes, type ReactNode, type MouseEventHandler } from 'react';
import { cn } from '../../utils/cn';
import { Button } from '../Button';

// Hoisted — default icon matching Astro's SVG exactly
const DefaultIcon = (
  <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"
      fill="currentColor"
    />
  </svg>
);

export type EmptyStateSize = 's' | 'm';

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  heading: string;
  supportingText: string;
  resultText?: string;
  size?: EmptyStateSize;
  showButton?: boolean;
  buttonText?: string;
  buttonHref?: string;
  onButtonClick?: MouseEventHandler<HTMLButtonElement>;
  icon?: ReactNode;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      heading,
      supportingText,
      resultText,
      size = 's',
      showButton = false,
      buttonText = 'Button',
      buttonHref,
      onButtonClick,
      icon,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn('empty-state', `empty-state--${size}`, className)} {...rest}>
        {/* Icon — always rendered, falls back to default */}
        <div className="empty-state__icon">
          {icon ?? DefaultIcon}
        </div>

        {size === 's' ? (
          // ── Small layout ──────────────────────────────────
          <>
            <h3 className="empty-state__heading">{heading}</h3>
            <div className="empty-state__supporting-group">
              <p className="empty-state__supporting">{supportingText}</p>
              {resultText && (
                <p className="empty-state__result">{resultText}</p>
              )}
            </div>
          </>
        ) : (
          // ── Medium layout ─────────────────────────────────
          <>
            <div className="empty-state__text-group">
              <h3 className="empty-state__heading">{heading}</h3>
              <p className="empty-state__supporting">{supportingText}</p>
            </div>

            {children
              ? children
              : (showButton && (
                buttonHref ? (
                  <Button as="a" href={buttonHref} variant="Secondary" size="m">
                    {buttonText}
                  </Button>
                ) : (
                  <Button variant="Secondary" size="m" onClick={onButtonClick}>
                    {buttonText}
                  </Button>
                )
              ))
            }
          </>
        )}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';
