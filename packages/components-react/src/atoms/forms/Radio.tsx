/**
 * Radio (Atom)
 *
 * Two render modes:
 *   1. Standalone — no children/supportiveText/error: <label class="radio">
 *   2. Full field  — with label or supporting content: <div class="radio-field">
 *
 * HTML matches Astro component 1:1.
 *
 * @see packages/css/src/components/radio.css
 * @see packages/tokens/src/components/radio.json
 * @see packages/components-astro/src/atoms/forms/Radio.astro
 */

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type RadioSize = 's' | 'm';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  name: string;
  value?: string;
  size?: RadioSize;
  checked?: boolean;
  disabled?: boolean;
  error?: boolean;
  errorText?: string;
  supportiveText?: string;
  children?: ReactNode;
}

const ErrorIcon = (
  <svg className="radio-field__error-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm-.75 4a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0V5Zm.75 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
  </svg>
);

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      name,
      value,
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
    const id = `radio-${name}-${value || 'default'}`;
    const hasError = error && !!errorText;
    const hasWrapper = !!(children || supportiveText || hasError);

    // ── Standalone (no label content) ──────────────────────
    if (!hasWrapper) {
      return (
        <label
          className={cn('radio', `radio--${size}`, disabled && 'radio--disabled', className)}
          htmlFor={id}
          data-radio
        >
          <input
            ref={ref}
            className="radio__input"
            type="radio"
            id={id}
            name={name}
            value={value}
            checked={checked}
            disabled={disabled}
            {...rest}
          />
          <span className="radio__circle" aria-hidden="true" data-radio-circle>
            <span className="radio__dot" data-radio-dot />
          </span>
        </label>
      );
    }

    // ── Full field (with label, supportive text, or error) ─
    return (
      <div
        className={cn(
          'radio-field',
          `radio-field--${size}`,
          disabled && 'radio-field--disabled',
          hasError && 'radio-field--error',
          className
        )}
      >
        <div className="radio-field__row">
          <div className="radio-field__selector">
            <label className={cn('radio', `radio--${size}`)} htmlFor={id} data-radio>
              <input
                ref={ref}
                className="radio__input"
                type="radio"
                id={id}
                name={name}
                value={value}
                checked={checked}
                disabled={disabled}
                {...rest}
              />
              <span className="radio__circle" aria-hidden="true" data-radio-circle>
                <span className="radio__dot" data-radio-dot />
              </span>
            </label>
          </div>
          <div className="radio-field__text">
            {children && (
              <label className="radio-field__title" htmlFor={id}>
                {children}
              </label>
            )}
            {supportiveText && (
              <span className="radio-field__supportive">{supportiveText}</span>
            )}
          </div>
        </div>
        {hasError && (
          <div className="radio-field__error">
            {ErrorIcon}
            <span className="radio-field__error-text">{errorText}</span>
          </div>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';
