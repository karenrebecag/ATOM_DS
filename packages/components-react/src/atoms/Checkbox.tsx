/**
 * Checkbox (Atom)
 *
 * Binary input control with custom styled checkbox.
 * Can also be used for radio buttons via type prop.
 *
 * Performance: Simple component, static SVG hoisted
 *
 * @see packages/css/src/components/checkbox.css
 * @see packages/tokens/src/components/checkbox.json
 */

import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../utils/cn';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  name: string;
  value?: string;
  checked?: boolean;
  type?: 'checkbox' | 'radio';
  theme?: 'light' | 'dark';
  label?: string;
}

// ── Static Checkmark Icon (hoisted) ───────────────────────
const CheckmarkIcon = (
  <svg className="checkbox__check" viewBox="0 0 12 10" fill="none" data-checkbox-check>
    <path
      d="M1 5.5L4 8.5L11 1.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ name, value, checked = false, type = 'checkbox', theme = 'light', label, children, className, ...rest }, ref) => {
    const id = `${name}-${value || 'default'}`;

    return (
      <label className={cn('checkbox', `checkbox--${theme}`, className)} htmlFor={id} data-checkbox>
        <input
          ref={ref}
          className="checkbox__input"
          type={type}
          id={id}
          name={name}
          value={value}
          checked={checked}
          {...rest}
        />
        <span className="checkbox__custom" aria-hidden="true" data-checkbox-custom>
          {CheckmarkIcon}
        </span>
        <span className="checkbox__label">{children || label}</span>
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
