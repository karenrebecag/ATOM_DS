<script setup lang="ts">
/**
 * Divider (Atom)
 *
 * A visual separator for horizontal or vertical content division.
 * Renders as an hr element with semantic meaning.
 *
 * Usage:
 * <Divider />
 * <Divider orientation="vertical" />
 *
 * @see packages/css/src/components/divider.css
 */

import { computed, type HTMLAttributes } from 'vue'
import type { DividerOrientation } from '../../types/layout'

interface DividerProps {
  orientation?: DividerOrientation
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<DividerProps>(), {
  orientation: 'horizontal'
})

const dividerClasses = computed(() => [
  'divider',
  `divider--${props.orientation}`,
  props.class
])
</script>

<template>
  <hr :class="dividerClasses" :aria-orientation="orientation" />
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
