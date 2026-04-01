/**
 * useComponentClasses
 *
 * Composable for generating BEM-style CSS classes for components.
 * Reusable across 15+ atoms that follow the variant + size + state pattern.
 *
 * @param block - The base BEM block name (e.g., 'button', 'chip', 'badge')
 * @param variant - Variant modifier (e.g., 'primary', 'secondary')
 * @param size - Size modifier (e.g., 'xs', 's', 'm', 'l', 'xl')
 * @param states - Object of state modifiers (e.g., { disabled: true, loading: false })
 * @param customClass - User-provided custom classes
 * @returns Computed ref with array of classes
 *
 * @example
 * ```typescript
 * const buttonClasses = useComponentClasses(
 *   'button',
 *   () => 'primary',
 *   () => 'm',
 *   () => ({ disabled: props.isDisabled, loading: props.isLoading }),
 *   () => props.class
 * )
 * ```
 */

import { computed, toValue, type MaybeRefOrGetter, type ComputedRef } from 'vue'

export function useComponentClasses(
  block: string,
  variant: MaybeRefOrGetter<string>,
  size: MaybeRefOrGetter<string>,
  states: MaybeRefOrGetter<Record<string, boolean>>,
  customClass?: MaybeRefOrGetter<string | string[] | undefined>
): ComputedRef<(string | Record<string, boolean> | string[] | undefined)[]> {
  return computed(() => {
    const v = toValue(variant)
    const s = toValue(size)
    const st = toValue(states)
    const custom = toValue(customClass)

    return [
      block,
      `${block}--${v}`,
      `${block}--${s}`,
      // Convert states object to BEM modifier classes
      Object.fromEntries(
        Object.entries(st)
          .filter(([, value]) => value) // Only include truthy states
          .map(([key, value]) => [`${block}--${key}`, value])
      ),
      custom
    ]
  })
}
