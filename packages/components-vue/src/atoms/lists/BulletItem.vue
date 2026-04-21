<script setup lang="ts">
/**
 * BulletItem (Atom)
 *
 * A list item for unordered bullet lists.
 * Renders as a semantic li element.
 *
 * Usage:
 * <ul>
 *   <BulletItem>First item</BulletItem>
 *   <BulletItem>Second item</BulletItem>
 * </ul>
 *
 * @see packages/css/src/components/lists.css
 */

import { computed, type HTMLAttributes } from 'vue'

interface BulletItemProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<BulletItemProps>()

const bulletClasses = computed(() => ['bullet-item', props.class])
</script>

<template>
  <li :class="bulletClasses">
    <slot />
  </li>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
