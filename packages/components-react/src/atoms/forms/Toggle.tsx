/**
 * Toggle (Atom)
 *
 * Two render modes:
 *   1. Standalone — no children/supportiveText/error: <label class="toggle">
 *   2. Full field  — with label or supporting content: <div class="toggle-field" data-toggle>
 *
 * HTML matches Astro component 1:1.
 *
 * @see packages/css/src/components/toggle.css
 * @see packages/tokens/src/components/toggle.json
 * @see packages/components-astro/src/atoms/forms/Toggle.astro
 */

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type ToggleSize = 's' | 'm';

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  name: string;
  size?: ToggleSize;
  checked?: boolean;
  disabled?: boolean;
  error?: boolean;
  errorText?: string;
  supportiveText?: string;
  children?: ReactNode;
}

const ErrorIcon = (
  <svg className="toggle-field__error-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm-.75 4a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0V5Zm.75 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
  </svg>
);

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      name,
      size = 's',
      checked,
      disabled = false,
      error = false,
      errorText,
      supportiveText,
      children,
      className,
      ...rest
    },
    ref
  ) => {
    const id = `toggle-${name}`;
    const hasError = error && !!errorText;
    const hasWrapper = !!(children || supportiveText || hasError);

    const inputEl = (
      <input
        ref={ref}
        className="toggle__input"
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        disabled={disabled}
        role="switch"
        aria-checked={checked ? 'true' : 'false'}
        {...rest}
      />
    );

    const trackEl = (
      <span className="toggle__track" aria-hidden="true" data-toggle-track>
        <span className="toggle__knob" data-toggle-knob />
      </span>
    );

    // ── Standalone (no label content) ──────────────────────
    if (!hasWrapper) {
      return (
        <label
          className={cn('toggle', `toggle--${size}`, disabled && 'toggle--disabled', className)}
          htmlFor={id}
          data-toggle
        >
          {inputEl}
          {trackEl}
        </label>
      );
    }

    // ── Full field (with label, supportive text, or error) ─
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
              {inputEl}
              {trackEl}
            </label>
          </div>
          <div className="toggle-field__text">
            {children && (
              <label className="toggle-field__title" htmlFor={id}>
                {children}
              </label>
            )}
            {supportiveText && (
              <span className="toggle-field__supportive">{supportiveText}</span>
            )}
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
