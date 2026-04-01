<script setup lang="ts">
/**
 * Checkbox (Atom)
 *
 * Form control for binary selection with support for indeterminate state.
 * Follows ARIA checkbox pattern with semantic HTML.
 *
 * Props:
 * - isDisabled: Disabled state
 * - isIndeterminate: Indeterminate state (visual only, not native HTML)
 * - value: Value attribute for form submission
 *
 * v-model Support:
 * - Binds to boolean checked state via defineModel()
 *
 * Data Attributes (Animation Contract):
 * - data-checkbox: Root element (discovery)
 * - data-checkbox-custom: Custom styled wrapper
 * - data-checkbox-check: SVG checkmark path
 *
 * Usage:
 * <Checkbox v-model="isAccepted">Accept terms</Checkbox>
 * <Checkbox v-model="selectAll" :is-indeterminate="someSelected">Select All</Checkbox>
 * <Checkbox v-model="isDisabled" :is-disabled="true">Disabled</Checkbox>
 *
 * @see packages/css/src/components/checkbox.css
 */

import { computed, type HTMLAttributes } from 'vue'

interface CheckboxProps {
  isDisabled?: boolean
  isIndeterminate?: boolean
  value?: string
  name?: string
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  isDisabled: false,
  isIndeterminate: false
})

// Vue 3.4+ defineModel() for v-model support
const checked = defineModel<boolean>({ default: false })

const emit = defineEmits<{
  change: [value: boolean]
}>()

const checkboxClasses = computed(() => [
  'checkbox',
  {
    'checkbox--checked': checked.value,
    'checkbox--indeterminate': props.isIndeterminate,
    'checkbox--disabled': props.isDisabled
  },
  props.class
])

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement
  emit('change', target.checked)
}

// Generate unique ID if name is provided
const checkboxId = computed(() => {
  if (props.name) {
    return `checkbox-${props.name}${props.value ? `-${props.value}` : ''}`
  }
  return undefined
})
</script>

<template>
  <label :class="checkboxClasses" data-checkbox :for="checkboxId">
    <input
      :id="checkboxId"
      v-model="checked"
      type="checkbox"
      class="checkbox__input"
      :name="name"
      :value="value"
      :disabled="isDisabled"
      :indeterminate="isIndeterminate"
      @change="handleChange"
    >

    <span class="checkbox__custom" data-checkbox-custom>
      <!-- Checkmark icon (rendered by CSS when checked) -->
      <svg
        v-if="checked || isIndeterminate"
        class="checkbox__icon"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          v-if="isIndeterminate"
          d="M3 8h10"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          data-checkbox-check
        />
        <path
          v-else
          d="M13 4L6 11L3 8"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          data-checkbox-check
        />
      </svg>
    </span>

    <span v-if="$slots.default" class="checkbox__label">
      <slot />
    </span>
  </label>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
