<script setup lang="ts">
/**
 * Container (Layout)
 *
 * Constrains content width with responsive max-width variants.
 *
 * Data Attributes (Animation Contract):
 * - data-container: Root element (discovery)
 * - data-size: Container size variant
 *
 * Usage:
 * <Container>Default width content</Container>
 * <Container size="small">Narrow content</Container>
 *
 * @see packages/css/src/layout/container.css
 */

import { computed, type HTMLAttributes } from 'vue'
import type { ContainerSize } from '../types/layout'

interface ContainerProps {
  size?: ContainerSize
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<ContainerProps>(), {
  size: 'default'
})

const containerClasses = computed(() => [
  'container',
  props.size !== 'default' && `container--${props.size}`,
  props.class
])
</script>

<template>
  <div :class="containerClasses" data-container :data-size="size">
    <slot />
  </div>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
