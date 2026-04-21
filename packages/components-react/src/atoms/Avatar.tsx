/**
 * Avatar (Atom)
 *
 * Displays user profile images, initials, or icons with optional status badges.
 * Supports multiple types, sizes, shapes, and badge indicators.
 *
 * Performance optimizations:
 * - Static SVG hoisted to module level (rendering-hoist-jsx)
 * - Composition with StatusIcon for reusability
 *
 * @see packages/css/src/components/avatar.css
 * @see packages/tokens/src/components/avatar.json
 */

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import type { AvatarSize, AvatarShape, AvatarType, StatusType } from '../types';
import { cn } from '../utils/cn';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  type?: AvatarType;
  initials?: string;
  badge?: StatusType;
  icon?: ReactNode;
}

// ── Static Icons (hoisted) ────────────────────────────────
// Rule: rendering-hoist-jsx
const DefaultUserIcon = (
  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 14s-1 0-1-1 1-4 7-4 7 3 7 4-1 1-1 1H2Z" />
  </svg>
);

const VerifiedBadgeIcon = (
  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
  </svg>
);

// ── Avatar Size → Status badge size mapping (matches Astro) ──
const statusIconSizeMap: Record<AvatarSize, string> = {
  xs: 's',
  s: 's',
  m: 'm',
  l: 'l',
};

const statusLabels: Record<string, string> = {
  online: 'Online',
  offline: 'Offline',
  idle: 'Away',
  inactive: 'Inactive',
};

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      src,
      alt = '',
      size = 'xs',
      shape = 'circle',
      type: typeProp,
      initials,
      badge = 'none',
      icon,
      className,
      ...rest
    },
    ref
  ) => {
    // Auto-detect type if not provided
    const type = typeProp ?? (src ? 'image-border' : 'initials');

    const isStatusBadge = badge === 'online' || badge === 'offline' || badge === 'idle' || badge === 'inactive';
    const statusIconSize = statusIconSizeMap[size];

    const ariaLabel = alt || initials || 'Avatar';

    const classes = cn(
      'avatar',
      `avatar--${size}`,
      `avatar--${shape}`,
      `avatar--${type}`,
      className
    );

    return (
      <span
        ref={ref}
        className={classes}
        data-avatar
        data-size={size}
        data-shape={shape}
        data-type={type}
        role="img"
        aria-label={ariaLabel}
        {...rest}
      >
        {/* Image */}
        {(type === 'image' || type === 'image-border') && src && (
          <span className="avatar__frame">
            <img className="avatar__img" data-avatar-img src={src} alt={alt} loading="lazy" />
          </span>
        )}

        {/* Initials */}
        {type === 'initials' && (
          <span className="avatar__initials" data-avatar-initials>
            {initials || '?'}
          </span>
        )}

        {/* Icon */}
        {type === 'icon' && (
          <span className="avatar__icon" data-avatar-icon>
            {icon || DefaultUserIcon}
          </span>
        )}

        {/* Verified Badge */}
        {badge === 'verified' && (
          <span
            className="avatar__badge avatar__badge--verified"
            data-avatar-badge
            data-badge-type="verified"
            aria-label="Verified"
          >
            {VerifiedBadgeIcon}
          </span>
        )}

        {/* Status Badge — inline span matching Astro HTML exactly */}
        {isStatusBadge && (
          <span
            className={cn(
              'status-icon',
              'status-icon--bordered',
              `status-icon--${badge}`,
              `status-icon--${statusIconSize}`,
              'avatar__badge'
            )}
            data-avatar-badge
            data-badge-type={badge}
            data-status={badge}
            data-size={statusIconSize}
            role="status"
            aria-label={statusLabels[badge as string]}
          />
        )}
      </span>
    );
  }
);

Avatar.displayName = 'Avatar';
