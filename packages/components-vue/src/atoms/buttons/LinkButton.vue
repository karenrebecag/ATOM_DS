<script setup lang="ts">
/**
 * LinkButton (Atom)
 *
 * Text link styled as a button with optional icon support.
 * Single visual style (no variant), two sizes.
 *
 * Data Attributes (Animation Contract):
 * - data-link-button: Root element (discovery)
 * - data-shimmer: On loading text (shimmer animation)
 * - data-link-button-spinner: Loading spinner
 *
 * Usage:
 * <LinkButton size="l" href="/about">Learn more</LinkButton>
 * <LinkButton size="s" :is-loading="true">Loading...</LinkButton>
 *
 * @see packages/css/src/components/link-button.css
 */

import { computed, type HTMLAttributes } from 'vue'

type LinkButtonSize = 's' | 'l'

interface LinkButtonProps {
  size?: LinkButtonSize
  href?: string
  isDisabled?: boolean
  isLoading?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<LinkButtonProps>(), {
  size: 'l',
  isDisabled: false,
  isLoading: false
})

const isDisabled = computed(() => props.isDisabled || props.isLoading)

const linkButtonClasses = computed(() => [
  'link-button',
  `link-button--${props.size}`,
  {
    'link-button--disabled': isDisabled.value,
    'link-button--loading': props.isLoading
  },
  props.class
])
</script>

<template>
  <a
    :href="href"
    :class="linkButtonClasses"
    data-link-button
    :tabindex="isDisabled ? -1 : 0"
    :aria-disabled="isDisabled ? 'true' : undefined"
    :aria-busy="isLoading ? 'true' : undefined"
  >
    <span v-if="isLoading" class="link-button__loading-content">
      <span class="link-button__loading-text" data-shimmer>Loading</span>
      <span class="link-button__spinner" data-link-button-spinner aria-hidden="true" />
    </span>

    <span v-else class="link-button__label">
      <span v-if="$slots.iconLeft" class="link-button__icon">
        <slot name="iconLeft" />
      </span>
      <slot />
      <span v-if="$slots.iconRight" class="link-button__icon">
        <slot name="iconRight" />
      </span>
    </span>
  </a>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
