<script setup lang="ts">
/**
 * CardFooter (Molecule -- Card subcomponent)
 *
 * Footer section of a Card with buttons or tags variant.
 *
 * Data Attributes (Animation Contract):
 * - data-card-footer: Root element
 * - data-card-footer-variant: Footer variant ('buttons' | 'tags')
 *
 * Usage:
 * <CardFooter variant="buttons">
 *   <Button variant="Primary">Confirm</Button>
 *   <Button variant="Secondary">Cancel</Button>
 * </CardFooter>
 *
 * @see packages/css/src/components/card.css
 */

import { computed, type HTMLAttributes } from 'vue'

type CardFooterVariant = 'buttons' | 'tags'

interface CardFooterProps {
  variant?: CardFooterVariant
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<CardFooterProps>(), {
  variant: 'buttons'
})

const footerClasses = computed(() => [
  'card__footer',
  `card__footer--${props.variant}`,
  props.class
])
</script>

<template>
  <div
    :class="footerClasses"
    data-card-footer
    :data-card-footer-variant="variant"
  >
    <slot />
  </div>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
