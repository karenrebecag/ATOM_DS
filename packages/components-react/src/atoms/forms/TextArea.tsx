/**
 * TextArea (Atom)
 *
 * Multi-line text input with label, supportive text, and character counter.
 * HTML output mirrors the Astro component exactly.
 *
 * @see packages/css/src/components/forms/textarea.css
 * @see packages/tokens/src/components/forms/textarea.json
 */

import { forwardRef, type TextareaHTMLAttributes } from 'react';
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

// ── TextArea Props ────────────────────────────────────────
export interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  name: string;
  label?: string;
  size?: 'm' | 'xl';
  error?: boolean;
  showSupportive?: boolean;
  supportiveText?: string;
  maxLength?: number;
  showCounter?: boolean;
  showScrollbar?: boolean;
  id?: string;
}

// ── TextArea Component ────────────────────────────────────
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const {
      name,
      label,
      placeholder,
      value,
      size = 'm',
      disabled = false,
      error = false,
      showSupportive = true,
      supportiveText = error ? 'Supportive text negative' : 'Supportive text',
      maxLength = 200,
      showCounter = true,
      showScrollbar = true,
      id,
      className,
      onChange,
      rows,
      ...rest
    } = props;

    const inputId = id || `textarea-${name}`;
    const isFilled = value !== undefined && value !== '';
    const charCount = typeof value === 'string' ? value.length : 0;

    return (
      <div
        className={cn(
          'textarea',
          `textarea--${size}`,
          isFilled && 'textarea--filled',
          error && 'textarea--error',
          disabled && 'textarea--disabled',
          className
        )}
        data-textarea
        data-max-length={maxLength}
      >
        {/* Label */}
        {label && (
          <label className="textarea__label" htmlFor={inputId}>
            {label}
          </label>
        )}

        {/* Field container */}
        <div className="textarea__field">
          <textarea
            ref={ref}
            className="textarea__input"
            id={inputId}
            name={name}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            maxLength={maxLength}
            rows={rows}
            onChange={onChange}
            {...rest}
          />

          {/* Custom scrollbar */}
          {showScrollbar && (
            <div className="textarea__scrollbar" aria-hidden="true">
              <div className="textarea__scrollbar-thumb" />
            </div>
          )}
        </div>

        {/* Bottom: supportive text + counter */}
        {(showSupportive || showCounter) && (
          <div className="textarea__bottom">
            {showSupportive && (
              <div className="textarea__supportive">
                <div className="textarea__supportive-icon" aria-hidden="true">
                  {error ? ErrorIcon : InfoIcon}
                </div>
                <span className="textarea__supportive-text">{supportiveText}</span>
              </div>
            )}
            {showCounter && (
              <div className="textarea__counter" data-counter data-char-count={charCount}>
                <span data-current>{charCount}</span>/<span data-max>{maxLength}</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
