/**
 * Tag (Atom)
 *
 * Non-interactive label for categorization and metadata display.
 * Similar to Chip but without interaction states.
 *
 * Performance: Simple component, no optimization needed
 *
 * @see packages/css/src/components/tag.css
 * @see packages/tokens/src/components/tag.json
 */

import { forwardRef, type HTMLAttributes } from 'react';
import type { SizeVariant } from '../types';
import { cn } from '../utils/cn';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SizeVariant;
  icon?: React.ReactNode;
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ size = 'm', icon, children, className, ...rest }, ref) => {
    const classes = cn('tag', `tag--${size}`, className);

    return (
      <span ref={ref} className={classes} data-tag data-size={size} {...rest}>
        {icon && (
          <span className="tag__icon" data-tag-icon>
            {icon}
          </span>
        )}
        <span className="tag__label" data-tag-label>
          {children}
        </span>
      </span>
    );
  }
);

Tag.displayName = 'Tag';
