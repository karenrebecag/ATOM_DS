/**
 * Common types used across ATOM React components
 */

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

/**
 * Polymorphic component props
 * Allows components to render as different HTML elements
 */
export type PolymorphicProps<E extends ElementType = ElementType> = {
  as?: E;
  children?: ReactNode;
} & ComponentPropsWithoutRef<E>;

/**
 * Common size variants across components
 */
export type SizeVariant = 'xs' | 's' | 'm' | 'l' | 'xl';

/**
 * Avatar-specific sizes (no xl)
 */
export type AvatarSize = 'xs' | 's' | 'm' | 'l';

/**
 * Toggle-specific sizes (only s and m)
 */
export type ToggleSize = 's' | 'm';

/**
 * Common gap sizes for layout components
 */
export type GapSize = 'xs' | 's' | 'm' | 'l' | 'xl';

/**
 * Button variants
 */
export type ButtonVariant =
  | 'Primary'
  | 'Secondary'
  | 'Tertiary'
  | 'Destructive Primary'
  | 'Destructive Secondary'
  | 'Destructive Tertiary';

/**
 * Avatar types
 */
export type AvatarType = 'image' | 'image-border' | 'initials' | 'icon';

/**
 * Avatar shapes
 */
export type AvatarShape = 'circle' | 'square';

/**
 * Badge types
 */
export type BadgeType = 'neutral' | 'inbox' | 'info';

/**
 * Badge states
 */
export type BadgeState = 'default' | 'focused' | 'subtle';

/**
 * Badge contexts (for overflow rules)
 */
export type BadgeContext = 'default' | 'inbox';

/**
 * Status types for StatusIcon and Avatar badges
 */
export type StatusType = 'verified' | 'online' | 'offline' | 'idle' | 'inactive' | 'none';

/**
 * Alignment options
 */
export type Alignment = 'start' | 'center' | 'end' | 'stretch';

/**
 * Justify options
 */
export type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'stretch';

/**
 * Grid column configurations
 */
export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 'auto-fit' | 'auto-fit-sm' | 'auto-fit-lg';

/**
 * Container sizes
 */
export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

/**
 * Text sizes
 */
export type TextSize = 'body' | 'caption' | 'label' | 'label-small' | 'footnote';

/**
 * Text weights
 */
export type TextWeight = 'regular' | 'medium' | 'bold';

/**
 * Text alignment
 */
export type TextAlign = 'left' | 'center' | 'right';

/**
 * Avatar item for AvatarGroup
 */
export interface AvatarItem {
  src?: string;
  alt?: string;
  initials?: string;
  badge?: StatusType;
}

/**
 * Utility type to merge component props with custom props
 */
export type MergeProps<T, U> = Omit<T, keyof U> & U;
