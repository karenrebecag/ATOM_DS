/**
 * AvatarGroup (Molecule)
 *
 * Displays multiple avatars in a stacked layout with an overflow counter.
 * Composes Avatar atoms. Shared props (size, shape, type) applied to all items.
 * Per-item badge supported individually.
 *
 * HTML structure matches Astro component 1:1.
 *
 * @see packages/css/src/components/avatar-group.css
 * @see packages/components-astro/src/molecules/AvatarGroup.astro
 */

import { forwardRef, type HTMLAttributes } from 'react';
import type { AvatarSize, AvatarShape, AvatarType, StatusType } from '../types';
import { cn } from '../utils/cn';
import { Avatar } from '../atoms/Avatar';

export interface AvatarGroupItem {
  src?: string;
  alt?: string;
  initials?: string;
  badge?: StatusType;
}

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  avatars: AvatarGroupItem[];
  max?: number;
  size?: AvatarSize;
  shape?: AvatarShape;
  type?: AvatarType;
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      avatars,
      max = 5,
      size = 's',
      shape = 'circle',
      type = 'image-border',
      className,
      ...rest
    },
    ref
  ) => {
    if (!avatars || avatars.length === 0) return null;

    const visible = avatars.slice(0, max);
    const remainingCount = Math.max(0, avatars.length - max);
    const showCounter = remainingCount > 0;

    return (
      <div
        ref={ref}
        className={cn('avatar-group', `avatar-group--${size}`, className)}
        data-avatar-group
        data-size={size}
        data-shape={shape}
        data-type={type}
        role="group"
        aria-label={`${avatars.length} ${avatars.length === 1 ? 'member' : 'members'}`}
        {...rest}
      >
        {visible.map((avatar, index) => (
          <Avatar
            key={index}
            src={avatar.src}
            alt={avatar.alt ?? ''}
            initials={avatar.initials}
            size={size}
            shape={shape}
            type={avatar.src ? type : 'initials'}
            badge={avatar.badge ?? 'none'}
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
