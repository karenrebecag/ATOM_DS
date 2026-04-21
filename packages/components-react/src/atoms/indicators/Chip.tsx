/**
 * Chip (Atom)
 *
 * Root element is <button> — required for :disabled CSS selectors.
 * CSS driven by data-* attributes (data-variant, data-size, data-selected, data-error).
 * Always renders a default filter icon unless iconStart is provided.
 * HTML structure matches Astro component 1:1.
 *
 * @see packages/css/src/components/indicators/chip.css
 * @see packages/components-astro/src/atoms/indicators/Chip.astro
 */

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type ChipVariant = 'filled' | 'outlined';
export type ChipSize = 'xs' | 's' | 'm' | 'l' | 'xl';

export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  label: string;
  variant?: ChipVariant;
  size?: ChipSize;
  selected?: boolean;
  error?: boolean;
  dismissible?: boolean;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  onDismiss?: React.MouseEventHandler<HTMLButtonElement>;
}

// Hoisted static JSX — no props, never re-created
const FilterIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 4.5C2 4.22386 2.22386 4 2.5 4H13.5C13.7761 4 14 4.22386 14 4.5C14 4.77614 13.7761 5 13.5 5H2.5C2.22386 5 2 4.77614 2 4.5Z" fill="currentColor" />
    <path d="M4 8C4 7.72386 4.22386 7.5 4.5 7.5H11.5C11.7761 7.5 12 7.72386 12 8C12 8.27614 11.7761 8.5 11.5 8.5H4.5C4.22386 8.5 4 8.27614 4 8Z" fill="currentColor" />
    <path d="M6.5 11C6.22386 11 6 11.2239 6 11.5C6 11.7761 6.22386 12 6.5 12H9.5C9.77614 12 10 11.7761 10 11.5C10 11.2239 9.77614 11 9.5 11H6.5Z" fill="currentColor" />
  </svg>
);

const DismissIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" fill="currentColor" />
  </svg>
);

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      label,
      variant = 'filled',
      size = 'm',
      selected = false,
      error = false,
      disabled = false,
      dismissible = false,
      iconStart,
      iconEnd,
      onDismiss,
      className,
      ...rest
    },
    ref
  ) => (
    <button
      ref={ref}
      type="button"
      className={cn('chip', className)}
      data-chip
      data-variant={variant}
      data-size={size}
      data-selected={selected || undefined}
      data-error={error || undefined}
      disabled={disabled}
      {...rest}
    >
      {/* Leading icon — custom or default filter */}
      <span
        className={cn('chip__icon', 'chip__icon--start', !iconStart && 'chip__icon--default')}
        data-chip-icon
        aria-hidden="true"
      >
        {iconStart ?? FilterIcon}
      </span>

      <span className="chip__label" data-chip-label>
        {label}
      </span>

      {/* Trailing: dismiss button or custom icon-end */}
      {dismissible ? (
        <button
          className="chip__dismiss"
          data-chip-dismiss
          type="button"
          disabled={disabled}
          aria-label="Remove"
          onClick={(e) => { e.stopPropagation(); onDismiss?.(e); }}
        >
          {DismissIcon}
        </button>
      ) : iconEnd ? (
        <span className="chip__icon chip__icon--end" data-chip-icon aria-hidden="true">
          {iconEnd}
        </span>
      ) : null}
    </button>
  )
);

Chip.displayName = 'Chip';
