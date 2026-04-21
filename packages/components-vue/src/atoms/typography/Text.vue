<script setup lang="ts">
/**
 * Text (Atom)
 *
 * A flexible text component for body copy, captions, labels, and footnotes.
 * Supports polymorphic rendering as p, span, or div.
 *
 * Data Attributes (Animation Contract):
 * - data-text: Root element (discovery)
 *
 * Usage:
 * <Text size="body" weight="regular">Body text content</Text>
 * <Text as="span" size="caption" color="secondary">Caption</Text>
 * <Text size="label" :truncate="true">Overflow text...</Text>
 *
 * @see packages/css/src/foundation/typography.css
 */

import { computed, type HTMLAttributes } from 'vue'
import type {
  TextSize,
  TextWeight,
  TextColor,
  TextAlign,
  TextElement
} from '../../types/text'

interface TextProps {
  size?: TextSize
  weight?: TextWeight
  color?: TextColor
  align?: TextAlign
  truncate?: boolean
  as?: TextElement
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<TextProps>(), {
  size: 'body',
  weight: 'regular',
  color: 'primary',
  truncate: false,
  as: 'p'
})

const textClasses = computed(() => [
  'text',
  `text--${props.size}`,
  `text--${props.weight}`,
  `text--${props.color}`,
  props.align && `text--${props.align}`,
  {
    'text--truncate': props.truncate
  },
  props.class
])
</script>

<template>
  <component :is="as" :class="textClasses" data-text>
    <slot />
  </component>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
