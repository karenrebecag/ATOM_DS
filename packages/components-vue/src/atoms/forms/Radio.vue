<script setup lang="ts">
/**
 * Radio (Atom)
 *
 * A form radio button with title, supportive text, and error handling.
 * Supports two sizes and accessible labeling.
 *
 * Data Attributes (Animation Contract):
 * - data-radio: Root element (discovery)
 *
 * Usage:
 * <Radio name="plan" value="free" title="Free Plan" supportive-text="Basic features" />
 * <Radio name="plan" value="pro" title="Pro Plan" :is-error="true" error-text="Required" />
 *
 * @see packages/css/src/components/radio.css
 */

import { computed, type HTMLAttributes } from 'vue'

type RadioSize = 's' | 'm'

interface RadioProps {
  name?: string
  value?: string
  size?: RadioSize
  checked?: boolean
  isDisabled?: boolean
  isError?: boolean
  title?: string
  supportiveText?: string
  errorText?: string
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<RadioProps>(), {
  size: 'm',
  checked: false,
  isDisabled: false,
  isError: false
})

const emit = defineEmits<{
  'update:checked': [value: boolean]
  change: [event: Event]
}>()

const wrapperClasses = computed(() => [
  'radio-field',
  `radio-field--${props.size}`,
  {
    'radio-field--error': props.isError,
    'radio-field--disabled': props.isDisabled
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
  <label :class="wrapperClasses" data-radio>
    <input
      type="radio"
      :name="name"
      :value="value"
      :checked="checked"
      :disabled="isDisabled"
      class="radio-field__input"
      @change="handleChange"
    />
    <span class="radio-field__control" />
    <span class="radio-field__content">
      <span v-if="title" class="radio-field__title">{{ title }}</span>
      <span v-if="supportiveText" class="radio-field__supportive-text">{{ supportiveText }}</span>
      <span v-if="isError && errorText" class="radio-field__error-text">{{ errorText }}</span>
    </span>
  </label>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
