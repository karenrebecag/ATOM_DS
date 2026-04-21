<script setup lang="ts">
/**
 * Chip (Atom)
 *
 * A compact interactive element for filtering, selecting, or triggering actions.
 * Supports filled/outlined variants, color states, and optional close/icon.
 *
 * Data Attributes (Animation Contract):
 * - data-chip: Root element (discovery)
 *
 * Usage:
 * <Chip label="Vue" color="info" />
 * <Chip label="Removable" :closable="true" @close="handleRemove" />
 * <Chip label="Selected" :is-selected="true" variant="outlined" />
 *
 * @see packages/css/src/components/chip.css
 */

import { computed, type HTMLAttributes } from 'vue'
import type { ChipVariant, ChipColor, ChipSize } from '../../types/chip'

interface ChipProps {
  label: string
  variant?: ChipVariant
  color?: ChipColor
  size?: ChipSize
  isSelected?: boolean
  isDisabled?: boolean
  closable?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<ChipProps>(), {
  variant: 'filled',
  color: 'default',
  size: 'm',
  isSelected: false,
  isDisabled: false,
  closable: false
})

const emit = defineEmits<{
  close: []
}>()

const chipClasses = computed(() => [
  'chip',
  `chip--${props.variant}`,
  `chip--${props.color}`,
  `chip--${props.size}`,
  {
    'chip--selected': props.isSelected,
    'chip--disabled': props.isDisabled
  },
  props.class
])

function handleClose() {
  emit('close')
}
</script>

<template>
  <span
    :class="chipClasses"
    data-chip
    :aria-disabled="isDisabled ? 'true' : undefined"
  >
    <span v-if="$slots.iconLeft" class="chip__icon">
      <slot name="iconLeft" />
    </span>
    <span class="chip__label">{{ label }}</span>
    <button
      v-if="closable"
      class="chip__close"
      :disabled="isDisabled"
      :aria-label="`Remove ${label}`"
      type="button"
      @click="handleClose"
    />
  </span>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
