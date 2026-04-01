/**
 * Button (Atom)
 *
 * Primary interactive component with 6 variants and 5 sizes.
 * Supports loading state, disabled state, and polymorphic rendering (button vs link).
 *
 * Performance optimizations:
 * - Static icons hoisted to module level (rendering-hoist-jsx)
 * - forwardRef for ref forwarding
 * - No inline component definitions (rerender-no-inline-components)
 *
 * @see packages/css/src/components/button.css
 * @see packages/tokens/src/components/button.json
 */

import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react';
import type { ButtonVariant, SizeVariant } from '../types';
import { cn } from '../utils/cn';

// ── Static Icons (hoisted) ────────────────────────────────
// Rule: rendering-hoist-jsx - Extract static JSX outside component
const SpinnerIcon = (
  <span className="button__spinner" data-button-spinner aria-hidden="true" />
);

// ── Variant Mapping ───────────────────────────────────────
const variantMap: Record<ButtonVariant, string> = {
  Primary: 'primary',
  Secondary: 'secondary',
  Tertiary: 'tertiary',
  'Destructive Primary': 'danger-primary',
  'Destructive Secondary': 'danger-secondary',
  'Destructive Tertiary': 'danger-tertiary',
};

// ── Button Props (Polymorphic) ────────────────────────────
type ButtonAsButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: 'button';
  href?: never;
  variant?: ButtonVariant;
  size?: SizeVariant;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

type ButtonAsLink = AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: 'a';
  href: string;
  variant?: ButtonVariant;
  size?: SizeVariant;
  loading?: boolean;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

// ── Button Component ──────────────────────────────────────
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    const {
      as,
      variant = 'Primary',
      size = 'm',
      loading = false,
      disabled = false,
      className,
      children,
      iconLeft,
      iconRight,
      ...rest
    } = props;

    const tokenVariant = variantMap[variant];
    const Tag = (as === 'a' ? 'a' : 'button') as 'button' | 'a';
    const isDisabled = disabled || loading;

    const classes = cn(
      'button',
      `button--${tokenVariant}`,
      `button--${size}`,
      isDisabled && 'button--disabled',
      loading && 'button--loading',
      className
    );

    const commonProps = {
      className: classes,
      'data-button': true,
      'data-hover-rotate': true,
      ...(isDisabled && { 'aria-disabled': true }),
      ...(loading && { 'aria-busy': true }),
    };

    // ── Render as Link ────────────────────────────────────
    if (Tag === 'a') {
      const { href, ...anchorRest } = rest as ButtonAsLink;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          tabIndex={isDisabled ? -1 : 0}
          {...commonProps}
          {...anchorRest}
        >
          {loading ? (
            <span className="button__loading-content">
              <span className="button__loading-text" data-shimmer>
                Loading
              </span>
              {SpinnerIcon}
            </span>
          ) : (
            <span className="button__label-wrap">
              <span className="button__label" data-button-label>
                {iconLeft && <span className="button__icon">{iconLeft}</span>}
                {children}
                {iconRight && <span className="button__icon">{iconRight}</span>}
              </span>
              <span
                className="button__label button__label--clone"
                data-button-label-clone
                aria-hidden="true"
              >
                {iconLeft && <span className="button__icon">{iconLeft}</span>}
                {children}
                {iconRight && <span className="button__icon">{iconRight}</span>}
              </span>
            </span>
          )}
        </a>
      );
    }

    // ── Render as Button ──────────────────────────────────
    const { type = 'button', ...buttonRest } = rest as ButtonAsButton;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={isDisabled}
        {...commonProps}
        {...buttonRest}
      >
        {loading ? (
          <span className="button__loading-content">
            <span className="button__loading-text" data-shimmer>
              Loading
            </span>
            {SpinnerIcon}
          </span>
        ) : (
          <span className="button__label-wrap">
            <span className="button__label" data-button-label>
              {iconLeft && <span className="button__icon">{iconLeft}</span>}
              {children}
              {iconRight && <span className="button__icon">{iconRight}</span>}
            </span>
            <span
              className="button__label button__label--clone"
              data-button-label-clone
              aria-hidden="true"
            >
              {iconLeft && <span className="button__icon">{iconLeft}</span>}
              {children}
              {iconRight && <span className="button__icon">{iconRight}</span>}
            </span>
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
