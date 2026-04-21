<script setup lang="ts">
/**
 * NavLink (Atom)
 *
 * CSS-only underline link with animation support.
 * Supports two underline styles (default and alt) and multiple variants.
 *
 * Data Attributes (Animation Contract):
 * - data-underline-link: Underline style ('alt' or '')
 *
 * Usage:
 * <NavLink href="/about" variant="primary">About</NavLink>
 * <NavLink href="/contact" underline="alt" size="s">Contact</NavLink>
 *
 * @see packages/css/src/components/nav-link.css
 */

import { computed, type HTMLAttributes } from 'vue'
import type { NavLinkUnderline, NavLinkVariant } from '../../types/nav-link'
import type { Size } from '../../types'

interface NavLinkProps {
  href?: string
  underline?: NavLinkUnderline
  variant?: NavLinkVariant
  size?: Size
  isDisabled?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<NavLinkProps>(), {
  underline: 'default',
  variant: 'primary',
  size: 'm',
  isDisabled: false
})

const navLinkClasses = computed(() => [
  'nav-link',
  `nav-link--${props.variant}`,
  `nav-link--${props.size}`,
  {
    'nav-link--disabled': props.isDisabled
  },
  props.class
])
</script>

<template>
  <a
    :href="href"
    :class="navLinkClasses"
    :data-underline-link="underline === 'alt' ? 'alt' : ''"
    :tabindex="isDisabled ? -1 : 0"
    :aria-disabled="isDisabled ? 'true' : undefined"
  >
    <slot />
  </a>
</template>

<!-- NO <style> block — All styles from @atomchat.io/css -->
