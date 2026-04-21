<script setup lang="ts">
/**
 * Accordion (Molecule)
 *
 * Expandable content panels with CSS grid animation.
 * Supports single-open (close siblings) and multi-open modes.
 *
 * Data Attributes (Animation Contract):
 * - data-accordion: Root element (discovery)
 * - data-accordion-close-siblings: Whether siblings auto-close
 * - data-accordion-status: 'open' | 'closed' per item
 * - data-accordion-toggle: Clickable header
 *
 * Usage:
 * <Accordion :items="items" :close-siblings="true">
 *   <template #item-content="{ item, index }">
 *     <p>{{ item.title }} content here</p>
 *   </template>
 * </Accordion>
 *
 * @see packages/css/src/components/accordion.css
 */

import { computed, ref, type HTMLAttributes } from 'vue'
import type { AccordionItem } from '../types/accordion'

interface AccordionProps {
  items: AccordionItem[]
  closeSiblings?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<AccordionProps>(), {
  closeSiblings: true
})

// Build initial open state from items
const openMap = ref<Record<number, boolean>>(
  (() => {
    const map: Record<number, boolean> = {}
    props.items.forEach((item, i) => {
      if (item.open) map[i] = true
    })
    return map
  })()
)

function handleToggle(index: number) {
  if (props.closeSiblings) {
    openMap.value = openMap.value[index] ? {} : { [index]: true }
  } else {
    openMap.value = { ...openMap.value, [index]: !openMap.value[index] }
  }
}

function handleKeyDown(index: number, event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    handleToggle(index)
  }
}

const accordionClasses = computed(() => [
  'accordion',
  props.class
])

function getItemId(item: AccordionItem, index: number): string {
  return item.id || `accordion-item-${index}`
}
</script>

<template>
  <div
    :class="accordionClasses"
    data-accordion
    :data-accordion-close-siblings="closeSiblings || undefined"
  >
    <div class="accordion__list">
      <div
        v-for="(item, index) in items"
        :key="getItemId(item, index)"
        class="accordion__item"
        :data-accordion-status="openMap[index] ? 'open' : 'closed'"
      >
        <div
          class="accordion__header"
          role="button"
          tabindex="0"
          :aria-expanded="!!openMap[index]"
          :aria-controls="`${getItemId(item, index)}-body`"
          :id="`${getItemId(item, index)}-header`"
          data-accordion-toggle
          @click="handleToggle(index)"
          @keydown="handleKeyDown(index, $event)"
        >
          <span class="accordion__title">{{ item.title }}</span>
          <svg
            class="accordion__icon"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </div>
        <div
          class="accordion__body"
          :id="`${getItemId(item, index)}-body`"
          role="region"
          :aria-labelledby="`${getItemId(item, index)}-header`"
        >
          <div class="accordion__body-wrap">
            <div class="accordion__body-content">
              <slot name="item-content" :item="item" :index="index" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
