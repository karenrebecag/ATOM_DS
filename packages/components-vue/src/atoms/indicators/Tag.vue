<script setup lang="ts">
/**
 * Tag (Atom)
 *
 * A non-interactive label for categorization and metadata display.
 * Supports filled/outlined variants and semantic color states.
 *
 * Data Attributes (Animation Contract):
 * - data-tag: Root element (discovery)
 *
 * Usage:
 * <Tag variant="filled" color="success">Active</Tag>
 * <Tag variant="outlined" color="warning" size="s">Beta</Tag>
 *
 * @see packages/css/src/components/tag.css
 */

import { computed, type HTMLAttributes } from 'vue'
import type { TagVariant, TagColor, TagSize } from '../../types/tag'

interface TagProps {
  variant?: TagVariant
  color?: TagColor
  size?: TagSize
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<TagProps>(), {
  variant: 'filled',
  color: 'default',
  size: 'm'
})

const tagClasses = computed(() => [
  'tag',
  `tag--${props.variant}`,
  `tag--${props.color}`,
  `tag--${props.size}`,
  props.class
])
</script>

<template>
  <span :class="tagClasses" data-tag>
    <slot />
  </span>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
