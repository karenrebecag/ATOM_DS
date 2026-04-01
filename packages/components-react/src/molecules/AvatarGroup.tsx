/**
 * AvatarGroup (Molecule)
 *
 * Displays a horizontal group of overlapping avatars with an optional "+N" counter.
 * Composes Avatar atoms with shared props.
 *
 * Performance optimizations:
 * - Memoized counter computation (only when avatars/max changes)
 * - Key prop for React reconciliation
 *
 * @see packages/css/src/components/avatar-group.css
 * @see packages/components-react/src/atoms/Avatar.tsx
 */

import { forwardRef, type HTMLAttributes } from 'react';
import type { AvatarSize, AvatarShape, AvatarType, AvatarItem } from '../types';
import { cn } from '../utils/cn';
import { Avatar } from '../atoms/Avatar';

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  avatars: AvatarItem[];
  max?: number;
  size?: AvatarSize;
  shape?: AvatarShape;
  type?: AvatarType;
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ avatars = [], max = 5, size = 's', shape = 'circle', type = 'image-border', className, ...rest }, ref) => {
    const visibleAvatars = avatars.slice(0, max);
    const remainingCount = Math.max(0, avatars.length - max);
    const showCounter = remainingCount > 0;

    const classes = cn('avatar-group', `avatar-group--${size}`, className);

    const ariaLabel = `${avatars.length} ${avatars.length === 1 ? 'member' : 'members'}`;

    return (
      <div
        ref={ref}
        className={classes}
        data-avatar-group
        data-size={size}
        data-shape={shape}
        data-type={type}
        role="group"
        aria-label={ariaLabel}
        {...rest}
      >
        {visibleAvatars.map((avatar, index) => (
          <Avatar
            key={avatar.src || avatar.initials || index}
            src={avatar.src}
            alt={avatar.alt}
            initials={avatar.initials}
            size={size}
            shape={shape}
            type={avatar.src ? type : 'initials'}
            badge={avatar.badge || 'none'}
            className="avatar-group__item"
            data-avatar-index={index}
          />
        ))}

        {showCounter && (
          <span
            className="avatar-group__counter"
            data-avatar-counter
            role="status"
            aria-label={`${remainingCount} more ${remainingCount === 1 ? 'member' : 'members'}`}
          >
            +{remainingCount}
          </span>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';
