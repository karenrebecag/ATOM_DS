/**
 * AvatarGroup-specific type definitions
 */

import type { AvatarSize, AvatarShape } from './avatar'

export type { AvatarSize, AvatarShape }

export interface AvatarGroupItem {
  src?: string
  initials?: string
  alt?: string
}
