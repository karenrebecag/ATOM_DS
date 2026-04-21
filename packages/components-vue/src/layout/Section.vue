<script setup lang="ts">
/**
 * Section (Layout)
 *
 * Semantic section wrapper for page content blocks.
 *
 * Data Attributes (Animation Contract):
 * - data-section: Root element (discovery)
 *
 * Usage:
 * <Section>
 *   <Heading>Section Title</Heading>
 *   <Text>Section content here</Text>
 * </Section>
 *
 * @see packages/css/src/layout/section.css
 */

import { computed, type HTMLAttributes } from 'vue'

interface SectionProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<SectionProps>()

const sectionClasses = computed(() => ['section', props.class])
</script>

<template>
  <section :class="sectionClasses" data-section>
    <slot />
  </section>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
