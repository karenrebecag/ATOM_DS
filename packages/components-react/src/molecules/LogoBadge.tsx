/**
 * LogoBadge (Molecule)
 *
 * Dual-image theme switcher. Shows light image by default, dark image when
 * parent has data-nav-theme="inverted". Opacity transition via CSS.
 * HTML matches Astro component 1:1.
 *
 * @see packages/css/src/components/logo-badge.css
 * @see packages/components-astro/src/molecules/branding/LogoBadge.astro
 */

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

export interface LogoBadgeProps extends HTMLAttributes<HTMLDivElement> {
  lightImage: string;
  darkImage: string;
  alt: string;
  height?: string;
  width?: string;
}

export const LogoBadge = forwardRef<HTMLDivElement, LogoBadgeProps>(
  (
    {
      lightImage,
      darkImage,
      alt,
      height = '32px',
      width = 'auto',
      className,
      style,
      ...rest
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn('logo-badge', className)}
      style={style}
      {...rest}
    >
      <img
        src={lightImage}
        alt={alt}
        className="logo-badge__image logo-badge__image--light"
        style={{ height, width }}
        loading="eager"
        decoding="async"
      />
      <img
        src={darkImage}
        alt={alt}
        className="logo-badge__image logo-badge__image--dark"
        style={{ height, width }}
        loading="eager"
        decoding="async"
      />
    </div>
  )
);

LogoBadge.displayName = 'LogoBadge';
