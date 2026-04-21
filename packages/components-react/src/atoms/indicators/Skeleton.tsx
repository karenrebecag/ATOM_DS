/**
 * Skeleton (Atom)
 *
 * Pulsing placeholder block for loading states.
 * Pure CSS animation — no JavaScript required.
 *
 * Variants map to border-radius presets from skeleton tokens:
 *   default   → --skeleton-radius       (radius-s)
 *   line      → --skeleton-radius-line  (radius-xxs) + fixed height
 *   circle    → --skeleton-radius-circle (50%)
 *   card      → --skeleton-radius-card  (radius-sm)
 *   btn       → --skeleton-radius-btn   (radius-s) + fixed h/w
 *
 * @see packages/css/src/components/indicators/skeleton.css
 * @see packages/tokens/src/components/indicators/skeleton.json
 */

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export type SkeletonVariant = 'line' | 'circle' | 'card' | 'btn';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant, className, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn('skeleton', variant && `skeleton--${variant}`, className)}
      data-skeleton
      aria-hidden="true"
      {...rest}
    />
  )
);

Skeleton.displayName = 'Skeleton';
