<script setup lang="ts">
/**
 * AvatarGroup (Molecule)
 *
 * Displays multiple avatars in a stacked layout with an overflow counter.
 * Uses Avatar internally for consistent rendering.
 *
 * Data Attributes (Animation Contract):
 * - data-avatar-group: Root element (discovery)
 * - data-size: Avatar size
 * - data-shape: Avatar shape
 * - data-avatar-group-overflow: Overflow counter
 *
 * Usage:
 * <AvatarGroup :avatars="[{src: '/a.jpg'}, {initials: 'JD'}]" :max="3" size="s" />
 *
 * @see packages/css/src/components/avatar-group.css
 */

import { computed, type HTMLAttributes } from 'vue'
import type { AvatarSize, AvatarShape, AvatarGroupItem } from '../types/avatar-group'
import Avatar from '../atoms/media/Avatar.vue'

interface AvatarGroupProps {
  avatars: AvatarGroupItem[]
  max?: number
  size?: AvatarSize
  shape?: AvatarShape
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<AvatarGroupProps>(), {
  max: 5,
  size: 'xs',
  shape: 'circle'
})

const visible = computed(() => props.avatars.slice(0, props.max))
const overflow = computed(() => props.avatars.length - props.max)

const groupClasses = computed(() => [
  'avatar-group',
  `avatar-group--${props.size}`,
  `avatar-group--${props.shape}`,
  props.class
])
</script>

<template>
  <div
    v-if="avatars && avatars.length > 0"
    :class="groupClasses"
    data-avatar-group
    :data-size="size"
    :data-shape="shape"
    role="group"
    :aria-label="`Group of ${avatars.length} avatars`"
  >
    <Avatar
      v-for="(avatar, index) in visible"
      :key="index"
      :src="avatar.src"
      :initials="avatar.initials"
      :alt="avatar.alt || ''"
      :size="size"
      :shape="shape"
      class="avatar-group__item"
    />
    <span
      v-if="overflow > 0"
      class="avatar-group__overflow"
      data-avatar-group-overflow
      :aria-label="`${overflow} more`"
    >
      +{{ overflow }}
    </span>
  </div>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
