<script setup lang="ts">
/**
 * Checkbox (Atom)
 *
 * A form checkbox with label support, indeterminate state, and error handling.
 * Supports two sizes and accessible labeling via default slot.
 *
 * Data Attributes (Animation Contract):
 * - data-checkbox: Root element (discovery)
 *
 * Usage:
 * <Checkbox name="agree" size="m" v-model:checked="isChecked">I agree</Checkbox>
 * <Checkbox name="partial" :indeterminate="true" />
 *
 * @see packages/css/src/components/checkbox.css
 */

import { computed, ref, watch, onMounted, type HTMLAttributes } from 'vue'

type CheckboxSize = 's' | 'm'

interface CheckboxProps {
  name?: string
  size?: CheckboxSize
  checked?: boolean
  indeterminate?: boolean
  isDisabled?: boolean
  isError?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  size: 'm',
  checked: false,
  indeterminate: false,
  isDisabled: false,
  isError: false
})

const emit = defineEmits<{
  'update:checked': [value: boolean]
  change: [event: Event]
}>()

const inputRef = ref<HTMLInputElement | null>(null)

// Sync indeterminate property (not available as HTML attribute)
watch(
  () => props.indeterminate,
  (val) => {
    if (inputRef.value) {
      inputRef.value.indeterminate = val
    }
  }
)

onMounted(() => {
  if (inputRef.value && props.indeterminate) {
    inputRef.value.indeterminate = true
  }
})

const wrapperClasses = computed(() => [
  'checkbox',
  `checkbox--${props.size}`,
  {
    'checkbox--error': props.isError,
    'checkbox--disabled': props.isDisabled
  },
  props.class
])

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:checked', target.checked)
  emit('change', event)
}
</script>

<template>
  <label :class="wrapperClasses" data-checkbox>
    <input
      ref="inputRef"
      type="checkbox"
      :name="name"
      :checked="checked"
      :disabled="isDisabled"
      class="checkbox__input"
      @change="handleChange"
    />
    <span class="checkbox__control" />
    <span v-if="$slots.default" class="checkbox__label">
      <slot />
    </span>
  </label>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
