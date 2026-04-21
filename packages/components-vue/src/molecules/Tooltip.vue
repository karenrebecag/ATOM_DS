<script setup lang="ts">
/**
 * Tooltip (Molecule)
 *
 * CSS-only tooltip with hover trigger. Supports icon types and configurable positioning.
 *
 * Data Attributes (Animation Contract):
 * - data-tooltip-hover: Root element (CSS hover trigger)
 * - data-tooltip-icon: Icon type
 * - data-tooltip-x: Horizontal position
 * - data-tooltip-y: Vertical position
 *
 * Usage:
 * <Tooltip text="Helpful info" />
 * <Tooltip heading="Title" body="Detailed description" icon-type="question" pos-y="bottom" />
 * <Tooltip text="Custom trigger"><Button>Hover me</Button></Tooltip>
 *
 * @see packages/css/src/components/tooltip.css
 */

import { computed, type HTMLAttributes } from 'vue'
import type { TooltipIconType, TooltipPosX, TooltipPosY } from '../types/tooltip'

interface TooltipProps {
  text?: string
  iconType?: TooltipIconType
  heading?: string
  body?: string
  posX?: TooltipPosX
  posY?: TooltipPosY
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<TooltipProps>(), {
  iconType: 'info',
  posX: 'center',
  posY: 'top'
})

const tooltipClasses = computed(() => ['tooltip', props.class])
const hasCard = computed(() => props.heading || props.body)
</script>

<template>
  <div
    :class="tooltipClasses"
    data-tooltip-hover
    :data-tooltip-icon="iconType"
    :data-tooltip-x="posX"
    :data-tooltip-y="posY"
  >
    <slot>
      <!-- Default trigger: icon -->
      <span class="tooltip__icon">
        <!-- Info Icon -->
        <svg v-if="iconType === 'info'" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 2.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zM9 11H7V7h2v4z" />
        </svg>
        <!-- Question Icon -->
        <svg v-else-if="iconType === 'question'" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 10.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zm.5-2.5H7.25c0-2.25 2.25-2 2.25-3.25a1.5 1.5 0 0 0-3 0h-1.5a3 3 0 1 1 6 0c0 2-2.5 2-2.5 3.75v.25z" />
        </svg>
        <!-- Alert Icon -->
        <svg v-else viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
      </span>
    </slot>
    <div class="tooltip__box">
      <div class="tooltip__box-inner">
        <div v-if="hasCard" class="tooltip__card">
          <span v-if="heading" class="tooltip__heading">{{ heading }}</span>
          <span v-if="body" class="tooltip__body">{{ body }}</span>
        </div>
        <span v-else-if="text" class="tooltip__text">{{ text }}</span>
      </div>
      <span class="tooltip__tip" aria-hidden="true" />
    </div>
  </div>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
