<script setup lang="ts">
/**
 * Marquee (Molecule)
 *
 * CSS-driven infinite scroll for text or logos.
 * Children are rendered inside two marquee__list divs for seamless looping.
 *
 * Data Attributes (Animation Contract):
 * - data-marquee: Root element (discovery)
 * - data-marquee-list: Each scrolling list
 *
 * Usage:
 * <Marquee variant="logos" size="l">
 *   <img src="/logo1.svg" /> <img src="/logo2.svg" />
 * </Marquee>
 * <Marquee variant="text" :reverse="true" speed="fast">Breaking news...</Marquee>
 *
 * @see packages/css/src/components/marquee.css
 */

import { computed, type HTMLAttributes } from 'vue'
import type { MarqueeVariant, MarqueeSize, MarqueeSpeed } from '../types/marquee'

interface MarqueeProps {
  variant?: MarqueeVariant
  size?: MarqueeSize
  isDark?: boolean
  isReverse?: boolean
  speed?: MarqueeSpeed
  isFade?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<MarqueeProps>(), {
  variant: 'text',
  size: 'm',
  isDark: false,
  isReverse: false,
  speed: 'default',
  isFade: false
})

const marqueeClasses = computed(() => [
  'marquee',
  `marquee--${props.variant}`,
  `marquee--${props.size}`,
  {
    'marquee--dark': props.isDark,
    'marquee--reverse': props.isReverse,
    'marquee--fade': props.isFade
  },
  props.speed !== 'default' && `marquee--${props.speed}`,
  props.class
])
</script>

<template>
  <div :class="marqueeClasses" data-marquee>
    <div class="marquee__list" data-marquee-list :aria-hidden="false">
      <slot />
    </div>
    <div class="marquee__list" data-marquee-list aria-hidden="true">
      <slot />
    </div>
  </div>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
