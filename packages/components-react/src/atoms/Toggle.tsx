/**
 * Toggle (Atom)
 *
 * Switch control for binary on/off states with support for labels and error states.
 * Follows ARIA switch pattern with semantic HTML.
 *
 * Performance: Simple component with conditional rendering
 *
 * @see packages/css/src/components/toggle.css
 * @see packages/tokens/src/components/toggle.json
 */

import { forwardRef, type InputHTMLAttributes } from 'react';
import type { ToggleSize } from '../types';
import { cn } from '../utils/cn';

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  name: string;
  size?: ToggleSize;
  checked?: boolean;
  label?: string;
  supportiveText?: string;
  error?: boolean;
  errorText?: string;
}

// ── Static Error Icon (hoisted) ───────────────────────────
const ErrorIcon = (
  <svg className="toggle-field__error-icon" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm-.75 4a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0V5Zm.75 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
  </svg>
);

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      name,
      size = 's',
      checked = false,
      disabled = false,
      label,
      supportiveText,
      error = false,
      errorText,
      className,
      ...rest
    },
    ref
  ) => {
    const id = `toggle-${name}`;
    const hasError = error && errorText;
    const hasFieldWrapper = label || supportiveText || hasError;

    // ── Toggle Control (shared between bare and field modes) ──
    const toggleControl = (
      <>
        <input
          ref={ref}
          className="toggle__input"
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          disabled={disabled}
          role="switch"
          aria-checked={checked}
          {...rest}
        />
        <span className="toggle__track" aria-hidden="true" data-toggle-track>
          <span className="toggle__knob" data-toggle-knob />
        </span>
      </>
    );

    // ── Bare Mode (no wrapper) ────────────────────────────────
    if (!hasFieldWrapper) {
      return (
        <label
          className={cn('toggle', `toggle--${size}`, disabled && 'toggle--disabled', className)}
          htmlFor={id}
          data-toggle
        >
          {toggleControl}
        </label>
      );
    }

    // ── Field Mode (with wrapper) ─────────────────────────────
    return (
      <div
        className={cn(
          'toggle-field',
          `toggle-field--${size}`,
          disabled && 'toggle-field--disabled',
          hasError && 'toggle-field--error',
          className
        )}
        data-toggle
      >
        <div className="toggle-field__row">
          <div className="toggle-field__selector">
            <label className={cn('toggle', `toggle--${size}`)} htmlFor={id}>
              {toggleControl}
            </label>
          </div>

          <div className="toggle-field__text">
            {label && (
              <label className="toggle-field__title" htmlFor={id}>
                {label}
              </label>
            )}
            {supportiveText && <span className="toggle-field__supportive">{supportiveText}</span>}
          </div>
        </div>

        {hasError && (
          <div className="toggle-field__error">
            {ErrorIcon}
            <span className="toggle-field__error-text">{errorText}</span>
          </div>
        )}
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';
