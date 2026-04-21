/**
 * Tag (Atom)
 *
 * Status indicator with semantic colors and multiple visual styles.
 * HTML output mirrors the Astro component exactly.
 *
 * @see packages/css/src/components/indicators/tag.css
 * @see packages/tokens/src/components/indicators/tag.json
 */

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type TagIntent = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'brand' | 'ai' | 'disabled';
export type TagVariant = 'ghost' | 'filled' | 'outlined';
export type TagSize = 'xs' | 's' | 'm';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  intent?: TagIntent;
  variant?: TagVariant;
  size?: TagSize;
  hasDots?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  avatar?: ReactNode;
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      intent = 'success',
      variant = 'filled',
      size = 'm',
      hasDots = false,
      disabled = false,
      icon,
      avatar,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const finalIntent = disabled ? 'disabled' : intent;

    return (
      <span
        ref={ref}
        className={cn(
          'tag',
          `tag--${finalIntent}`,
          `tag--${variant}`,
          `tag--${size}`,
          className
        )}
        data-tag
        {...rest}
      >
        {hasDots && <span className="tag__dot" aria-hidden="true" data-tag-dot />}
        {avatar && <span className="tag__avatar">{avatar}</span>}
        {icon && <span className="tag__icon">{icon}</span>}
        <span className="tag__text" data-tag-text>{children}</span>
      </span>
    );
  }
);

Tag.displayName = 'Tag';
