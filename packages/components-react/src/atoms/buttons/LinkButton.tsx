/**
 * LinkButton (Atom)
 *
 * Text link styled as a button with optional icon support.
 * Single visual style (no variant), two sizes.
 *
 * Performance optimizations:
 * - Static icons hoisted to module level (rendering-hoist-jsx)
 * - forwardRef for ref forwarding
 * - No inline component definitions (rerender-no-inline-components)
 *
 * @see packages/css/src/components/link-button.css
 * @see packages/tokens/src/components/link-button.json
 */

import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

// ── Static Icons (hoisted) ────────────────────────────────
const SpinnerIcon = (
  <span className="link-button__spinner" data-link-button-spinner aria-hidden="true" />
);

// ── LinkButton Size ───────────────────────────────────────
type LinkButtonSize = 's' | 'l';

// ── LinkButton Props ──────────────────────────────────────
export interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  size?: LinkButtonSize;
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

// ── LinkButton Component ──────────────────────────────────
export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (props, ref) => {
    const {
      size = 'l',
      disabled = false,
      loading = false,
      href,
      iconLeft,
      iconRight,
      className,
      children,
      ...rest
    } = props;

    const isDisabled = disabled || loading;

    const classes = cn(
      'link-button',
      `link-button--${size}`,
      isDisabled && 'link-button--disabled',
      loading && 'link-button--loading',
      className
    );

    return (
      <a
        ref={ref}
        href={href}
        className={classes}
        data-link-button
        tabIndex={isDisabled ? -1 : 0}
        {...(isDisabled && { 'aria-disabled': true })}
        {...(loading && { 'aria-busy': true })}
        {...rest}
      >
        {loading ? (
          <span className="link-button__loading-content">
            <span className="link-button__loading-text" data-shimmer>
              Loading
            </span>
            {SpinnerIcon}
          </span>
        ) : (
          <span className="link-button__label">
            {iconLeft && <span className="link-button__icon">{iconLeft}</span>}
            {children}
            {iconRight && <span className="link-button__icon">{iconRight}</span>}
          </span>
        )}
      </a>
    );
  }
);

LinkButton.displayName = 'LinkButton';
