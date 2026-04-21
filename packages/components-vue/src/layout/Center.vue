<script setup lang="ts">
/**
 * Center (Layout)
 *
 * Centers its children both horizontally and vertically.
 *
 * Data Attributes (Animation Contract):
 * - data-center: Root element (discovery)
 *
 * Usage:
 * <Center>
 *   <Spinner size="l" />
 * </Center>
 *
 * @see packages/css/src/layout/center.css
 */

import { computed, type HTMLAttributes } from 'vue'

interface CenterProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<CenterProps>()

const centerClasses = computed(() => ['center', props.class])
</script>

<template>
  <div :class="centerClasses" data-center>
    <slot />
  </div>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
