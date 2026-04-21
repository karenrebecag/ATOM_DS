<script setup lang="ts">
/**
 * TextField (Atom)
 *
 * Single-line text input with label, supportive text, and character counter.
 *
 * Data Attributes (Animation Contract):
 * - data-text-field: Root element (discovery)
 *
 * Usage:
 * <TextField name="email" label="Email" v-model="email" />
 * <TextField name="username" label="Username" error="Already taken" />
 *
 * @see packages/css/src/components/text-field.css
 */

import { computed, type HTMLAttributes } from 'vue'
import type { Size } from '../../types'

interface TextFieldProps {
  name: string
  label?: string
  placeholder?: string
  modelValue?: string
  size?: Size
  isDisabled?: boolean
  error?: string
  supportiveText?: string
  maxLength?: number
  showCounter?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<TextFieldProps>(), {
  size: 'm',
  isDisabled: false,
  showCounter: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isFilled = computed(() => props.modelValue !== undefined && props.modelValue !== '')
const hasError = computed(() => !!props.error)

const classes = computed(() => [
  'text-field',
  `text-field--${props.size}`,
  {
    'text-field--filled': isFilled.value,
    'text-field--error': hasError.value,
    'text-field--disabled': props.isDisabled
  },
  props.class
])

const inputId = computed(() => `text-field-${props.name}`)
const supportiveId = computed(() => `${inputId.value}-supportive`)
const errorId = computed(() => `${inputId.value}-error`)
const currentLength = computed(() => typeof props.modelValue === 'string' ? props.modelValue.length : 0)

const ariaDescribedby = computed(() => {
  if (hasError.value) return errorId.value
  if (props.supportiveText) return supportiveId.value
  return undefined
})

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div :class="classes" data-text-field>
    <label v-if="label" class="text-field__label" :for="inputId">
      {{ label }}
    </label>
    <input
      :id="inputId"
      :name="name"
      type="text"
      class="text-field__input"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="isDisabled"
      :maxlength="maxLength"
      :aria-invalid="hasError || undefined"
      :aria-describedby="ariaDescribedby"
      @input="handleInput"
    />
    <span v-if="hasError" class="text-field__error" :id="errorId" role="alert">
      {{ error }}
    </span>
    <span v-if="!hasError && supportiveText" class="text-field__supportive" :id="supportiveId">
      {{ supportiveText }}
    </span>
    <span v-if="showCounter && maxLength" class="text-field__counter" aria-live="polite">
      {{ currentLength }}/{{ maxLength }}
    </span>
  </div>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
