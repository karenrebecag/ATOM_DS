<script setup lang="ts">
/**
 * Card (Molecule)
 *
 * Composable card container with header, body, and footer subcomponents.
 *
 * Data Attributes (Animation Contract):
 * - data-card: Root element (discovery)
 *
 * Usage:
 * <Card>
 *   <CardHeader headline="Title" />
 *   <CardBody text="Content here" />
 *   <CardFooter><Button>Action</Button></CardFooter>
 * </Card>
 *
 * @see packages/css/src/components/card.css
 */

import { computed, type HTMLAttributes } from 'vue'

interface CardProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<CardProps>()

const cardClasses = computed(() => ['card', props.class])
</script>

<template>
  <div :class="cardClasses" data-card>
    <slot />
  </div>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
