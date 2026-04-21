<script setup lang="ts">
/**
 * SegmentControl (Atom)
 *
 * Tabbed selection control with sliding indicator.
 * Supports disabled items.
 *
 * Data Attributes (Animation Contract):
 * - data-segment-control: Root element (discovery)
 * - data-segment-index: Index of each segment item
 *
 * Usage:
 * <SegmentControl :items="[{label:'Tab 1'},{label:'Tab 2'}]" v-model:selected-index="active" />
 *
 * @see packages/css/src/components/segment-control.css
 */

import { computed, type HTMLAttributes } from 'vue'
import type { Size } from '../../types'
import type { SegmentControlItem } from '../../types/segment-control'

interface SegmentControlProps {
  items: SegmentControlItem[]
  size?: Size
  selectedIndex?: number
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<SegmentControlProps>(), {
  size: 'm',
  selectedIndex: 0
})

const emit = defineEmits<{
  'update:selectedIndex': [index: number]
}>()

const segmentClasses = computed(() => [
  'segment-control',
  `segment-control--${props.size}`,
  props.class
])

const indicatorStyle = computed(() => ({
  '--segment-index': props.selectedIndex,
  '--segment-count': props.items.length
}))

function handleClick(index: number, isDisabled: boolean) {
  if (!isDisabled) {
    emit('update:selectedIndex', index)
  }
}

function handleKeyDown(index: number, isDisabled: boolean, event: KeyboardEvent) {
  if ((event.key === 'Enter' || event.key === ' ') && !isDisabled) {
    event.preventDefault()
    emit('update:selectedIndex', index)
  }
}
</script>

<template>
  <div
    :class="segmentClasses"
    data-segment-control
    role="tablist"
  >
    <span
      class="segment-control__indicator"
      :style="indicatorStyle"
    />
    <button
      v-for="(item, index) in items"
      :key="index"
      type="button"
      :class="[
        'segment-control__item',
        {
          'segment-control__item--selected': index === selectedIndex,
          'segment-control__item--disabled': !!item.disabled
        }
      ]"
      role="tab"
      :aria-selected="index === selectedIndex"
      :data-segment-index="index"
      :disabled="!!item.disabled"
      :tabindex="index === selectedIndex ? 0 : -1"
      @click="handleClick(index, !!item.disabled)"
      @keydown="handleKeyDown(index, !!item.disabled, $event)"
    >
      <span class="segment-control__label">{{ item.label }}</span>
    </button>
  </div>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
