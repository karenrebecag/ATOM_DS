<script setup lang="ts">
/**
 * EmptyState (Atom)
 *
 * A placeholder component for empty content areas.
 * Displays heading, supporting text, optional result text, icon, and action slots.
 *
 * Usage:
 * <EmptyState heading="No results" supporting-text="Try a different search">
 *   <template #icon><SearchIcon /></template>
 *   <Button>Try Again</Button>
 * </EmptyState>
 *
 * @see packages/css/src/components/empty-state.css
 */

import { computed, type HTMLAttributes } from 'vue'
import type { EmptyStateSize } from '../../types/empty-state'

interface EmptyStateProps {
  size?: EmptyStateSize
  heading?: string
  supportingText?: string
  resultText?: string
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<EmptyStateProps>(), {
  size: 'm'
})

const classes = computed(() => [
  'empty-state',
  `empty-state--${props.size}`,
  props.class
])
</script>

<template>
  <div :class="classes">
    <div v-if="$slots.icon" class="empty-state__icon">
      <slot name="icon" />
    </div>
    <h3 v-if="heading" class="empty-state__heading">{{ heading }}</h3>
    <p v-if="supportingText" class="empty-state__supporting-text">{{ supportingText }}</p>
    <p v-if="resultText" class="empty-state__result-text">{{ resultText }}</p>
    <div v-if="$slots.default" class="empty-state__actions">
      <slot />
    </div>
  </div>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
