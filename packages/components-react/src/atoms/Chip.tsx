/**
 * Chip (Atom)
 *
 * Filterable tag component with optional dismiss functionality.
 * Supports selection states, sizes, and custom icons.
 *
 * Performance optimizations:
 * - Static SVG icons hoisted (rendering-hoist-jsx)
 * - Event handlers properly typed for React
 *
 * @see packages/css/src/components/chip.css
 * @see packages/tokens/src/components/chip.json
 */

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import type { SizeVariant } from '../types';
import { cn } from '../utils/cn';

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: SizeVariant;
  selected?: boolean;
  dismissible?: boolean;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  onDismiss?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// ── Static Icons (hoisted) ────────────────────────────────
const FilterIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2 4.5C2 4.22386 2.22386 4 2.5 4H13.5C13.7761 4 14 4.22386 14 4.5C14 4.77614 13.7761 5 13.5 5H2.5C2.22386 5 2 4.77614 2 4.5Z"
      fill="currentColor"
    />
    <path
      d="M4 8C4 7.72386 4.22386 7.5 4.5 7.5H11.5C11.7761 7.5 12 7.72386 12 8C12 8.27614 11.7761 8.5 11.5 8.5H4.5C4.22386 8.5 4 8.27614 4 8Z"
      fill="currentColor"
    />
    <path
      d="M6.5 11C6.22386 11 6 11.2239 6 11.5C6 11.7761 6.22386 12 6.5 12H9.5C9.77614 12 10 11.7761 10 11.5C10 11.2239 9.77614 11 9.5 11H6.5Z"
      fill="currentColor"
    />
  </svg>
);

const CloseIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
      fill="currentColor"
    />
  </svg>
);

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      size = 'm',
      selected = false,
      disabled = false,
      dismissible = false,
      iconStart,
      iconEnd,
      onDismiss,
      children,
      className,
      ...rest
    },
    ref
  ) => {
    const classes = cn('chip', className);

    const hasTrailingIcon = iconEnd && !dismissible;

    return (
      <button
        ref={ref}
        type="button"
        className={classes}
        data-chip
        data-size={size}
        data-selected={selected}
        disabled={disabled}
        {...rest}
      >
        {/* Leading Icon */}
        <span className={cn('chip__icon', 'chip__icon--start', !iconStart && 'chip__icon--default')} data-chip-icon aria-hidden={!iconStart}>
          {iconStart || FilterIcon}
        </span>

        {/* Label */}
        {children && (
          <span className="chip__label" data-chip-label>
            {children}
          </span>
        )}

        {/* Trailing Icon or Dismiss Button */}
        {dismissible ? (
          <button
            className="chip__dismiss"
            data-chip-dismiss
            type="button"
            onClick={onDismiss}
            aria-label="Remove"
            disabled={disabled}
          >
            {CloseIcon}
          </button>
        ) : hasTrailingIcon ? (
          <span className="chip__icon chip__icon--end" data-chip-icon>
            {iconEnd}
          </span>
        ) : null}
      </button>
    );
  }
);

Chip.displayName = 'Chip';
