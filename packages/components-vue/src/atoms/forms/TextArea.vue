<script setup lang="ts">
/**
 * TextArea (Atom)
 *
 * Multi-line text input with label, supportive text, and character counter.
 *
 * Data Attributes (Animation Contract):
 * - data-textarea: Root element (discovery)
 *
 * Usage:
 * <TextArea name="bio" label="Bio" v-model="bio" />
 * <TextArea name="description" label="Description" :max-length="500" :show-counter="true" />
 *
 * @see packages/css/src/components/textarea.css
 */

import { computed, type HTMLAttributes } from 'vue'

type TextAreaSize = 'm' | 'xl'

interface TextAreaProps {
  name: string
  label?: string
  placeholder?: string
  modelValue?: string
  size?: TextAreaSize
  isDisabled?: boolean
  error?: string
  supportiveText?: string
  maxLength?: number
  showCounter?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<TextAreaProps>(), {
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
  'textarea',
  `textarea--${props.size}`,
  {
    'textarea--filled': isFilled.value,
    'textarea--error': hasError.value,
    'textarea--disabled': props.isDisabled
  },
  props.class
])

const textareaId = computed(() => `textarea-${props.name}`)
const supportiveId = computed(() => `${textareaId.value}-supportive`)
const errorId = computed(() => `${textareaId.value}-error`)
const currentLength = computed(() => typeof props.modelValue === 'string' ? props.modelValue.length : 0)

const ariaDescribedby = computed(() => {
  if (hasError.value) return errorId.value
  if (props.supportiveText) return supportiveId.value
  return undefined
})

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div :class="classes" data-textarea>
    <label v-if="label" class="textarea__label" :for="textareaId">
      {{ label }}
    </label>
    <textarea
      :id="textareaId"
      :name="name"
      class="textarea__input"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="isDisabled"
      :maxlength="maxLength"
      :aria-invalid="hasError || undefined"
      :aria-describedby="ariaDescribedby"
      @input="handleInput"
    />
    <span v-if="hasError" class="textarea__error" :id="errorId" role="alert">
      {{ error }}
    </span>
    <span v-if="!hasError && supportiveText" class="textarea__supportive" :id="supportiveId">
      {{ supportiveText }}
    </span>
    <span v-if="showCounter && maxLength" class="textarea__counter" aria-live="polite">
      {{ currentLength }}/{{ maxLength }}
    </span>
  </div>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
