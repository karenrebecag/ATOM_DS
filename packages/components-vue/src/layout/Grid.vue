<script setup lang="ts">
/**
 * Grid (Layout)
 *
 * CSS grid layout with configurable columns and gap.
 *
 * Data Attributes (Animation Contract):
 * - data-grid: Root element (discovery)
 * - data-columns: Column configuration
 * - data-gap: Gap size
 *
 * Usage:
 * <Grid :columns="3" gap="l">
 *   <Card /><Card /><Card />
 * </Grid>
 *
 * @see packages/css/src/layout/grid.css
 */

import { computed, type HTMLAttributes } from 'vue'
import type { GapSize } from '../types/layout'

interface GridProps {
  columns?: number | string
  gap?: GapSize
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<GridProps>(), {
  gap: 'm'
})

const gridClasses = computed(() => [
  'grid',
  props.columns && `grid--cols-${props.columns}`,
  `grid--gap-${props.gap}`,
  props.class
])
</script>

<template>
  <div
    :class="gridClasses"
    data-grid
    :data-columns="columns"
    :data-gap="gap"
  >
    <slot />
  </div>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
