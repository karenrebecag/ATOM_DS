<script setup lang="ts">
/**
 * Avatar (User Profile Avatar)
 *
 * Displays user profile images, initials, or icons with optional status badges.
 * Supports multiple types, sizes, shapes, and badge indicators.
 *
 * Props:
 * - src: Image URL for avatar
 * - alt: Alt text for image (defaults to initials or "Avatar")
 * - size: Avatar size variant (xs, s, m, l)
 * - shape: Avatar shape variant (circle, square)
 * - type: Avatar type (auto-detected from src presence)
 * - initials: Initials to display (e.g., "JD")
 * - badge: Status badge indicator
 *
 * Auto-detection Logic:
 * - If src is provided → type defaults to "image-border"
 * - If no src → type defaults to "initials"
 *
 * Usage:
 * <Avatar src="/user.jpg" size="m" badge="online" alt="John Doe" />
 * <Avatar initials="JD" size="s" shape="square" />
 * <Avatar type="icon" size="l" badge="verified">
 *   <template #icon><UserIcon /></template>
 * </Avatar>
 *
 * @see packages/css/src/components/avatar.css
 */

import { computed, shallowRef, type HTMLAttributes } from 'vue'
import type { AvatarSize, AvatarShape, AvatarType, AvatarStatus } from '../types'
import { extractInitials } from '../utils'

interface AvatarProps {
  src?: string
  alt?: string
  size?: AvatarSize
  shape?: AvatarShape
  type?: AvatarType
  initials?: string
  badge?: AvatarStatus
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<AvatarProps>(), {
  size: 'xs',
  shape: 'circle',
  badge: 'none'
})

// Image error state (for fallback)
const imageError = shallowRef(false)

// Auto-detect type based on src presence
const resolvedType = computed<AvatarType>(() => {
  if (props.type) return props.type
  return props.src ? 'image-border' : 'initials'
})

// Compute initials from alt or initials prop
const displayInitials = computed(() => {
  if (props.initials) return props.initials.toUpperCase()
  if (props.alt) return extractInitials(props.alt, 2)
  return '?'
})

// Compute aria-label
const ariaLabel = computed(() => props.alt || props.initials || 'Avatar')

// Avatar classes
const avatarClasses = computed(() => [
  'avatar',
  `avatar--${props.size}`,
  `avatar--${props.shape}`,
  `avatar--${resolvedType.value}`,
  props.class
])

// Badge classes (if badge is present)
const badgeClasses = computed(() => {
  if (props.badge === 'none' || !props.badge) return null

  return [
    'avatar__badge',
    `avatar__badge--${props.badge}`
  ]
})

function handleImageError() {
  imageError.value = true
}
</script>

<template>
  <span
    :class="avatarClasses"
    data-avatar
    :data-size="size"
    :data-shape="shape"
    :data-type="resolvedType"
    role="img"
    :aria-label="ariaLabel"
  >
    <!-- Image Type -->
    <span
      v-if="(resolvedType === 'image' || resolvedType === 'image-border') && src && !imageError"
      class="avatar__frame"
    >
      <img
        :src="src"
        :alt="alt"
        class="avatar__img"
        loading="lazy"
        data-avatar-img
        @error="handleImageError"
      >
    </span>

    <!-- Initials Type (fallback when image fails) -->
    <span
      v-if="resolvedType === 'initials' || imageError"
      class="avatar__initials"
      data-avatar-initials
    >
      {{ displayInitials }}
    </span>

    <!-- Icon Type -->
    <span
      v-if="resolvedType === 'icon' && !imageError"
      class="avatar__icon"
      data-avatar-icon
    >
      <slot name="icon">
        <!-- Default user icon SVG -->
        <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 14s-1 0-1-1 1-4 7-4 7 3 7 4-1 1-1 1H2Z" />
        </svg>
      </slot>
    </span>

    <!-- Badge Indicators -->
    <!-- Verified badge: Custom SVG icon -->
    <span
      v-if="badge === 'verified'"
      :class="badgeClasses"
      data-avatar-badge
      data-badge-type="verified"
      aria-label="Verified"
    >
      <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
      </svg>
    </span>

    <!-- Status badges (online/offline/idle/inactive) -->
    <!-- TODO: Compose with StatusIcon atom when it's implemented -->
    <span
      v-if="badge === 'online' || badge === 'offline' || badge === 'idle' || badge === 'inactive'"
      :class="badgeClasses"
      data-avatar-badge
      :data-badge-type="badge"
      role="status"
      :aria-label="badge"
    >
      <span class="avatar__badge-dot" />
    </span>
  </span>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
