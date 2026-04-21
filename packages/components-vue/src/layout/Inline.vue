<script setup lang="ts">
/**
 * Inline (Layout)
 *
 * Horizontal inline layout with configurable gap, alignment, and wrapping.
 *
 * Data Attributes (Animation Contract):
 * - data-inline: Root element (discovery)
 * - data-gap: Gap size
 *
 * Usage:
 * <Inline gap="s" align="center">
 *   <Button>One</Button>
 *   <Button>Two</Button>
 * </Inline>
 *
 * @see packages/css/src/layout/inline.css
 */

import { computed, type HTMLAttributes } from 'vue'
import type { GapSize, LayoutAlignment } from '../types/layout'

interface InlineProps {
  gap?: GapSize
  align?: LayoutAlignment
  isWrap?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<InlineProps>(), {
  gap: 'm',
  isWrap: false
})

const inlineClasses = computed(() => [
  'inline',
  `inline--gap-${props.gap}`,
  props.align && `inline--align-${props.align}`,
  {
    'inline--wrap': props.isWrap
  },
  props.class
])
</script>

<template>
  <div :class="inlineClasses" data-inline :data-gap="gap">
    <slot />
  </div>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
