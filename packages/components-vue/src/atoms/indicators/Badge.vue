<script setup lang="ts">
/**
 * Badge (Atom)
 *
 * A notification indicator with smart overflow logic.
 * Displays notification counts with context-aware capping rules.
 *
 * Data Attributes (Animation Contract):
 * - data-badge: Root element (discovery)
 * - data-count: Raw count value
 * - data-context: Badge context ('default' | 'inbox')
 * - data-state: Badge state
 * - data-badge-text: Text content element
 *
 * Usage:
 * <Badge :count="5" />
 * <Badge :count="150" context="inbox" type="inbox" />
 *
 * @see packages/css/src/components/badge.css
 */

import { computed, type HTMLAttributes } from 'vue'
import type { BadgeType, BadgeState, BadgeContext } from '../../types/badge'

interface BadgeProps {
  count: number
  context?: BadgeContext
  type?: BadgeType
  state?: BadgeState
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<BadgeProps>(), {
  count: 0,
  context: 'default',
  type: 'neutral',
  state: 'default'
})

function getBadgeDisplay(count: number, context: BadgeContext): string | null {
  if (count <= 0) return null

  if (context === 'inbox') {
    if (count >= 50) return '+50'
    return count.toString()
  }

  if (count > 99) return '99+'
  return count.toString()
}

const displayValue = computed(() => getBadgeDisplay(props.count, props.context))

const ariaLabel = computed(
  () => `${props.count} ${props.count === 1 ? 'notification' : 'notifications'}`
)

const badgeClasses = computed(() => [
  'badge',
  `badge--${props.type}`,
  `badge--${props.state}`,
  props.class
])
</script>

<template>
  <span
    v-if="displayValue"
    :class="badgeClasses"
    data-badge
    :data-count="count"
    :data-context="context"
    :data-state="state"
    role="status"
    :aria-label="ariaLabel"
  >
    <span class="badge__text" data-badge-text>
      {{ displayValue }}
    </span>
  </span>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
