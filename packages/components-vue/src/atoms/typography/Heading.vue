<script setup lang="ts">
/**
 * Heading (Atom)
 *
 * Semantic heading component that renders h1-h6 based on level prop.
 * Supports display and heading size variants, weight, tracking, and alignment.
 *
 * Data Attributes (Animation Contract):
 * - data-text: Root element (discovery)
 *
 * Usage:
 * <Heading :level="1" size="display-xl">Hero Title</Heading>
 * <Heading :level="2" size="heading-l" weight="medium" align="center">Section</Heading>
 *
 * @see packages/css/src/foundation/typography.css
 */

import { computed, type HTMLAttributes } from 'vue'
import type {
  HeadingLevel,
  HeadingSize,
  HeadingWeight,
  HeadingTracking,
  HeadingAlign
} from '../../types/heading'

interface HeadingProps {
  level?: HeadingLevel
  size?: HeadingSize
  weight?: HeadingWeight
  tracking?: HeadingTracking
  align?: HeadingAlign
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<HeadingProps>(), {
  level: 2,
  size: 'heading-l',
  weight: 'bold',
  tracking: 'normal'
})

const tag = computed(() => `h${props.level}` as const)

const headingClasses = computed(() => [
  'heading',
  `heading--${props.size}`,
  `heading--${props.weight}`,
  `heading--${props.tracking}`,
  props.align && `heading--${props.align}`,
  props.class
])
</script>

<template>
  <component :is="tag" :class="headingClasses" data-text>
    <slot />
  </component>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
