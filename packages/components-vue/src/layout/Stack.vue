<script setup lang="ts">
/**
 * Stack (Layout)
 *
 * Vertical stack layout with configurable gap and alignment.
 * Supports polymorphic rendering via the `as` prop.
 *
 * Data Attributes (Animation Contract):
 * - data-stack: Root element (discovery)
 * - data-gap: Gap size
 *
 * Usage:
 * <Stack gap="l" align="center">
 *   <Heading>Title</Heading>
 *   <Text>Content</Text>
 * </Stack>
 *
 * @see packages/css/src/layout/stack.css
 */

import { computed, type HTMLAttributes } from 'vue'
import type { GapSize, LayoutAlignment } from '../types/layout'

interface StackProps {
  gap?: GapSize
  align?: LayoutAlignment
  as?: 'div' | 'section' | 'article'
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<StackProps>(), {
  gap: 'm',
  as: 'div'
})

const stackClasses = computed(() => [
  'stack',
  `stack--gap-${props.gap}`,
  props.align && `stack--align-${props.align}`,
  props.class
])
</script>

<template>
  <component :is="as" :class="stackClasses" data-stack :data-gap="gap">
    <slot />
  </component>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
