/**
 * StatusIcon (Atom)
 *
 * A small circular indicator showing online/offline/idle/inactive status.
 * Can be used standalone or composed within other components (Avatar).
 *
 * Performance: Simple component, no optimization needed
 *
 * @see packages/css/src/components/status-icon.css (if exists, or inline styles)
 * @see packages/tokens/src/components/status-icon.json
 */

import { forwardRef, type HTMLAttributes } from 'react';
import type { AvatarSize } from '../types';
import { cn } from '../utils/cn';

export interface StatusIconProps extends HTMLAttributes<HTMLSpanElement> {
  status?: 'online' | 'offline' | 'idle' | 'inactive';
  size?: AvatarSize;
  hasBorder?: boolean;
}

const statusLabels = {
  online: 'Online',
  offline: 'Offline',
  idle: 'Away',
  inactive: 'Inactive',
} as const;

export const StatusIcon = forwardRef<HTMLSpanElement, StatusIconProps>(
  ({ status = 'online', size = 'xs', hasBorder = true, className, ...rest }, ref) => {
    const classes = cn(
      'status-icon',
      `status-icon--${status}`,
      `status-icon--${size}`,
      hasBorder && 'status-icon--bordered',
      className
    );

    return (
      <span
        ref={ref}
        className={classes}
        data-status-icon
        data-status={status}
        data-size={size}
        role="status"
        aria-label={statusLabels[status]}
        {...rest}
      />
    );
  }
);

StatusIcon.displayName = 'StatusIcon';
