/**
 * Checkbox (Atom)
 *
 * Binary input control with indeterminate state and error handling.
 * SVG paths, viewBoxes and data-* attributes match Astro component 1:1.
 * CSS draw animation driven by stroke-dashoffset on checkbox__check path.
 *
 * @see packages/css/src/components/forms/checkbox.css
 * @see packages/components-astro/src/atoms/forms/Checkbox.astro
 */

import { forwardRef, useRef, useEffect, type InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export type CheckboxSize = 's' | 'm';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  name?: string;
  size?: CheckboxSize;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  error?: boolean;
  label?: string;
}

// Hoisted — matches Astro SVG exactly (viewBox, path, data-*)
const CheckIcon = (
  <svg
    className="checkbox__check"
    viewBox="0 0 12 10"
    fill="none"
    data-checkbox-check
    aria-hidden="true"
  >
    <path
      d="M1 5.5L4 8.5L11 1.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MinusIcon = (
  <svg
    className="checkbox__minus"
    viewBox="0 0 12 2"
    fill="none"
    data-checkbox-minus
    aria-hidden="true"
  >
    <path
      d="M1 1H11"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      name,
      size = 'm',
      checked,
      indeterminate = false,
      disabled = false,
      error = false,
      label,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const innerRef = useRef<HTMLInputElement>(null);
    const inputRef = (ref as React.RefObject<HTMLInputElement>) ?? innerRef;

    useEffect(() => {
      const input = inputRef.current;
      if (input) input.indeterminate = indeterminate;
    }, [indeterminate, inputRef]);

    return (
      <label
        className={cn('checkbox', `checkbox--${size}`, error && 'checkbox--error', className)}
        data-checkbox
      >
        <input
          ref={inputRef}
          type="checkbox"
          name={name}
          checked={checked}
          disabled={disabled}
          className="checkbox__input"
          {...rest}
        />
        <span className="checkbox__custom" aria-hidden="true" data-checkbox-custom>
          {CheckIcon}
          {MinusIcon}
        </span>
        {(label ?? children) && (
          <span className="checkbox__label">{label ?? children}</span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
