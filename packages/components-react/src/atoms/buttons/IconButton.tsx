/**
 * IconButton (Atom)
 *
 * Icon-only button with hover rotation animation and loading state.
 * HTML structure matches Astro component 1:1 — icon-wrap + clone icon required
 * for initHoverRotate() animation contract.
 *
 * @see packages/css/src/components/icon-button.css
 * @see packages/animations/src/hover.ts — initHoverRotate()
 * @see packages/components-astro/src/atoms/buttons/IconButton.astro
 */

import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from 'react';
import type { ButtonVariant, SizeVariant } from '../../types';
import { cn } from '../../utils/cn';

const variantMap: Record<ButtonVariant, string> = {
  Primary: 'primary',
  Secondary: 'secondary',
  Tertiary: 'tertiary',
  'Destructive Primary': 'danger-primary',
  'Destructive Secondary': 'danger-secondary',
  'Destructive Tertiary': 'danger-tertiary',
};

type IconButtonAsButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: 'button';
  href?: never;
  variant?: ButtonVariant;
  size?: SizeVariant;
  loading?: boolean;
  icon: ReactNode;
  ariaLabel: string;
  external?: never;
};

type IconButtonAsLink = AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: 'a';
  href: string;
  variant?: ButtonVariant;
  size?: SizeVariant;
  loading?: boolean;
  disabled?: boolean;
  icon: ReactNode;
  ariaLabel: string;
  external?: boolean;
};

export type IconButtonProps = IconButtonAsButton | IconButtonAsLink;

export const IconButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, IconButtonProps>(
  (props, ref) => {
    const {
      as,
      variant = 'Primary',
      size = 'm',
      loading = false,
      disabled = false,
      icon,
      ariaLabel,
      className,
      ...rest
    } = props;

    const external = (props as IconButtonAsLink).external ?? false;
    const tokenVariant = variantMap[variant];
    const Tag = (as === 'a' ? 'a' : 'button') as 'button' | 'a';
    const isDisabled = disabled || loading;

    const classes = cn(
      'icon-button',
      `icon-button--${tokenVariant}`,
      `icon-button--${size}`,
      isDisabled && 'icon-button--disabled',
      loading && 'icon-button--loading',
      className
    );

    const commonProps = {
      className: classes,
      'data-icon-button': true,
      'data-hover-rotate': true,
      'aria-label': ariaLabel,
      ...(isDisabled && { 'aria-disabled': true }),
      ...(loading && { 'aria-busy': true }),
    };

    // Inner content — always render icon-wrap + clone (hover animation contract)
    const content = (
      <>
        <span className="icon-button__icon-wrap">
          <span className="icon-button__icon" data-icon-button-icon>
            {icon}
          </span>
          <span
            className="icon-button__icon icon-button__icon--clone"
            data-icon-button-icon-clone
            aria-hidden="true"
          >
            {icon}
          </span>
        </span>
        {loading && (
          <span className="icon-button__loader" aria-hidden="true">
            <span className="icon-button__spinner" data-button-spinner />
          </span>
        )}
      </>
    );

    if (Tag === 'a') {
      const { href, ...anchorRest } = rest as IconButtonAsLink;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          tabIndex={isDisabled ? -1 : undefined}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          {...commonProps}
          {...anchorRest}
        >
          {content}
        </a>
      );
    }

    const { type = 'button', ...buttonRest } = rest as IconButtonAsButton;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={isDisabled}
        {...commonProps}
        {...buttonRest}
      >
        {content}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
