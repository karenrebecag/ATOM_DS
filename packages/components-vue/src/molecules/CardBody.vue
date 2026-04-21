<script setup lang="ts">
/**
 * CardBody (Molecule -- Card subcomponent)
 *
 * Body section of a Card with headline, subhead, text, and custom content.
 *
 * Data Attributes (Animation Contract):
 * - data-card-body: Root element
 * - data-card-body-headline: Headline text
 * - data-card-body-subhead: Subhead text
 * - data-card-body-text: Body text
 *
 * Usage:
 * <CardBody headline="Title" subhead="Subtitle" text="Body content here" />
 *
 * @see packages/css/src/components/card.css
 */

import { computed, type HTMLAttributes } from 'vue'

interface CardBodyProps {
  headline?: string
  subhead?: string
  text?: string
  class?: HTMLAttributes['class']
}

const props = defineProps<CardBodyProps>()

const bodyClasses = computed(() => ['card__body', props.class])
</script>

<template>
  <div :class="bodyClasses" data-card-body>
    <span v-if="headline" class="card__body-headline" data-card-body-headline>
      {{ headline }}
    </span>
    <span v-if="subhead" class="card__body-subhead" data-card-body-subhead>
      {{ subhead }}
    </span>
    <p v-if="text" class="card__body-text" data-card-body-text>
      {{ text }}
    </p>
    <slot />
  </div>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
