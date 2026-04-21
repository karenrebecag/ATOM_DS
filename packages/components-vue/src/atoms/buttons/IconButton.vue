<script setup lang="ts">
/**
 * IconButton (Atom)
 *
 * Icon-only interactive button with polymorphic rendering (button vs link).
 *
 * Data Attributes (Animation Contract):
 * - data-icon-button: Root element (discovery)
 * - data-hover-rotate: Enables hover rotate animation
 * - data-icon-button-spinner: Loading spinner
 *
 * Usage:
 * <IconButton variant="Primary" size="m" aria-label="Settings">
 *   <template #icon><MyIcon /></template>
 * </IconButton>
 *
 * @see packages/css/src/components/icon-button.css
 */

import { computed, type HTMLAttributes } from 'vue'
import type { ButtonVariant, ButtonType } from '../../types'
import { BUTTON_VARIANT_MAP } from '../../types'
import type { Size } from '../../types'

interface IconButtonProps {
  variant?: ButtonVariant
  size?: Size
  href?: string
  type?: ButtonType
  isDisabled?: boolean
  isLoading?: boolean
  ariaLabel: string
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<IconButtonProps>(), {
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

const iconButtonClasses = computed(() => [
  'icon-button',
  `icon-button--${tokenVariant.value}`,
  `icon-button--${props.size}`,
  {
    'icon-button--disabled': isDisabled.value,
    'icon-button--loading': props.isLoading
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
    :tabindex="tag === 'a' && isDisabled ? -1 : isDisabled ? undefined : 0"
    :class="iconButtonClasses"
    :aria-label="ariaLabel"
    :aria-disabled="isDisabled ? 'true' : undefined"
    :aria-busy="isLoading ? 'true' : undefined"
    data-icon-button
    :data-hover-rotate="!isDisabled ? '' : undefined"
    @click="handleClick"
  >
    <span v-if="isLoading" class="icon-button__spinner" data-icon-button-spinner aria-hidden="true" />
    <span v-else class="icon-button__icon">
      <slot name="icon" />
    </span>
  </component>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
