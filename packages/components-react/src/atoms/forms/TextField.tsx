/**
 * TextField (Atom)
 *
 * Single-line text input with label, supportive text, and character counter.
 * HTML output mirrors the Astro component exactly.
 *
 * @see packages/css/src/components/forms/text-field.css
 * @see packages/tokens/src/components/forms/text-field.json
 */

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import type { SizeVariant } from '../../types';
import { cn } from '../../utils/cn';

// ── Static Icons (hoisted) ────────────────────────────────
const InfoIcon = (
  <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z"
      stroke="currentColor" strokeWidth="1.5"
    />
    <path
      d="M6 6V8.5M6 3.5H6.005V3.505H6V3.5Z"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

const ErrorIcon = (
  <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z"
      fill="currentColor"
    />
    <path d="M7.5 4.5L4.5 7.5M4.5 4.5L7.5 7.5" />
  </svg>
);

// ── TextField Props ───────────────────────────────────────
export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  name: string;
  label?: string;
  size?: SizeVariant;
  error?: boolean;
  showSupportive?: boolean;
  supportiveText?: string;
  maxLength?: number;
  showCounter?: boolean;
  id?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
}

// ── TextField Component ───────────────────────────────────
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    const {
      name,
      type = 'text',
      label,
      placeholder,
      value,
      size = 'm',
      disabled = false,
      error = false,
      showSupportive = true,
      supportiveText = error ? 'Supportive text negative' : 'Supportive text',
      maxLength = 200,
      showCounter = false,
      id,
      className,
      onChange,
      leading,
      trailing,
      ...rest
    } = props;

    const inputId = id || `text-field-${name}`;
    const isFilled = value !== undefined && value !== '';
    const charCount = typeof value === 'string' ? value.length : 0;

    return (
      <div
        className={cn(
          'text-field',
          `text-field--${size}`,
          isFilled && 'text-field--filled',
          error && 'text-field--error',
          disabled && 'text-field--disabled',
          className
        )}
        data-text-field
        data-max-length={maxLength}
      >
        {/* Label */}
        {label && (
          <label className="text-field__label" htmlFor={inputId}>
            {label}
          </label>
        )}

        {/* Field container */}
        <div className="text-field__field">
          {leading && <div className="text-field__leading">{leading}</div>}

          <input
            ref={ref}
            className="text-field__input"
            type={type}
            id={inputId}
            name={name}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            maxLength={maxLength}
            onChange={onChange}
            {...rest}
          />

          {trailing && <div className="text-field__trailing">{trailing}</div>}
        </div>

        {/* Bottom: supportive text + counter */}
        {(showSupportive || showCounter) && (
          <div className="text-field__bottom">
            {showSupportive && (
              <div className="text-field__supportive">
                <div className="text-field__supportive-icon" aria-hidden="true">
                  {error ? ErrorIcon : InfoIcon}
                </div>
                <span className="text-field__supportive-text">{supportiveText}</span>
              </div>
            )}
            {showCounter && (
              <div className="text-field__counter" data-counter data-char-count={charCount}>
                <span data-current>{charCount}</span>/<span data-max>{maxLength}</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';
