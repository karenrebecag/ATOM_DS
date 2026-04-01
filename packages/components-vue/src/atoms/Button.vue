<script setup lang="ts">
/**
 * Button (Atom)
 *
 * Primary interactive component with 6 variants and 5 sizes.
 * Supports loading state, disabled state, icons, and polymorphic rendering (button vs link).
 *
 * Data Attributes (Animation Contract):
 * - data-button: Root element (discovery)
 * - data-hover-rotate: Enables hover rotate animation (via @atomchat/animations)
 * - data-shimmer: On loading text (shimmer animation via @atomchat/animations)
 * - data-button-label: Original label (animated on hover)
 * - data-button-label-clone: Clone label (animated on hover)
 * - data-button-spinner: Loading spinner
 *
 * Usage:
 * <Button variant="Primary" size="m">Click me</Button>
 * <Button variant="Secondary" :is-loading="true">Loading...</Button>
 * <Button variant="Tertiary" href="/about">Link Button</Button>
 * <Button variant="Destructive Primary" :is-disabled="true">Delete</Button>
 *
 * @see packages/animations/src/hover.ts — initHoverRotate()
 * @see packages/animations/src/loading.ts — initShimmerText()
 * @see packages/css/src/components/button.css
 */

import { computed, type HTMLAttributes } from 'vue'
import type { ButtonVariant, ButtonSize, ButtonType } from '../types'
import { BUTTON_VARIANT_MAP } from '../types'

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  type?: ButtonType
  isDisabled?: boolean
  isLoading?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'Primary',
  size: 'm',
  isDisabled: false,
  isLoading: false,
  type: 'button'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const tokenVariant = computed(() => BUTTON_VARIANT_MAP[props.variant])
const tag = computed(() => (props.href ? 'a' : 'button'))
const isDisabled = computed(() => props.isDisabled || props.isLoading)

const buttonClasses = computed(() => [
  'button',
  `button--${tokenVariant.value}`,
  `button--${props.size}`,
  {
    'button--disabled': isDisabled.value,
    'button--loading': props.isLoading
  },
  props.class
])

function handleClick(event: MouseEvent) {
  if (!isDisabled.value) {
    emit('click', event)
  }
}
</script>

<template>
  <component
    :is="tag"
    :href="tag === 'a' ? href : undefined"
    :type="tag === 'button' ? type : undefined"
    :disabled="tag === 'button' ? isDisabled : undefined"
    :tabindex="tag === 'a' && isDisabled ? -1 : undefined"
    :class="buttonClasses"
    :aria-disabled="isDisabled ? 'true' : undefined"
    :aria-busy="isLoading ? 'true' : undefined"
    data-button
    :data-hover-rotate="!isDisabled ? '' : undefined"
    @click="handleClick"
  >
    <span v-if="isLoading" class="button__loading-content">
      <span class="button__loading-text" data-shimmer>Loading</span>
      <span class="button__spinner" data-button-spinner aria-hidden="true" />
    </span>

    <span v-else class="button__label-wrap">
      <span class="button__label" data-button-label>
        <span v-if="$slots.iconLeft" class="button__icon">
          <slot name="iconLeft" />
        </span>
        <slot />
        <span v-if="$slots.iconRight" class="button__icon">
          <slot name="iconRight" />
        </span>
      </span>

      <!-- Clone label for hover rotation animation -->
      <span class="button__label button__label--clone" data-button-label-clone aria-hidden="true">
        <span v-if="$slots.iconLeft" class="button__icon">
          <slot name="iconLeft" />
        </span>
        <slot />
        <span v-if="$slots.iconRight" class="button__icon">
          <slot name="iconRight" />
        </span>
      </span>
    </span>
  </component>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
