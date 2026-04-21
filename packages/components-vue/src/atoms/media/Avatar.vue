<script setup lang="ts">
/**
 * Avatar (Atom)
 *
 * Displays user profile images, initials, or icons with optional status badges.
 * Supports multiple types, sizes, shapes, and badge indicators.
 *
 * Data Attributes (Animation Contract):
 * - data-avatar: Root element (discovery)
 * - data-size: Avatar size
 * - data-shape: Avatar shape
 * - data-type: Avatar type
 * - data-avatar-img: Image element
 * - data-avatar-initials: Initials element
 * - data-avatar-icon: Icon element
 * - data-avatar-badge: Badge element
 * - data-badge-type: Badge type
 *
 * Usage:
 * <Avatar src="/photo.jpg" alt="John Doe" size="m" />
 * <Avatar initials="JD" size="l" shape="square" />
 * <Avatar badge="verified" size="m" />
 *
 * @see packages/css/src/components/avatar.css
 */

import { computed, type HTMLAttributes } from 'vue'
import type { AvatarSize, AvatarShape, AvatarType, StatusType } from '../../types/avatar'

interface AvatarProps {
  src?: string
  alt?: string
  size?: AvatarSize
  shape?: AvatarShape
  type?: AvatarType
  initials?: string
  badge?: StatusType
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<AvatarProps>(), {
  alt: '',
  size: 'xs',
  shape: 'circle',
  badge: 'none'
})

const resolvedType = computed(() => props.type ?? (props.src ? 'image-border' : 'initials'))
const ariaLabel = computed(() => props.alt || props.initials || 'Avatar')

const avatarClasses = computed(() => [
  'avatar',
  `avatar--${props.size}`,
  `avatar--${props.shape}`,
  `avatar--${resolvedType.value}`,
  props.class
])
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
    <!-- Image -->
    <span
      v-if="(resolvedType === 'image' || resolvedType === 'image-border') && src"
      class="avatar__frame"
    >
      <img class="avatar__img" data-avatar-img :src="src" :alt="alt" loading="lazy" />
    </span>

    <!-- Initials -->
    <span v-if="resolvedType === 'initials'" class="avatar__initials" data-avatar-initials>
      {{ initials || '?' }}
    </span>

    <!-- Icon -->
    <span v-if="resolvedType === 'icon'" class="avatar__icon" data-avatar-icon>
      <slot name="icon">
        <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 14s-1 0-1-1 1-4 7-4 7 3 7 4-1 1-1 1H2Z" />
        </svg>
      </slot>
    </span>

    <!-- Verified Badge -->
    <span
      v-if="badge === 'verified'"
      class="avatar__badge avatar__badge--verified"
      data-avatar-badge
      data-badge-type="verified"
      aria-label="Verified"
    >
      <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
      </svg>
    </span>
  </span>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
