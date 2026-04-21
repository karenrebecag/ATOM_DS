<script setup lang="ts">
/**
 * SearchField (Atom)
 *
 * Search input with clear button support.
 *
 * Data Attributes (Animation Contract):
 * - data-search-field: Root element (discovery)
 *
 * Usage:
 * <SearchField name="search" v-model="query" @clear="query = ''" />
 * <SearchField name="filter" size="s" placeholder="Filter items..." />
 *
 * @see packages/css/src/components/search-field.css
 */

import { computed, type HTMLAttributes } from 'vue'

type SearchFieldSize = 's' | 'm' | 'l'

interface SearchFieldProps {
  name: string
  placeholder?: string
  modelValue?: string
  size?: SearchFieldSize
  isDisabled?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<SearchFieldProps>(), {
  placeholder: 'Search...',
  size: 'm',
  isDisabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  clear: []
}>()

const isFilled = computed(() => props.modelValue !== undefined && props.modelValue !== '')

const classes = computed(() => [
  'search-field',
  `search-field--${props.size}`,
  {
    'search-field--filled': isFilled.value
  },
  props.class
])

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

function handleClear() {
  emit('update:modelValue', '')
  emit('clear')
}
</script>

<template>
  <div :class="classes" data-search-field>
    <span class="search-field__search-icon" aria-hidden="true" />
    <input
      :name="name"
      type="search"
      class="search-field__input"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="isDisabled"
      role="searchbox"
      @input="handleInput"
    />
    <button
      v-if="isFilled"
      type="button"
      class="search-field__clear"
      aria-label="Clear search"
      @click="handleClear"
    >
      <span class="search-field__clear-icon" aria-hidden="true" />
    </button>
  </div>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
