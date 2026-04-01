/**
 * Avatar-specific type definitions
 */

export type AvatarSize = 'xs' | 's' | 'm' | 'l'

export type AvatarShape = 'circle' | 'square'

export type AvatarType = 'image' | 'image-border' | 'initials' | 'icon'

export type AvatarStatus = 'verified' | 'online' | 'offline' | 'idle' | 'inactive' | 'none'

/**
 * Avatar item for AvatarGroup
 */
export interface AvatarItem {
  src?: string
  alt: string
  initials?: string
  badge?: AvatarStatus
}
