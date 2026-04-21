<script setup lang="ts">
/**
 * CardHeader (Molecule -- Card subcomponent)
 *
 * Header section of a Card with avatar, headline, supporting text, and action slot.
 *
 * Data Attributes (Animation Contract):
 * - data-card-header: Root element
 * - data-card-avatar: Avatar wrapper
 * - data-card-headline: Headline text
 * - data-card-supporting: Supporting text
 * - data-card-action: Action slot wrapper
 *
 * Usage:
 * <CardHeader headline="Card Title" supporting="Subtitle text">
 *   <template #avatar><Avatar initials="JD" /></template>
 *   <template #action><IconButton aria-label="More" /></template>
 * </CardHeader>
 *
 * @see packages/css/src/components/card.css
 */

import { computed, type HTMLAttributes } from 'vue'

interface CardHeaderProps {
  headline?: string
  supporting?: string
  class?: HTMLAttributes['class']
}

const props = defineProps<CardHeaderProps>()

const headerClasses = computed(() => ['card__header', props.class])
</script>

<template>
  <div :class="headerClasses" data-card-header>
    <div v-if="$slots.avatar" class="card__header-avatar" data-card-avatar>
      <slot name="avatar" />
    </div>
    <div class="card__header-text">
      <span v-if="headline" class="card__header-headline" data-card-headline>
        {{ headline }}
      </span>
      <span v-if="supporting" class="card__header-supporting" data-card-supporting>
        {{ supporting }}
      </span>
    </div>
    <div v-if="$slots.action" class="card__header-action" data-card-action>
      <slot name="action" />
    </div>
    <slot />
  </div>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
