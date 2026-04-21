<script setup lang="ts">
/**
 * Toggle (Atom)
 *
 * A form toggle switch with label, supportive text, and error handling.
 * Supports two sizes with accessible labeling via default slot.
 *
 * Data Attributes (Animation Contract):
 * - data-toggle: Root element (discovery)
 *
 * Usage:
 * <Toggle name="notifications" size="m" v-model:checked="isOn">Notifications</Toggle>
 * <Toggle name="dark" :is-error="true" error-text="Required">Dark Mode</Toggle>
 *
 * @see packages/css/src/components/toggle.css
 */

import { computed, type HTMLAttributes } from 'vue'

type ToggleSize = 's' | 'm'

interface ToggleProps {
  name?: string
  size?: ToggleSize
  checked?: boolean
  isDisabled?: boolean
  isError?: boolean
  errorText?: string
  supportiveText?: string
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<ToggleProps>(), {
  size: 'm',
  checked: false,
  isDisabled: false,
  isError: false
})

const emit = defineEmits<{
  'update:checked': [value: boolean]
  change: [event: Event]
}>()

const fieldClasses = computed(() => [
  'toggle-field',
  `toggle-field--${props.size}`,
  {
    'toggle-field--disabled': props.isDisabled,
    'toggle-field--error': props.isError
  },
  props.class
])

const toggleClasses = computed(() => [
  'toggle',
  `toggle--${props.size}`
])

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:checked', target.checked)
  emit('change', event)
}
</script>

<template>
  <label :class="fieldClasses" data-toggle>
    <input
      type="checkbox"
      :name="name"
      :checked="checked"
      :disabled="isDisabled"
      class="toggle__input"
      role="switch"
      :aria-checked="checked"
      @change="handleChange"
    />
    <span :class="toggleClasses" />
    <span class="toggle-field__content">
      <span v-if="$slots.default" class="toggle-field__label">
        <slot />
      </span>
      <span v-if="supportiveText" class="toggle-field__supportive-text">{{ supportiveText }}</span>
      <span v-if="isError && errorText" class="toggle-field__error-text">{{ errorText }}</span>
    </span>
  </label>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
