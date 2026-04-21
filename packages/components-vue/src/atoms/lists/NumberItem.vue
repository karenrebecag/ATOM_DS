<script setup lang="ts">
/**
 * NumberItem (Atom)
 *
 * A list item for ordered numbered lists.
 * Renders as a semantic li element with a data-number attribute.
 *
 * Usage:
 * <ol>
 *   <NumberItem :number="1">First step</NumberItem>
 *   <NumberItem :number="2">Second step</NumberItem>
 * </ol>
 *
 * @see packages/css/src/components/lists.css
 */

import { computed, type HTMLAttributes } from 'vue'

interface NumberItemProps {
  number: number
  class?: HTMLAttributes['class']
}

const props = defineProps<NumberItemProps>()

const numberClasses = computed(() => ['number-item', props.class])
</script>

<template>
  <li :class="numberClasses" :data-number="number">
    <slot />
  </li>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
