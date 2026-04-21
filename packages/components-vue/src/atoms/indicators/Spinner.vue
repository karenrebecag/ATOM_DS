<script setup lang="ts">
/**
 * Spinner (Atom)
 *
 * A loading indicator with size and color variants.
 * Provides accessible loading state communication.
 *
 * Data Attributes (Animation Contract):
 * - data-spinner: Root element (discovery)
 *
 * Usage:
 * <Spinner size="m" color="primary" />
 * <Spinner size="l" color="inverse" />
 *
 * @see packages/css/src/components/spinner.css
 */

import { computed, type HTMLAttributes } from 'vue'
import type { SpinnerSize, SpinnerColor } from '../../types/spinner'

interface SpinnerProps {
  size?: SpinnerSize
  color?: SpinnerColor
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<SpinnerProps>(), {
  size: 'm',
  color: 'primary'
})

const spinnerClasses = computed(() => [
  'spinner',
  `spinner--${props.size}`,
  `spinner--${props.color}`,
  props.class
])
</script>

<template>
  <span
    :class="spinnerClasses"
    data-spinner
    role="status"
    aria-label="Loading"
  />
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
