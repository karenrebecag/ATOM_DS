/**
 * NavLink (Atom)
 *
 * CSS-only underline link with animation support.
 * Supports two underline styles (default and alt) and multiple variants.
 *
 * Performance optimizations:
 * - forwardRef for ref forwarding
 * - No inline component definitions (rerender-no-inline-components)
 *
 * @see packages/css/src/components/nav-link.css
 * @see packages/tokens/src/components/nav-link.json
 */

import { forwardRef, type AnchorHTMLAttributes } from 'react';
import type { SizeVariant } from '../../types';
import { cn } from '../../utils/cn';

// ── NavLink Types ─────────────────────────────────────────
type NavLinkUnderline = 'default' | 'alt';
type NavLinkVariant = 'primary' | 'secondary' | 'tertiary' | 'inverse';

// ── NavLink Props ─────────────────────────────────────────
export interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  underline?: NavLinkUnderline;
  variant?: NavLinkVariant;
  size?: SizeVariant;
  disabled?: boolean;
}

// ── NavLink Component ─────────────────────────────────────
export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  (props, ref) => {
    const {
      href,
      underline = 'default',
      variant = 'primary',
      size = 's',
      disabled = false,
      className,
      children,
      ...rest
    } = props;

    const classes = cn(
      'nav-link',
      `nav-link--${variant}`,
      `nav-link--${size}`,
      disabled && 'nav-link--disabled',
      className
    );

    return (
      <a
        ref={ref}
        href={disabled ? undefined : href}
        className={classes}
        data-underline-link={underline === 'alt' ? 'alt' : true}
        tabIndex={disabled ? -1 : undefined}
        aria-disabled={disabled ? true : undefined}
        {...rest}
      >
        {children}
      </a>
    );
  }
);

NavLink.displayName = 'NavLink';
